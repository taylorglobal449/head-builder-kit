import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import type { ShopifyProduct } from "@/lib/shopify/types";

interface CloseoutCategorySliderProps {
  title: string;
  products: ShopifyProduct[];
  id: string;
}

export function CloseoutCategorySlider({ title, products, id }: CloseoutCategorySliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 220;
    const scrollAmount = cardWidth * 3;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (products.length === 0) return null;

  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-foreground uppercase tracking-wide">
          {title}
          <span className="ml-2 text-xs font-semibold text-muted-foreground normal-case tracking-normal">
            ({products.length} items)
          </span>
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-default transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-default transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Fade edges */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin"
          style={{ scrollbarWidth: "thin" }}
        >
          {products.map((product) => (
            <div
              key={product.node.id}
              className="min-w-[200px] max-w-[220px] flex-shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
