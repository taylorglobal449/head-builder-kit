import { useMemo } from "react";
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
import { SEO } from "@/components/SEO";

const Index = () => {
  const { products, loading } = useMockProducts(8);

  const jsonLd = useMemo(() => [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Fasteners Inc Tool Outlet",
      "url": "https://head-builder-kit.lovable.app",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://head-builder-kit.lovable.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "HardwareStore",
      "name": "Fasteners Inc Tool Outlet",
      "url": "https://head-builder-kit.lovable.app",
      "logo": "https://www.fastenersinc.net/cdn/shop/files/1_d3bda63f-6526-4c24-ae79-92c71c0e4433_200x@2x.png?v=1662998949",
      "description": "Your trusted source for power tools, hand tools, fasteners & accessories from top brands.",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sacramento",
        "addressRegion": "CA",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://www.facebook.com/sacfasteners/",
        "https://www.instagram.com/sacfasteners/"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Product Categories",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Power Tools", "url": "https://head-builder-kit.lovable.app/products?category=Power+Tools" },
        { "@type": "ListItem", "position": 2, "name": "Hand Tools", "url": "https://head-builder-kit.lovable.app/products?category=Hand+Tools" },
        { "@type": "ListItem", "position": 3, "name": "Fasteners", "url": "https://head-builder-kit.lovable.app/products?category=Fasteners" },
        { "@type": "ListItem", "position": 4, "name": "Tool Accessories", "url": "https://head-builder-kit.lovable.app/products?category=Tool+Accessories" },
        { "@type": "ListItem", "position": 5, "name": "Safety & Workwear", "url": "https://head-builder-kit.lovable.app/products?category=Safety+%26+Workwear" }
      ]
    }
  ], []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Power Tools, Hand Tools & Fasteners"
        description="Shop power tools, hand tools, fasteners & accessories from DeWalt, Milwaukee, Makita & more. Free shipping over $149. Contractor bulk discounts available."
        canonical="https://head-builder-kit.lovable.app/"
        jsonLd={jsonLd}
      />
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
