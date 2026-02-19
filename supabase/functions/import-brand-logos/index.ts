import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// All brand logos to import - extracted from allBrandsDirectory
const brandLogos: Record<string, string> = {
  // Top brands (used in BrandsSection + BrandsPage top brands)
  "dewalt-cover": "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-01_533x.png?v=1702595442",
  "makita-cover": "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-02_533x.png?v=1702595443",
  "klein-cover": "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-03_533x.png?v=1702595441",
  "milwaukee-cover": "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-04_533x.png?v=1702595442",
  "knipex-cover": "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-05_533x.png?v=1702595441",
  "occidental-cover": "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-06_533x.png?v=1702595441",
  "diablo-cover": "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-07_533x.png?v=1702595442",
  "ironclad-cover": "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-08_533x.png?v=1702595442",
  // A
  "aervoe": "https://www.fastenersinc.net/cdn/shop/files/Aervoe_1880x.png?v=1678308735",
  "aignep": "https://www.fastenersinc.net/cdn/shop/files/Aignep_1880x.png?v=1678308735",
  "amana-tool": "https://www.fastenersinc.net/cdn/shop/files/Amana_Tool_1880x.png?v=1678308735",
  "avanti": "https://www.fastenersinc.net/cdn/shop/files/Avanti_1880x.png?v=1678308735",
  // B
  "bay-standard": "https://www.fastenersinc.net/cdn/shop/files/Bay_Standard_1880x.png?v=1678308735",
  "bessey": "https://www.fastenersinc.net/cdn/shop/files/Bessey_1880x.png?v=1678308735",
  "black-decker": "https://www.fastenersinc.net/cdn/shop/files/Black_Decker_1880x.png?v=1678308735",
  "blacklader": "https://www.fastenersinc.net/cdn/shop/files/Blacklader_1880x.png?v=1678308735",
  "bn-products": "https://www.fastenersinc.net/cdn/shop/files/BN_Products_1880x.png?v=1678308735",
  "bora": "https://www.fastenersinc.net/cdn/shop/files/Bora_1880x.png?v=1678308735",
  "bostitch": "https://www.fastenersinc.net/cdn/shop/files/Bostitch_1880x.png?v=1678308735",
  "boxer-tools": "https://www.fastenersinc.net/cdn/shop/files/Boxer_1880x.png?v=1678308735",
  "brighton-best": "https://www.fastenersinc.net/cdn/shop/files/Brighton_Best_1880x.png?v=1678308735",
  "bosch": "https://www.fastenersinc.net/cdn/shop/files/Bosch_1880x.png?v=1678308735",
  // C
  "charman": "https://www.fastenersinc.net/cdn/shop/files/Charman_1880x.png?v=1678308735",
  "chicago-hardware": "https://www.fastenersinc.net/cdn/shop/files/Chicago_Hardware_1880x.png?v=1678308735",
  "coilhose": "https://www.fastenersinc.net/cdn/shop/files/Coilhose_1880x.png?v=1678308735",
  "cooper-b-line": "https://www.fastenersinc.net/cdn/shop/files/Cooper_1880x.png?v=1678308735",
  "crescent": "https://www.fastenersinc.net/cdn/shop/files/Crescent_1880x.png?v=1678308735",
  "clc": "https://www.fastenersinc.net/cdn/shop/files/CLC_1880x.png?v=1678308735",
  "crocodile-cloth": "https://www.fastenersinc.net/cdn/shop/files/Crocodile_1880x.png?v=1678308735",
  // D
  "dewalt": "https://www.fastenersinc.net/cdn/shop/files/dewalt_534x.png?v=1678310464",
  "diablo": "https://www.fastenersinc.net/cdn/shop/files/Diablo_1880x.png?v=1678308735",
  "diamond-products": "https://www.fastenersinc.net/cdn/shop/files/Diamond_Products_1880x.png?v=1678308735",
  "dremel": "https://www.fastenersinc.net/cdn/shop/files/Dremel_1880x.png?v=1678308735",
  // E
  "empire": "https://www.fastenersinc.net/cdn/shop/files/Empire_1880x.png?v=1678308735",
  "evolution": "https://www.fastenersinc.net/cdn/shop/files/Evolution_1880x.png?v=1678308735",
  // F
  "falltech": "https://www.fastenersinc.net/cdn/shop/files/FallTech_1880x.png?v=1678308735",
  "fasteners-inc": "https://www.fastenersinc.net/cdn/shop/files/Fasteners_Inc_1880x.png?v=1678308735",
  "fein": "https://www.fastenersinc.net/cdn/shop/files/Fein_1880x.png?v=1678308735",
  "festool": "https://www.fastenersinc.net/cdn/shop/files/Festool_1880x.png?v=1678308735",
  "flex": "https://www.fastenersinc.net/cdn/shop/files/Flex_1880x.png?v=1678308735",
  "foremost": "https://www.fastenersinc.net/cdn/shop/files/Foremost_1880x.png?v=1678308735",
  "freud": "https://www.fastenersinc.net/cdn/shop/files/Freud_1880x.png?v=1678308735",
  // G
  "gearwrench": "https://www.fastenersinc.net/cdn/shop/files/GearWrench_1880x.png?v=1678308735",
  "generac": "https://www.fastenersinc.net/cdn/shop/files/Generac_1880x.png?v=1678308735",
  "gentent": "https://www.fastenersinc.net/cdn/shop/files/GenTent_1880x.png?v=1678308735",
  "greenlee": "https://www.fastenersinc.net/cdn/shop/files/Greenlee_1880x.png?v=1678308735",
  "grk": "https://www.fastenersinc.net/cdn/shop/files/GRK_1880x.png?v=1678308735",
  "grip-rite": "https://www.fastenersinc.net/cdn/shop/files/GripRite_1880x.png?v=1678308735",
  // H
  "ch-hanson": "https://www.fastenersinc.net/cdn/shop/files/CH_Hanson_1880x.png?v=1678308735",
  "honda": "https://www.fastenersinc.net/cdn/shop/files/Honda_1880x.png?v=1678308735",
  "huck": "https://www.fastenersinc.net/cdn/shop/files/Huck_1880x.png?v=1678308735",
  "hultafors": "https://www.fastenersinc.net/cdn/shop/files/Hultafors_1880x.png?v=1678308735",
  "huttig": "https://www.fastenersinc.net/cdn/shop/files/Huttig_1880x.png?v=1678308735",
  // I
  "intercorp": "https://www.fastenersinc.net/cdn/shop/files/Intercorp_1880x.png?v=1678308735",
  "ironclad": "https://www.fastenersinc.net/cdn/shop/files/Ironclad_Performance_Wear_1850x.png?v=1678313423",
  "irwin": "https://www.fastenersinc.net/cdn/shop/files/Irwin_1066x.png?v=1678313423",
  // J
  "jet": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/new-jet-tools-logo.jpg?v=1746657079",
  "johnson-tools": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Johnson_Tools_Logo.jpg?v=1752062119",
  // K
  "kapro": "https://www.fastenersinc.net/cdn/shop/files/Kapro_1880x.png?v=1678314067",
  "ken-forging": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/ken-forging-inc-logo-vector.png?v=1746657054",
  "kishigo": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Kishigo_Logo.jpg?v=1752107590",
  "klein": "https://www.fastenersinc.net/cdn/shop/files/klein_534x.png?v=1678310464",
  "knipex": "https://www.fastenersinc.net/cdn/shop/files/knipex_1880x.png?v=1678308270",
  "kreg": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/kreg-tool-logo-vector_1.jpg?v=1751577808",
  // L
  "landmann": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Landmann_Wire_Rope.jpg?v=1752062152",
  "lenox": "https://www.fastenersinc.net/cdn/shop/files/Lenox_Logo_1880x.png?v=1678830444",
  "lift-safety": "https://www.fastenersinc.net/cdn/shop/files/Lift_Safety_Logo_720x.png?v=1678830808",
  "lift-all": "https://www.fastenersinc.net/cdn/shop/files/LIft-_All_logo_370x.png?v=1691444040",
  "lindstrom": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Lindstrom_Metric_logo.jpg?v=1752107545",
  // M
  "makita": "https://www.fastenersinc.net/cdn/shop/files/Makita_Tools_Logo_f639fba9-6af3-40f3-b679-5c7fa5a15cbd_1880x.png?v=1680907870",
  "marson": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Marson_logo_361.png?v=1746656865",
  "marshalltown": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Marshaltown_Tools_Logo.jpg?v=1752062162",
  "martinez": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Martinez_Tools_Logo.jpg?v=1752062130",
  "max-straps": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Max_Straps_Logo.jpg?v=1752107675",
  "max-usa": "https://www.fastenersinc.net/cdn/shop/files/Max_Tools_Corp_290x.png?v=1678831164",
  "metabo": "https://www.fastenersinc.net/cdn/shop/files/Metabo_Logo_a3db5d6a-b33f-4b84-a262-f996b679a08e_570x.png?v=1678912794",
  "milwaukee": "https://www.fastenersinc.net/cdn/shop/files/milwaukee_940x.png?v=1678310458",
  "make-it-snappy": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Make_it_Snappy_logo.jpg?v=1751975021",
  // N
  "norseman": "https://www.fastenersinc.net/cdn/shop/files/Norseman_Logo_470x.png?v=1678833413",
  // O
  "occidental": "https://www.fastenersinc.net/cdn/shop/files/occidental-leather_670x.png?v=1678310458",
  "ox-pro": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/ox-tools-logo.png?v=1746656865",
  // P
  "pearl-abrasive": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Pearl_Abrasive_Logo.jpg?v=1752107581",
  "pica": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Pica.jpg?v=1751578078",
  "porter-cable": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Porter_Cable_Logo.png?v=1756930682",
  "powermatic": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Powermatic_Logo.webp?v=1751974974",
  // R
  "radians": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Radians_Logo.jpg?v=1751577367",
  "revco": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Revco_Logo_1.png?v=1756924795",
  "rolair": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Rolair-Logo.jpg?v=1746656930",
  "roost": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Roost_Systems.png?v=1746656865",
  // S
  "senco": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Senco_Tools_Logo.jpg?v=1752062171",
  "shurtape": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Shurtape_Logo.jpg?v=1751974990",
  "skilsaw": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Skilsaw_Logo.jpg?v=1751975031",
  "stabila": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/STABILA-Logo-on-White.png?v=1746656865",
  "star-stainless": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Star_Stainless_Logo.png?v=1752543653",
  "starbond": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Starbond_superglue_logo.jpg?v=1752107598",
  "stealthmounts": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/stealthmounts.webp?v=1746656864",
  "stiletto": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/stiletto-logo.webp?v=1746656865",
  "stanley": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Stanley_Logo.jpg?v=1751975040",
  // T
  "tajima": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Tajima_Logo.png?v=1678910312",
  "tru-cut": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Tru_Cut_Tools_Logo.jpg?v=1752107572",
  // U
  "united-abrasives": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/United_abrasives_Sait_Logo.jpg?v=1752107656",
  // V
  "vanguard": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Vanguard_Safety_Logo_1.png?v=1752860488",
  "vaughan": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/vaughan_logo.jpg?v=1746661828",
  "vega": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/vega_1.jpg?v=1752860488",
  "vessel": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Vessel_logo.jpg?v=1751975010",
  "veto": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/VetoTools_Logo.jpg?v=1752062097",
  "voltec": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Voltec_Power_Lightng.jpg?v=1752861078",
  "vulcan": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Vulcan_1.png?v=1752860488",
  // W
  "wiha": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/wiha_logo.png?v=1750096391",
  "wera": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/download_c49ad734-c97c-44e9-b2dd-27772af935cc.png?v=1750096440",
  "wilde": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Wilde_Logo.jpg?v=1751577380",
  "wilton": "https://cdn.shopify.com/s/files/1/0026/8976/1392/files/WiltonTools_Logo.jpg?v=1752062141",
};

