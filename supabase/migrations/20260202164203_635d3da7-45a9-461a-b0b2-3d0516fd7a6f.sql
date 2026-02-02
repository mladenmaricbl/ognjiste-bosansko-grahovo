-- Create a separate admin-only table for tracking uploads
-- This completely hides admin IDs from public access

-- Create upload_tracking table for admin-only access
CREATE TABLE IF NOT EXISTS public.upload_tracking (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  uploaded_by uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(table_name, record_id)
);

-- Enable RLS on upload_tracking
ALTER TABLE public.upload_tracking ENABLE ROW LEVEL SECURITY;

-- Only admins can read/write upload tracking
CREATE POLICY "Only admins can view upload tracking"
ON public.upload_tracking
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can insert upload tracking"
ON public.upload_tracking
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete upload tracking"
ON public.upload_tracking
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Migrate existing uploaded_by data to tracking table
INSERT INTO public.upload_tracking (table_name, record_id, uploaded_by, created_at)
SELECT 'activities', id, uploaded_by, created_at
FROM public.activities
WHERE uploaded_by IS NOT NULL
ON CONFLICT (table_name, record_id) DO NOTHING;

INSERT INTO public.upload_tracking (table_name, record_id, uploaded_by, created_at)
SELECT 'gallery_images', id, uploaded_by, created_at
FROM public.gallery_images
WHERE uploaded_by IS NOT NULL
ON CONFLICT (table_name, record_id) DO NOTHING;

-- Remove uploaded_by from public tables
ALTER TABLE public.activities DROP COLUMN IF EXISTS uploaded_by;
ALTER TABLE public.gallery_images DROP COLUMN IF EXISTS uploaded_by;