
-- Drop overly permissive policies
DROP POLICY "Authenticated users can update leads" ON public.leads;
DROP POLICY "Authenticated users can view leads" ON public.leads;

-- Replace with admin-only policies
CREATE POLICY "Admins can view all leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads"
  ON public.leads FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