// Use URLs as-is - fastenersinc.net CDN links are still live
function normalizeUrl(url: string): string {
  return url;
}

function getExtension(url: string): string {
  const path = new URL(url).pathname;
  const ext = path.split(".").pop()?.toLowerCase() || "png";
  // Normalize extensions
  if (ext === "jpg" || ext === "jpeg") return "jpg";
  if (ext === "webp") return "webp";
  return "png";
}

function getContentType(ext: string): string {
  switch (ext) {
    case "jpg": return "image/jpeg";
    case "webp": return "image/webp";
    default: return "image/png";
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Authentication check - require valid JWT
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const authClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const results: { name: string; status: string; url?: string; error?: string }[] = [];
    const entries = Object.entries(brandLogos);

    // Process in batches of 5 to avoid overwhelming
    for (let i = 0; i < entries.length; i += 5) {
      const batch = entries.slice(i, i + 5);
      const promises = batch.map(async ([name, sourceUrl]) => {
        try {
          const ext = getExtension(sourceUrl);
          const fileName = `${name}.${ext}`;
          const contentType = getContentType(ext);

          // Download the image (normalize URL first)
          const fetchUrl = normalizeUrl(sourceUrl);
          const imageResponse = await fetch(fetchUrl);
          if (!imageResponse.ok) {
            return { name, status: "error", error: `HTTP ${imageResponse.status}` };
          }

          const imageData = await imageResponse.arrayBuffer();

          // Upload to storage
          const { data, error } = await supabase.storage
            .from("brand-logos")
            .upload(fileName, imageData, {
              contentType,
              upsert: true,
            });

          if (error) {
            return { name, status: "error", error: error.message };
          }

          const { data: urlData } = supabase.storage
            .from("brand-logos")
            .getPublicUrl(fileName);

          return { name, status: "success", url: urlData.publicUrl };
        } catch (e) {
          return { name, status: "error", error: String(e) };
        }
      });

      const batchResults = await Promise.all(promises);
      results.push(...batchResults);
    }

    const successful = results.filter((r) => r.status === "success").length;
    const failed = results.filter((r) => r.status === "error").length;

    return new Response(
      JSON.stringify({
        summary: { total: results.length, successful, failed },
        results,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: String(error) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
