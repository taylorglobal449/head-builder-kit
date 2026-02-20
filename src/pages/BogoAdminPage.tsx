import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Trash2, RefreshCw, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

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
  active: boolean;
  created_at: string;
  buy_items: RuleItem[];
  free_items: RuleItem[];
}

async function bogoFetch(method: string, body?: any) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/bogo-admin`, {
    method,
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}

export default function BogoAdminPage() {
  const [rules, setRules] = useState<BogoRule[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedRule, setExpandedRule] = useState<string | null>(null);

  // New rule form
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("Buy 1, get 1 of your choice free");
  const [newQtyNeeded, setNewQtyNeeded] = useState(1);
  const [newQtyGiven, setNewQtyGiven] = useState(1);
  const [newBuySkus, setNewBuySkus] = useState("");
  const [newFreeSkus, setNewFreeSkus] = useState("");
  const [creating, setCreating] = useState(false);

  const loadRules = async () => {
    setLoading(true);
    try {
      const data = await bogoFetch("GET");
      if (Array.isArray(data)) setRules(data);
    } catch {
      toast.error("Failed to load rules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadRules(); }, []);

  const handleCreate = async () => {
    if (!newBuySkus.trim() || !newFreeSkus.trim()) {
      toast.error("Paste buy SKUs and free SKUs");
      return;
    }
    setCreating(true);
    try {
      const result = await bogoFetch("POST", {
        name: newName,
        qty_needed: newQtyNeeded,
        qty_given: newQtyGiven,
        buy_skus: newBuySkus,
        free_skus: newFreeSkus,
      });
      if (result.error) { toast.error(result.error); return; }
      toast.success(`Rule created with ${result.items_added} items`);
      setNewName("Buy 1, get 1 of your choice free");
      setNewQtyNeeded(1);
      setNewQtyGiven(1);
      setNewBuySkus("");
      setNewFreeSkus("");
      setShowCreate(false);
      loadRules();
    } catch {
      toast.error("Failed to create rule");
    } finally {
      setCreating(false);
    }
  };

  const toggleActive = async (rule: BogoRule) => {
    try {
      await bogoFetch("PATCH", { id: rule.id, active: !rule.active });
      setRules(r => r.map(rr => rr.id === rule.id ? { ...rr, active: !rr.active } : rr));
    } catch {
      toast.error("Failed to update");
    }
  };

  const deleteRule = async (id: string) => {
    if (!confirm("Delete this BOGO rule and all its items?")) return;
    try {
      await bogoFetch("DELETE", { id });
      setRules(r => r.filter(rr => rr.id !== id));
      toast.success("Rule deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const clearAll = async () => {
    if (!confirm("Delete ALL BOGO rules? This cannot be undone.")) return;
    try {
      await bogoFetch("DELETE", { clearAll: true });
      setRules([]);
      toast.success("All rules cleared");
    } catch {
      toast.error("Failed to clear");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="BOGO Admin" description="Manage Buy One Get One deals" />
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">BOGO Deal Manager</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={loadRules} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
            {rules.length > 0 && (
              <Button variant="destructive" size="sm" onClick={clearAll}>Clear All</Button>
            )}
          </div>
        </div>

        {/* Create New Rule */}
        <div className="bg-card border border-border rounded-lg mb-6">
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Create New BOGO Rule</span>
            </div>
            {showCreate ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showCreate && (
            <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
              <div>
                <label className="text-sm font-medium text-foreground">Rule Name</label>
                <Input value={newName} onChange={e => setNewName(e.target.value)} className="mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Qty Needed (Buy)</label>
                  <Input
                    type="number" min={1} value={newQtyNeeded}
                    onChange={e => setNewQtyNeeded(parseInt(e.target.value) || 1)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">How many the customer must buy</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Qty Given (Free)</label>
                  <Input
                    type="number" min={1} value={newQtyGiven}
                    onChange={e => setNewQtyGiven(parseInt(e.target.value) || 1)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">How many free items they get</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Buy These (paste SKUs)</label>
                  <Textarea
                    value={newBuySkus}
                    onChange={e => setNewBuySkus(e.target.value)}
                    placeholder={"2785-20,349\n2882-20,279\n2886-20,329"}
                    className="mt-1 font-mono text-sm min-h-[140px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">One per line: SKU or SKU,price</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Get These Free (paste SKUs)</label>
                  <Textarea
                    value={newFreeSkus}
                    onChange={e => setNewFreeSkus(e.target.value)}
                    placeholder={"48-11-1865,FREE ($199)\n2888-20,FREE ($279)"}
                    className="mt-1 font-mono text-sm min-h-[140px]"
                  />
                  <p className="text-xs text-muted-foreground mt-1">One per line: SKU or SKU,price</p>
                </div>
              </div>

              <Button onClick={handleCreate} disabled={creating || !newBuySkus.trim() || !newFreeSkus.trim()}>
                {creating ? "Creating..." : "Create Rule"}
              </Button>
            </div>
          )}
        </div>

        {/* Existing Rules */}
        {rules.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">
            No BOGO rules yet. Create one above!
          </p>
        ) : (
          <div className="space-y-4">
            {rules.map(rule => (
              <div key={rule.id} className={`bg-card border border-border rounded-lg ${!rule.active ? "opacity-50" : ""}`}>
                <div className="flex items-center justify-between p-4">
                  <button
                    onClick={() => setExpandedRule(expandedRule === rule.id ? null : rule.id)}
                    className="flex-1 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{rule.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Buy {rule.qty_needed} from {rule.buy_items.length} items → Get {rule.qty_given} from {rule.free_items.length} items free
                        </p>
                      </div>
                    </div>
                  </button>
                  <div className="flex items-center gap-3">
                    <Switch checked={rule.active} onCheckedChange={() => toggleActive(rule)} />
                    <Button variant="ghost" size="icon" onClick={() => deleteRule(rule.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                    {expandedRule === rule.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </div>
                </div>

                {expandedRule === rule.id && (
                  <div className="px-4 pb-4 border-t border-border pt-3 grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Buy Items ({rule.buy_items.length})
                      </h4>
                      <div className="bg-muted rounded p-3 max-h-[200px] overflow-auto">
                        {rule.buy_items.map(item => (
                          <div key={item.id} className="flex justify-between text-sm py-0.5">
                            <span className="font-mono">{item.sku}</span>
                            {item.retail_price && <span className="text-muted-foreground">${item.retail_price}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Free Items ({rule.free_items.length})
                      </h4>
                      <div className="bg-muted rounded p-3 max-h-[200px] overflow-auto">
                        {rule.free_items.map(item => (
                          <div key={item.id} className="flex justify-between text-sm py-0.5">
                            <span className="font-mono">{item.sku}</span>
                            {item.retail_price && <span className="text-muted-foreground">${item.retail_price}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
