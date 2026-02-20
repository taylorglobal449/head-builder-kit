import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { useMockProducts } from "@/hooks/useMockProducts";
import { ChevronRight } from "lucide-react";
import milwaukeeLogo from "@/assets/brands/milwaukee.png";
import mkeHeroBanner from "@/assets/brands/mke-hero-banner.png";
import mkeShopByLine from "@/assets/brands/mke-shop-by-line.png";
import mkeCardM18 from "@/assets/brands/mke-card-m18.png";
import mkeCardM12 from "@/assets/brands/mke-card-m12.png";
import mkeCardHand from "@/assets/brands/mke-card-hand.png";
import mkeCardAcc from "@/assets/brands/mke-card-acc.png";
import mkeCardWear from "@/assets/brands/mke-card-wear.png";
import mkeShopByCategory from "@/assets/brands/mke-shop-by-category.png";
import mkeNewProducts from "@/assets/brands/mke-new-products.png";

const lineCardsLarge = [
  { img: mkeCardM18, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20m18", alt: "M18 Power Tools" },
  { img: mkeCardM12, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20m12", alt: "M12 Power Tools" },
];

const lineCardsSmall = [
  { img: mkeCardHand, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20hand%20tools", alt: "Hand Tools" },
  { img: mkeCardAcc, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20accessories", alt: "Accessories" },
  { img: mkeCardWear, href: "https://www.fastenersinc.net/pages/search-results-page?q=milwaukee%20safety", alt: "Work Wear" },
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

const antonFont = { fontFamily: "'Anton', sans-serif" };

export default function MilwaukeeBrandPage() {
  const { products } = useMockProducts(10);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Breadcrumb */}
        <div className="w-[80%] mx-auto pt-4 pb-2">
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

        {/* Hero Banner */}
        <section>
          <img src={mkeHeroBanner} alt="Milwaukee — Nothing But Heavy Duty" className="w-full h-auto" />
        </section>

        {/* ─── SHOP BY LINE ─── */}
        <section className="bg-[#1a1a1a]">
          <div className="w-[80%] mx-auto py-8">
            <img src={mkeShopByLine} alt="Shop By Line" className="w-full max-w-2xl mx-auto mb-6" />

            {/* Top row: 2 large cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {lineCardsLarge.map((card) => (
                <a
                  key={card.alt}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md overflow-hidden hover:opacity-90 transition-opacity"
                >
                  <img src={card.img} alt={card.alt} className="w-full h-auto" />
                </a>
              ))}
            </div>

            {/* Bottom row: 3 smaller cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {lineCardsSmall.map((card) => (
                <a
                  key={card.alt}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-md overflow-hidden hover:opacity-90 transition-opacity"
                >
                  <img src={card.img} alt={card.alt} className="w-full h-auto" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SHOP BY POWER TOOL CATEGORY ─── */}
        <section className="bg-black">
          <div className="w-[80%] mx-auto py-8">
            <img src={mkeShopByCategory} alt="Shop By Power Tool Category" className="w-full mb-6 rounded" />

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
          <img src={mkeNewProducts} alt="New Products" className="w-full" />

          <div className="bg-white">
            <div className="w-[80%] mx-auto py-8">
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
