import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Gift, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

        // Check if this product matches any buy SKU
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
        <h4 className="font-bold text-foreground text-sm mb-2">{match.ruleName}</h4>
        <p className="text-xs text-muted-foreground mb-3">
          Buy this item and choose <span className="font-semibold text-red-600">1 FREE item</span> from the options below:
        </p>
        <div className="space-y-1.5 mb-3">
          {match.freeItems.slice(0, 4).map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm bg-background rounded px-3 py-1.5 border border-border">
              <span className="font-mono font-medium text-foreground">{item.sku}</span>
              {item.retail_price && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground line-through">${item.retail_price.toFixed(2)}</span>
                  <Badge className="bg-red-600 text-white border-0 text-xs py-0">FREE</Badge>
                </div>
              )}
            </div>
          ))}
          {match.freeItems.length > 4 && (
            <p className="text-xs text-muted-foreground">
              + {match.freeItems.length - 4} more options available
            </p>
          )}
        </div>
        <Link
          to="/deals/bogo"
          className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
        >
          See All Free Items & Full Details
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
