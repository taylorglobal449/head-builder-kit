-- Remove overly permissive storage write policies for brand-logos bucket
-- Since there is no auth system, these should not allow any authenticated user to modify logos
DROP POLICY IF EXISTS "Authenticated users can upload brand logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update brand logos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete brand logos" ON storage.objects;