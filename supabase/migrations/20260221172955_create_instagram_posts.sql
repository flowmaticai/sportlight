/*
  # Create Instagram Posts Table

  1. New Tables
    - `instagram_posts`
      - `id` (uuid, primary key) - Unique identifier for each post
      - `post_url` (text, not null) - Instagram post URL
      - `image_url` (text, not null) - Thumbnail/preview image URL
      - `caption` (text) - Post caption (optional)
      - `post_type` (text) - Type of post (reel, image, carousel)
      - `display_order` (integer) - Order to display posts (lower numbers first)
      - `is_active` (boolean, default true) - Whether to show this post
      - `created_at` (timestamptz, default now()) - When record was created
      - `updated_at` (timestamptz, default now()) - When record was last updated

  2. Security
    - Enable RLS on `instagram_posts` table
    - Add policy for anyone to read active posts (public data)
    - Only authenticated users can insert/update/delete posts (admin only)

  3. Notes
    - Posts are publicly visible (Instagram posts are public)
    - display_order allows manual control of which posts appear first
    - is_active allows hiding posts without deleting them
*/

CREATE TABLE IF NOT EXISTS instagram_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_url text NOT NULL,
  image_url text NOT NULL,
  caption text,
  post_type text DEFAULT 'image',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active Instagram posts"
  ON instagram_posts
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert Instagram posts"
  ON instagram_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update Instagram posts"
  ON instagram_posts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete Instagram posts"
  ON instagram_posts
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_instagram_posts_active_order 
  ON instagram_posts(is_active, display_order) 
  WHERE is_active = true;