import { Link } from "react-router-dom";
import dewaltLogo from "@/assets/brands/dewalt.png";
import makitaLogo from "@/assets/brands/makita.png";
import milwaukeeLogo from "@/assets/brands/milwaukee.png";
import knipexLogo from "@/assets/brands/knipex.png";
import occidentalLogo from "@/assets/brands/occidental.png";
import diabloLogo from "@/assets/brands/diablo.png";
import ironcladLogo from "@/assets/brands/ironclad.png";

interface Brand {
  name: string;
  logo: string;
  href: string;
}

const brands: Brand[] = [
  { name: "DeWalt", logo: dewaltLogo, href: "/brands/dewalt" },
  { name: "Makita", logo: makitaLogo, href: "/brands/makita" },
  { name: "Milwaukee", logo: milwaukeeLogo, href: "/brands/milwaukee" },
  { name: "Knipex", logo: knipexLogo, href: "/brands/knipex" },
  { name: "Occidental Leather", logo: occidentalLogo, href: "/brands/occidental" },
  { name: "Diablo", logo: diabloLogo, href: "/brands/diablo" },
  { name: "IronClad", logo: ironcladLogo, href: "/brands/ironclad" },
];

export function BrandsSection() {
  return (
    <section className="py-8 border-t border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-black text-foreground uppercase tracking-wide">
          Shop By Brand
        </h2>
        <Link 
          to="/brands"
          className="text-sm font-bold text-header-primary hover:underline flex items-center gap-1"
        >
          View All Brands
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {brands.map((brand, index) => (
          <Link
            key={index}
            to={brand.href}
            className="group bg-card border border-border rounded-lg p-3 flex items-center justify-center aspect-square hover:shadow-md hover:border-header-primary/30 transition-all overflow-hidden"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-full h-full object-cover rounded transition-all"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
