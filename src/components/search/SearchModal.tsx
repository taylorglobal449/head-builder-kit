import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight, Clock, TrendingUp, Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { fetchProducts } from "@/lib/shopify/api";
import type { ShopifyProduct } from "@/lib/shopify/types";
import { isMappPriced } from "@/lib/shopify/mapp";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const POPULAR_SEARCHES = [
  "hammer drill",
  "circular saw",
  "impact driver",
  "angle grinder",
  "router"
];

const RECENT_SEARCHES_KEY = "recent-searches";

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
    if (!open) {
      setQuery("");
      setResults([]);
      setSelectedIndex(-1);
      setIsSearching(false);
    }
  }, [open]);

  // Debounced search against Shopify Storefront API
  const searchProducts = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([]);
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    try {
      const response = await fetchProducts(8, searchQuery);
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
      debounceRef.current = setTimeout(() => {
        searchProducts(query);
      }, 300);
    } else {
      setResults([]);
      setIsSearching(false);
    }
    setSelectedIndex(-1);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, searchProducts]);

  const saveRecentSearch = (searchTerm: string) => {
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
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
    if (query.trim()) {
      saveRecentSearch(query);
    }
    onOpenChange(false);
    navigate(`/product/${handle}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < results.length - 1 ? prev + 1 : prev
      );
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
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center border-b px-4">
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search products, brands, categories..."
            className="flex-1 h-14 px-4 bg-transparent outline-none text-base"
          />
          {isSearching && (
            <Loader2 className="w-4 h-4 text-muted-foreground animate-spin mr-2" />
          )}
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 hover:bg-muted rounded"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {/* Instant Search Results */}
          {results.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Products
              </div>
              {results.map((product, index) => (
                <button
                  key={product.node.id}
                  onClick={() => handleProductClick(product.node.handle)}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-colors ${
                    index === selectedIndex ? "bg-accent" : "hover:bg-muted"
                  }`}
                >
                  {/* Product Image */}
                  <div className="w-12 h-12 bg-muted rounded overflow-hidden shrink-0">
                    {product.node.images.edges[0]?.node?.url ? (
                      <img
                        src={product.node.images.edges[0].node.url}
                        alt={product.node.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <Search className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {product.node.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.node.vendor}{isMappPriced(product) ? ' • See Price in Cart' : ` • $${parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}`}
                    </p>
                  </div>
                  
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </button>
              ))}
              
              {/* View All Results */}
              <button
                onClick={() => handleSearch(query)}
                className="w-full flex items-center justify-center gap-2 p-3 mt-2 rounded-lg bg-header-primary text-primary-foreground font-medium hover:bg-header-primary-hover transition-colors"
              >
                View all results for "{query}"
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* No Results */}
          {query.trim().length >= 2 && results.length === 0 && !isSearching && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No products found for "{query}"</p>
              <p className="text-sm text-muted-foreground mt-1">Try different keywords or check spelling</p>
            </div>
          )}

          {/* Default State - Recent & Popular */}
          {query.length < 2 && (
            <div className="p-4 space-y-6">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      <Clock className="w-4 h-4" />
                      Recent Searches
                    </div>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setQuery(term);
                          handleSearch(term);
                        }}
                        className="px-3 py-1.5 bg-muted hover:bg-accent rounded-full text-sm transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  <TrendingUp className="w-4 h-4" />
                  Popular Searches
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setQuery(term);
                        handleSearch(term);
                      }}
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
      </DialogContent>
    </Dialog>
  );
}
