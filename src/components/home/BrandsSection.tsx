import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Brand {
  name: string;
  logo: string;
  href: string;
}

const brands: Brand[] = [
  { name: "DeWalt", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-01_533x.png?v=1702595442", href: "https://www.fastenersinc.net/pages/dewalt-tools-power-tools-accessories" },
  { name: "Makita", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-02_533x.png?v=1702595443", href: "https://www.fastenersinc.net/pages/makita-tools-makita-power-tools-accessories" },
  { name: "Klein Tools", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-03_533x.png?v=1702595441", href: "https://www.fastenersinc.net/pages/klein-tools" },
  { name: "Milwaukee", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-04_533x.png?v=1702595442", href: "https://www.fastenersinc.net/pages/milwaukee-tools" },
  { name: "Knipex", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-05_533x.png?v=1702595441", href: "https://www.fastenersinc.net/pages/knipex-tools-pliers" },
  { name: "Occidental Leather", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-06_533x.png?v=1702595441", href: "https://www.fastenersinc.net/pages/occidental-leather-tool-belt-systems" },
  { name: "Diablo", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-07_533x.png?v=1702595442", href: "https://www.fastenersinc.net/pages/search-results-page?collection=diablo" },
  { name: "IronClad", logo: "https://www.fastenersinc.net/cdn/shop/files/BRAND_CATEOGORY_LINK_COVERS-08_533x.png?v=1702595442", href: "https://www.fastenersinc.net/pages/ironclad-performance-wear-ironclad-gloves-for-professionals" },
];

export function BrandsSection() {
  return (
    <section className="py-6 border-t border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-black text-foreground uppercase tracking-wide">
          Shop By Brand
        </h2>
        <a 
          href="https://www.fastenersinc.net/pages/brands"
          className="text-sm font-bold text-header-primary hover:underline flex items-center gap-1"
        >
          View All Brands
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
      
      {/* 2 rows of 4 brand image cards - using actual fastenersinc.net brand images */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {brands.map((brand, index) => (
          <a
            key={index}
            href={brand.href}
            className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-md hover:border-header-primary/30 transition-all"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-full h-auto object-contain"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
