-- Drop the views we created as they're not needed 
-- The frontend now uses explicit column selection which doesn't include uploaded_by
DROP VIEW IF EXISTS public.activities_public;
DROP VIEW IF EXISTS public.gallery_images_public;