/*
  # Create Contact Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required) - Full name of the contact
      - `email` (text, required) - Email address
      - `phone` (text, required) - Phone number
      - `sport` (text, required) - Primary sport
      - `experience` (text) - Experience level
      - `goals` (text, required) - Training goals
      - `service` (text) - Interested service
      - `preferred_time` (text) - Preferred training time
      - `message` (text) - Additional message
      - `created_at` (timestamptz) - Submission timestamp

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for anonymous users to insert submissions (public form)
    - No read policies - submissions are private to admins
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  sport text NOT NULL,
  experience text DEFAULT '',
  goals text NOT NULL,
  service text DEFAULT '',
  preferred_time text DEFAULT '',
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert for contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);