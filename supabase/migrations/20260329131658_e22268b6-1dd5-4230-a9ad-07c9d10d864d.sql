-- Create leads table
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  business TEXT,
  email TEXT NOT NULL,
  message TEXT,
  ai_reply TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (lead form is public)
CREATE POLICY "Anyone can submit a lead"
ON public.leads FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users to read all leads (admin)
CREATE POLICY "Authenticated users can view leads"
ON public.leads FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to update leads
CREATE POLICY "Authenticated users can update leads"
ON public.leads FOR UPDATE
TO authenticated
USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();