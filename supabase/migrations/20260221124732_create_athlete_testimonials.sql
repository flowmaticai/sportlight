/*
  # Create athlete testimonials table

  ## Purpose
  This migration creates a system for athletes to submit testimonials about their experience with Sportlight.

  ## New Tables
  1. `athlete_testimonials`
    - `id` (uuid, primary key) - Unique identifier for each testimonial
    - `name` (text, required) - Athlete's full name
    - `sport` (text, optional) - Sport they train in
    - `school` (text, optional) - School they attend/attended
    - `training_period` (text, optional) - How long they've trained (e.g., "2 years", "6 months")
    - `testimonial` (text, required) - Their experience/review
    - `rating` (integer, optional) - Rating out of 5 stars
    - `email` (text, optional) - Contact email (not displayed publicly)
    - `approved` (boolean, default false) - Whether admin has approved for display
    - `created_at` (timestamptz) - When testimonial was submitted

  ## Security
  - Enable RLS on `athlete_testimonials` table
  - Allow anyone to insert testimonials (for submission)
  - Only show approved testimonials to public
  - Service role can approve testimonials

  ## Important Notes
  1. Testimonials require admin approval before being displayed
  2. Email addresses are stored but not displayed publicly
  3. All submissions are timestamped for moderation purposes
*/

CREATE TABLE IF NOT EXISTS athlete_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sport text,
  school text,
  training_period text,
  testimonial text NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  email text,
  approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE athlete_testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit testimonials"
  ON athlete_testimonials
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Public can view approved testimonials"
  ON athlete_testimonials
  FOR SELECT
  TO anon, authenticated
  USING (approved = true);

CREATE POLICY "Service role can update testimonials"
  ON athlete_testimonials
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can view all testimonials"
  ON athlete_testimonials
  FOR SELECT
  TO service_role
  USING (true);

CREATE INDEX IF NOT EXISTS idx_athlete_testimonials_approved ON athlete_testimonials(approved);
CREATE INDEX IF NOT EXISTS idx_athlete_testimonials_created_at ON athlete_testimonials(created_at DESC);