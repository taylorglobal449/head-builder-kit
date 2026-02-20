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

    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    // GET: list all deals
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("bogo_deals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // POST: bulk import from CSV text
    if (req.method === "POST") {
      const { csvText, deals } = await req.json();

      if (csvText) {
        // Parse CSV: expected format: buy_sku,buy_title,free_sku,free_title
        const lines = csvText
          .split("\n")
          .map((l: string) => l.trim())
          .filter((l: string) => l && !l.toLowerCase().startsWith("buy_sku"));

        const parsed = lines.map((line: string) => {
          const parts = line.split(",").map((p: string) => p.trim());
          return {
            buy_sku: parts[0],
            buy_title: parts[1] || null,
            free_sku: parts[2],
            free_title: parts[3] || null,
            active: true,
          };
        }).filter((d: any) => d.buy_sku && d.free_sku);

        if (parsed.length === 0) {
          return new Response(JSON.stringify({ error: "No valid rows found" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const { data, error } = await supabase
          .from("bogo_deals")
          .insert(parsed)
          .select();

        if (error) throw error;
        return new Response(JSON.stringify({ imported: data?.length || 0, data }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ error: "Provide csvText" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // PATCH: toggle active or update a deal
    if (req.method === "PATCH") {
      const { id, ...updates } = await req.json();
      const { error } = await supabase
        .from("bogo_deals")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // DELETE: remove a deal or clear all
    if (req.method === "DELETE") {
      const { id, clearAll } = await req.json();
      
      if (clearAll) {
        const { error } = await supabase.from("bogo_deals").delete().neq("id", "00000000-0000-0000-0000-000000000000");
        if (error) throw error;
      } else if (id) {
        const { error } = await supabase.from("bogo_deals").delete().eq("id", id);
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
