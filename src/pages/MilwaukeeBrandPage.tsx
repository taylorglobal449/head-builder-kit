import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { useMockProducts } from "@/hooks/useMockProducts";
import { ChevronRight } from "lucide-react";
import milwaukeeLogo from "@/assets/brands/milwaukee.png";
import bgM18 from "@/assets/brands/mke-bg-m18.jpg";
import bgM12 from "@/assets/brands/mke-bg-m12.jpg";
import bgHand from "@/assets/brands/mke-bg-hand.jpg";
import bgAcc from "@/assets/brands/mke-bg-acc.jpg";
import bgWear from "@/assets/brands/mke-bg-wear.jpg";

const antonFont = { fontFamily: "'Anton', sans-serif" };

const lineCardsLarge = [
  { name: "M18", subtitle: "Power Tools", bg: bgM18, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20m18" },
  { name: "M12", subtitle: "Power Tools", bg: bgM12, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20m12" },
];

const lineCardsSmall = [
  { name: "Hand Tools", bg: bgHand, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20hand%20tools" },
  { name: "Accessories", bg: bgAcc, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20accessories" },
  { name: "Work Wear", bg: bgWear, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20safety" },
];

const categories = [
  { name: "Drilling", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20drill" },
  { name: "Fastening", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20impact" },
  { name: "Combo Kits", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20combo%20kit" },
  { name: "Lasers", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20laser" },
  { name: "Saws", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20saw" },
  { name: "Lighting", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20light" },
  { name: "Storage", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20packout" },
  { name: "Grinding", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20grinder" },
];

export default function MilwaukeeBrandPage() {
  const { products } = useMockProducts(10);

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
              <li><Link to="/brands" className="hover:text-header-primary">Brands</Link></li>
              <li>/</li>
              <li className="text-foreground font-medium">Milwaukee</li>
            </ol>
          </nav>
        </div>

        {/* Hero — dark bg, logo centered */}
        <section className="bg-black py-10">
          <div className="max-w-[1600px] mx-auto px-4 flex flex-col items-center text-center">
            <img src={milwaukeeLogo} alt="Milwaukee" className="h-16 md:h-20 object-contain mb-3 brightness-0 invert" />
            <p className="text-white/50 text-sm max-w-lg">
              Nothing But Heavy Duty — Industry-leading M18 &amp; M12 cordless systems, hand tools, and accessories.
            </p>
          </div>
        </section>

        {/* ─── SHOP BY LINE ─── */}
        <section className="bg-[#1a1a1a]">
          <div className="max-w-[1600px] mx-auto px-4 py-8">
            <h2
              className="text-3xl md:text-4xl text-white uppercase tracking-wide mb-6 text-center"
              style={antonFont}
            >
              Shop By Line.
            </h2>

            {/* Top row: 2 large cards (M18, M12) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {lineCardsLarge.map((line) => (
                <a
                  key={line.name}
                  href={line.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-md border-2 border-[#db0032] bg-black"
                  style={{ aspectRatio: "16/8" }}
                >
                  {/* Dark bg with faded tool images */}
                  <img src={line.bg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Content overlay */}
                  <div className="relative h-full flex flex-col items-center justify-center text-center px-4 gap-3">
                    {/* White rounded label with bold black text */}
                    <div className="flex items-baseline gap-2">
                      <div className="bg-white rounded-lg px-4 py-1.5">
                        <span
                          className="text-black text-4xl md:text-5xl uppercase"
                          style={{ ...antonFont, fontStyle: "italic" }}
                        >
                          {line.name}
                        </span>
                      </div>
                      <span
                        className="text-white text-xl md:text-2xl uppercase"
                        style={{ ...antonFont, fontStyle: "italic" }}
                      >
                        {line.subtitle}
                      </span>
                    </div>

                    {/* Live SHOP NOW button */}
                    <span
                      className="inline-flex items-center gap-1 px-5 py-1.5 bg-[#db0032] hover:bg-[#ff0038] text-white text-sm font-black uppercase tracking-wider rounded-sm transition-colors"
                      style={antonFont}
                    >
                      Shop Now
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Bottom row: 3 smaller cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {lineCardsSmall.map((line) => (
                <a
                  key={line.name}
                  href={line.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-md border-2 border-[#db0032] bg-black"
                  style={{ aspectRatio: "16/8" }}
                >
                  <img src={line.bg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  <div className="relative h-full flex flex-col items-center justify-center text-center px-4 gap-2">
                    <span
                      className="text-white text-2xl md:text-3xl uppercase drop-shadow-lg"
                      style={{ ...antonFont, fontStyle: "italic" }}
                    >
                      {line.name}
                    </span>

                    <span
                      className="inline-flex items-center gap-1 px-4 py-1 bg-[#db0032] hover:bg-[#ff0038] text-white text-xs font-black uppercase tracking-wider rounded-sm transition-colors"
                      style={antonFont}
                    >
                      Shop Now
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SHOP BY POWER TOOL CATEGORY ─── */}
        <section className="bg-black">
          <div className="max-w-[1600px] mx-auto px-4 py-8">
            <div className="bg-[#db0032] py-3 px-4 mb-6 rounded">
              <h2
                className="text-2xl md:text-3xl text-white uppercase tracking-wide text-center"
                style={antonFont}
              >
                Shop By Power Tool Category.
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <a
                  key={cat.name}
                  href={cat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-[#1a1a1a] rounded-lg overflow-hidden border border-white/10 hover:border-[#db0032] transition-all"
                >
                  <div className="aspect-square bg-[#222] flex items-center justify-center">
                    <span className="text-white/20 text-xs uppercase tracking-wider">Image Placeholder</span>
                  </div>
                  <div className="bg-[#db0032] py-2.5 px-3 group-hover:bg-[#ff0038] transition-colors">
                    <span
                      className="text-white text-sm md:text-base uppercase tracking-wide block text-center"
                      style={antonFont}
                    >
                      {cat.name}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── NEW PRODUCTS ─── */}
        <section>
          <div className="bg-[#db0032] py-3">
            <h2
              className="text-2xl md:text-3xl text-white uppercase tracking-wide text-center"
              style={{ ...antonFont, fontStyle: "italic" }}
            >
              New Products
            </h2>
          </div>

          <div className="bg-white">
            <div className="max-w-[1600px] mx-auto px-4 py-8">
              <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
                {products.slice(0, 8).map((product) => (
                  <div key={product.node.id} className="min-w-[200px] max-w-[220px] flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] py-10 text-center">
            <a
              href="https://www.fastenersinc.net/pages/milwaukee-tools"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#db0032] hover:bg-[#b8002a] text-white font-bold uppercase tracking-wider rounded transition-colors"
            >
              Shop All Milwaukee <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
