import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-header-primary">Home</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Shipping Policy</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-black uppercase tracking-wide mb-6">Shipping Policies</h1>

        <div className="prose prose-sm max-w-none dark:prose-invert space-y-6 text-foreground/90">
          <h2 className="text-xl font-bold">When will my order ship and how long will it take for delivery?</h2>
          <p><em>It is our goal to make sure your order is processed quickly and efficiently.</em></p>
          <p><em>Most orders ship within 1 Business day. Orders placed after 11am on Friday may not begin processing until Monday. Products that are out of stock will be shipped automatically once we receive additional inventory. You will be notified on all out-of-stock items.</em></p>
          <p><em>Fasteners Inc ships orders via UPS Ground or USPS, whichever provides the best delivery to you, unless expedited shipping is selected. The UPS Transit Time map below gives rough estimates on shipping times from our Redding, CA warehouse. Please note that we cannot ship to P.O. Box addresses, so please provide a UPS deliverable shipping address to prevent delivery delays. The transit times shown are not guaranteed but indicate expected ship times under normal conditions.</em></p>

          <h3 className="text-lg font-bold mt-6">UPS Transit Time Map</h3>
          <div className="rounded-lg overflow-hidden border border-border">
            <img
              src="https://cdn.shopify.com/s/files/1/0026/8976/1392/files/Screenshot_2023-01-25_225954.png?v=1674716433"
              alt="UPS Transit Time Map from Redding, CA"
              className="w-full h-auto"
            />
          </div>

          <h2 className="text-xl font-bold mt-8">Do you ship to my country?</h2>
          <p><strong>We do not ship internationally.</strong> We only ship to locations within the United States.</p>

          <h2 className="text-xl font-bold mt-8">Hawaii and Alaska</h2>
          <p>Due to the high cost of shipping, we do not currently offer shipping to Alaska and Hawaii.</p>

          <h2 className="text-xl font-bold mt-8">Shipping Oversized Products</h2>
          <p>Oversized products will have shipping charges noted during the checkout process or you will be contacted by customer service before the order is fully processed to apprise you of any additional charges.</p>

          <h2 className="text-xl font-bold mt-8">Reseller Policy</h2>
          <p>Due to distribution agreements with our vendors, we're unable to sell to other retailers, wholesalers, or other non-authorized resellers on third-party marketplaces. We reserve the right to immediately cancel and refund any orders received from these entities at our sole discretion.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
