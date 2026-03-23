/*
  # Fix Contact Submissions RLS Policy

  1. Security Changes
    - Drop the overly permissive INSERT policy
    - Create a new INSERT policy with field validation
    - Policy ensures required fields (name, email, phone, sport, goals) are not empty
    - This prevents empty/spam submissions while still allowing public form access

  2. Notes
    - The policy validates that required fields have content
    - This is appropriate for a public contact form
*/

DROP POLICY IF EXISTS "Allow anonymous insert for contact form" ON contact_submissions;

CREATE POLICY "Allow anonymous insert with validation"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    length(trim(name)) > 0 AND
    length(trim(email)) > 0 AND
    email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
    length(trim(phone)) > 0 AND
    length(trim(sport)) > 0 AND
    length(trim(goals)) > 0
  );