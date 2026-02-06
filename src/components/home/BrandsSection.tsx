import { Link } from "react-router-dom";
import dewaltLogo from "@/assets/brands/dewalt.png";
import makitaLogo from "@/assets/brands/makita.png";

interface Brand {
  name: string;
  logo: string;
  href: string;
}

const brands: Brand[] = [
  { name: "DeWalt", logo: dewaltLogo, href: "/brands/dewalt" },
  { name: "Makita", logo: makitaLogo, href: "/brands/makita" },
  { name: "Milwaukee", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Milwaukee_Tool_Logo.svg/320px-Milwaukee_Tool_Logo.svg.png", href: "/brands/milwaukee" },
  { name: "Bosch", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Robert_Bosch_GmbH_logo.svg/320px-Robert_Bosch_GmbH_logo.svg.png", href: "/brands/bosch" },
  { name: "Stanley", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Stanley_logo.svg/320px-Stanley_logo.svg.png", href: "/brands/stanley" },
  { name: "Klein Tools", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Klein_Tools_logo.svg/320px-Klein_Tools_logo.svg.png", href: "/brands/klein" },
  { name: "Craftsman", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Craftsman_logo.svg/320px-Craftsman_logo.svg.png", href: "/brands/craftsman" },
  { name: "Ridgid", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ridgid_Logo.svg/320px-Ridgid_Logo.svg.png", href: "/brands/ridgid" },
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
      
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {brands.map((brand, index) => (
          <Link
            key={index}
            to={brand.href}
            className="group bg-card border border-border rounded-lg p-4 flex items-center justify-center aspect-square hover:shadow-md hover:border-header-primary/30 transition-all"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="max-w-full max-h-12 object-contain grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
