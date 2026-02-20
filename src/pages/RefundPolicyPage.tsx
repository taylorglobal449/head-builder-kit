import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-header-primary">Home</Link></li>
            <li>/</li>
            <li className="text-foreground font-medium">Refund Policy</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-black uppercase tracking-wide mb-6">Refund Policy</h1>

        <div className="prose prose-sm max-w-none dark:prose-invert space-y-6 text-foreground/90">
          <p>
            Thanks for shopping at <em>FastenersInc.net</em>. If you are not entirely satisfied with your purchase, we're here to help.
          </p>

          <h2 className="text-xl font-bold mt-8">Return Qualifications</h2>
          <p>Items must be returned within 30 calendar days of the date received. To be eligible for a return, the item must:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Be unused and in the same condition it was received.</li>
            <li>Be in the original packaging.</li>
            <li>Have the receipt or proof of purchase.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8">Return Procedure</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Contact Customer Service for an Authorization Number at <a href="mailto:onlinesales@fastenersinc.net" className="text-header-primary hover:underline">onlinesales@fastenersinc.net</a> or call <a href="tel:5303193120" className="text-header-primary hover:underline">(530) 319-3120</a></li>
            <li>Ship item to Fasteners Inc, 3721 Electro Way, Redding, CA 96002, United States</li>
            <li>Item is received, inspected, and tested.</li>
            <li>Customer is notified of approval or rejection of return.</li>
            <li>Refund is processed and applied to your original method of payment within 3 days.</li>
          </ul>

          <p>
            Shipping costs are non-refundable. Cost of shipping is deducted from the refund. If the order received free shipping, then the cost incurred to ship the item will be removed from the refund since the order no longer qualifies for free shipping. (Ex: $70 drill plus free shipping returned. $55 refunded — $70 minus $15 shipping cost.)
          </p>

          <ul className="list-disc pl-6 space-y-1 font-semibold">
            <li>Orders that are cancelled or returned over $1,000 will be subject to a 4% restocking fee.</li>
            <li>Do not send your purchase back to the manufacturer.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8">Return Shipping</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>The customer is responsible for return shipping costs on all returns other than items that are damaged or defective.</li>
            <li>Return shipping times may vary depending on distance and estimated shipping.</li>
            <li>Please consider using a trackable shipping service or purchasing shipping insurance for returned items over $50. Items can be stolen or lost in the mail and we do not guarantee return shipping.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8">Defective or Damaged Item Exchanges</h2>
          <p>
            Defective or damaged items can be replaced or refunded. Email us at <a href="mailto:onlinesales@fastenersinc.net" className="text-header-primary hover:underline">onlinesales@fastenersinc.net</a> for more details. The item may need to be returned so please keep all packing materials. Defective or damaged items will be returned at no charge to the customer.
          </p>

          <h2 className="text-xl font-bold mt-8">Late or Missing Refunds</h2>
          <p>If you have received a refund email but haven't received a refund yet:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Double check your bank account.</li>
            <li>Contact your credit card company — it may take some time before your refund is officially posted.</li>
            <li>Contact your bank. There is often some processing time before a refund is posted.</li>
            <li>Contact us to verify it has been processed at <a href="mailto:onlinesales@fastenersinc.net" className="text-header-primary hover:underline">onlinesales@fastenersinc.net</a></li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
