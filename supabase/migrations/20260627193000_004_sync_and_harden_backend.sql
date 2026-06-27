/* Synchronize auth, profiles, messaging, connections, and image storage. */

-- Email belongs to auth.users. Keeping a public copy on profiles leaks private
-- account data because student profiles are intentionally searchable.
ALTER TABLE public.profiles DROP COLUMN IF EXISTS email;

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_semester_check,
  DROP CONSTRAINT IF EXISTS profiles_username_check,
  DROP CONSTRAINT IF EXISTS profiles_bio_length_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_semester_check CHECK (semester BETWEEN 1 AND 8) NOT VALID,
  ADD CONSTRAINT profiles_username_check
    CHECK (username ~ '^[A-Za-z0-9._]{3,30}$') NOT VALID,
  ADD CONSTRAINT profiles_bio_length_check
    CHECK (char_length(bio) <= 500) NOT VALID;

ALTER TABLE public.messages
  DROP CONSTRAINT IF EXISTS messages_participants_check,
  DROP CONSTRAINT IF EXISTS messages_content_check;

ALTER TABLE public.messages
  ADD CONSTRAINT messages_participants_check
    CHECK (sender_id <> receiver_id) NOT VALID,
  ADD CONSTRAINT messages_content_check
    CHECK (char_length(btrim(message)) BETWEEN 1 AND 2000) NOT VALID;

ALTER TABLE public.connections
  DROP CONSTRAINT IF EXISTS connections_participants_check,
  DROP CONSTRAINT IF EXISTS connections_status_check;

ALTER TABLE public.connections
  ADD CONSTRAINT connections_participants_check
    CHECK (requester_id <> receiver_id) NOT VALID,
  ADD CONSTRAINT connections_status_check
    CHECK (status IN ('pending', 'accepted', 'rejected')) NOT VALID;

DROP POLICY IF EXISTS "update_received_messages" ON public.messages;
CREATE POLICY "update_received_messages" ON public.messages
  FOR UPDATE TO authenticated
  USING (auth.uid() = receiver_id)
  WITH CHECK (auth.uid() = receiver_id);

DROP POLICY IF EXISTS "delete_own_connections" ON public.connections;
CREATE POLICY "delete_own_connections" ON public.connections
  FOR DELETE TO authenticated
  USING (auth.uid() = requester_id OR auth.uid() = receiver_id);

CREATE INDEX IF NOT EXISTS idx_messages_conversation
  ON public.messages(sender_id, receiver_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_connections_pending_receiver
  ON public.connections(receiver_id, created_at DESC)
  WHERE status = 'pending';

-- Anonymous registration can check availability without gaining read access to
-- private columns or the complete profiles table.
CREATE OR REPLACE FUNCTION public.is_username_available(candidate text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT candidate ~ '^[A-Za-z0-9._]{3,30}$'
    AND NOT EXISTS (
      SELECT 1 FROM public.profiles
      WHERE lower(username) = lower(candidate)
    );
$$;

REVOKE ALL ON FUNCTION public.is_username_available(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_username_available(text) TO anon, authenticated;

-- Treat a connection as one relationship regardless of which student sent the
-- first request. Rejected relationships may be requested again.
CREATE OR REPLACE FUNCTION public.request_connection(target_user_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  existing_connection public.connections%ROWTYPE;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF target_user_id = auth.uid() THEN
    RAISE EXCEPTION 'Cannot connect with yourself';
  END IF;

  SELECT * INTO existing_connection
  FROM public.connections
  WHERE (requester_id = auth.uid() AND receiver_id = target_user_id)
     OR (requester_id = target_user_id AND receiver_id = auth.uid())
  ORDER BY created_at DESC
  LIMIT 1;

  IF FOUND AND existing_connection.status IN ('pending', 'accepted') THEN
    RETURN existing_connection.status;
  END IF;

  IF FOUND THEN
    UPDATE public.connections
    SET requester_id = auth.uid(),
        receiver_id = target_user_id,
        status = 'pending',
        created_at = now()
    WHERE id = existing_connection.id;
  ELSE
    INSERT INTO public.connections (requester_id, receiver_id, status)
    VALUES (auth.uid(), target_user_id, 'pending');
  END IF;

  RETURN 'pending';
END;
$$;

REVOKE ALL ON FUNCTION public.request_connection(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.request_connection(uuid) TO authenticated;

-- Make profile lookup fields optional for account-first signup.
ALTER TABLE public.profiles ALTER COLUMN university DROP NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN department DROP NOT NULL;
ALTER TABLE public.profiles ALTER COLUMN semester DROP NOT NULL;

-- Create profiles inside the database so email-confirmation settings cannot
-- leave a successfully created auth user without a profile.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_full_name text;
  v_username text;
  v_university text;
  v_department text;
  v_semester text;
  v_bio text;
BEGIN
  v_full_name := NULLIF(btrim(COALESCE(NEW.raw_user_meta_data ->> 'full_name', '')), '');
  v_username := NULLIF(btrim(COALESCE(NEW.raw_user_meta_data ->> 'username', '')), '');

  IF v_username IS NULL THEN
    RETURN NEW;
  END IF;

  v_university := NULLIF(btrim(COALESCE(NEW.raw_user_meta_data ->> 'university', '')), '');
  v_department := NULLIF(btrim(COALESCE(NEW.raw_user_meta_data ->> 'department', '')), '');
  v_semester := NULLIF(btrim(COALESCE(NEW.raw_user_meta_data ->> 'semester', '')), '');
  v_bio := NULLIF(btrim(COALESCE(NEW.raw_user_meta_data ->> 'bio', '')), '');

  INSERT INTO public.profiles (
    id, full_name, username, university, department, semester, bio
  ) VALUES (
    NEW.id,
    COALESCE(v_full_name, ''),
    v_username,
    v_university,
    v_department,
    CASE
      WHEN v_semester IS NULL OR v_semester !~ '^[0-9]+$' THEN NULL
      ELSE v_semester::integer
    END,
    COALESCE(v_bio, '')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.auto_confirm_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.email_confirmed_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS auto_confirm_new_user_trigger ON auth.users;
CREATE TRIGGER auto_confirm_new_user_trigger
  BEFORE INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.auto_confirm_new_user();

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Receivers may mark a message read, but may not rewrite its author or text.
CREATE OR REPLACE FUNCTION public.protect_message_update()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.id <> OLD.id
     OR NEW.sender_id <> OLD.sender_id
     OR NEW.receiver_id <> OLD.receiver_id
     OR NEW.message <> OLD.message
     OR NEW.created_at <> OLD.created_at
     OR NEW.read IS NOT TRUE THEN
    RAISE EXCEPTION 'Only marking a received message as read is allowed';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_message_update ON public.messages;
CREATE TRIGGER protect_message_update
  BEFORE UPDATE ON public.messages
  FOR EACH ROW EXECUTE FUNCTION public.protect_message_update();

-- Public avatars with owner-scoped writes.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'profile-images',
  'profile-images',
  true,
  2097152,
  ARRAY['image/jpeg', 'image/png']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "read_profile_images" ON storage.objects;
CREATE POLICY "read_profile_images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'profile-images');

DROP POLICY IF EXISTS "insert_own_profile_image" ON storage.objects;
CREATE POLICY "insert_own_profile_image" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'profile-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "update_own_profile_image" ON storage.objects;
CREATE POLICY "update_own_profile_image" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'profile-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'profile-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

DROP POLICY IF EXISTS "delete_own_profile_image" ON storage.objects;
CREATE POLICY "delete_own_profile_image" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'profile-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
