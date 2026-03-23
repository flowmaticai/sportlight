/*
  # Create Testimonial Images Storage Bucket

  1. Storage Setup
    - Creates a public storage bucket called 'testimonial-images'
    - Configured for storing testimonial photos with public read access
    
  2. Security Policies
    - Public read access: Anyone can view images (required for website display)
    - Authenticated upload: Only authenticated users can upload images
    - Authenticated update/delete: Only authenticated users can manage images
    
  3. Notes
    - Images will be accessible via public URL
    - File size limit set to 10MB
    - Only allows common image formats (JPEG, PNG, WebP)
*/

-- Create the storage bucket for testimonial images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'testimonial-images',
  'testimonial-images',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to testimonial images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public read access for testimonial images'
  ) THEN
    CREATE POLICY "Public read access for testimonial images"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'testimonial-images');
  END IF;
END $$;

-- Allow authenticated users to upload images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can upload testimonial images'
  ) THEN
    CREATE POLICY "Authenticated users can upload testimonial images"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'testimonial-images');
  END IF;
END $$;

-- Allow authenticated users to update images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can update testimonial images'
  ) THEN
    CREATE POLICY "Authenticated users can update testimonial images"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'testimonial-images')
    WITH CHECK (bucket_id = 'testimonial-images');
  END IF;
END $$;

-- Allow authenticated users to delete images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated users can delete testimonial images'
  ) THEN
    CREATE POLICY "Authenticated users can delete testimonial images"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'testimonial-images');
  END IF;
END $$;