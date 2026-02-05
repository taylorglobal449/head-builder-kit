import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { ShopifyProduct } from "@/lib/shopify/types";
import { useCartStore } from "@/stores/cartStore";

interface ProductCardProps {
  product: ShopifyProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  
  const { node } = product;
  const price = node.priceRange.minVariantPrice;
  const compareAtPrice = node.compareAtPriceRange?.minVariantPrice;
  const hasDiscount = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
  const discountPercent = hasDiscount 
    ? Math.round((1 - parseFloat(price.amount) / parseFloat(compareAtPrice!.amount)) * 100)
    : 0;
  
  const firstVariant = node.variants.edges[0]?.node;
  const imageUrl = node.images.edges[0]?.node?.url;
  const imageAlt = node.images.edges[0]?.node?.altText || node.title;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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
    
    toast.success(`${node.title} added to cart`);
  };

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-header-primary text-primary-foreground px-2 py-1 rounded text-xs font-bold">
            {discountPercent}% OFF
          </div>
        )}
        
        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading || !firstVariant?.availableForSale}
          className="absolute bottom-2 right-2 w-10 h-10 bg-header-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-header-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Add to cart"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Vendor */}
        {node.vendor && (
          <span className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {node.vendor}
          </span>
        )}
        
        {/* Title */}
        <h3 className="font-medium text-card-foreground group-hover:text-header-primary transition-colors line-clamp-2 flex-1">
          {node.title}
        </h3>
        
        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-header-primary">
            ${parseFloat(price.amount).toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ${parseFloat(compareAtPrice!.amount).toFixed(2)}
            </span>
          )}
        </div>
        
        {/* Availability */}
        {firstVariant && !firstVariant.availableForSale && (
          <span className="mt-2 text-xs text-destructive font-medium">
            Out of Stock
          </span>
        )}
      </div>
    </Link>
  );
}
