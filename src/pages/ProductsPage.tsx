import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Filter, SlidersHorizontal, X, Search } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategorySidebar } from "@/components/products/CategorySidebar";
import { searchMockProducts, getMockPriceRange } from "@/lib/mockProducts";
import { categoryTree, type CategoryNode, getLevel3Types, getTrimmedTree } from "@/lib/categoryTaxonomy";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type SortOption = "relevance" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [selectedCategory, setSelectedCategory] = useState<CategoryNode | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [showInStockOnly, setShowInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState(query);

  const { min: minPrice, max: maxPrice } = getMockPriceRange();
  const trimmedTree = useMemo(() => getTrimmedTree(categoryTree), []);
  const allLevel3Types = useMemo(() => getLevel3Types(categoryTree), []);

  // Base products from search query
  const baseProducts = useMemo(() => searchMockProducts(query), [query]);

  // Filtered products with all filters applied
  const filteredProducts = useMemo(() => {
    let products = [...baseProducts];

    // Filter by brand
    if (selectedBrands.length > 0) {
      products = products.filter((p) => selectedBrands.includes(p.node.vendor || ""));
    }

    // Filter by product type
    if (selectedProductTypes.length > 0) {
      products = products.filter((p) => selectedProductTypes.includes(p.node.productType || ""));
    }

    // Filter by price
    if (priceRange) {
      products = products.filter((p) => {
        const price = parseFloat(p.node.priceRange.minVariantPrice.amount);
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }

    // Filter by availability
    if (showInStockOnly) {
      products = products.filter((p) =>
        p.node.variants.edges.some((v) => v.node.availableForSale)
      );
    }

    // Sort
    const sorted = [...products];
    switch (sortBy) {
      case "price-asc":
        sorted.sort(
          (a, b) =>
            parseFloat(a.node.priceRange.minVariantPrice.amount) -
            parseFloat(b.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-desc":
        sorted.sort(
          (a, b) =>
            parseFloat(b.node.priceRange.minVariantPrice.amount) -
            parseFloat(a.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "name-asc":
        sorted.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.node.title.localeCompare(a.node.title));
        break;
    }

    return sorted;
  }, [baseProducts, selectedBrands, selectedProductTypes, priceRange, showInStockOnly, sortBy]);

  // Cross-filter: available brands based on products filtered by everything EXCEPT brand
  const availableBrands = useMemo(() => {
    let products = [...baseProducts];

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

    const brands = new Set(products.map((p) => p.node.vendor).filter(Boolean) as string[]);
    return Array.from(brands).sort();
  }, [baseProducts, selectedProductTypes, priceRange, showInStockOnly]);

  // Cross-filter: available product types based on products filtered by everything EXCEPT product type
  const availableProductTypes = useMemo(() => {
    let products = [...baseProducts];

    if (selectedBrands.length > 0) {
      products = products.filter((p) => selectedBrands.includes(p.node.vendor || ""));
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

    const types = new Set(products.map((p) => p.node.productType).filter(Boolean) as string[]);
    return Array.from(types).sort();
  }, [baseProducts, selectedBrands, priceRange, showInStockOnly]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleProductType = (type: string) => {
    setSelectedProductTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const pageTitle = query
    ? `Results for "${query}"`
    : selectedCategory
    ? selectedCategory.name
    : "All Products";

  const sidebarProps = {
    categories: categoryTree,
    selectedCategoryId: selectedCategory?.id ?? null,
    onSelectCategory: setSelectedCategory,
    brands: availableBrands,
    selectedBrands,
    onToggleBrand: toggleBrand,
    productTypes: availableProductTypes,
    selectedProductTypes,
    onToggleProductType: toggleProductType,
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
      <Header />

      <main className="max-w-[1600px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <li>
              <Link to="/" className="hover:text-header-primary">
                Home
              </Link>
            </li>
            <li>/</li>
            {selectedCategory ? (
              <>
                <li>
                  <Link
                    to="/products"
                    className="hover:text-header-primary"
                    onClick={() => setSelectedCategory(null)}
                  >
                    Products
                  </Link>
                </li>
                <li>/</li>
                <li className="text-foreground font-medium">{selectedCategory.name}</li>
              </>
            ) : (
              <li className="text-foreground font-medium">
                {query ? "Search Results" : "Products"}
              </li>
            )}
          </ol>
        </nav>

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-wide">
              {pageTitle}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Search bar in header */}
          <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto sm:max-w-xs">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-md bg-card focus:outline-none focus:ring-2 focus:ring-header-primary/40"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-header-primary text-white text-sm font-bold rounded-md hover:bg-header-primary/90 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Active Filters Pills */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground font-semibold uppercase">Filters:</span>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-1 px-2.5 py-1 bg-header-primary/10 text-header-primary rounded-full text-xs font-medium"
              >
                {selectedCategory.name}
                <X className="w-3 h-3" />
              </button>
            )}
            {selectedBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className="flex items-center gap-1 px-2.5 py-1 bg-header-primary/10 text-header-primary rounded-full text-xs font-medium"
              >
                {brand}
                <X className="w-3 h-3" />
              </button>
            ))}
            {selectedProductTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleProductType(type)}
                className="flex items-center gap-1 px-2.5 py-1 bg-header-primary/10 text-header-primary rounded-full text-xs font-medium"
              >
                {type}
                <X className="w-3 h-3" />
              </button>
            ))}
            {priceRange && (
              <button
                onClick={() => setPriceRange(null)}
                className="flex items-center gap-1 px-2.5 py-1 bg-header-primary/10 text-header-primary rounded-full text-xs font-medium"
              >
                ${priceRange[0]} – ${priceRange[1]}
                <X className="w-3 h-3" />
              </button>
            )}
            {showInStockOnly && (
              <button
                onClick={() => setShowInStockOnly(false)}
                className="flex items-center gap-1 px-2.5 py-1 bg-header-primary/10 text-header-primary rounded-full text-xs font-medium"
              >
                In Stock
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-foreground underline ml-1"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="sticky top-4">
              <CategorySidebar {...sidebarProps} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Sort & Mobile Filter Bar */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
              {/* Mobile Filter Button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <button className="lg:hidden flex items-center gap-2 px-3 py-2 border border-border rounded-md text-sm font-medium hover:bg-muted">
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {hasActiveFilters && (
                      <span className="w-5 h-5 bg-header-primary text-white rounded-full text-xs flex items-center justify-center">
                        {selectedBrands.length +
                          selectedProductTypes.length +
                          (priceRange ? 1 : 0) +
                          (showInStockOnly ? 1 : 0) +
                          (selectedCategory ? 1 : 0)}
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
                      onSelectCategory={(cat) => {
                        setSelectedCategory(cat);
                        setMobileFiltersOpen(false);
                      }}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-muted-foreground hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-1.5 border border-border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-header-primary/40"
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
              loading={false}
              emptyMessage={
                query
                  ? `No products found for "${query}". Try different keywords or clear filters.`
                  : "No products found. Try adjusting your filters."
              }
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
