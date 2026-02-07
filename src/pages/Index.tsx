import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { PromoBanners } from "@/components/home/PromoBanners";
import { TodaysDeals } from "@/components/home/TodaysDeals";
import { ProductCard } from "@/components/products/ProductCard";
import { CategoryMegaGrid } from "@/components/home/CategoryMegaGrid";
import { BrandsSection } from "@/components/home/BrandsSection";
import { InteractiveMap } from "@/components/home/InteractiveMap";
import { useMockProducts } from "@/hooks/useMockProducts";

const Index = () => {
  const { products, loading } = useMockProducts(8);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-[1600px] mx-auto px-4 py-4">
        {/* Hero + Quick Deals */}
        <section className="mb-6">
          <HeroSection products={products} />
        </section>

        {/* Promo Banners */}
        <section className="mb-6">
          <PromoBanners />
        </section>

        {/* Today's Deals */}
        <TodaysDeals />

        {/* Featured Products - Horizontal Scroll */}
        <section className="py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-black text-foreground uppercase tracking-wide">
              Featured Products
            </h2>
            <a 
              href="/products" 
              className="text-sm font-bold text-header-primary hover:underline flex items-center gap-1"
            >
              See All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
            {products.slice(0, 8).map((product) => (
              <div key={product.node.id} className="min-w-[200px] max-w-[220px] flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Category Mega Grid */}
        <CategoryMegaGrid />

        {/* Shop By Brand */}
        <BrandsSection />

        {/* Interactive Map */}
        <InteractiveMap />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
