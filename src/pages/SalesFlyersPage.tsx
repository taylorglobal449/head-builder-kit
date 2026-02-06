import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download, FileText } from "lucide-react";

interface Flyer {
  id: string;
  title: string;
  subtitle: string;
  validDates: string;
  coverImage: string;
  viewOnlineUrl: string;
  pdfUrl?: string;
  badge?: string;
  badgeColor?: string;
}

// ─── EDIT THIS ARRAY TO ADD/REMOVE FLYERS ───────────────────────────────
const FLYERS: Flyer[] = [
  {
    id: "milwaukee-q1-2026",
    title: "Milwaukee Deals Direct",
    subtitle: "M12 & M18 Deals — Build Your Kit & Save Big",
    validDates: "Deals Valid Through 4/30/2026",
    coverImage: "https://www.fastenersinc.net/cdn/shop/files/P1_FLYER_REQUEST_BANNER_1_533x.png?v=1769715638",
    viewOnlineUrl: "https://www.fastenersinc.net/pages/milwaukee-deals-direct",
    badge: "HOT",
    badgeColor: "bg-header-primary",
  },
  {
    id: "dewalt-flex-q1-2026",
    title: "DeWalt & Flex Direct Deals",
    subtitle: "Low Prices on DeWalt Kits, Batteries & Flex Power Tools",
    validDates: "Deals Valid Through 3/31/2026",
    coverImage: "https://www.fastenersinc.net/cdn/shop/files/Q1_DEWALT_AND_FLEX_FLYER_REQUEST_BANNER_533x.png?v=1767375031",
    viewOnlineUrl: "https://www.fastenersinc.net/pages/dewalt-flex-direct-deals",
    badge: "NEW",
    badgeColor: "bg-header-new",
  },
];
// ─────────────────────────────────────────────────────────────────────────

export default function SalesFlyersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-foreground text-background py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
            Sales Flyers & Catalogs
          </h1>
          <p className="mt-2 text-sm md:text-base max-w-2xl mx-auto opacity-80">
            Check out our latest in-store and online deals. View any flyer online or download the PDF to browse at your convenience.
          </p>
        </div>
      </section>

      {/* Flyer Grid */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-8">
          <FileText className="w-5 h-5 text-header-primary" />
          <h2 className="text-xl font-bold uppercase tracking-tight">
            Current Flyers ({FLYERS.length})
          </h2>
        </div>

        <div
          className={`grid gap-8 ${
            FLYERS.length === 1
              ? "max-w-md mx-auto"
              : FLYERS.length === 2
              ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {FLYERS.map((flyer) => (
            <div
              key={flyer.id}
              className="group border rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Cover Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                {flyer.badge && (
                  <span
                    className={`absolute top-3 left-3 z-10 ${flyer.badgeColor || "bg-header-primary"} text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-sm tracking-wider`}
                  >
                    {flyer.badge}
                  </span>
                )}
                <a
                  href={flyer.viewOnlineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <img
                    src={flyer.coverImage}
                    alt={flyer.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                  />
                </a>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-lg leading-tight">{flyer.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {flyer.subtitle}
                </p>
                <p className="text-xs text-header-primary font-semibold mt-2 uppercase tracking-wide">
                  {flyer.validDates}
                </p>

                {/* Actions */}
                <div className="mt-auto pt-4 flex gap-2">
                  <Button
                    className="flex-1 bg-header-primary hover:bg-header-primary-hover text-white font-bold uppercase text-xs tracking-wide"
                    asChild
                  >
                    <a
                      href={flyer.viewOnlineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                      View Online
                    </a>
                  </Button>
                  {flyer.pdfUrl && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0"
                      asChild
                    >
                      <a
                        href={flyer.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Download PDF"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {FLYERS.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-40" />
            <p className="text-lg font-semibold">No flyers available right now</p>
            <p className="text-sm mt-1">Check back soon for upcoming deals and promotions.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 border rounded-lg p-6 md:p-8 bg-muted/50 text-center">
          <h3 className="text-lg font-bold uppercase tracking-tight">
            Don't Miss a Deal
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-lg mx-auto">
            Visit us in-store or shop online to take advantage of these limited-time offers. 
            Need help with a large order? We offer volume pricing on most items.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Button
              className="bg-header-primary hover:bg-header-primary-hover text-white font-bold uppercase text-xs"
              asChild
            >
              <a href="/quote">Request a Quote</a>
            </Button>
            <Button variant="outline" className="font-bold uppercase text-xs" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
