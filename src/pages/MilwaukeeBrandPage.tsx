import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { useMockProducts } from "@/hooks/useMockProducts";
import { ChevronRight } from "lucide-react";
import milwaukeeLogo from "@/assets/brands/milwaukee.png";
import milwaukeeHero from "@/assets/brands/milwaukee-hero.jpg";
import m18Line from "@/assets/brands/milwaukee-m18-line.jpg";
import m12Line from "@/assets/brands/milwaukee-m12-line.jpg";
import handToolsLine from "@/assets/brands/milwaukee-hand-tools-line.jpg";
import accessoriesLine from "@/assets/brands/milwaukee-accessories-line.jpg";
import workwearLine from "@/assets/brands/milwaukee-workwear-line.jpg";
import toolsCollage from "@/assets/brands/milwaukee-tools-collage.jpg";
import catDrilling from "@/assets/brands/milwaukee-cat-drilling.jpg";
import catFastening from "@/assets/brands/milwaukee-cat-fastening.jpg";
import catCombo from "@/assets/brands/milwaukee-cat-combo.jpg";
import catLasers from "@/assets/brands/milwaukee-cat-lasers.jpg";
import catSaws from "@/assets/brands/milwaukee-cat-saws.jpg";
import catLighting from "@/assets/brands/milwaukee-cat-lighting.jpg";
import catStorage from "@/assets/brands/milwaukee-cat-storage.jpg";
import catGrinding from "@/assets/brands/milwaukee-cat-grinding.jpg";

const MKE_RED = "#db0032";

const shopByLine = [
  { name: "M18", subtitle: "Power Tools", image: m18Line, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20m18", large: true },
  { name: "M12", subtitle: "Power Tools", image: m12Line, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20m12", large: true },
  { name: "Hand Tools", subtitle: "", image: handToolsLine, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20hand%20tools", large: false },
  { name: "Accessories", subtitle: "", image: accessoriesLine, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20accessories", large: false },
  { name: "Work Wear", subtitle: "", image: workwearLine, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20safety", large: false },
];

const categories = [
  { name: "Drilling", image: catDrilling, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20drill" },
  { name: "Fastening", image: catFastening, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20impact" },
  { name: "Combo Kits", image: catCombo, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20combo%20kit" },
  { name: "Lasers", image: catLasers, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20laser" },
  { name: "Saws", image: catSaws, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20saw" },
  { name: "Lighting", image: catLighting, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20light" },
  { name: "Storage", image: catStorage, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20packout" },
  { name: "Grinding", image: catGrinding, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20grinder" },
];

const antonFont = { fontFamily: "'Anton', sans-serif" };

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

        {/* Hero Section — dark with red accents and product imagery */}
        <section className="relative overflow-hidden bg-black">
          <div className="absolute inset-0">
            <img src={milwaukeeHero} alt="" className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
          </div>
          <div className="relative max-w-[1600px] mx-auto px-4 py-10 flex flex-col items-center text-center">
            <img src={milwaukeeLogo} alt="Milwaukee" className="h-16 md:h-20 object-contain mb-4 brightness-0 invert" />
            <p className="text-white/60 text-sm max-w-lg">
              Industry-leading M18 and M12 cordless systems, hand tools, and accessories — Nothing But Heavy Duty.
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
              {shopByLine.filter(l => l.large).map((line) => (
                <a
                  key={line.name}
                  href={line.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-lg aspect-[16/7] bg-black border border-white/10 hover:border-[#db0032]/60 transition-all"
                >
                  <img src={line.image} alt={line.name} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                  <div className="relative h-full flex flex-col justify-center px-5 md:px-8">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-white text-4xl md:text-5xl font-black uppercase"
                        style={{ ...antonFont, color: MKE_RED }}
                      >
                        {line.name}
                      </span>
                      <span className="text-white text-lg md:text-xl uppercase" style={antonFont}>
                        {line.subtitle}
                      </span>
                    </div>
                    <span className="mt-2 inline-flex items-center gap-1 text-white text-xs font-bold uppercase tracking-widest opacity-80 group-hover:opacity-100">
                      Shop Now <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Bottom row: 3 smaller cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {shopByLine.filter(l => !l.large).map((line) => (
                <a
                  key={line.name}
                  href={line.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-lg aspect-[16/7] bg-black border border-white/10 hover:border-[#db0032]/60 transition-all"
                >
                  <img src={line.image} alt={line.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                  <div className="relative h-full flex flex-col justify-center px-5">
                    <span
                      className="text-white text-xl md:text-2xl uppercase italic"
                      style={antonFont}
                    >
                      {line.name}
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1 text-white text-xs font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100">
                      Shop Now <ChevronRight className="w-3 h-3" />
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
                  className="group relative bg-white rounded-lg overflow-hidden border border-white/10 hover:ring-2 hover:ring-[#db0032] transition-all"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="bg-[#db0032] py-2 px-3">
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
        <section className="relative">
          {/* Red header bar */}
          <div className="bg-[#db0032] py-3">
            <h2
              className="text-2xl md:text-3xl text-white uppercase tracking-wide text-center italic"
              style={antonFont}
            >
              New Products
            </h2>
          </div>

          {/* Products on white */}
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

          {/* Collage background footer */}
          <div className="relative h-[300px] md:h-[400px] overflow-hidden">
            <img src={toolsCollage} alt="Milwaukee tools collection" className="w-full h-full object-cover grayscale opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <a
                href="https://www.fastenersinc.net/pages/milwaukee-tools"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#db0032] hover:bg-[#b8002a] text-white font-bold uppercase tracking-wider rounded transition-colors"
              >
                Shop All Milwaukee <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
