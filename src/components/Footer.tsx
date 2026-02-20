import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categoryLinks = [
  { name: "Power Tools", href: "https://www.fastenersinc.net/pages/search-results-page?collection=power-tools" },
  { name: "Hand Tools", href: "https://www.fastenersinc.net/pages/search-results-page?q=hand%20tools" },
  { name: "Fasteners", href: "https://www.fastenersinc.net/pages/search-results-page?q=Fasteners" },
  { name: "Machine Tools", href: "https://www.fastenersinc.net/pages/search-results-page?q=machine%20tools" },
  { name: "Outdoor Tools", href: "https://www.fastenersinc.net/pages/search-results-page?collection=outdoor-power-equipement" },
  { name: "Safety & Workwear", href: "https://www.fastenersinc.net/pages/search-results-page?q=workwear" },
  { name: "Storage & Workspace", href: "https://www.fastenersinc.net/pages/search-results-page?q=storage" },
  { name: "Combo Kits", href: "https://www.fastenersinc.net/pages/search-results-page?collection=power-tool-combo-kits" },
];

const shopLinks = [
  { name: "All Products", href: "/products" },
  { name: "Hot Deals", href: "https://www.fastenersinc.net/pages/top-deals-promotions" },
  { name: "New Arrivals", href: "https://www.fastenersinc.net/pages/search-results-page?collection=new-release" },
  { name: "Closeouts", href: "https://www.fastenersinc.net/pages/flash-sale-1" },
  { name: "Brands", href: "https://www.fastenersinc.net/pages/brands" },
  { name: "Gift Cards", href: "https://www.fastenersinc.net/products/gift-card" },
];

const supportLinks = [
  { name: "Contact Us", href: "/contact" },
  { name: "Order Tracking", href: "/order-tracking" },
  { name: "Request a Quote", href: "/quote" },
  { name: "Sales Flyers", href: "/sales-flyers" },
  { name: "Receive Deals by Text", href: "https://www.fastenersinc.net/pages/receive-deals-by-text" },
];

const companyLinks = [
  { name: "About Us", href: "https://www.fastenersinc.net/pages/about-us" },
  { name: "Careers", href: "https://www.fastenersinc.net/pages/careers" },
  { name: "Store Locations", href: "/store-locator" },
  { name: "Events", href: "/events" },
  { name: "Shipping Policy", href: "/shipping-policy" },
  { name: "Refund Policy", href: "/refund-policy" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const { toast } = useToast();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (!agreed) {
      toast({ title: "Please agree to the privacy policy", variant: "destructive" });
      return;
    }
    toast({ title: "Subscribed!", description: "You'll receive our latest deals and promos." });
    setEmail("");
    setAgreed(false);
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="max-w-[1600px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-8">
          {/* Newsletter - First / Anchor */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-3 text-header-primary">
              Deals & Promos
            </h3>
            <p className="text-sm text-background/70 mb-3">
              Receive updates on deals, promos, & new items.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                maxLength={255}
                className="h-9 bg-background/10 border-background/20 text-background placeholder:text-background/40 text-sm focus-visible:ring-header-primary"
              />
              <Button
                type="submit"
                size="sm"
                className="h-9 bg-header-primary hover:bg-header-primary-hover text-white shrink-0 px-4"
              >
                Submit
              </Button>
            </form>
            <label className="flex items-start gap-2 mt-3 cursor-pointer">
              <Checkbox
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
                className="mt-0.5 border-background/40 data-[state=checked]:bg-header-primary data-[state=checked]:border-header-primary"
              />
              <span className="text-xs text-background/60 leading-relaxed">
                By checking this box, you agree to receive email notifications from Fasteners, Inc. for our newsletter and promotions.{" "}
                  <a
                    href="/privacy-policy"
                    className="underline hover:text-header-primary transition-colors"
                  >
                  Privacy Policy
                </a>
              </span>
            </label>
            {/* Social */}
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.facebook.com/sacfasteners/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 hover:text-header-primary transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/sacfasteners/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/60 hover:text-header-primary transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-3 text-header-primary">Categories</h3>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-background/70 hover:text-header-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-3 text-header-primary">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-header-primary transition-colors"
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-3 text-header-primary">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-header-primary transition-colors"
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-3 text-header-primary">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-header-primary transition-colors"
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="max-w-[1600px] mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-background/50">
          <p>© {new Date().getFullYear()} Fasteners Inc. All rights reserved.</p>
          <p className="font-semibold tracking-wide">Better Tools. Better Prices.</p>
        </div>
      </div>
    </footer>
  );
}
