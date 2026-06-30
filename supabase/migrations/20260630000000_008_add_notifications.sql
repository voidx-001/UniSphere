-- Notifications system for UniSphere

CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('connection_request', 'connection_accepted', 'message', 'post_like', 'post_comment')),
  title text NOT NULL,
  body text NOT NULL DEFAULT '',
  related_id uuid,
  link text,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "notifications_select_own" ON public.notifications;
CREATE POLICY "notifications_select_own" ON public.notifications
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "notifications_insert_system" ON public.notifications;
CREATE POLICY "notifications_insert_system" ON public.notifications
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "notifications_update_own" ON public.notifications;
CREATE POLICY "notifications_update_own" ON public.notifications
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "notifications_delete_own" ON public.notifications;
CREATE POLICY "notifications_delete_own" ON public.notifications
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications(user_id, read);

-- Helper to create a notification from a trigger
CREATE OR REPLACE FUNCTION public.create_notification(
  p_user_id uuid,
  p_actor_id uuid,
  p_type text,
  p_title text,
  p_body text,
  p_related_id uuid DEFAULT NULL,
  p_link text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_user_id IS NULL OR p_actor_id IS NULL OR p_user_id = p_actor_id THEN
    RETURN;
  END IF;

  INSERT INTO public.notifications (user_id, actor_id, type, title, body, related_id, link)
  VALUES (p_user_id, p_actor_id, p_type, p_title, p_body, p_related_id, p_link);
END;
$$;

REVOKE ALL ON FUNCTION public.create_notification(uuid, uuid, text, text, text, uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_notification(uuid, uuid, text, text, text, uuid, text) TO authenticated;

-- Trigger: new connection request
CREATE OR REPLACE FUNCTION public.notify_on_connection_request()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  actor_name text;
BEGIN
  SELECT full_name INTO actor_name FROM public.profiles WHERE id = NEW.requester_id;
  PERFORM public.create_notification(
    NEW.receiver_id,
    NEW.requester_id,
    'connection_request',
    COALESCE(actor_name, 'Someone') || ' sent you a connection request',
    'Tap to accept or decline the request.',
    NEW.id,
    '/connection-requests'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS connection_request_notification ON public.connections;
CREATE TRIGGER connection_request_notification
  AFTER INSERT ON public.connections
  FOR EACH ROW
  WHEN (NEW.status = 'pending')
  EXECUTE FUNCTION public.notify_on_connection_request();

-- Trigger: connection accepted
CREATE OR REPLACE FUNCTION public.notify_on_connection_accepted()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  actor_name text;
BEGIN
  IF NEW.status <> 'accepted' OR OLD.status = 'accepted' THEN
    RETURN NEW;
  END IF;

  SELECT full_name INTO actor_name FROM public.profiles WHERE id = NEW.receiver_id;
  PERFORM public.create_notification(
    NEW.requester_id,
    NEW.receiver_id,
    'connection_accepted',
    COALESCE(actor_name, 'Someone') || ' accepted your connection request',
    'You are now connected.',
    NEW.id,
    '/connections'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS connection_accepted_notification ON public.connections;
CREATE TRIGGER connection_accepted_notification
  AFTER UPDATE ON public.connections
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_connection_accepted();

-- Trigger: new message
CREATE OR REPLACE FUNCTION public.notify_on_message()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  actor_name text;
BEGIN
  SELECT full_name INTO actor_name FROM public.profiles WHERE id = NEW.sender_id;
  PERFORM public.create_notification(
    NEW.receiver_id,
    NEW.sender_id,
    'message',
    'New message from ' || COALESCE(actor_name, 'Someone'),
    LEFT(NEW.message, 120),
    NEW.id,
    '/messages'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS message_notification ON public.messages;
CREATE TRIGGER message_notification
  AFTER INSERT ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_message();

-- Trigger: post like
CREATE OR REPLACE FUNCTION public.notify_on_post_like()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  actor_name text;
  post_owner uuid;
BEGIN
  SELECT user_id INTO post_owner FROM public.posts WHERE id = NEW.post_id;
  IF post_owner IS NULL OR post_owner = NEW.user_id THEN
    RETURN NEW;
  END IF;

  SELECT full_name INTO actor_name FROM public.profiles WHERE id = NEW.user_id;
  PERFORM public.create_notification(
    post_owner,
    NEW.user_id,
    'post_like',
    COALESCE(actor_name, 'Someone') || ' liked your post',
    '',
    NEW.post_id,
    '/post?id=' || NEW.post_id
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS post_like_notification ON public.post_likes;
CREATE TRIGGER post_like_notification
  AFTER INSERT ON public.post_likes
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_post_like();

-- Trigger: post comment
CREATE OR REPLACE FUNCTION public.notify_on_post_comment()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  actor_name text;
  post_owner uuid;
BEGIN
  SELECT user_id INTO post_owner FROM public.posts WHERE id = NEW.post_id;
  IF post_owner IS NULL OR post_owner = NEW.user_id THEN
    RETURN NEW;
  END IF;

  SELECT full_name INTO actor_name FROM public.profiles WHERE id = NEW.user_id;
  PERFORM public.create_notification(
    post_owner,
    NEW.user_id,
    'post_comment',
    COALESCE(actor_name, 'Someone') || ' commented on your post',
    LEFT(NEW.content, 120),
    NEW.post_id,
    '/post?id=' || NEW.post_id
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS post_comment_notification ON public.post_comments;
CREATE TRIGGER post_comment_notification
  AFTER INSERT ON public.post_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_on_post_comment();
