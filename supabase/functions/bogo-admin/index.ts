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
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // GET: list all rules with their items
    if (req.method === "GET") {
      const { data: rules, error } = await supabase
        .from("bogo_rules")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Fetch items for all rules
      const ruleIds = (rules || []).map((r: any) => r.id);
      const { data: items, error: itemsErr } = await supabase
        .from("bogo_rule_items")
        .select("*")
        .in("rule_id", ruleIds.length > 0 ? ruleIds : ["none"]);

      if (itemsErr) throw itemsErr;

      // Group items by rule
      const result = (rules || []).map((rule: any) => ({
        ...rule,
        buy_items: (items || []).filter((i: any) => i.rule_id === rule.id && i.item_type === "buy"),
        free_items: (items || []).filter((i: any) => i.rule_id === rule.id && i.item_type === "free"),
      }));

      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // POST: create a new rule with items
    if (req.method === "POST") {
      const { name, qty_needed, qty_given, buy_skus, free_skus } = await req.json();

      if (!name || !buy_skus?.length || !free_skus?.length) {
        return new Response(JSON.stringify({ error: "Name, buy SKUs, and free SKUs are required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Create rule
      const { data: rule, error: ruleErr } = await supabase
        .from("bogo_rules")
        .insert({ name, qty_needed: qty_needed || 1, qty_given: qty_given || 1 })
        .select()
        .single();

      if (ruleErr) throw ruleErr;

      // Parse and insert buy items
      const buyItems = parseSKUList(buy_skus, rule.id, "buy");
      const freeItems = parseSKUList(free_skus, rule.id, "free");
      const allItems = [...buyItems, ...freeItems];

      if (allItems.length > 0) {
        const { error: itemsErr } = await supabase
          .from("bogo_rule_items")
          .insert(allItems);
        if (itemsErr) throw itemsErr;
      }

      return new Response(JSON.stringify({ success: true, rule_id: rule.id, items_added: allItems.length }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // PATCH: update rule settings
    if (req.method === "PATCH") {
      const { id, ...updates } = await req.json();
      const { error } = await supabase
        .from("bogo_rules")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // DELETE: remove a rule or clear all
    if (req.method === "DELETE") {
      const { id, clearAll } = await req.json();

      if (clearAll) {
        const { error } = await supabase.from("bogo_rules").delete().neq("id", "00000000-0000-0000-0000-000000000000");
        if (error) throw error;
      } else if (id) {
        const { error } = await supabase.from("bogo_rules").delete().eq("id", id);
        if (error) throw error;
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function parseSKUList(text: string, ruleId: string, itemType: string) {
  return text
    .split("\n")
    .map((l: string) => l.trim())
    .filter((l: string) => l && !l.toLowerCase().startsWith("item") && !l.toLowerCase().startsWith("sku"))
    .map((line: string) => {
      // Handle CSV: sku,price or just sku
      const parts = line.split(",").map((p: string) => p.trim());
      const sku = parts[0];
      let retailPrice: number | null = null;

      if (parts[1]) {
        // Extract numeric price from things like "349", "FREE ($199)", "$279"
        const priceMatch = parts[1].replace(/[^0-9.]/g, "");
        if (priceMatch) retailPrice = parseFloat(priceMatch);
      }

      return {
        rule_id: ruleId,
        sku,
        item_type: itemType,
        retail_price: retailPrice,
      };
    })
    .filter((d: any) => d.sku);
}
