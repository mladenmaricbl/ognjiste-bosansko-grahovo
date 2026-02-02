-- Create views that exclude the uploaded_by field for public access
-- This prevents exposure of admin user IDs while maintaining full functionality for admins

-- Create public view for activities without uploaded_by
CREATE OR REPLACE VIEW public.activities_public AS
SELECT 
  id,
  created_at,
  title,
  description,
  image_url
FROM public.activities;

-- Create public view for gallery_images without uploaded_by
CREATE OR REPLACE VIEW public.gallery_images_public AS
SELECT 
  id,
  created_at,
  updated_at,
  title,
  description,
  image_url
FROM public.gallery_images;

-- Grant SELECT access on views to authenticated and anon users
GRANT SELECT ON public.activities_public TO anon, authenticated;
GRANT SELECT ON public.gallery_images_public TO anon, authenticated;

-- Update RLS policies on the base tables to restrict public SELECT to admins only
-- First drop the existing public read policies
DROP POLICY IF EXISTS "Public can view activities" ON public.activities;
DROP POLICY IF EXISTS "Public can view images" ON public.gallery_images;

-- Create new restrictive policies - only admins can read from base tables
CREATE POLICY "Only admins can read activities base table" 
ON public.activities 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can read gallery_images base table" 
ON public.gallery_images 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));