import { Header } from "@/components/Header";
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

      {/* Footer */}
      <footer className="bg-header-secondary text-primary-foreground py-12 mt-8">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Shop</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="/products" className="hover:opacity-100">All Products</a></li>
                <li><a href="/deals" className="hover:opacity-100">Hot Deals</a></li>
                <li><a href="/new" className="hover:opacity-100">New Arrivals</a></li>
                <li><a href="/brands" className="hover:opacity-100">Brands</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="/contact" className="hover:opacity-100">Contact Us</a></li>
                <li><a href="/faq" className="hover:opacity-100">FAQ</a></li>
                <li><a href="/shipping" className="hover:opacity-100">Shipping Info</a></li>
                <li><a href="/returns" className="hover:opacity-100">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="/about" className="hover:opacity-100">About Us</a></li>
                <li><a href="/careers" className="hover:opacity-100">Careers</a></li>
                <li><a href="/stores" className="hover:opacity-100">Store Locations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">DEALS & PROMOS NEWSLETTER</h3>
              <p className="text-sm opacity-80 mb-4">Receive updates on deals, promos, & new items.</p>
              <div className="flex mb-3">
                <input 
                  type="email" 
                  placeholder="Enter email" 
                  className="flex-1 px-3 py-2 rounded-l text-foreground text-sm"
                />
                <button className="bg-header-primary hover:bg-header-primary-hover px-4 py-2 rounded-r text-sm font-bold">
                  Submit
                </button>
              </div>
              <label className="flex items-start gap-2 text-xs opacity-70 cursor-pointer">
                <input type="checkbox" className="mt-0.5 rounded" />
                <span>
                  By checking this box, you agree to receive email notifications from Fasteners, Inc. for our newsletter and promotions.{" "}
                  <a href="https://www.fastenersinc.net/pages/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-100">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-60">
            © 2024 Fasteners Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
