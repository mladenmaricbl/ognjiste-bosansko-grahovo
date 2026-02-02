-- Create a function to mask uploaded_by for non-admins
-- This approach uses a computed value that only admins can see

-- Create a helper function that returns uploaded_by only for admins
CREATE OR REPLACE FUNCTION public.get_uploaded_by_if_admin(original_uploaded_by uuid)
RETURNS uuid
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT CASE 
    WHEN has_role(auth.uid(), 'admin'::app_role) THEN original_uploaded_by
    ELSE NULL 
  END;
$$;

-- Note: PostgreSQL RLS operates at row level, not column level.
-- The above function can be used in application queries but won't automatically mask
-- the column in SELECT * queries.

-- The proper fix for this is handled at the application layer by using explicit
-- column selection that excludes uploaded_by in public-facing pages.
-- Admin-only pages (AdminDashboard) that need uploaded_by are protected by 
-- authentication checks in the useAdmin hook.

-- For defense in depth, we'll add a comment documenting this security consideration
COMMENT ON COLUMN public.activities.uploaded_by IS 'SECURITY: This column should not be exposed in public SELECT queries. Use explicit column selection excluding this field for public-facing pages.';
COMMENT ON COLUMN public.gallery_images.uploaded_by IS 'SECURITY: This column should not be exposed in public SELECT queries. Use explicit column selection excluding this field for public-facing pages.';