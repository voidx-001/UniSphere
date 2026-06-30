-- Allow signing in with a username by resolving it to the registered email.
-- This function is intentionally restrictive: it only accepts valid usernames,
-- returns just the email address, and returns NULL when no match is found.
CREATE OR REPLACE FUNCTION public.get_email_by_username(candidate text)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT u.email
  FROM auth.users u
  WHERE u.id = (
    SELECT p.id
    FROM public.profiles p
    WHERE lower(p.username) = lower(candidate)
      AND candidate ~ '^[A-Za-z0-9._]{3,30}$'
    LIMIT 1
  )
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_email_by_username(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_email_by_username(text) TO anon, authenticated;
