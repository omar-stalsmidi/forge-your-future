
ALTER TABLE public.quiz_leads ALTER COLUMN state DROP NOT NULL;
ALTER TABLE public.quiz_leads ADD COLUMN IF NOT EXISTS city text;
ALTER TABLE public.quiz_leads ADD COLUMN IF NOT EXISTS trade_other text;
ALTER TABLE public.quiz_leads ADD COLUMN IF NOT EXISTS business_start text;
ALTER TABLE public.quiz_leads ADD COLUMN IF NOT EXISTS phone_country_code text;
