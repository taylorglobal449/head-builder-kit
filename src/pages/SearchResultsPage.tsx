import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Filter, SlidersHorizontal, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategorySidebar } from "@/components/products/CategorySidebar";
import { useProducts } from "@/hooks/useProducts";
import { categoryTree, type CategoryNode, getTrimmedTree } from "@/lib/categoryTaxonomy";
import { SEO } from "@/components/SEO";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type SortOption = "relevance" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<CategoryNode | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { products: shopifyProducts, loading } = useProducts(50, query || undefined);

  const { minPrice, maxPrice } = useMemo(() => {
    if (shopifyProducts.length === 0) return { minPrice: 0, maxPrice: 1000 };
    const prices = shopifyProducts.map(p => parseFloat(p.node.priceRange.minVariantPrice.amount));
    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices)),
    };
  }, [shopifyProducts]);

  const trimmedTree = useMemo(() => getTrimmedTree(categoryTree), []);

  const productMatchesCategory = (p: typeof shopifyProducts[0], catName: string) => {
    const lower = catName.toLowerCase();
    const productType = (p.node.productType || "").toLowerCase();
    const tags = (p.node.tags || []).map((t: string) => t.toLowerCase());
    const title = p.node.title.toLowerCase();
    return productType.includes(lower) || tags.some((t: string) => t.includes(lower)) || title.includes(lower);
  };

  const baseProducts = shopifyProducts;

  // Filtered products
  const filteredProducts = useMemo(() => {
    let products = [...baseProducts];

    if (selectedCategory) {
      products = products.filter((p) => productMatchesCategory(p, selectedCategory.name));
    }
    if (selectedBrands.length > 0) {
      products = products.filter((p) => selectedBrands.includes(p.node.vendor || ""));
    }
    if (selectedProductTypes.length > 0) {
      products = products.filter((p) => selectedProductTypes.includes(p.node.productType || ""));
    }
    if (priceRange) {
      products = products.filter((p) => {
        const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }
    if (showInStockOnly) {
      products = products.filter((p) =>
        p.node.variants.edges.some((v) => v.node.availableForSale)
      );
    }

    const sorted = [...products];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => parseFloat(a.node.priceRange.minVariantPrice.amount) - parseFloat(b.node.priceRange.minVariantPrice.amount));
        break;
      case "price-desc":
        sorted.sort((a, b) => parseFloat(b.node.priceRange.minVariantPrice.amount) - parseFloat(a.node.priceRange.minVariantPrice.amount));
        break;
      case "name-asc":
        sorted.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.node.title.localeCompare(a.node.title));
        break;
    }
    return sorted;
  }, [baseProducts, selectedCategory, selectedBrands, selectedProductTypes, priceRange, showInStockOnly, sortBy]);

  // Cross-filter: brand counts
  const brandCounts = useMemo(() => {
    let products = [...baseProducts];
    if (selectedCategory) products = products.filter((p) => productMatchesCategory(p, selectedCategory.name));
    if (selectedProductTypes.length > 0) products = products.filter((p) => selectedProductTypes.includes(p.node.productType || ""));
    if (priceRange) products = products.filter((p) => { const price = parseFloat(p.node.priceRange.minVariantPrice.amount); return price >= priceRange[0] && price <= priceRange[1]; });
    if (showInStockOnly) products = products.filter((p) => p.node.variants.edges.some((v) => v.node.availableForSale));
    const counts = new Map<string, number>();
    products.forEach((p) => { const v = p.node.vendor; if (v) counts.set(v, (counts.get(v) || 0) + 1); });
    return counts;
  }, [baseProducts, selectedCategory, selectedProductTypes, priceRange, showInStockOnly]);

  const availableBrands = useMemo(() => Array.from(brandCounts.keys()).sort(), [brandCounts]);

  // Cross-filter: product type counts
  const productTypeCounts = useMemo(() => {
    let products = [...baseProducts];
    if (selectedCategory) products = products.filter((p) => productMatchesCategory(p, selectedCategory.name));
    if (selectedBrands.length > 0) products = products.filter((p) => selectedBrands.includes(p.node.vendor || ""));
    if (priceRange) products = products.filter((p) => { const price = parseFloat(p.node.priceRange.minVariantPrice.amount); return price >= priceRange[0] && price <= priceRange[1]; });
    if (showInStockOnly) products = products.filter((p) => p.node.variants.edges.some((v) => v.node.availableForSale));
    const counts = new Map<string, number>();
    products.forEach((p) => { const pt = p.node.productType; if (pt) counts.set(pt, (counts.get(pt) || 0) + 1); });
    return counts;
  }, [baseProducts, selectedCategory, selectedBrands, priceRange, showInStockOnly]);

  const availableProductTypes = useMemo(() => Array.from(productTypeCounts.keys()).sort(), [productTypeCounts]);

  const toggleBrand = (brand: string) => setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);
  const toggleProductType = (type: string) => setSelectedProductTypes((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedProductTypes([]);
    setPriceRange(null);
    setShowInStockOnly(false);
    setSelectedCategory(null);
  };

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    selectedProductTypes.length > 0 ||
    priceRange !== null ||
    showInStockOnly ||
    selectedCategory !== null;

  const pageTitle = query ? `Search Results for "${query}"` : "All Products";

  const sidebarProps = {
    categories: trimmedTree,
    selectedCategoryId: selectedCategory?.id ?? null,
    onSelectCategory: setSelectedCategory,
    brands: availableBrands,
    brandCounts,
    selectedBrands,
    onToggleBrand: toggleBrand,
    types: availableProductTypes,
    typeCounts: productTypeCounts,
    selectedTypes: selectedProductTypes,
    onToggleType: toggleProductType,
    priceRange,
    minPrice,
    maxPrice,
    onPriceChange: setPriceRange,
    showInStockOnly,
    onToggleInStock: () => setShowInStockOnly(!showInStockOnly),
    onClearFilters: clearFilters,
    hasActiveFilters,
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={query ? `Search Results for "${query}"` : "Shop All Products"}
        description={query ? `Find ${query} at Fasteners Inc. Power tools, hand tools, fasteners & more.` : "Browse our full catalog."}
      />
      <Header />

      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <li><Link to="/" className="hover:text-header-primary">Home</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Search Results</li>
          </ol>
        </nav>

        {/* Header row */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
            <h1 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-wide">
              {pageTitle}
            </h1>
            <span className="text-sm text-muted-foreground">
              {loading ? "Searching..." : `${filteredProducts.length} Result${filteredProducts.length !== 1 ? "s" : ""}`}
            </span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-5 pb-3 border-b border-border">
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden flex items-center gap-2 text-sm font-black uppercase tracking-wide text-foreground">
                <SlidersHorizontal className="w-4 h-4" />
                Filter
                {hasActiveFilters && (
                  <span className="w-5 h-5 bg-header-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">
                    {selectedBrands.length + selectedProductTypes.length + (priceRange ? 1 : 0) + (showInStockOnly ? 1 : 0) + (selectedCategory ? 1 : 0)}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <CategorySidebar
                  {...sidebarProps}
                  onSelectCategory={(cat) => { setSelectedCategory(cat); setMobileFiltersOpen(false); }}
                />
              </div>
            </SheetContent>
          </Sheet>

          <span className="hidden lg:flex items-center gap-2 text-sm font-black uppercase tracking-wide text-foreground">
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </span>

          {hasActiveFilters && <div className="hidden sm:block w-px h-5 bg-border" />}

          {/* Active Filter Pills */}
          {selectedCategory && (
            <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-1.5 px-3 py-1 border border-border rounded text-xs font-medium text-foreground hover:bg-muted">
              {selectedCategory.name} <X className="w-3 h-3" />
            </button>
          )}
          {selectedBrands.map((brand) => (
            <button key={brand} onClick={() => toggleBrand(brand)} className="flex items-center gap-1.5 px-3 py-1 border border-border rounded text-xs font-medium text-foreground hover:bg-muted">
              Brand: <span className="font-bold">{brand}</span> <X className="w-3 h-3" />
            </button>
          ))}
          {selectedProductTypes.map((type) => (
            <button key={type} onClick={() => toggleProductType(type)} className="flex items-center gap-1.5 px-3 py-1 border border-border rounded text-xs font-medium text-foreground hover:bg-muted">
              {type} <X className="w-3 h-3" />
            </button>
          ))}
          {priceRange && (
            <button onClick={() => setPriceRange(null)} className="flex items-center gap-1.5 px-3 py-1 border border-border rounded text-xs font-medium text-foreground hover:bg-muted">
              ${priceRange[0]} – ${priceRange[1]} <X className="w-3 h-3" />
            </button>
          )}
          {showInStockOnly && (
            <button onClick={() => setShowInStockOnly(false)} className="flex items-center gap-1.5 px-3 py-1 border border-border rounded text-xs font-medium text-foreground hover:bg-muted">
              In Stock <X className="w-3 h-3" />
            </button>
          )}
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-xs font-semibold text-header-primary hover:underline">Clear all</button>
          )}

          {/* Sort */}
          <div className="flex items-center gap-2 sm:ml-auto">
            <span className="text-xs text-muted-foreground hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-1.5 border border-border rounded text-sm bg-background font-medium focus:outline-none focus:ring-2 focus:ring-header-primary/40"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto pr-1">
              <CategorySidebar {...sidebarProps} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
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
