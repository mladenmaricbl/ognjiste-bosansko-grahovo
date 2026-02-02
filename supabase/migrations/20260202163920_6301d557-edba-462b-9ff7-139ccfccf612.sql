-- Fix SECURITY DEFINER views by recreating them with SECURITY INVOKER
-- This ensures RLS policies of the querying user are respected

-- Drop and recreate activities_public view with SECURITY INVOKER
DROP VIEW IF EXISTS public.activities_public;
CREATE VIEW public.activities_public 
WITH (security_invoker = on) AS
SELECT 
  id,
  created_at,
  title,
  description,
  image_url
FROM public.activities;

-- Drop and recreate gallery_images_public view with SECURITY INVOKER
DROP VIEW IF EXISTS public.gallery_images_public;
CREATE VIEW public.gallery_images_public 
WITH (security_invoker = on) AS
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

-- Now we need to allow public read on base tables again, but the views will filter the columns
-- Drop the admin-only policies we just created
DROP POLICY IF EXISTS "Only admins can read activities base table" ON public.activities;
DROP POLICY IF EXISTS "Only admins can read gallery_images base table" ON public.gallery_images;

-- Recreate public read policies on base tables (views will filter columns)
CREATE POLICY "Public can view activities" 
ON public.activities 
FOR SELECT 
USING (true);

CREATE POLICY "Public can view images" 
ON public.gallery_images 
FOR SELECT 
USING (true);