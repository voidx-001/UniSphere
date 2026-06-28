-- Add optional profile fields used by the edit-profile page.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS interests text DEFAULT '' NOT NULL,
  ADD COLUMN IF NOT EXISTS skills text DEFAULT '' NOT NULL;

ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_interests_length_check,
  DROP CONSTRAINT IF EXISTS profiles_skills_length_check;

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_interests_length_check
    CHECK (char_length(interests) <= 500) NOT VALID,
  ADD CONSTRAINT profiles_skills_length_check
    CHECK (char_length(skills) <= 500) NOT VALID;
