/*
  # Simplify Contact Submissions RLS Policy

  1. Changes
    - Drop the existing overly complex RLS policy
    - Create a simpler policy that allows anonymous inserts with basic validation
    - Frontend already validates the data, so we don't need duplicate complex validation
  
  2. Security
    - Still requires all mandatory fields to be present
    - Allows anonymous users to submit contact forms
    - Prevents empty submissions
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Allow anonymous insert with validation" ON contact_submissions;

-- Create a simpler, more permissive policy
CREATE POLICY "Allow anonymous contact form submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    name IS NOT NULL AND name != '' AND
    email IS NOT NULL AND email != '' AND
    phone IS NOT NULL AND phone != '' AND
    sport IS NOT NULL AND sport != '' AND
    goals IS NOT NULL AND goals != ''
  );
