import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { useMockProducts } from "@/hooks/useMockProducts";
import { ChevronRight } from "lucide-react";
import milwaukeeLogo from "@/assets/brands/milwaukee.png";

const MKE_RED = "#db0032";
const antonFont = { fontFamily: "'Anton', sans-serif" };

const shopByLine = [
  { name: "M18", subtitle: "Power Tools", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20m18", large: true },
  { name: "M12", subtitle: "Power Tools", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20m12", large: true },
  { name: "Hand Tools", subtitle: "", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20hand%20tools", large: false },
  { name: "Accessories", subtitle: "", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20accessories", large: false },
  { name: "Work Wear", subtitle: "", href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20safety", large: false },
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

            {/* Top row: 2 large buttons (M18, M12) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {shopByLine.filter(l => l.large).map((line) => (
                <a
                  key={line.name}
                  href={line.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] border border-white/10 hover:border-[#db0032]/60 transition-all py-8 px-6 md:px-10 flex flex-col justify-center"
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-5xl md:text-6xl uppercase"
                      style={{ ...antonFont, color: MKE_RED }}
                    >
                      {line.name}
                    </span>
                    <span className="text-white text-xl md:text-2xl uppercase italic" style={antonFont}>
                      {line.subtitle}
                    </span>
                  </div>
                  <span className="mt-3 inline-flex items-center gap-1 text-white/70 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                    Shop Now <ChevronRight className="w-3 h-3" />
                  </span>
                  {/* Decorative red line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#db0032] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              ))}
            </div>

            {/* Bottom row: 3 smaller buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {shopByLine.filter(l => !l.large).map((line) => (
                <a
                  key={line.name}
                  href={line.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] border border-white/10 hover:border-[#db0032]/60 transition-all py-6 px-5 flex flex-col justify-center"
                >
                  <span
                    className="text-white text-2xl md:text-3xl uppercase italic"
                    style={antonFont}
                  >
                    {line.name}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1 text-white/60 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                    Shop Now <ChevronRight className="w-3 h-3" />
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#db0032] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SHOP BY POWER TOOL CATEGORY ─── */}
        <section className="bg-black">
          <div className="max-w-[1600px] mx-auto px-4 py-8">
            {/* Red banner heading */}
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
                  {/* Placeholder area for future product image */}
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
              className="text-2xl md:text-3xl text-white uppercase tracking-wide text-center italic"
              style={antonFont}
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

          {/* Dark footer with CTA */}
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
