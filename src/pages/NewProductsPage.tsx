import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CloseoutCategorySlider } from "@/components/closeouts/CloseoutCategorySlider";
import { useMockProducts } from "@/hooks/useMockProducts";
import { Sparkles, Star, TrendingUp, Truck } from "lucide-react";
import newProductsBanner from "@/assets/banners/new-products-banner.jpg";

const newCategories = [
  { id: "just-arrived", title: "Just Arrived" },
  { id: "new-power-tools", title: "New Power Tools" },
  { id: "new-hand-tools", title: "New Hand Tools" },
  { id: "new-outdoor", title: "New Outdoor Equipment" },
  { id: "new-accessories", title: "New Accessories" },
  { id: "new-safety", title: "New Safety & Workwear" },
];

export default function NewProductsPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { products } = useMockProducts(60);

  const categoryProducts = useMemo(() => {
    const perCategory = Math.ceil(products.length / newCategories.length);
    const map: Record<string, typeof products> = {};
    newCategories.forEach((cat, i) => {
      map[cat.id] = products.slice(i * perCategory, (i + 1) * perCategory);
    });
    return map;
  }, [products]);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="max-w-[1600px] mx-auto px-4 pt-4 pb-2">
          <nav>
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-header-primary">Home</Link></li>
              <li>/</li>
              <li className="text-foreground font-medium">New Products</li>
            </ol>
          </nav>
        </div>

        {/* Hero Banner */}
        <section className="max-w-[1600px] mx-auto px-4 pb-4">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={newProductsBanner}
              alt="New Product Arrivals"
              className="w-full h-[200px] sm:h-[260px] lg:h-[320px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
              <div className="px-6 lg:px-12">
                <h1 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-wide mb-2">
                  New Products
                </h1>
                <p className="text-white/80 text-sm lg:text-base max-w-lg">
                  Be the first to get the latest tools and equipment from the top brands. New arrivals added weekly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="max-w-[1600px] mx-auto px-4 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Sparkles, title: "Latest Releases", subtitle: "Fresh from the brands" },
              { icon: Star, title: "Top Brands", subtitle: "Milwaukee, DeWalt & more" },
              { icon: TrendingUp, title: "Trending Tools", subtitle: "What the pros are buying" },
              { icon: Truck, title: "In Stock Now", subtitle: "Ready to ship today" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 bg-card border border-border rounded-lg p-3">
                <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#2563eb]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sticky Category Nav */}
        <div className="sticky top-0 z-30 bg-background border-b border-border shadow-sm">
          <div className="max-w-[1600px] mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto py-2" style={{ scrollbarWidth: "none" }}>
              {newCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wide whitespace-nowrap rounded-md transition-colors ${
                    activeTab === cat.id
                      ? "bg-[#2563eb] text-white"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Sliders */}
        <div className="max-w-[1600px] mx-auto px-4 py-8 space-y-10">
          {newCategories.map((cat) => (
            <CloseoutCategorySlider
              key={cat.id}
              id={cat.id}
              title={cat.title}
              products={categoryProducts[cat.id] || []}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <section className="max-w-[1600px] mx-auto px-4 pb-10">
          <div className="bg-foreground rounded-xl p-8 text-center">
            <h2 className="text-2xl font-black text-white uppercase mb-2">
              Stay Up To Date
            </h2>
            <p className="text-white/70 text-sm mb-5 max-w-md mx-auto">
              New products are added every week. Browse our full catalog or check out our sales flyers for the latest promotions.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://www.fastenersinc.net/pages/search-results-page?collection=new-release"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold uppercase text-sm rounded transition-colors"
              >
                View Full New Products
              </a>
              <Link
                to="/sales-flyers"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 hover:border-white text-white font-bold uppercase text-sm rounded transition-colors"
              >
                Sales Flyers
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
