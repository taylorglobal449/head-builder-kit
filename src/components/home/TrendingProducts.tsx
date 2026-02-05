import { Link } from "react-router-dom";
import type { ShopifyProduct } from "@/lib/shopify/types";
import { Plus } from "lucide-react";

interface TrendingProductsProps {
  products: ShopifyProduct[];
}

export function TrendingProducts({ products }: TrendingProductsProps) {
  const displayProducts = products.slice(0, 8);

  return (
    <div className="bg-white rounded-lg border border-header-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 text-header-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <h3 className="font-bold text-header-text uppercase text-sm tracking-wide">
            Trending Products
          </h3>
        </div>
        <Link 
          to="/products"
          className="text-xs font-bold text-header-primary hover:underline flex items-center gap-1"
        >
          SHOP ALL DEALS
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      {displayProducts.length === 0 ? (
        <p className="text-sm text-header-muted py-4 text-center">
          No products available yet.
        </p>
      ) : (
        <div className="space-y-3">
          {displayProducts.map((product) => {
            const price = product.node.priceRange.minVariantPrice;
            const compareAtPrice = product.node.compareAtPriceRange?.minVariantPrice;
            const hasDiscount = compareAtPrice && parseFloat(compareAtPrice.amount) > parseFloat(price.amount);
            const discountPercent = hasDiscount 
              ? Math.round((1 - parseFloat(price.amount) / parseFloat(compareAtPrice!.amount)) * 100)
              : 0;
            
            return (
              <Link
                key={product.node.id}
                to={`/product/${product.node.handle}`}
                className="flex items-center gap-3 py-2 px-2 rounded-md hover:bg-gray-50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-100 shrink-0">
                  {product.node.images.edges[0]?.node ? (
                    <img 
                      src={product.node.images.edges[0].node.url} 
                      alt={product.node.images.edges[0].node.altText || product.node.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-header-text group-hover:text-header-primary transition-colors line-clamp-2 leading-tight">
                    {product.node.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-header-primary">
                      ${parseFloat(price.amount).toFixed(2)}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs text-green-600 font-medium flex items-center gap-0.5">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        {discountPercent}% Off
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  className="w-7 h-7 rounded-full bg-header-primary text-white flex items-center justify-center shrink-0 hover:bg-header-primary-hover transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    // Quick add would go here
                  }}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
