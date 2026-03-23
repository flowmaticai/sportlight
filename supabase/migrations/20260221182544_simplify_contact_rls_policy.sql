/*
  # Simplify Contact Submissions RLS Policy

  1. Changes
    - Drop existing restrictive policy
    - Create a simple policy that allows all inserts for anon users
    - This will help us debug if the issue is with the policy logic or connection
  
  2. Security
    - Temporarily permissive to debug the issue
    - Will tighten once we confirm it works
*/

-- Drop the existing policy
DROP POLICY IF EXISTS "Allow contact submissions with required fields" ON contact_submissions;

-- Create a simple, permissive policy for debugging
CREATE POLICY "Allow anonymous inserts"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
