import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search, X } from "lucide-react";
import { brandsDirectory, alphabetLetters } from "@/lib/allBrandsDirectory";

const topBrands = [
  { name: "DeWalt", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-01_533x.png?v=1702595442", href: "/brands/dewalt" },
  { name: "Makita", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-02_533x.png?v=1702595443", href: "/brands/makita" },
  { name: "Klein Tools", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-03_533x.png?v=1702595441", href: "/brands/klein-tools" },
  { name: "Milwaukee", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-04_533x.png?v=1702595442", href: "/brands/milwaukee" },
  { name: "Knipex", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-05_533x.png?v=1702595441", href: "/brands/knipex" },
  { name: "Occidental Leather", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-06_533x.png?v=1702595441", href: "/brands/occidental" },
  { name: "Diablo", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-07_533x.png?v=1702595442", href: "/brands/diablo" },
  { name: "IronClad", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-08_533x.png?v=1702595442", href: "/brands/ironclad" },
];

export default function BrandsPage() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filteredDirectory = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q && !activeLetter) return brandsDirectory;

    const result: Record<string, typeof brandsDirectory[string]> = {};
    const letters = activeLetter ? [activeLetter] : alphabetLetters;

    for (const letter of letters) {
      const brands = brandsDirectory[letter];
      if (!brands) continue;
      const filtered = q ? brands.filter((b) => b.name.toLowerCase().includes(q)) : brands;
      if (filtered.length > 0) result[letter] = filtered;
    }
    return result;
  }, [search, activeLetter]);

  const totalBrands = useMemo(() => {
    return Object.values(filteredDirectory).reduce((sum, arr) => sum + arr.length, 0);
  }, [filteredDirectory]);

  const scrollToLetter = (letter: string | null) => {
    setActiveLetter(letter);
    if (letter && sectionRefs.current[letter]) {
      sectionRefs.current[letter]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-header-primary transition-colors">Home</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Brands</li>
          </ol>
        </nav>

        {/* Top Brands */}
        <div className="mb-8">
          <h2 className="text-lg font-black text-foreground uppercase tracking-wide mb-3">
            Top Brands
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {topBrands.map((brand) => (
              <Link
                key={brand.name}
                to={brand.href}
                className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-md hover:border-header-primary/30 transition-all"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-auto object-contain"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-5">
          <div>
            <h2 className="text-lg font-black text-foreground uppercase tracking-wide">
              All Brands
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {totalBrands} brands available
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search brands..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setActiveLetter(null); }}
              className="w-full pl-9 pr-8 py-2 text-sm border border-border rounded-md bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-header-primary/40 transition-shadow"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Alphabet Filter - sticky */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border pb-2 pt-1 mb-5 -mx-4 px-4">
          <div className="flex justify-center gap-1 flex-wrap">
            <button
              onClick={() => scrollToLetter(null)}
              className={`text-xs font-bold px-2 py-1 rounded transition-colors ${
                !activeLetter
                  ? "bg-header-primary text-white"
                  : "text-header-primary hover:bg-header-primary/10"
              }`}
            >
              All
            </button>
            {alphabetLetters.map((letter) => (
              <button
                key={letter}
                onClick={() => scrollToLetter(letter)}
                className={`text-xs font-bold w-7 h-7 flex items-center justify-center rounded transition-colors ${
                  activeLetter === letter
                    ? "bg-header-primary text-white"
                    : "text-header-primary hover:bg-header-primary/10"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Directory */}
        <div className="flex flex-col gap-6">
          {Object.keys(filteredDirectory).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No brands found matching "{search}"</p>
              <button
                onClick={() => { setSearch(""); setActiveLetter(null); }}
                className="mt-2 text-sm text-header-primary hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
          {Object.entries(filteredDirectory).map(([letter, brands]) => (
            <div
              key={letter}
              ref={(el) => { sectionRefs.current[letter] = el; }}
              className="scroll-mt-16"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-9 h-9 rounded-md bg-header-primary text-white font-black text-lg">
                  {letter}
                </span>
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">{brands.length} brand{brands.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {brands.map((brand) => {
                  const isInternal = brand.href.startsWith("/");
                  const commonClass =
                    "group bg-card rounded-lg border border-border flex flex-col items-center justify-center p-3 h-[145px] md:h-[170px] hover:shadow-md hover:border-header-primary/30 hover:-translate-y-0.5 transition-all text-center";

                  const content = (
                    <>
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-w-[140px] max-h-[63px] md:max-h-[77px] object-contain flex-grow"
                        loading="lazy"
                      />
                      <span className="text-foreground text-[11px] md:text-xs font-bold uppercase mt-2 leading-tight line-clamp-2">
                        {brand.name}
                      </span>
                    </>
                  );

                  if (isInternal) {
                    return (
                      <Link key={brand.name} to={brand.href} className={commonClass}>
                        {content}
                      </Link>
                    );
                  }

                  return (
                    <a key={brand.name} href={brand.href} target="_blank" rel="noopener noreferrer" className={commonClass}>
                      {content}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
