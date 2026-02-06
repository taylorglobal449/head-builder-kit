import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { ShopifyProduct } from "@/lib/shopify/types";
import { useCartStore } from "@/stores/cartStore";

interface BoughtWithProps {
  products: ShopifyProduct[];
  currentHandle?: string;
}

export function BoughtWith({ products, currentHandle }: BoughtWithProps) {
  const addItem = useCartStore(state => state.addItem);
  
  // Filter out current product and get random 4-6 products
  const filteredProducts = products
    .filter(p => p.node.handle !== currentHandle)
    .slice(0, 6);
  
  if (filteredProducts.length === 0) return null;

  const handleAddToCart = async (e: React.MouseEvent, product: ShopifyProduct) => {
    e.preventDefault();
    e.stopPropagation();
    
    const firstVariant = product.node.variants.edges[0]?.node;
    if (!firstVariant) {
      toast.error("Product unavailable");
      return;
    }
    
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    });
    
    toast.success(`${product.node.title} added to cart`);
  };

  return (
    <section className="py-8 border-t border-border">
      <h2 className="text-lg font-bold text-foreground mb-4 uppercase tracking-wide">
        Frequently Bought Together
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredProducts.map((product) => {
          const price = product.node.priceRange.minVariantPrice;
          const firstVariant = product.node.variants.edges[0]?.node;
          
          return (
            <Link
              key={product.node.id}
              to={`/product/${product.node.handle}`}
              className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-square bg-muted overflow-hidden">
                {product.node.images.edges[0]?.node ? (
                  <img
                    src={product.node.images.edges[0].node.url}
                    alt={product.node.images.edges[0].node.altText || product.node.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                
                {/* Quick Add Button */}
                <button
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={!firstVariant?.availableForSale}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-header-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-header-primary-hover disabled:opacity-50"
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-foreground line-clamp-2 group-hover:text-header-primary transition-colors">
                  {product.node.title}
                </p>
                <p className="text-sm font-bold text-header-primary mt-1">
                  ${parseFloat(price.amount).toFixed(2)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
