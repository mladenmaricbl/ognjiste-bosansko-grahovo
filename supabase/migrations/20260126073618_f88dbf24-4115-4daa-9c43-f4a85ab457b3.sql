-- Create activities table
CREATE TABLE public.activities (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable Row Level Security
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Create RLS policies using existing has_role function
CREATE POLICY "Public can view activities"
ON public.activities
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert activities"
ON public.activities
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update activities"
ON public.activities
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete activities"
ON public.activities
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for activities if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('activities', 'activities', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for activities bucket
CREATE POLICY "Public can view activity images"
ON storage.objects FOR SELECT
USING (bucket_id = 'activities');

CREATE POLICY "Admins can upload activity images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'activities' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update activity images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'activities' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete activity images"
ON storage.objects FOR DELETE
USING (bucket_id = 'activities' AND public.has_role(auth.uid(), 'admin'));