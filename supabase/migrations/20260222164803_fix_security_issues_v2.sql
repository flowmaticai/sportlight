/*
  # Fix Security Issues - RLS Policies and Unused Indexes

  ## Purpose
  This migration addresses critical security vulnerabilities identified in the Supabase security audit:
  1. Removes overly permissive RLS policies (WITH CHECK true / USING true)
  2. Removes unused indexes to improve database performance
  3. Implements proper validation without complex rate limiting

  ## Changes Made

  ### 1. Contact Submissions Table
  - **Security Issue**: INSERT policy allows unrestricted access (WITH CHECK true)
  - **Fix**: Add validation for required fields (name, email, phone, goals)
  - **Justification**: Contact forms must remain accessible but need basic validation

  ### 2. Athlete Testimonials Table
  - **Security Issue**: INSERT policy allows unrestricted access (WITH CHECK true)
  - **Fix**: Add validation for required fields (name, testimonial, rating)
  - **Unused Indexes**: Remove idx_athlete_testimonials_approved and idx_athlete_testimonials_created_at
  - **Justification**: Testimonial submission form is public but needs validation

  ### 3. Instagram Posts Table
  - **Security Issue**: INSERT/UPDATE/DELETE policies for authenticated users have no restrictions
  - **Fix**: Restrict to service_role only (admin access)
  - **Justification**: Only admins should manage Instagram post curation

  ## Important Notes
  1. Service role retains full access for admin operations
  2. Basic validation prevents empty/invalid submissions
  3. Public forms remain accessible with proper validation
  4. Instagram posts management now requires service role authentication
*/

-- ============================================================================
-- 1. DROP UNUSED INDEXES
-- ============================================================================

DROP INDEX IF EXISTS idx_athlete_testimonials_approved;
DROP INDEX IF EXISTS idx_athlete_testimonials_created_at;

-- ============================================================================
-- 2. FIX CONTACT SUBMISSIONS RLS POLICIES
-- ============================================================================

-- Drop existing overly permissive policy
DROP POLICY IF EXISTS "contact_form_insert_policy" ON contact_submissions;

-- Create new policy with validation
CREATE POLICY "contact_form_insert_with_validation"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (
    -- Ensure required fields are not empty
    length(trim(name)) >= 2
    AND length(trim(email)) >= 5
    AND email LIKE '%_@_%.__%'
    AND length(trim(phone)) >= 8
    AND length(trim(goals)) >= 10
  );

-- ============================================================================
-- 3. FIX ATHLETE TESTIMONIALS RLS POLICIES
-- ============================================================================

-- Drop existing overly permissive policy
DROP POLICY IF EXISTS "Anyone can submit testimonials" ON athlete_testimonials;

-- Create new policy with validation
CREATE POLICY "submit_testimonials_with_validation"
  ON athlete_testimonials
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Ensure required fields are not empty
    length(trim(name)) >= 2
    AND length(trim(testimonial)) >= 20
    -- Ensure rating is valid if provided
    AND (rating IS NULL OR (rating >= 1 AND rating <= 5))
  );

-- ============================================================================
-- 4. FIX INSTAGRAM POSTS RLS POLICIES
-- ============================================================================

-- Drop all existing overly permissive policies
DROP POLICY IF EXISTS "Authenticated users can insert Instagram posts" ON instagram_posts;
DROP POLICY IF EXISTS "Authenticated users can update Instagram posts" ON instagram_posts;
DROP POLICY IF EXISTS "Authenticated users can delete Instagram posts" ON instagram_posts;

-- Replace with service_role only policies (admin access only)
CREATE POLICY "service_role_can_insert_instagram_posts"
  ON instagram_posts
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "service_role_can_update_instagram_posts"
  ON instagram_posts
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "service_role_can_delete_instagram_posts"
  ON instagram_posts
  FOR DELETE
  TO service_role
  USING (true);

-- Add policy for authenticated users to view all posts (for admin dashboard)
CREATE POLICY "authenticated_users_can_view_all_instagram_posts"
  ON instagram_posts
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- 5. ADD USEFUL INDEXES
-- ============================================================================

-- Index for fetching approved testimonials (this will actually be used)
CREATE INDEX IF NOT EXISTS idx_athlete_testimonials_approved_display
  ON athlete_testimonials(created_at DESC)
  WHERE approved = true;

-- Index for active Instagram posts ordering
CREATE INDEX IF NOT EXISTS idx_instagram_posts_display
  ON instagram_posts(display_order, created_at DESC)
  WHERE is_active = true;
