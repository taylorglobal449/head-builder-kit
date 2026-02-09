import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Search } from "lucide-react";
import { brandsDirectory, alphabetLetters } from "@/lib/allBrandsDirectory";

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

  const scrollToLetter = (letter: string | null) => {
    setActiveLetter(letter);
    if (letter && sectionRefs.current[letter]) {
      sectionRefs.current[letter]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-[780px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-header-primary">Home</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Brands</li>
          </ol>
        </nav>

        <h1 className="text-2xl font-black text-foreground uppercase tracking-wide mb-4">
          Shop By Brand
        </h1>

        {/* Search */}
        <div className="text-center mb-3">
          <div className="inline-block w-full max-w-[400px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search brands..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setActiveLetter(null); }}
              className="w-full pl-9 pr-4 py-2.5 text-base border border-border rounded bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-header-primary/40"
            />
          </div>
        </div>

        {/* Alphabet Filter */}
        <div className="flex justify-center gap-1.5 flex-wrap mb-4">
          <button
            onClick={() => scrollToLetter(null)}
            className={`text-sm font-bold px-2.5 py-1 rounded transition-colors ${
              !activeLetter ? "bg-header-primary text-white" : "text-header-primary hover:bg-header-primary hover:text-white"
            }`}
          >
            All
          </button>
          {alphabetLetters.map((letter) => (
            <button
              key={letter}
              onClick={() => scrollToLetter(letter)}
              className={`text-sm font-bold px-2.5 py-1 rounded transition-colors ${
                activeLetter === letter ? "bg-header-primary text-white" : "text-header-primary hover:bg-header-primary hover:text-white"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Brand Directory */}
        <div className="flex flex-col gap-2">
          {Object.keys(filteredDirectory).length === 0 && (
            <p className="text-center text-muted-foreground py-8">No brands found matching "{search}"</p>
          )}
          {Object.entries(filteredDirectory).map(([letter, brands]) => (
            <div
              key={letter}
              ref={(el) => { sectionRefs.current[letter] = el; }}
              className="scroll-mt-4"
            >
              <h2 className="text-xl font-bold text-foreground mb-1.5 pl-2">{letter}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 px-2 sm:px-0">
                {brands.map((brand) => {
                  const isInternal = brand.href.startsWith("/");
                  const commonClass =
                    "group bg-card rounded-lg shadow-sm border border-border flex flex-col items-center justify-center p-2 h-[100px] md:h-[130px] hover:-translate-y-1 transition-transform text-center";

                  if (isInternal) {
                    return (
                      <Link key={brand.name} to={brand.href} className={commonClass}>
                        <img src={brand.logo} alt={brand.name} className="max-w-[120px] max-h-[50px] md:max-h-[60px] object-contain mt-1.5 flex-grow" />
                        <span className="text-foreground text-xs md:text-sm font-bold uppercase mt-1.5 leading-tight">{brand.name}</span>
                      </Link>
                    );
                  }

                  return (
                    <a key={brand.name} href={brand.href} target="_blank" rel="noopener noreferrer" className={commonClass}>
                      <img src={brand.logo} alt={brand.name} className="max-w-[120px] max-h-[50px] md:max-h-[60px] object-contain mt-1.5 flex-grow" />
                      <span className="text-foreground text-xs md:text-sm font-bold uppercase mt-1.5 leading-tight">{brand.name}</span>
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
