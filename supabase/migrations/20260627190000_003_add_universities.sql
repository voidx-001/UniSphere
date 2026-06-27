/*
  Canonical university options used by registration and profile search.
  The foreign key is NOT VALID so this migration remains safe if an existing
  project already contains a legacy or manually entered university value.
  It still validates every new or updated profile.
*/

CREATE TABLE IF NOT EXISTS universities (
  name text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO universities (name) VALUES
  ('Abdul Wali Khan University'),
  ('Air University'),
  ('Allama Iqbal Open University'),
  ('Bahauddin Zakariya University'),
  ('Bahria University'),
  ('Bahria University, Lahore Campus'),
  ('Beaconhouse National University'),
  ('COMSATS University Islamabad'),
  ('COMSATS University Islamabad, Lahore Campus'),
  ('FAST National University'),
  ('Fatima Jinnah Medical University, Lahore'),
  ('Forman Christian College (A Chartered University)'),
  ('Gomal University'),
  ('Government College University Lahore'),
  ('Green International University, Lahore'),
  ('Hajvery University, Lahore'),
  ('Imperial College of Business Studies, Lahore'),
  ('Information Technology University of the Punjab, Lahore'),
  ('Institute for Art and Culture, Lahore'),
  ('Institute of Management Sciences, Lahore'),
  ('International Islamic University'),
  ('Karachi University'),
  ('Khyber Medical University'),
  ('King Edward Medical University, Lahore'),
  ('Kinnaird College for Women, Lahore'),
  ('Lahore College for Women University'),
  ('Lahore Garrison University'),
  ('Lahore Leads University'),
  ('Lahore School of Economics'),
  ('Lahore University of Biological and Applied Sciences'),
  ('Lahore University of Management Sciences (LUMS)'),
  ('Military College of Signals'),
  ('Minhaj University Lahore'),
  ('National College of Arts, Lahore'),
  ('National College of Business Administration and Economics, Lahore'),
  ('National Institute of Technology, Lahore'),
  ('National University of Computer and Emerging Sciences, Lahore Campus'),
  ('National University of Modern Languages, Lahore Campus'),
  ('National University of Sciences and Technology (NUST)'),
  ('NUR International University, Lahore'),
  ('Pakistan Institute of Engineering and Applied Sciences'),
  ('Pakistan Institute of Fashion and Design, Lahore'),
  ('PIQC Institute of Quality, Lahore'),
  ('Punjab Tianjin University of Technology, Lahore'),
  ('Qarshi University, Lahore'),
  ('Quaid-i-Azam University'),
  ('Rashid Latif Khan University, Lahore'),
  ('Riphah International University, Lahore Campus'),
  ('Superior University, Lahore'),
  ('SZABIST'),
  ('University of Central Punjab, Lahore'),
  ('University of Child Health Sciences, Lahore'),
  ('University of Education, Lahore'),
  ('University of Engineering and Technology Lahore'),
  ('University of Health Sciences, Lahore'),
  ('University of Home Economics, Lahore'),
  ('University of Lahore'),
  ('University of Management and Technology, Lahore'),
  ('University of Peshawar'),
  ('University of Sargodha'),
  ('University of Science and Technology, Lahore'),
  ('University of South Asia, Lahore'),
  ('University of the Punjab, Lahore'),
  ('University of Veterinary and Animal Sciences, Lahore'),
  ('Virtual University of Pakistan'),
  ('Other')
ON CONFLICT (name) DO NOTHING;

ALTER TABLE universities ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_universities" ON universities;
CREATE POLICY "select_universities" ON universities
  FOR SELECT TO anon, authenticated
  USING (true);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'profiles_university_fkey'
      AND conrelid = 'profiles'::regclass
  ) THEN
    ALTER TABLE profiles
      ADD CONSTRAINT profiles_university_fkey
      FOREIGN KEY (university)
      REFERENCES universities(name)
      ON UPDATE CASCADE
      NOT VALID;
  END IF;
END
$$;
