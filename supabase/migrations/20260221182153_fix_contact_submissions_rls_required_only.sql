/*
  # Fix Contact Submissions RLS - Required Fields Only

  1. Changes
    - Drop the existing policy that validates all fields
    - Create a new policy that only validates required fields (name, email, phone, sport, goals)
    - Allow optional fields (experience, service, preferred_time, message) to be empty
  
  2. Security
    - Allows anonymous users to submit contact forms
    - Only enforces validation on required fields
    - Matches the database schema constraints
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Allow anonymous contact form submissions" ON contact_submissions;

-- Create policy that only validates required fields
CREATE POLICY "Allow contact submissions with required fields"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    name IS NOT NULL AND length(trim(name)) > 0 AND
    email IS NOT NULL AND length(trim(email)) > 0 AND
    phone IS NOT NULL AND length(trim(phone)) > 0 AND
    sport IS NOT NULL AND length(trim(sport)) > 0 AND
    goals IS NOT NULL AND length(trim(goals)) > 0
  );
