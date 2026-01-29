-- Drop the dangerous public read policy that exposes admin user IDs
DROP POLICY IF EXISTS "Everyone can read roles" ON public.user_roles;