/*
  # Fix Contact Submissions RLS Policy - Final Fix

  This migration removes all existing policies and creates a single, simple policy
  that allows anonymous (unauthenticated) users to insert contact form submissions.

  ## Changes
  - Drop all existing policies on contact_submissions table
  - Create a new policy that allows INSERT for anonymous users
  - Policy uses WITH CHECK (true) to allow any anonymous insert

  ## Security
  - Anonymous users can INSERT only (submit the form)
  - No SELECT, UPDATE, or DELETE policies (admin access only via service role)
*/

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow anonymous insert for contact form" ON contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow public contact form submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Enable insert for anon users" ON contact_submissions;

-- Create a single, simple policy for anonymous inserts
CREATE POLICY "contact_form_insert_policy"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);
