import { Link } from "react-router-dom";
import { ShoppingCart, Check, Truck } from "lucide-react";
import { toast } from "sonner";
import type { ShopifyProduct } from "@/lib/shopify/types";
import { isMappPriced } from "@/lib/shopify/mapp";
import { useCartStore } from "@/stores/cartStore";

interface ProductCardProps {
  product: ShopifyProduct;
}

function getDealBadge(tags: string[] | undefined): { label: string; color: string } | null {
  if (!tags) return null;
  const lower = tags.map(t => t.toLowerCase());
  if (lower.some(t => t.includes('hot deal') || t.includes('hot-deal'))) {
    return { label: 'HOT DEAL', color: 'bg-destructive text-destructive-foreground' };
  }
  if (lower.some(t => t.includes('price drop') || t.includes('price-drop'))) {
    return { label: 'PRICE DROP', color: 'bg-header-primary text-primary-foreground' };
  }
  if (lower.some(t => t.includes('new') || t.includes('new-arrival'))) {
    return { label: 'NEW', color: 'bg-green-600 text-white' };
  }
  if (lower.some(t => t.includes('closeout'))) {
    return { label: 'CLOSEOUT', color: 'bg-orange-600 text-white' };
  }
  return null;
}

function hasFreeShipping(tags: string[] | undefined): boolean {
  if (!tags) return false;
  return tags.some(t => t.toLowerCase().includes('free shipping') || t.toLowerCase().includes('free-shipping'));
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
  const isInStock = node.variants.edges.some(v => v.node.availableForSale);
  const sku = firstVariant?.sku;
  const dealBadge = getDealBadge(node.tags);
  const freeShipping = hasFreeShipping(node.tags);
  const mapp = isMappPriced(product);

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
      className="group bg-card rounded border border-border overflow-hidden hover:shadow-lg transition-shadow flex flex-col relative"
    >
      {/* Deal Badge */}
      {dealBadge && (
        <div className={`absolute top-2 left-2 z-10 ${dealBadge.color} px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider`}>
          {dealBadge.label}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-square bg-white overflow-hidden p-4">
        {imageUrl ? (
          <img 
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-3 flex flex-col flex-1 border-t border-border">
        {/* Title */}
        <h3 className="font-bold text-sm text-card-foreground group-hover:text-header-primary transition-colors line-clamp-2 h-10 leading-5 overflow-hidden">
          {node.title}
        </h3>
        
        {/* SKU - fixed height to keep alignment */}
        <p className="text-[11px] text-muted-foreground mt-1 h-4">
          {sku ? `SKU# ${sku}` : ''}
        </p>

        {/* Stock Status */}
        <div className="mt-1.5 flex items-center gap-1">
          {isInStock ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
              <span className="text-xs font-medium text-green-600">In Stock</span>
            </>
          ) : (
            <span className="text-xs font-medium text-destructive">Out of Stock</span>
          )}
        </div>

        {/* Free Shipping - fixed height to keep alignment */}
        <div className="mt-1 flex items-center gap-1 h-4">
          {freeShipping && (
            <>
              <Truck className="w-3.5 h-3.5 text-header-primary shrink-0" />
              <span className="text-[11px] font-medium text-header-primary">Free Shipping</span>
            </>
          )}
        </div>

        {/* Price - pushed to bottom */}
        <div className="mt-auto pt-3">
          {mapp ? (
            <span className="text-sm font-bold text-header-primary">
              See Price in Cart
            </span>
          ) : (
            <div className="flex flex-col">
              <span className="text-xl font-black text-foreground">
                ${parseFloat(price.amount).toFixed(2).replace(/\.(\d{2})$/, '.$1')}
              </span>
              {/* Fixed height row so button always stays at same position */}
              <div className="flex items-center gap-2 mt-0.5 h-4">
                {hasDiscount && (
                  <>
                    <span className="text-xs text-muted-foreground">
                      Was: <span className="line-through">${parseFloat(compareAtPrice!.amount).toFixed(2)}</span>
                    </span>
                    <span className="text-xs font-bold text-destructive">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading || !isInStock}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-3 bg-header-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded hover:bg-header-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Add to cart"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </Link>
  );
}
