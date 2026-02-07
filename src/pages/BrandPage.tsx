import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/products/ProductCard";
import { useMockProducts } from "@/hooks/useMockProducts";
import { brandConfigs } from "@/lib/brandData";
import { ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BrandPage() {
  const { slug } = useParams<{ slug: string }>();
  const brand = slug ? brandConfigs[slug] : null;
  const { products } = useMockProducts(12);

  if (!brand) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[1600px] mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Brand Not Found</h1>
          <p className="text-muted-foreground mb-6">We don't have a page for this brand yet.</p>
          <Link to="/brands">
            <Button>View All Brands</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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
              <li className="text-foreground font-medium">{brand.name}</li>
            </ol>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-foreground">
          <div className="max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[340px]">
              {/* Left: Brand Info */}
              <div className="flex flex-col justify-center px-6 lg:px-12 py-8 lg:py-12 relative z-10">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 w-auto object-contain object-left mb-4 invert brightness-200"
                />
                <h1 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-wide mb-2">
                  {brand.name} Tools
                </h1>
                <p className="text-white/70 text-sm mb-6 max-w-md">
                  {brand.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {brand.quickLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 px-4 py-2 ${brand.accentColor} ${brand.accentHover} text-white text-xs font-bold uppercase tracking-wide rounded transition-colors`}
                    >
                      {link.label}
                      <ChevronRight className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Right: Hero Image */}
              <div className="hidden lg:block relative">
                <img
                  src={brand.heroImage}
                  alt={`${brand.name} tools`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Brand Pillars Bar */}
        <section className={`${brand.accentColor} py-3`}>
          <div className="max-w-[1600px] mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {brand.pillars.map((pillar) => (
                <div key={pillar.title}>
                  <h3 className="font-black text-white text-sm uppercase">{pillar.title}</h3>
                  <p className="text-white/80 text-xs">{pillar.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Series Grid */}
        <section className="max-w-[1600px] mx-auto px-4 py-8">
          <h2 className="text-xl font-black text-foreground uppercase tracking-wide mb-4">
            Shop {brand.name} Series
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {brand.series.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-foreground rounded-lg p-5 flex flex-col items-center justify-center text-center hover:ring-2 hover:ring-header-primary transition-all aspect-square"
              >
                <span className="text-white font-bold text-sm uppercase group-hover:text-header-primary transition-colors">
                  {s.name}
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Promo Banners */}
        <section className="max-w-[1600px] mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {brand.promos.map((promo) => (
              <a
                key={promo.title}
                href={promo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-foreground rounded-lg p-6 flex flex-col justify-between min-h-[160px] hover:ring-2 hover:ring-header-primary transition-all"
              >
                <div>
                  <h3 className="text-xl font-black text-white uppercase mb-1">{promo.title}</h3>
                  <p className="text-white/60 text-sm">{promo.subtitle}</p>
                </div>
                <span className={`inline-flex items-center gap-1 self-start mt-4 px-4 py-2 ${brand.accentColor} ${brand.accentHover} text-white text-xs font-bold uppercase rounded transition-colors`}>
                  {promo.cta}
                  <ChevronRight className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Trending Products */}
        <section className="max-w-[1600px] mx-auto px-4 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-foreground uppercase tracking-wide">
              Trending {brand.name} Tools
            </h2>
            <a
              href={brand.shopAllHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-header-primary hover:underline flex items-center gap-1"
            >
              Shop All <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: "thin" }}>
            {products.slice(0, 8).map((product) => (
              <div key={product.node.id} className="min-w-[200px] max-w-[220px] flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Popular Categories */}
        <section className="max-w-[1600px] mx-auto px-4 pb-10">
          <h2 className="text-xl font-black text-foreground uppercase tracking-wide mb-4">
            Popular {brand.name} Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {brand.categories.map((cat) => (
              <a
                key={cat.name}
                href={cat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-muted rounded-md text-sm font-semibold text-foreground hover:bg-header-primary hover:text-white transition-colors"
              >
                {cat.name}
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
