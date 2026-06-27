/*
# UniSphere Initial Schema - Student Networking Platform

1. New Tables
- `profiles` - Extended user data (name, university, bio, etc.)
  - id (uuid, primary key, references auth.users)
  - full_name (text, required)
  - username (text, unique, required)
  - university (text, required)
  - department (text, required)
  - semester (integer, required)
  - bio (text, optional)
  - profile_image (text, optional URL)
  - created_at (timestamp)
  
- `messages` - Private one-to-one chat messages
  - id (uuid, primary key)
  - sender_id (uuid, references auth.users)
  - receiver_id (uuid, references auth.users)
  - message (text, required)
  - created_at (timestamp)
  - read (boolean, default false)

- `connections` - Student connections/friendships
  - id (uuid, primary key)
  - requester_id (uuid, references auth.users)
  - receiver_id (uuid, references auth.users)
  - status (text: 'pending', 'accepted', 'rejected')
  - created_at (timestamp)

2. Security
- RLS enabled on all tables
- Owner-scoped policies for profiles (users manage their own)
- Owner-scoped policies for messages (users see their sent/received)
- Owner-scoped policies for connections (users see their connections)
- All tables default user_id to auth.uid() where applicable
*/

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  username text UNIQUE NOT NULL,
  university text NOT NULL,
  department text NOT NULL,
  semester integer NOT NULL,
  bio text DEFAULT '',
  profile_image text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Messages table for private chat
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message text NOT NULL,
  created_at timestamptz DEFAULT now(),
  read boolean DEFAULT false
);

-- Connections table for networking
CREATE TABLE IF NOT EXISTS connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  receiver_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  UNIQUE(requester_id, receiver_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "select_profiles" ON profiles;
CREATE POLICY "select_profiles" ON profiles FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Messages policies
DROP POLICY IF EXISTS "select_own_messages" ON messages;
CREATE POLICY "select_own_messages" ON messages FOR SELECT
  TO authenticated USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

DROP POLICY IF EXISTS "insert_own_messages" ON messages;
CREATE POLICY "insert_own_messages" ON messages FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = sender_id);

-- Connections policies
DROP POLICY IF EXISTS "select_own_connections" ON connections;
CREATE POLICY "select_own_connections" ON connections FOR SELECT
  TO authenticated USING (auth.uid() = requester_id OR auth.uid() = receiver_id);

DROP POLICY IF EXISTS "insert_own_connections" ON connections;
CREATE POLICY "insert_own_connections" ON connections FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = requester_id);

DROP POLICY IF EXISTS "update_own_connections" ON connections;
CREATE POLICY "update_own_connections" ON connections FOR UPDATE
  TO authenticated USING (auth.uid() = receiver_id) WITH CHECK (auth.uid() = receiver_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_connections_requester ON connections(requester_id);
CREATE INDEX IF NOT EXISTS idx_connections_receiver ON connections(receiver_id);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_university ON profiles(university);