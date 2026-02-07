import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { allBrands } from "@/lib/brandData";

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-[1600px] mx-auto px-4 py-8">
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-header-primary">Home</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Brands</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-black text-foreground uppercase tracking-wide mb-8">
          Shop By Brand
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {allBrands.map((brand) => {
            const isInternal = brand.href.startsWith("/");
            const Wrapper = isInternal ? Link : "a";
            const extraProps = isInternal
              ? { to: brand.href }
              : { href: brand.href, target: "_blank" as const, rel: "noopener noreferrer" };

            return (
              <Wrapper
                key={brand.slug}
                {...(extraProps as any)}
                className="group bg-foreground rounded-lg p-6 flex flex-col items-center justify-center aspect-square hover:ring-2 hover:ring-header-primary transition-all"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 w-auto object-contain invert brightness-200 mb-3 group-hover:scale-105 transition-transform"
                />
                <span className="text-white/80 text-sm font-bold uppercase group-hover:text-header-primary transition-colors">
                  {brand.name}
                </span>
              </Wrapper>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
