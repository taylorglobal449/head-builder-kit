import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CloseoutCategorySlider } from "@/components/closeouts/CloseoutCategorySlider";
import { closeoutCategories } from "@/lib/closeoutData";
import { useMockProducts } from "@/hooks/useMockProducts";
import { Tag, Percent, Truck, Clock } from "lucide-react";
import closeoutsBanner from "@/assets/banners/closeouts-banner.jpg";

export default function CloseoutsPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { products } = useMockProducts(60);

  // Distribute mock products across categories for demo
  const categoryProducts = useMemo(() => {
    const perCategory = Math.ceil(products.length / closeoutCategories.length);
    const map: Record<string, typeof products> = {};
    closeoutCategories.forEach((cat, i) => {
      map[cat.id] = products.slice(i * perCategory, (i + 1) * perCategory);
    });
    return map;
  }, [products]);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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
              <li className="text-foreground font-medium">Closeouts & Liquidations</li>
            </ol>
          </nav>
        </div>

        {/* Hero Banner */}
        <section className="max-w-[1600px] mx-auto px-4 pb-4">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={closeoutsBanner}
              alt="Closeouts and Liquidation Sale"
              className="w-full h-[200px] sm:h-[260px] lg:h-[320px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
              <div className="px-6 lg:px-12">
                <h1 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-wide mb-2">
                  Closeouts & Liquidations
                </h1>
                <p className="text-white/80 text-sm lg:text-base max-w-lg">
                  Last chance deals on hand tools, power tools, fasteners, and more.
                  Limited quantities — when they're gone, they're gone!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="max-w-[1600px] mx-auto px-4 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Percent, title: "Up to 70% Off", subtitle: "Massive markdowns" },
              { icon: Tag, title: "Clearance Pricing", subtitle: "Lowest prices ever" },
              { icon: Truck, title: "Free Shipping", subtitle: "On orders $99+" },
              { icon: Clock, title: "Limited Stock", subtitle: "While supplies last" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 bg-card border border-border rounded-lg p-3">
                <div className="w-10 h-10 rounded-full bg-header-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-header-primary" />
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
              {closeoutCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => scrollToSection(cat.id)}
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wide whitespace-nowrap rounded-md transition-colors ${
                    activeTab === cat.id
                      ? "bg-header-primary text-white"
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
          {closeoutCategories.map((cat) => (
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
              Don't Miss Out
            </h2>
            <p className="text-white/70 text-sm mb-5 max-w-md mx-auto">
              These closeout deals are final sale. Limited quantities available — shop now before they're gone forever.
            </p>
            <a
              href="https://www.fastenersinc.net/pages/closeouts-and-liquidations"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-header-primary hover:bg-header-primary-hover text-white font-bold uppercase text-sm rounded transition-colors"
            >
              View Full Closeouts Catalog
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
