import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Gift, ShoppingCart, ChevronRight, Tag, Package, CheckCircle2 } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface RuleItem {
  id: string;
  sku: string;
  item_type: string;
  retail_price: number | null;
}

interface BogoRule {
  id: string;
  name: string;
  qty_needed: number;
  qty_given: number;
  buy_items: RuleItem[];
  free_items: RuleItem[];
}

export default function BogoDealsPage() {
  const [rules, setRules] = useState<BogoRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRule, setSelectedRule] = useState<string | null>(null);
  const [selectedFreeItem, setSelectedFreeItem] = useState<string | null>(null);

  useEffect(() => {
    async function loadDeals() {
      try {
        const res = await fetch(`${SUPABASE_URL}/functions/v1/bogo-deals`, {
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setRules(data);
          if (data.length > 0) setSelectedRule(data[0].id);
        }
      } catch {
        console.error("Failed to load BOGO deals");
      } finally {
        setLoading(false);
      }
    }
    loadDeals();
  }, []);

  const activeRule = rules.find((r) => r.id === selectedRule);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Buy One Get One Free Deals | BOGO Promotions"
        description="Shop our Buy One Get One Free deals. Purchase qualifying tools and choose a FREE item!"
      />
      <Header />

      <main className="flex-1">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
            <div className="flex items-center gap-3 mb-3">
              <Gift className="w-8 h-8" />
              <Badge className="bg-white/20 text-white border-white/30 text-sm px-3 py-1">
                LIMITED TIME
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-3">
              Buy One, Get One Free
            </h1>
            <p className="text-lg text-white/90 max-w-2xl">
              Purchase a qualifying tool and choose a FREE item from the selection below.
              Mix and match across eligible products!
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">Loading deals...</p>
            </div>
          ) : rules.length === 0 ? (
            <div className="text-center py-20">
              <Gift className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">No Active BOGO Deals</h2>
              <p className="text-muted-foreground">
                Check back soon — new deals are added regularly!
              </p>
            </div>
          ) : (
            <>
              {/* Rule Tabs (if multiple) */}
              {rules.length > 1 && (
                <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
                  {rules.map((rule) => (
                    <button
                      key={rule.id}
                      onClick={() => {
                        setSelectedRule(rule.id);
                        setSelectedFreeItem(null);
                      }}
                      className={`px-5 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-all border ${
                        selectedRule === rule.id
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-card text-foreground border-border hover:border-red-300"
                      }`}
                    >
                      {rule.name}
                    </button>
                  ))}
                </div>
              )}

              {activeRule && (
                <div className="space-y-8">
                  {/* Promotion Title */}
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-2xl font-black text-foreground uppercase mb-2">
                      {activeRule.name}
                    </h2>
                    <p className="text-muted-foreground">
                      Buy <span className="font-bold text-foreground">{activeRule.qty_needed}</span>{" "}
                      qualifying item{activeRule.qty_needed > 1 ? "s" : ""} below, then pick{" "}
                      <span className="font-bold text-red-600">{activeRule.qty_given}</span> FREE
                      item{activeRule.qty_given > 1 ? "s" : ""} from the free selection.
                    </p>
                  </div>

                  {/* How it Works */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">Buy a Qualifying Tool</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Add any item from the "Buy" list to your cart
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">Pick Your Free Item</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Choose from the "Free" selection below
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-card border border-border rounded-lg p-4">
                      <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">Both Ship to You</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          We'll apply the deal at checkout automatically
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Two Column: Buy Items + Free Items */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Buy Items */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <ShoppingCart className="w-5 h-5 text-foreground" />
                        <h3 className="text-lg font-bold text-foreground uppercase">
                          Step 1: Buy Any of These
                        </h3>
                        <Badge variant="secondary" className="ml-auto">
                          {activeRule.buy_items.length} items
                        </Badge>
                      </div>
                      <div className="bg-card border border-border rounded-xl overflow-hidden">
                        <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
                          {activeRule.buy_items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                            >
                              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                                <Package className="w-5 h-5 text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-mono font-semibold text-foreground text-sm">
                                  {item.sku}
                                </p>
                              </div>
                              {item.retail_price && (
                                <span className="text-sm font-semibold text-foreground">
                                  ${item.retail_price.toFixed(2)}
                                </span>
                              )}
                              <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Free Items */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Gift className="w-5 h-5 text-red-600" />
                        <h3 className="text-lg font-bold text-foreground uppercase">
                          Step 2: Pick Your Free Item
                        </h3>
                        <Badge className="bg-red-100 text-red-700 border-red-200 ml-auto">
                          {activeRule.free_items.length} choices
                        </Badge>
                      </div>
                      <div className="bg-card border border-border rounded-xl overflow-hidden">
                        <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
                          {activeRule.free_items.map((item) => (
                            <button
                              key={item.id}
                              onClick={() =>
                                setSelectedFreeItem(
                                  selectedFreeItem === item.id ? null : item.id
                                )
                              }
                              className={`w-full flex items-center gap-4 p-4 transition-colors text-left ${
                                selectedFreeItem === item.id
                                  ? "bg-red-50 dark:bg-red-950/30 border-l-4 border-l-red-600"
                                  : "hover:bg-muted/50"
                              }`}
                            >
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                  selectedFreeItem === item.id
                                    ? "bg-red-600 text-white"
                                    : "bg-red-100 text-red-600"
                                }`}
                              >
                                {selectedFreeItem === item.id ? (
                                  <CheckCircle2 className="w-5 h-5" />
                                ) : (
                                  <Gift className="w-5 h-5" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-mono font-semibold text-foreground text-sm">
                                  {item.sku}
                                </p>
                              </div>
                              {item.retail_price && (
                                <div className="text-right flex-shrink-0">
                                  <span className="text-xs text-muted-foreground line-through">
                                    ${item.retail_price.toFixed(2)}
                                  </span>
                                  <Badge className="bg-red-600 text-white border-0 ml-2 text-xs">
                                    FREE
                                  </Badge>
                                </div>
                              )}
                              {!item.retail_price && (
                                <Badge className="bg-red-600 text-white border-0 text-xs">
                                  FREE
                                </Badge>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Selected Free Item Confirmation */}
                  {selectedFreeItem && (
                    <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                        <div>
                          <h4 className="font-bold text-foreground">You've Selected Your Free Item!</h4>
                          <p className="text-sm text-muted-foreground">
                            SKU:{" "}
                            <span className="font-mono font-semibold text-foreground">
                              {activeRule.free_items.find((i) => i.id === selectedFreeItem)?.sku}
                            </span>{" "}
                            — Add a qualifying buy item to your cart and this will be included free at checkout.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Fine Print */}
                  <div className="text-xs text-muted-foreground border-t border-border pt-6 space-y-1">
                    <p>* Offer valid while supplies last. Cannot be combined with other promotions.</p>
                    <p>* Free item will be applied at checkout after qualifying purchase is confirmed.</p>
                    <p>* Qualifying and free items subject to availability.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
