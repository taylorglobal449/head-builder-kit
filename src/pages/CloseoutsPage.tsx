import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SimpleFilterSidebar } from "@/components/products/SimpleFilterSidebar";
import { closeoutCategories, ALL_CLOSEOUT_PRODUCTS, CLOSEOUT_PRODUCTS } from "@/lib/closeoutProducts";
import { Tag, Percent, Truck, Clock, SlidersHorizontal, X, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import closeoutsBanner from "@/assets/banners/closeouts-banner.jpg";

type SortOption = "relevance" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export default function CloseoutsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const baseProducts = useMemo(() => {
    if (!selectedCategory) return ALL_CLOSEOUT_PRODUCTS;
    return CLOSEOUT_PRODUCTS[selectedCategory] || [];
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    let products = [...baseProducts];
    if (selectedBrands.length > 0) {
      products = products.filter(p => selectedBrands.includes(p.node.vendor || ""));
    }
    if (showInStockOnly) {
      products = products.filter(p => p.node.variants.edges.some(v => v.node.availableForSale));
    }
    const sorted = [...products];
    switch (sortBy) {
      case "price-asc": sorted.sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount)); break;
      case "price-desc": sorted.sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount)); break;
      case "name-asc": sorted.sort((a, b) => a.node.title.localeCompare(b.node.title)); break;
      case "name-desc": sorted.sort((a, b) => b.node.title.localeCompare(a.node.title)); break;
    }
    return sorted;
  }, [baseProducts, selectedBrands, showInStockOnly, sortBy]);

  const brandCounts = useMemo(() => {
    const counts = new Map<string, number>();
    baseProducts.forEach(p => {
      const v = p.node.vendor;
      if (v) counts.set(v, (counts.get(v) || 0) + 1);
    });
    return counts;
  }, [baseProducts]);

  const availableBrands = useMemo(() => Array.from(brandCounts.keys()).sort(), [brandCounts]);

  const toggleBrand = (b: string) => setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);
  const clearFilters = () => { setSelectedCategory(null); setSelectedBrands([]); setShowInStockOnly(false); };
  const hasActiveFilters = selectedCategory !== null || selectedBrands.length > 0 || showInStockOnly;

  const sidebarProps = {
    categories: closeoutCategories,
    selectedCategory,
    onSelectCategory: setSelectedCategory,
    brands: availableBrands,
    brandCounts,
    selectedBrands,
    onToggleBrand: toggleBrand,
    showInStockOnly,
    onToggleInStock: () => setShowInStockOnly(!showInStockOnly),
    onClearFilters: clearFilters,
    hasActiveFilters,
  };

  const categoryTitle = selectedCategory ? closeoutCategories.find(c => c.id === selectedCategory)?.title : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="max-w-[1600px] mx-auto px-4 pt-4 pb-2">
          <nav>
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-header-primary">Home</Link></li>
              <li>/</li>
              <li className="text-foreground font-medium">Closeouts & Liquidations</li>
            </ol>
          </nav>
        </div>

        {/* Hero Banner */}
        <section className="max-w-[1600px] mx-auto px-4 pb-4">
          <div className="relative rounded-xl overflow-hidden">
            <img src={closeoutsBanner} alt="Closeouts and Liquidation Sale" className="w-full h-[200px] sm:h-[260px] lg:h-[320px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
              <div className="px-6 lg:px-12">
                <h1 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-wide mb-2">Closeouts & Liquidations</h1>
                <p className="text-white/80 text-sm lg:text-base max-w-lg">Last chance deals on hand tools, power tools, fasteners, and more. Limited quantities — when they're gone, they're gone!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="max-w-[1600px] mx-auto px-4 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Percent, title: "Up to 70% Off", subtitle: "Massive markdowns" },
              { icon: Tag, title: "Clearance Pricing", subtitle: "Lowest prices ever" },
              { icon: Truck, title: "Free Shipping", subtitle: "On orders $99+" },
              { icon: Clock, title: "Limited Stock", subtitle: "While supplies last" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 bg-card border border-border rounded-lg p-3">
                <div className="w-10 h-10 rounded-full bg-header-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-header-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filter Bar + Content */}
        <div className="max-w-[1600px] mx-auto px-4 pb-10">
          {/* Header row */}
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <h2 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-wide">
                {categoryTitle || "All Closeouts"}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} Result{filteredProducts.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-3 mb-5 pb-3 border-b border-border">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden flex items-center gap-2 text-sm font-black uppercase tracking-wide text-foreground">
                  <SlidersHorizontal className="w-4 h-4" /> Filter
                  {hasActiveFilters && <span className="w-5 h-5 bg-header-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">{(selectedCategory ? 1 : 0) + selectedBrands.length + (showInStockOnly ? 1 : 0)}</span>}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader><SheetTitle className="flex items-center gap-2"><Filter className="w-5 h-5" /> Filters</SheetTitle></SheetHeader>
                <div className="mt-4"><SimpleFilterSidebar {...sidebarProps} onSelectCategory={(id) => { setSelectedCategory(id); setMobileFiltersOpen(false); }} /></div>
              </SheetContent>
            </Sheet>
            <span className="hidden lg:flex items-center gap-2 text-sm font-black uppercase tracking-wide text-foreground"><SlidersHorizontal className="w-4 h-4" /> Filter</span>
            {hasActiveFilters && <div className="hidden sm:block w-px h-5 bg-border" />}
            {categoryTitle && <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-1.5 px-3 py-1 border border-border rounded text-xs font-medium text-foreground hover:bg-muted">{categoryTitle} <X className="w-3 h-3" /></button>}
            {selectedBrands.map(b => <button key={b} onClick={() => toggleBrand(b)} className="flex items-center gap-1.5 px-3 py-1 border border-border rounded text-xs font-medium text-foreground hover:bg-muted">Brand: <span className="font-bold">{b}</span> <X className="w-3 h-3" /></button>)}
            {showInStockOnly && <button onClick={() => setShowInStockOnly(false)} className="flex items-center gap-1.5 px-3 py-1 border border-border rounded text-xs font-medium text-foreground hover:bg-muted">In Stock <X className="w-3 h-3" /></button>}
            {hasActiveFilters && <button onClick={clearFilters} className="text-xs font-semibold text-header-primary hover:underline">Clear all</button>}
            <div className="flex items-center gap-2 sm:ml-auto">
              <span className="text-xs text-muted-foreground hidden sm:inline">Sort by:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)} className="px-3 py-1.5 border border-border rounded text-sm bg-background font-medium focus:outline-none focus:ring-2 focus:ring-header-primary/40">
                <option value="relevance">Best Deals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            <aside className="hidden lg:block w-60 shrink-0">
              <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto pr-1">
                <SimpleFilterSidebar {...sidebarProps} />
              </div>
            </aside>
            <div className="flex-1 min-w-0">
              <ProductGrid products={filteredProducts} emptyMessage="No closeout products found. Try adjusting your filters." />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <section className="max-w-[1600px] mx-auto px-4 pb-10">
          <div className="bg-foreground rounded-xl p-8 text-center">
            <h2 className="text-2xl font-black text-white uppercase mb-2">Don't Miss Out</h2>
            <p className="text-white/70 text-sm mb-5 max-w-md mx-auto">These closeout deals are final sale. Limited quantities available — shop now before they're gone forever.</p>
            <a href="https://www.fastenersinc.net/pages/closeouts-and-liquidations" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-header-primary hover:bg-header-primary-hover text-white font-bold uppercase text-sm rounded transition-colors">View Full Closeouts Catalog</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
