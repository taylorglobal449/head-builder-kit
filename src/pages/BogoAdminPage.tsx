import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Trash2, Upload, RefreshCw, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

interface BogoDeal {
  id: string;
  buy_sku: string;
  buy_title: string | null;
  free_sku: string;
  free_title: string | null;
  free_variant_id: string | null;
  active: boolean;
  created_at: string;
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

const SAMPLE_CSV = `buy_sku,buy_title,free_sku,free_title
ABC-123,DeWalt Drill Kit,ABC-123-FREE,DeWalt Drill Kit (Free)
XYZ-456,Milwaukee Impact,XYZ-456-FREE,Milwaukee Impact (Free)`;

export default function BogoAdminPage() {
  const [deals, setDeals] = useState<BogoDeal[]>([]);
  const [csvText, setCsvText] = useState("");
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [search, setSearch] = useState("");

  const loadDeals = async () => {
    setLoading(true);
    try {
      const data = await bogoFetch("GET");
      if (Array.isArray(data)) setDeals(data);
    } catch {
      toast.error("Failed to load deals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadDeals(); }, []);

  const handleImport = async () => {
    if (!csvText.trim()) { toast.error("Paste your CSV data first"); return; }
    setImporting(true);
    try {
      const result = await bogoFetch("POST", { csvText });
      if (result.error) { toast.error(result.error); return; }
      toast.success(`Imported ${result.imported} BOGO deals`);
      setCsvText("");
      loadDeals();
    } catch {
      toast.error("Import failed");
    } finally {
      setImporting(false);
    }
  };

  const toggleActive = async (deal: BogoDeal) => {
    try {
      await bogoFetch("PATCH", { id: deal.id, active: !deal.active });
      setDeals(d => d.map(dd => dd.id === deal.id ? { ...dd, active: !dd.active } : dd));
    } catch {
      toast.error("Failed to update");
    }
  };

  const deleteDeal = async (id: string) => {
    try {
      await bogoFetch("DELETE", { id });
      setDeals(d => d.filter(dd => dd.id !== id));
      toast.success("Deal removed");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const clearAll = async () => {
    if (!confirm("Delete ALL BOGO deals? This cannot be undone.")) return;
    try {
      await bogoFetch("DELETE", { clearAll: true });
      setDeals([]);
      toast.success("All deals cleared");
    } catch {
      toast.error("Failed to clear");
    }
  };

  const filtered = deals.filter(d =>
    !search || d.buy_sku.toLowerCase().includes(search.toLowerCase()) ||
    d.free_sku.toLowerCase().includes(search.toLowerCase()) ||
    d.buy_title?.toLowerCase().includes(search.toLowerCase()) ||
    d.free_title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO title="BOGO Admin" description="Manage Buy One Get One deals" />
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">BOGO Deal Manager</h1>

        {/* CSV Import Section */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-2">Import Deals (CSV)</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Paste CSV data below. Format: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">buy_sku, buy_title, free_sku, free_title</code>
          </p>

          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Header row is optional and will be skipped automatically</span>
          </div>

          <Textarea
            value={csvText}
            onChange={e => setCsvText(e.target.value)}
            placeholder={SAMPLE_CSV}
            className="font-mono text-sm min-h-[160px] mb-4"
          />

          <div className="flex gap-3">
            <Button onClick={handleImport} disabled={importing || !csvText.trim()}>
              <Upload className="h-4 w-4 mr-2" />
              {importing ? "Importing..." : "Import Deals"}
            </Button>
            <Button variant="outline" onClick={() => setCsvText(SAMPLE_CSV)}>
              Load Sample
            </Button>
          </div>
        </div>

        {/* Deals Table */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Active Deals ({deals.filter(d => d.active).length} / {deals.length})
            </h2>
            <div className="flex gap-2">
              <Input
                placeholder="Search SKU or title..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-64"
              />
              <Button variant="outline" size="icon" onClick={loadDeals} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
              {deals.length > 0 && (
                <Button variant="destructive" size="sm" onClick={clearAll}>
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              {deals.length === 0 ? "No BOGO deals yet. Import some above!" : "No matches found."}
            </p>
          ) : (
            <div className="overflow-auto max-h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Buy SKU</TableHead>
                    <TableHead>Buy Title</TableHead>
                    <TableHead>Free SKU</TableHead>
                    <TableHead>Free Title</TableHead>
                    <TableHead className="text-center">Active</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(deal => (
                    <TableRow key={deal.id} className={!deal.active ? "opacity-50" : ""}>
                      <TableCell className="font-mono text-sm">{deal.buy_sku}</TableCell>
                      <TableCell className="text-sm">{deal.buy_title || "—"}</TableCell>
                      <TableCell className="font-mono text-sm">{deal.free_sku}</TableCell>
                      <TableCell className="text-sm">{deal.free_title || "—"}</TableCell>
                      <TableCell className="text-center">
                        <Switch checked={deal.active} onCheckedChange={() => toggleActive(deal)} />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => deleteDeal(deal.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
