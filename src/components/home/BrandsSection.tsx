import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Brand {
  name: string;
  logo: string;
  href: string;
}

const brands: Brand[] = [
  { name: "Milwaukee", logo: "https://www.acmetools.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dwebd8b59f/images/Logos/milwaukee.svg", href: "/brands/milwaukee" },
  { name: "DeWalt", logo: "https://www.acmetools.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw18795603/images/Logos/dewalt-black.svg", href: "/brands/dewalt" },
  { name: "Makita", logo: "https://www.acmetools.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw831fe397/images/Logos/makita.svg", href: "/brands/makita" },
  { name: "Bosch", logo: "https://www.acmetools.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dwa5c47e92/images/Logos/bosch-white.svg", href: "/brands/bosch" },
  { name: "Klein Tools", logo: "https://www.acmetools.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dwba243228/images/Logos/klein-tools-black.svg", href: "/brands/klein" },
  { name: "Knipex", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Knipex_logo.svg/320px-Knipex_logo.svg.png", href: "/brands/knipex" },
  { name: "Diablo", logo: "https://www.acmetools.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw890e73bd/home/assets/homepage-tc-tool-accessories.avif", href: "/brands/diablo" },
  { name: "Metabo HPT", logo: "https://www.acmetools.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw93c9cbac/images/Logos/metabo-hpt.svg", href: "/brands/metabo" },
  { name: "Festool", logo: "https://www.acmetools.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dwb29bcb06/images/Logos/festool.svg", href: "/brands/festool" },
  { name: "Honda", logo: "https://www.acmetools.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dwde906a05/images/Logos/honda-white.svg", href: "/brands/honda" },
  { name: "Jet", logo: "https://www.acmetools.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw2cb0528d/images/Logos/jet.svg", href: "/brands/jet" },
  { name: "Toro", logo: "https://www.acmetools.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dw5ba4df66/images/Logos/toro.svg", href: "/brands/toro" },
];

export function BrandsSection() {
  return (
    <section className="py-6 border-t border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-black text-foreground uppercase tracking-wide">
          Shop By Brand
        </h2>
        <Link 
          to="/brands"
          className="text-sm font-bold text-header-primary hover:underline flex items-center gap-1"
        >
          View All Brands
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Acme-inspired 3-column x 4-row grid of brand cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {brands.map((brand, index) => (
          <Link
            key={index}
            to={brand.href}
            className="group flex flex-col items-center justify-center bg-header-secondary rounded-lg p-4 h-24 hover:opacity-90 transition-all"
          >
            <span className="text-primary-foreground/60 text-[10px] font-medium mb-1">
              Shop {brand.name}
            </span>
            <img
              src={brand.logo}
              alt={brand.name}
              className="max-h-8 w-auto object-contain brightness-0 invert"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
