import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Filter, X, ChevronRight, SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import {
  MOCK_FASTENERS,
  getAvailableAttributes,
  filterFasteners,
  parseFastenerTags,
  type FastenerAttributes,
} from "@/lib/mockFasteners";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/* ───── filter step definition ───── */
const FILTER_STEPS = [
  { key: "type" as const, label: "Type", pluralLabel: "Types" },
  { key: "diameter" as const, label: "Diameter", pluralLabel: "Diameters" },
  { key: "length" as const, label: "Length", pluralLabel: "Lengths" },
  { key: "material" as const, label: "Material", pluralLabel: "Materials" },
  { key: "head" as const, label: "Head Style", pluralLabel: "Head Styles" },
  { key: "drive" as const, label: "Drive Type", pluralLabel: "Drive Types" },
  { key: "finish" as const, label: "Finish", pluralLabel: "Finishes" },
] as const;

type FilterKey = (typeof FILTER_STEPS)[number]["key"];

export default function FastenersPage() {
  const [selections, setSelections] = useState<Partial<Record<FilterKey, string[]>>>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  // Products filtered by current selections
  const filtered = useMemo(() => filterFasteners(MOCK_FASTENERS, selections), [selections]);

  // Available options per step, computed from the filtered set (cross-filter)
  const availablePerStep = useMemo(() => {
    const result: Record<FilterKey, string[]> = {} as any;
    for (const step of FILTER_STEPS) {
      // Filter by everything EXCEPT the current step
      const otherFilters = { ...selections };
      delete otherFilters[step.key];
      const subset = filterFasteners(MOCK_FASTENERS, otherFilters);
      const attrs = getAvailableAttributes(subset);
      result[step.key] = attrs[`${step.key}s` as keyof ReturnType<typeof getAvailableAttributes>] || [];
    }
    return result;
  }, [selections]);

  const toggle = (key: FilterKey, value: string) => {
    setSelections((prev) => {
      const current = prev[key] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      const updated = { ...prev, [key]: next };
      if (next.length === 0) delete updated[key];
      return updated;
    });
  };

  const clearAll = () => setSelections({});
  const clearStep = (key: FilterKey) => {
    setSelections((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const activeCount = Object.values(selections).reduce((n, arr) => n + (arr?.length || 0), 0);

  /* ───── Sidebar content (shared desktop / mobile) ───── */
  const SidebarContent = () => (
    <div className="space-y-1">
      {FILTER_STEPS.map((step) => {
        const options = availablePerStep[step.key];
        const selected = selections[step.key] || [];
        const hasSelection = selected.length > 0;

        return (
          <FilterStep
            key={step.key}
            label={step.label}
            pluralLabel={step.pluralLabel}
            options={options}
            selected={selected}
            onToggle={(v) => toggle(step.key, v)}
            onClear={() => clearStep(step.key)}
            hasSelection={hasSelection}
            defaultOpen={hasSelection || step.key === "type"}
          />
        );
      })}

      {activeCount > 0 && (
        <div className="pt-3 border-t border-border">
          <button
            onClick={clearAll}
            className="text-sm font-semibold text-header-primary hover:underline"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-header-primary">Home</Link></li>
            <li>/</li>
            <li><Link to="/products" className="hover:text-header-primary">Products</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Fastener Finder</li>
          </ol>
        </nav>

        {/* Page header */}
        <div className="mb-5">
          <h1 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-wide">
            Fastener Finder
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Narrow down from {MOCK_FASTENERS.length} fasteners — {filtered.length} match{filtered.length !== 1 ? "es" : ""}
          </p>
        </div>

        {/* Active pills */}
        {activeCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground font-semibold uppercase">Filters:</span>
            {FILTER_STEPS.map((step) =>
              (selections[step.key] || []).map((val) => (
                <button
                  key={`${step.key}-${val}`}
                  onClick={() => toggle(step.key, val)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-header-primary/10 text-header-primary rounded-full text-xs font-medium"
                >
                  <span className="opacity-60">{step.label}:</span> {val}
                  <X className="w-3 h-3" />
                </button>
              ))
            )}
            <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground underline ml-1">
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto pr-1">
              <div className="flex items-center gap-2 mb-3 text-sm font-bold uppercase tracking-wide text-foreground">
                <Filter className="w-4 h-4" />
                Filter by Attribute
              </div>
              <SidebarContent />
            </div>
          </aside>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter + sort */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button className="lg:hidden flex items-center gap-2 px-3 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeCount > 0 && (
                      <span className="w-5 h-5 bg-header-primary text-white rounded-full text-xs flex items-center justify-center">
                        {activeCount}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Filter className="w-5 h-5" /> Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-4">
                    <SidebarContent />
                  </div>
                </SheetContent>
              </Sheet>
              <span className="text-sm text-muted-foreground ml-auto">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>

            <ProductGrid
              products={filtered.map((p) => ({ node: p.node }))}
              loading={false}
              emptyMessage="No fasteners match your current filters. Try removing some filters."
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ───── Collapsible filter step ───── */
import { Minus, Plus, Search } from "lucide-react";

function FilterStep({
  label,
  pluralLabel,
  options,
  selected,
  onToggle,
  onClear,
  hasSelection,
  defaultOpen,
}: {
  label: string;
  pluralLabel: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  onClear: () => void;
  hasSelection: boolean;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const INITIAL = 8;

  const isOpen = open || hasSelection;

  const filtered = useMemo(() => {
    if (!search) return options;
    const lower = search.toLowerCase();
    return options.filter((o) => o.toLowerCase().includes(lower));
  }, [options, search]);

  // Pin selected items to top
  const sorted = useMemo(() => {
    const sel = filtered.filter((o) => selected.includes(o));
    const rest = filtered.filter((o) => !selected.includes(o));
    return [...sel, ...rest];
  }, [filtered, selected]);

  const visible = showAll ? sorted : sorted.slice(0, INITIAL);
  const hasMore = sorted.length > INITIAL;

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-sm font-bold text-foreground uppercase tracking-wide"
      >
        <span className="flex items-center gap-1.5">
          {label}
          {hasSelection && (
            <span className="text-[11px] font-semibold text-header-primary bg-header-primary/10 rounded-full px-1.5 py-0.5 normal-case">
              {selected.length}
            </span>
          )}
        </span>
        {isOpen ? <Minus className="w-4 h-4 opacity-50" /> : <Plus className="w-4 h-4 opacity-50" />}
      </button>

      {isOpen && (
        <div className="pb-3">
          {options.length > INITIAL && (
            <div className="relative mb-2">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setShowAll(true); }}
                placeholder={`Search ${pluralLabel.toLowerCase()}...`}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-border rounded bg-card focus:outline-none focus:ring-1 focus:ring-header-primary/40"
              />
            </div>
          )}

          <div className={`space-y-0.5 overflow-y-auto ${showAll && sorted.length > 12 ? "max-h-64" : ""}`}>
            {visible.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 cursor-pointer text-[13px] text-foreground/80 hover:text-foreground py-[3px] px-1 rounded hover:bg-muted/50"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(opt)}
                  onChange={() => onToggle(opt)}
                  className="rounded border-border text-header-primary focus:ring-header-primary w-3.5 h-3.5 accent-header-primary shrink-0"
                />
                <span className="truncate">{opt}</span>
              </label>
            ))}
          </div>

          {hasMore && !search && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-1.5 text-xs font-semibold text-header-primary hover:underline"
            >
              {showAll ? "Show Less" : `Show More (${sorted.length - INITIAL})`}
            </button>
          )}

          {hasSelection && (
            <button
              onClick={onClear}
              className="mt-1 text-xs text-muted-foreground hover:text-foreground underline"
            >
              Clear {label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
