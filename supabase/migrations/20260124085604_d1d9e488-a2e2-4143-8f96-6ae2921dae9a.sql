-- Grant necessary permissions to authenticated users on gallery_images table
GRANT SELECT, INSERT, UPDATE, DELETE ON public.gallery_images TO authenticated;

-- Also ensure anon can read for public viewing
GRANT SELECT ON public.gallery_images TO anon;