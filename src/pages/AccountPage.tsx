import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { User, ExternalLink, ShoppingBag, MapPin, HelpCircle } from "lucide-react";

const SHOPIFY_ACCOUNT_URL = "https://www.fastenersinc.net/account/login";

export default function AccountPage() {
  const handleSignIn = () => {
    window.open(SHOPIFY_ACCOUNT_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-lg mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-header-primary/10 mb-4">
            <User className="w-8 h-8 text-header-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground uppercase tracking-wide mb-2">
            My Account
          </h1>
          <p className="text-muted-foreground">
            Sign in to view orders, track shipments, and manage your account.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-6">
          <Button
            onClick={handleSignIn}
            className="w-full bg-header-primary hover:bg-header-primary-hover text-white font-bold uppercase tracking-wide"
            size="lg"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Sign In to Your Account
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a
              href="https://www.fastenersinc.net/account/register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-header-primary hover:underline font-medium"
            >
              Create one here
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="/order-tracking"
            className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-lg hover:border-header-primary transition-colors text-center"
          >
            <ShoppingBag className="w-5 h-5 text-header-primary" />
            <span className="text-sm font-semibold text-foreground">Track Orders</span>
          </a>
          <a
            href="/store-locator"
            className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-lg hover:border-header-primary transition-colors text-center"
          >
            <MapPin className="w-5 h-5 text-header-primary" />
            <span className="text-sm font-semibold text-foreground">Find a Store</span>
          </a>
          <a
            href="/contact"
            className="flex flex-col items-center gap-2 p-4 bg-card border border-border rounded-lg hover:border-header-primary transition-colors text-center"
          >
            <HelpCircle className="w-5 h-5 text-header-primary" />
            <span className="text-sm font-semibold text-foreground">Get Help</span>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
