import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { allBrands } from "@/lib/brandData";

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-[780px] mx-auto px-4 py-8">
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-header-primary">Home</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Brands</li>
          </ol>
        </nav>

        <h1 className="text-2xl font-black text-foreground uppercase tracking-wide mb-6">
          Top Brands
        </h1>

        {/* Mobile: horizontal scroll, Desktop: centered wrap — matches existing site */}
        <div className="overflow-x-auto md:overflow-x-hidden scrollbar-hide">
          <div className="flex gap-2 flex-nowrap px-2 md:flex-wrap md:justify-center md:gap-3 md:px-0">
            {allBrands.map((brand) => (
              <Link
                key={brand.slug}
                to={brand.href}
                className="group flex-shrink-0 w-[100px] h-[100px] md:w-[120px] md:h-[120px] bg-card rounded-lg shadow-sm border border-border flex flex-col items-center justify-center p-2 hover:-translate-y-1 transition-transform"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-w-[100px] max-h-[50px] md:max-w-[120px] md:max-h-[60px] object-contain mt-1.5 md:mt-2"
                />
                <span className="text-foreground text-[10px] md:text-xs font-bold uppercase mt-1.5 md:mt-2 leading-tight text-center">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
