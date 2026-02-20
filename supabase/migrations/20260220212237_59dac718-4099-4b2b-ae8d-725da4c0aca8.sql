
-- BOGO deals table
CREATE TABLE public.bogo_deals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  buy_sku TEXT NOT NULL,
  buy_title TEXT,
  free_sku TEXT NOT NULL,
  free_title TEXT,
  free_variant_id TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for fast lookups by buy_sku
CREATE INDEX idx_bogo_deals_buy_sku ON public.bogo_deals (buy_sku);

-- Enable RLS
ALTER TABLE public.bogo_deals ENABLE ROW LEVEL SECURITY;

-- Public read for active deals (storefront needs this)
CREATE POLICY "Anyone can read active bogo deals"
  ON public.bogo_deals FOR SELECT
  USING (active = true);

-- Service role can do everything (for admin edge function)
CREATE POLICY "Service role full access"
  ON public.bogo_deals FOR ALL
  USING (true)
  WITH CHECK (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_bogo_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_bogo_deals_updated_at
  BEFORE UPDATE ON public.bogo_deals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_bogo_updated_at();
