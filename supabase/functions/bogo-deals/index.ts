import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Only return active rules with their items
    const { data: rules, error } = await supabase
      .from("bogo_rules")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const ruleIds = (rules || []).map((r: any) => r.id);
    
    if (ruleIds.length === 0) {
      return new Response(JSON.stringify([]), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: items, error: itemsErr } = await supabase
      .from("bogo_rule_items")
      .select("*")
      .in("rule_id", ruleIds);

    if (itemsErr) throw itemsErr;

    const result = (rules || []).map((rule: any) => ({
      id: rule.id,
      name: rule.name,
      qty_needed: rule.qty_needed,
      qty_given: rule.qty_given,
      buy_items: (items || []).filter((i: any) => i.rule_id === rule.id && i.item_type === "buy"),
      free_items: (items || []).filter((i: any) => i.rule_id === rule.id && i.item_type === "free"),
    }));

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
