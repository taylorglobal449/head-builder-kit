import type { ShopifyProduct } from "@/lib/shopify/types";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

interface ProductGridProps {
  products: ShopifyProduct[];
  loading?: boolean;
  emptyMessage?: string;
}

export function ProductGrid({ products, loading, emptyMessage = "No products found" }: ProductGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-header-primary" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg className="w-16 h-16 text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
        <p className="text-muted-foreground text-sm mt-1">
          Products will appear here once they're added to your Shopify store.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
      {products.map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
}
