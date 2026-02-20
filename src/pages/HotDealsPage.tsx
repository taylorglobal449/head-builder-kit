import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { dealBanners, brandTabs, type DealBanner } from "@/lib/dealData";
import { FlameKindling, Percent, Gift, Timer } from "lucide-react";
import hotDealsBanner from "@/assets/banners/hot-deals-banner.jpg";

export default function HotDealsPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredBanners = useMemo(() => {
    if (activeTab === "all") return dealBanners;
    return dealBanners.filter((b) => b.brand === activeTab);
  }, [activeTab]);

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
              <li className="text-foreground font-medium">Hot Deals</li>
            </ol>
          </nav>
        </div>

        {/* Hero Banner */}
        <section className="max-w-[1600px] mx-auto px-4 pb-4">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={hotDealsBanner}
              alt="Hot Deals and Promotions"
              className="w-full h-[200px] sm:h-[260px] lg:h-[320px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
              <div className="px-6 lg:px-12">
                <h1 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-wide mb-2">
                  Hot Deals & Promotions
                </h1>
                <p className="text-white/80 text-sm lg:text-base max-w-lg">
                  Save big on top brands like DeWalt, Milwaukee, and Makita. Limited-time offers updated monthly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Value Props */}
        <section className="max-w-[1600px] mx-auto px-4 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: FlameKindling, title: "Top Brand Deals", subtitle: "Milwaukee, DeWalt & more" },
              { icon: Percent, title: "Up to 50% Off", subtitle: "Limited-time savings" },
              { icon: Gift, title: "Free Tool Offers", subtitle: "Buy more, get more" },
              { icon: Timer, title: "Updated Monthly", subtitle: "Fresh deals regularly" },
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

        {/* Brand Filter Tabs */}
        <div className="sticky top-0 z-30 bg-background border-b border-border shadow-sm">
          <div className="max-w-[1600px] mx-auto px-4">
            <div className="flex items-center gap-2 py-3">
              <span className="text-sm font-bold text-foreground uppercase tracking-wide mr-2">Filter:</span>
              {brandTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2 text-sm font-bold rounded-full border transition-colors ${
                    activeTab === tab.id
                      ? "bg-header-primary border-header-primary text-white"
                      : "bg-background border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Deal Banner Grid */}
        <div className="max-w-[80%] mx-auto py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredBanners.map((banner) => (
              <a
                key={banner.id}
                href={banner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="overflow-hidden">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-auto object-contain group-hover:scale-[1.03] transition-transform duration-300"
                  />
                </div>
              </a>
            ))}
          </div>

          {filteredBanners.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No deals found for this brand.</p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <section className="max-w-[1600px] mx-auto px-4 pb-10">
          <div className="bg-foreground rounded-xl p-8 text-center">
            <h2 className="text-2xl font-black text-white uppercase mb-2">
              Can't Find What You Need?
            </h2>
            <p className="text-white/70 text-sm mb-5 max-w-md mx-auto">
              Browse our full catalog or contact us for special pricing on bulk orders and contractor accounts.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a
                href="https://www.fastenersinc.net/pages/top-deals-promotions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-header-primary hover:bg-header-primary-hover text-white font-bold uppercase text-sm rounded transition-colors"
              >
                View Full Deals Catalog
              </a>
              <Link
                to="/closeouts"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 hover:border-white text-white font-bold uppercase text-sm rounded transition-colors"
              >
                Shop Closeouts
              </Link>
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 hover:border-white text-white font-bold uppercase text-sm rounded transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
