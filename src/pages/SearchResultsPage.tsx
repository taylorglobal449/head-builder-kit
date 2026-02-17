import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useProducts } from "@/hooks/useProducts";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type SortOption = "relevance" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [stockFilter, setStockFilter] = useState<"all" | "in-stock" | "out-of-stock">("all");
  const [fulfillmentFilter, setFulfillmentFilter] = useState<"all" | "online" | "in-store">("all");

  // Fetch from real Shopify API — grab up to 50 results for the search query
  const { products, loading } = useProducts(50, query || undefined);

  // Extract brands from results
  const brands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach(p => {
      if (p.node.vendor) brandSet.add(p.node.vendor);
    });
    return Array.from(brandSet).sort();
  }, [products]);

  // Extract price range from results
  const { minPrice, maxPrice } = useMemo(() => {
    if (products.length === 0) return { minPrice: 0, maxPrice: 1000 };
    const prices = products.map(p => parseFloat(p.node.priceRange.minVariantPrice.amount));
    return { 
      minPrice: Math.floor(Math.min(...prices)), 
      maxPrice: Math.ceil(Math.max(...prices)) 
    };
  }, [products]);

  // Compute stock counts
  const stockCounts = useMemo(() => {
    const inStock = products.filter(p => 
      p.node.variants.edges.some(v => v.node.availableForSale)
    ).length;
    return { inStock, outOfStock: products.length - inStock };
  }, [products]);

  // Filter and sort products client-side
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.node.vendor || ""));
    }

    if (priceRange) {
      filtered = filtered.filter(p => {
        const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }

    if (stockFilter === "in-stock") {
      filtered = filtered.filter(p => p.node.variants.edges.some(v => v.node.availableForSale));
    } else if (stockFilter === "out-of-stock") {
      filtered = filtered.filter(p => !p.node.variants.edges.some(v => v.node.availableForSale));
    }

    // Fulfillment filter — uses tags as a proxy (products tagged "in-store" or "online")
    if (fulfillmentFilter === "in-store") {
      filtered = filtered.filter(p => p.node.tags?.some(t => t.toLowerCase().includes("in-store") || t.toLowerCase().includes("instore")));
    } else if (fulfillmentFilter === "online") {
      filtered = filtered.filter(p => !p.node.tags?.some(t => t.toLowerCase().includes("in-store") || t.toLowerCase().includes("instore")));
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => 
          parseFloat(a.node.priceRange.minVariantPrice.amount) - 
          parseFloat(b.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-desc":
        filtered.sort((a, b) => 
          parseFloat(b.node.priceRange.minVariantPrice.amount) - 
          parseFloat(a.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "name-asc":
        filtered.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.node.title.localeCompare(a.node.title));
        break;
    }

    return filtered;
  }, [products, selectedBrands, priceRange, sortBy, stockFilter, fulfillmentFilter]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange(null);
    setStockFilter("all");
    setFulfillmentFilter("all");
  };

  const hasActiveFilters = selectedBrands.length > 0 || priceRange !== null || stockFilter !== "all" || fulfillmentFilter !== "all";

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Brand Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-semibold text-foreground">
          Brand
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 cursor-pointer hover:text-header-primary"
            >
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Availability Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-semibold text-foreground">
          Availability
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-header-primary">
            <Checkbox
              checked={stockFilter === "in-stock"}
              onCheckedChange={() => setStockFilter(stockFilter === "in-stock" ? "all" : "in-stock")}
            />
            <span className="text-sm">In Stock</span>
            <span className="ml-auto text-xs text-muted-foreground">({stockCounts.inStock})</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-header-primary">
            <Checkbox
              checked={stockFilter === "out-of-stock"}
              onCheckedChange={() => setStockFilter(stockFilter === "out-of-stock" ? "all" : "out-of-stock")}
            />
            <span className="text-sm">Out of Stock</span>
            <span className="ml-auto text-xs text-muted-foreground">({stockCounts.outOfStock})</span>
          </label>
        </CollapsibleContent>
      </Collapsible>

      {/* Fulfillment Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-semibold text-foreground">
          Fulfillment
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-header-primary">
            <Checkbox
              checked={fulfillmentFilter === "online"}
              onCheckedChange={() => setFulfillmentFilter(fulfillmentFilter === "online" ? "all" : "online")}
            />
            <span className="text-sm">Online</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-header-primary">
            <Checkbox
              checked={fulfillmentFilter === "in-store"}
              onCheckedChange={() => setFulfillmentFilter(fulfillmentFilter === "in-store" ? "all" : "in-store")}
            />
            <span className="text-sm">In-Store Only</span>
          </label>
        </CollapsibleContent>
      </Collapsible>

      {/* Price Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-semibold text-foreground">
          Price Range
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <Slider
            defaultValue={[minPrice, maxPrice]}
            min={minPrice}
            max={maxPrice}
            step={10}
            value={priceRange || [minPrice, maxPrice]}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange?.[0] || minPrice}</span>
            <span>${priceRange?.[1] || maxPrice}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2 text-sm font-medium text-header-primary hover:underline"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-[1600px] mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><a href="/" className="hover:text-header-primary">Home</a></li>
            <li>/</li>
            <li className="text-foreground font-medium">Search Results</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-foreground uppercase tracking-wide">
            {query ? `Search Results for "${query}"` : "All Products"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {loading ? "Searching..." : `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className="flex items-center gap-1 px-3 py-1 bg-header-primary/10 text-header-primary rounded-full text-sm"
              >
                {brand}
                <X className="w-3 h-3" />
              </button>
            ))}
            {priceRange && (
              <button
                onClick={() => setPriceRange(null)}
                className="flex items-center gap-1 px-3 py-1 bg-header-primary/10 text-header-primary rounded-full text-sm"
              >
                ${priceRange[0]} - ${priceRange[1]}
                <X className="w-3 h-3" />
              </button>
            )}
            {stockFilter !== "all" && (
              <button
                onClick={() => setStockFilter("all")}
                className="flex items-center gap-1 px-3 py-1 bg-header-primary/10 text-header-primary rounded-full text-sm"
              >
                {stockFilter === "in-stock" ? "In Stock" : "Out of Stock"}
                <X className="w-3 h-3" />
              </button>
            )}
            {fulfillmentFilter !== "all" && (
              <button
                onClick={() => setFulfillmentFilter("all")}
                className="flex items-center gap-1 px-3 py-1 bg-header-primary/10 text-header-primary rounded-full text-sm"
              >
                {fulfillmentFilter === "online" ? "Online" : "In-Store Only"}
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-4">
              <div className="flex items-center gap-2 mb-4 text-lg font-bold">
                <Filter className="w-5 h-5" />
                Filters
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort & Mobile Filter */}
            <div className="flex items-center justify-between mb-6">
              {/* Mobile Filter Button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <button className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-muted">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {hasActiveFilters && (
                      <span className="w-5 h-5 bg-header-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                        {selectedBrands.length + (priceRange ? 1 : 0)}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      Filters
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-header-primary"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid 
              products={filteredProducts} 
              loading={loading}
              emptyMessage={query 
                ? `No products found for "${query}". Try different keywords or clear filters.`
                : "No products found. Try a different search."
              }
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
