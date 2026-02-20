import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin, Package, Truck, Users } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-header-primary">Home</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">About Us</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-black uppercase tracking-wide mb-8">About Us</h1>

        {/* Value props */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { icon: Users, title: "Family Owned", subtitle: "Built on trust" },
            { icon: MapPin, title: "9+ Locations", subtitle: "CA, NV & OR" },
            { icon: Package, title: "40,000+ Items", subtitle: "Tools & fasteners" },
            { icon: Truck, title: "Fast Shipping", subtitle: "When you need it" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3 bg-card border border-border rounded-lg p-3">
              <div className="w-10 h-10 rounded-full bg-header-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-header-primary" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="prose prose-sm max-w-none dark:prose-invert space-y-6 text-foreground/90 text-base leading-relaxed">
          <p>
            We are a proud, family-owned business built on trust, hard work, and a passion for quality tools. With 9 retail locations—and many more on the way—we've been serving communities across California, Nevada, and Oregon for years. Our commitment has always been simple: <strong>Better Tools, Better Prices.</strong> Whether you're a professional contractor, a weekend DIYer, or somewhere in between, we're here to help you get the job done right.
          </p>

          <p>
            At our stores and online, you'll find over 40,000 different items—from bolts, nuts, and fasteners to power tools, safety gear, and more. We're more than just a hardware store; we're your one-stop shop for everything you need to build, repair, and create. We also offer bulk discounts and custom quotes, ensuring you always get the best value no matter the size of your project.
          </p>

          <p>
            We know that when you need a tool, you need it now. That's why we offer a variety of convenient shipping options to get your order to you quickly—no matter where you are. Our team is dedicated to delivering the products, service, and support you can rely on, every single time. From our family to yours, we'll always be there when you need a new tool.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 border rounded-lg p-6 md:p-8 bg-muted/50 text-center">
          <h3 className="text-lg font-bold uppercase tracking-tight">Visit Us Today</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-lg mx-auto">
            Find a store near you or shop our full catalog online.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              to="/store-locator"
              className="inline-flex items-center gap-2 px-6 py-3 bg-header-primary hover:bg-header-primary-hover text-white font-bold uppercase text-xs rounded transition-colors"
            >
              Find a Store
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:bg-muted font-bold uppercase text-xs rounded transition-colors"
            >
              Shop Online
            </Link>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:bg-muted font-bold uppercase text-xs rounded transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
