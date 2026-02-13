import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight, Clock, TrendingUp, Loader2, Tag, X } from "lucide-react";
import { fetchProducts } from "@/lib/shopify/api";
import type { ShopifyProduct } from "@/lib/shopify/types";
import { isMappPriced } from "@/lib/shopify/mapp";

const POPULAR_SEARCHES = [
  "hammer drill",
  "circular saw",
  "impact driver",
  "angle grinder",
  "router",
  "tool belt",
  "battery",
  "saw blade"
];

const RECENT_SEARCHES_KEY = "recent-searches";

interface SearchDropdownProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  query: string;
  onQueryChange: (query: string) => void;
}

export function SearchDropdown({ open, onOpenChange, inputRef, query, onQueryChange }: SearchDropdownProps) {
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load recent searches
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setResults([]);
      setSelectedIndex(-1);
      setIsSearching(false);
    }
  }, [open]);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current && !inputRef.current.contains(e.target as Node)
      ) {
        onOpenChange(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [open, onOpenChange, inputRef]);

  const searchProducts = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    try {
      const response = await fetchProducts(12, searchQuery);
      if (response?.data?.products?.edges) {
        setResults(response.data.products.edges);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length >= 2) {
      setIsSearching(true);
      debounceRef.current = setTimeout(() => searchProducts(query), 300);
    } else {
      setResults([]);
      setIsSearching(false);
    }
    setSelectedIndex(-1);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, searchProducts]);

  const saveRecentSearch = (searchTerm: string) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 8);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      saveRecentSearch(searchTerm);
      onOpenChange(false);
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleProductClick = (handle: string) => {
    if (query.trim()) saveRecentSearch(query);
    onOpenChange(false);
    navigate(`/product/${handle}`);
  };

  // Extract unique vendors and product types from results
  const { vendors, productTypes } = useMemo(() => {
    const vendorSet = new Set<string>();
    const typeSet = new Set<string>();
    results.forEach(p => {
      if (p.node.vendor) vendorSet.add(p.node.vendor);
      if (p.node.productType) typeSet.add(p.node.productType);
    });
    return {
      vendors: Array.from(vendorSet).slice(0, 6),
      productTypes: Array.from(typeSet).slice(0, 6)
    };
  }, [results]);

  // Generate search suggestions based on query
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const suggs: string[] = [];
    // Add vendor-based suggestions
    vendors.forEach(v => {
      suggs.push(`${v} ${q}`);
    });
    // Add type-based suggestions
    productTypes.forEach(t => {
      if (!suggs.some(s => s.toLowerCase() === `${q} ${t}`.toLowerCase())) {
        suggs.push(`${q} ${t}`);
      }
    });
    // Add generic suggestions
    const genericSuffixes = ["sale", "kit", "set", "accessories"];
    genericSuffixes.forEach(s => {
      if (!q.includes(s)) suggs.push(`${q} ${s}`);
    });
    return suggs.slice(0, 8);
  }, [query, vendors, productTypes]);

  // Attach keydown to the external input
  useEffect(() => {
    const input = inputRef.current;
    if (!input || !open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : prev);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleProductClick(results[selectedIndex].node.handle);
        } else {
          handleSearch(query);
        }
      } else if (e.key === "Escape") {
        onOpenChange(false);
        input.blur();
      }
    };

    input.addEventListener("keydown", handleKeyDown);
    return () => input.removeEventListener("keydown", handleKeyDown);
  }, [open, results, selectedIndex, query, inputRef, onOpenChange]);

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  if (!open) return null;

  const hasResults = results.length > 0;
  const hasQuery = query.trim().length >= 2;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-2xl z-50 overflow-hidden"
    >
      {/* Loading */}
      {isSearching && !hasResults && (
        <div className="p-8 flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">Searching...</span>
        </div>
      )}

      {/* Results Layout — 2-panel */}
      {hasResults && (
        <div className="flex flex-col lg:flex-row max-h-[75vh]">
          {/* LEFT — Related Products Grid */}
          <div className="flex-1 overflow-y-auto border-b lg:border-b-0 lg:border-r border-border">
            <div className="px-4 pt-3 pb-2 flex items-center justify-between sticky top-0 bg-popover z-10 border-b border-border">
              <h3 className="text-sm font-bold text-header-primary uppercase tracking-wide">
                Related Products
              </h3>
              <span className="text-xs text-muted-foreground">
                {results.length} result{results.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border">
              {results.map((product, index) => {
                const hasDiscount = product.node.compareAtPriceRange?.minVariantPrice &&
                  parseFloat(product.node.compareAtPriceRange.minVariantPrice.amount) >
                  parseFloat(product.node.priceRange.minVariantPrice.amount);
                const mapp = isMappPriced(product);

                return (
                  <button
                    key={product.node.id}
                    onClick={() => handleProductClick(product.node.handle)}
                    className={`bg-popover p-3 text-left transition-colors group flex flex-col ${
                      index === selectedIndex ? "bg-accent" : "hover:bg-muted/50"
                    }`}
                  >
                    {/* Image */}
                    <div className="relative aspect-square bg-white rounded overflow-hidden mb-2">
                      {hasDiscount && (
                        <span className="absolute top-1 left-1 z-10 bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
                          Sale
                        </span>
                      )}
                      {product.node.images.edges[0]?.node?.url ? (
                        <img
                          src={product.node.images.edges[0].node.url}
                          alt={product.node.title}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-200"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Search className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="min-w-0">
                      {product.node.vendor && (
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide truncate">
                          {product.node.vendor}
                          {product.node.productType && (
                            <span className="font-normal ml-1 text-muted-foreground/70">
                              {product.node.productType}
                            </span>
                          )}
                        </p>
                      )}
                      <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight mt-0.5 group-hover:text-header-primary transition-colors">
                        {product.node.title}
                      </p>
                      <p className="text-xs font-bold text-foreground mt-1">
                        {mapp
                          ? <span className="text-header-primary">See Price in Cart</span>
                          : `$${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            {/* View All Results */}
            <div className="p-3 border-t border-border bg-muted/30">
              <button
                onClick={() => handleSearch(query)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-header-primary text-primary-foreground font-bold text-sm hover:bg-header-primary-hover transition-colors"
              >
                View all results for "{query}"
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT — Suggestions & Collections */}
          <div className="w-full lg:w-72 xl:w-80 overflow-y-auto bg-muted/20">
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-4 border-b border-border">
                <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                  Suggestions
                </h3>
                <div className="space-y-0.5">
                  {suggestions.map((term) => (
                    <button
                      key={term}
                      onClick={() => { onQueryChange(term); handleSearch(term); }}
                      className="w-full flex items-center gap-2.5 px-2 py-1.5 text-sm text-muted-foreground hover:text-header-primary hover:bg-accent rounded transition-colors text-left"
                    >
                      <Search className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Product Types */}
            {productTypes.length > 0 && (
              <div className="p-4 border-b border-border">
                <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                  Categories
                </h3>
                <div className="space-y-0.5">
                  {productTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => { onQueryChange(type); handleSearch(type); }}
                      className="w-full flex items-center gap-2.5 px-2 py-1.5 text-sm text-muted-foreground hover:text-header-primary hover:bg-accent rounded transition-colors text-left"
                    >
                      <Tag className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{type}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Brands / Collections */}
            {vendors.length > 0 && (
              <div className="p-4">
                <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                  Brands
                </h3>
                <div className="space-y-0.5">
                  {vendors.map((vendor) => (
                    <button
                      key={vendor}
                      onClick={() => {
                        onOpenChange(false);
                        navigate(`/search?q=${encodeURIComponent(vendor)}`);
                      }}
                      className="w-full flex items-center gap-2.5 px-2 py-1.5 text-sm text-muted-foreground hover:text-header-primary hover:bg-accent rounded transition-colors text-left"
                    >
                      <span className="truncate">{vendor}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* No Results */}
      {hasQuery && !hasResults && !isSearching && (
        <div className="p-8 text-center">
          <p className="text-muted-foreground font-medium">No products found for "{query}"</p>
          <p className="text-sm text-muted-foreground mt-1">Try different keywords or check spelling</p>
        </div>
      )}

      {/* Default State — Recent + Popular */}
      {!hasQuery && !isSearching && (
        <div className="p-4 space-y-5">
          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wide">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  Recent Searches
                </div>
                <button onClick={clearRecentSearches} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => { onQueryChange(term); handleSearch(term); }}
                    className="px-3 py-1.5 bg-muted hover:bg-accent rounded-full text-sm transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 mb-3 text-sm font-bold text-foreground uppercase tracking-wide">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              Popular Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => { onQueryChange(term); handleSearch(term); }}
                  className="px-3 py-1.5 bg-muted hover:bg-accent rounded-full text-sm transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
