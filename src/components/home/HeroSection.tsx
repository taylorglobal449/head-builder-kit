import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, FlameKindling } from "lucide-react";
import { useState } from "react";
import type { ShopifyProduct } from "@/lib/shopify/types";

interface HeroSectionProps {
  products: ShopifyProduct[];
}

export function HeroSection({ products }: HeroSectionProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const displayProducts = products.slice(0, 10);
  
  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('hero-products-scroll');
    if (container) {
      const scrollAmount = 200;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : scrollPosition + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <div className="grid grid-cols-[1fr_100px] md:grid-cols-4 gap-3 md:gap-4">
      {/* Main Hero Banner - spans 2 columns on desktop */}
      <div className="md:col-span-2 relative overflow-hidden rounded-lg bg-gradient-to-br from-header-primary via-header-primary to-header-secondary min-h-[200px]">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 p-6 lg:p-8 flex flex-col justify-center h-full">
          {/* Flash Sale Badge */}
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1 rounded-full w-fit mb-3">
            <FlameKindling className="w-4 h-4" />
            <span className="font-bold text-xs tracking-wide">FLASH SALE</span>
          </div>
          
          {/* Main Title */}
          <h2 className="text-primary-foreground text-2xl lg:text-4xl font-black mb-2 max-w-sm leading-tight">
            ORGANIZE FOR LESS
          </h2>
          
          {/* Promo Code */}
          <p className="text-primary-foreground/90 text-sm mb-1">
            Get <span className="font-bold text-accent">10% OFF</span> select tool storage
          </p>
          <p className="text-primary-foreground/70 text-xs mb-4">
            with code: <span className="font-bold text-primary-foreground bg-primary-foreground/20 px-2 py-0.5 rounded">STORAGE10</span>
          </p>
          
          {/* CTA Button */}
          <Link 
            to="/deals"
            className="inline-flex items-center gap-2 bg-background text-header-primary font-bold px-5 py-2.5 rounded-lg hover:bg-muted transition-colors w-fit text-sm group"
          >
            SHOP NOW
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* DeWalt Vertical Banner - 1 column, aligns with Free Shipping below */}
      <Link 
        to="/brands/dewalt"
        className="relative overflow-hidden rounded-lg bg-gradient-to-b from-amber-400 to-amber-500 min-h-[200px] flex flex-col items-center justify-center p-3 lg:p-4 hover:opacity-95 transition-opacity"
      >
        <span className="text-zinc-900 font-black text-sm lg:text-base uppercase tracking-wide text-center mb-1">DEWALT</span>
        <span className="text-zinc-900 font-bold text-sm lg:text-lg text-center leading-tight">UP TO</span>
        <span className="text-zinc-900 font-black text-xl lg:text-3xl text-center leading-none">40% OFF</span>
        <span className="text-zinc-900/80 text-[10px] lg:text-xs text-center mt-2">Select Tools</span>
        <div className="mt-3 bg-zinc-900/20 rounded px-2 py-1">
          <span className="text-zinc-900 text-[10px] lg:text-xs font-bold">SHOP →</span>
        </div>
      </Link>

      {/* Top Deals - 1 column, aligns with Bulk Discounts below */}
      <div className="hidden md:flex flex-col bg-card rounded-lg border border-border p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-foreground text-xs uppercase tracking-wide">
            Top Deals
          </h3>
          <div className="flex gap-1">
            <button 
              onClick={() => scroll('left')}
              className="w-6 h-6 rounded bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-3 h-3 text-muted-foreground" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-6 h-6 rounded bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <div 
          id="hero-products-scroll"
          className="flex-1 flex flex-col gap-2 overflow-y-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayProducts.slice(0, 3).map((product) => {
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
                className="flex gap-2 group"
              >
                <div className="relative w-12 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                  {product.node.images.edges[0]?.node ? (
                    <img 
                      src={product.node.images.edges[0].node.url} 
                      alt={product.node.images.edges[0].node.altText || product.node.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium text-foreground line-clamp-2 leading-tight group-hover:text-header-primary transition-colors">
                    {product.node.title}
                  </p>
                  <p className="text-xs font-bold text-header-primary">
                    ${parseFloat(price.amount).toFixed(2)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        
        <Link 
          to="/deals"
          className="block text-center text-[10px] font-bold text-header-primary hover:underline mt-2 pt-2 border-t border-border"
        >
          VIEW ALL →
        </Link>
      </div>
    </div>
  );
}
