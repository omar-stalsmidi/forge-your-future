
-- Create quiz_leads table to store quiz responses
CREATE TABLE public.quiz_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Personal info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  state TEXT NOT NULL,
  
  -- Business situation
  current_status TEXT NOT NULL, -- 'employee', 'business_owner', 'side_hustle'
  feeling TEXT NOT NULL, -- 'stuck', 'accelerate', 'starting_fresh'
  
  -- Business owner specific
  business_type TEXT, -- trade type
  years_in_business TEXT,
  annual_revenue TEXT, -- revenue bracket
  biggest_challenge TEXT, -- 'scaling', 'streamlining', 'marketing', 'hiring', 'systems'
  team_size TEXT,
  
  -- Employee specific
  trade_experience TEXT,
  timeline_to_start TEXT,
  savings_ready BOOLEAN,
  
  -- General
  marketing_current TEXT, -- how they currently get clients
  goals TEXT, -- what they want to achieve in next 12 months
  
  -- Consent
  terms_accepted BOOLEAN NOT NULL DEFAULT false,
  terms_accepted_at TIMESTAMP WITH TIME ZONE,
  
  -- Meta
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (quiz is public, no auth required)
CREATE POLICY "Anyone can submit quiz responses"
ON public.quiz_leads
FOR INSERT
WITH CHECK (true);

-- No select/update/delete for public - admin only via service role
-- This keeps lead data private

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_quiz_leads_updated_at
BEFORE UPDATE ON public.quiz_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Index on email for dedup checks
CREATE INDEX idx_quiz_leads_email ON public.quiz_leads(email);
