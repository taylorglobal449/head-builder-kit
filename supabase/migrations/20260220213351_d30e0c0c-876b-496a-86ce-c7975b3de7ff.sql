
-- Create bogo_rules table for rule-level settings
CREATE TABLE public.bogo_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  qty_needed INTEGER NOT NULL DEFAULT 1,
  qty_given INTEGER NOT NULL DEFAULT 1,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bogo_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active bogo rules"
ON public.bogo_rules FOR SELECT
USING (active = true);

CREATE POLICY "Service role full access on bogo_rules"
ON public.bogo_rules FOR ALL
USING (true)
WITH CHECK (true);

-- Create bogo_rule_items table for SKUs within each rule
CREATE TABLE public.bogo_rule_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_id UUID NOT NULL REFERENCES public.bogo_rules(id) ON DELETE CASCADE,
  sku TEXT NOT NULL,
  item_type TEXT NOT NULL,
  retail_price NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bogo_rule_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read bogo rule items"
ON public.bogo_rule_items FOR SELECT
USING (EXISTS (SELECT 1 FROM public.bogo_rules WHERE id = rule_id AND active = true));

CREATE POLICY "Service role full access on bogo_rule_items"
ON public.bogo_rule_items FOR ALL
USING (true)
WITH CHECK (true);

-- Add validation trigger for item_type
CREATE OR REPLACE FUNCTION public.validate_bogo_item_type()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  IF NEW.item_type NOT IN ('buy', 'free') THEN
    RAISE EXCEPTION 'item_type must be buy or free';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_bogo_item_type_trigger
BEFORE INSERT OR UPDATE ON public.bogo_rule_items
FOR EACH ROW EXECUTE FUNCTION public.validate_bogo_item_type();

-- Index for fast lookups
CREATE INDEX idx_bogo_rule_items_rule_id ON public.bogo_rule_items (rule_id);
CREATE INDEX idx_bogo_rule_items_sku ON public.bogo_rule_items (sku);

-- Timestamp trigger for bogo_rules
CREATE TRIGGER update_bogo_rules_updated_at
BEFORE UPDATE ON public.bogo_rules
FOR EACH ROW EXECUTE FUNCTION public.update_bogo_updated_at();
