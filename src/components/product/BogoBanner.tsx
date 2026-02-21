import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Gift, ChevronRight } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface FreeItem {
  id: string;
  sku: string;
  retail_price: number | null;
}

interface BogoMatch {
  ruleName: string;
  ruleId: string;
  freeItems: FreeItem[];
}

// Map product handles/SKUs to BOGO buy SKUs
const HANDLE_TO_SKU: Record<string, string[]> = {
  "metabo-hpt-18v-hammer-drill": ["DV18DBFL2S"],
};

// Placeholder images for free items (keyed by SKU for demo)
const SKU_IMAGES: Record<string, string> = {
  UB18DCQ4: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=200&h=200&fit=crop&q=60",
  BSL36A18X: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&q=60",
  UC18YSL3: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=200&h=200&fit=crop&q=60",
  ET36A: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200&h=200&fit=crop&q=60",
  UB18DAQ4: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=200&h=200&fit=crop&q=60",
  "377747M": "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?w=200&h=200&fit=crop&q=60",
};

export function BogoBanner({ productHandle, productSku }: { productHandle?: string; productSku?: string }) {
  const [match, setMatch] = useState<BogoMatch | null>(null);

  useEffect(() => {
    async function checkBogo() {
      try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/bogo-deals`, {
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        });
        const rules = await res.json();
        if (!Array.isArray(rules)) return;

        const skusToCheck = [
          ...(productSku ? [productSku] : []),
          ...(productHandle && HANDLE_TO_SKU[productHandle] ? HANDLE_TO_SKU[productHandle] : []),
        ];

        for (const rule of rules) {
          const buySkus = (rule.buy_items || []).map((i: any) => i.sku.toUpperCase());
          const matched = skusToCheck.some(s => buySkus.includes(s.toUpperCase()));
          if (matched) {
            setMatch({
              ruleName: rule.name,
              ruleId: rule.id,
              freeItems: rule.free_items || [],
            });
            return;
          }
        }
      } catch {
        // Silently fail
      }
    }
    checkBogo();
  }, [productHandle, productSku]);

  if (!match) return null;

  return (
    <div className="border-2 border-red-500 bg-red-50 dark:bg-red-950/20 rounded-lg overflow-hidden">
      <div className="bg-red-600 px-4 py-2 flex items-center gap-2">
        <Gift className="w-4 h-4 text-white" />
        <span className="text-white font-bold text-sm uppercase tracking-wide">BOGO Deal Available!</span>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-foreground text-sm mb-1">{match.ruleName}</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Buy this item and choose <span className="font-semibold text-red-600">1 FREE item</span> from the options below:
        </p>

        {/* Horizontally scrolling free items */}
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-thin">
          {match.freeItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-28 rounded-lg border border-border bg-background p-2 text-center"
            >
              <div className="aspect-square rounded-md overflow-hidden bg-muted mb-2">
                <img
                  src={SKU_IMAGES[item.sku] || "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=200&h=200&fit=crop&q=60"}
                  alt={item.sku}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-mono font-semibold text-foreground leading-tight block truncate">
                {item.sku}
              </span>
            </div>
          ))}
        </div>

        <Link
          to="/deals/bogo"
          className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors mt-3"
        >
          See All Free Items & Full Details
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
