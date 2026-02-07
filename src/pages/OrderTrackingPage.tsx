import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Package, Search, Truck, CheckCircle2, AlertCircle } from "lucide-react";
import { z } from "zod";

const trackingSchema = z.object({
  orderNumber: z.string().trim().min(1, "Order number is required").max(50),
  email: z.string().trim().email("Please enter a valid email").max(255),
});

const SHOPIFY_DOMAIN = "remix-of-head-builder-advhi.myshopify.com";

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ orderNumber?: string; email?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = trackingSchema.safeParse({ orderNumber, email });
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof errors;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Redirect to Shopify order status page
    const encodedEmail = encodeURIComponent(result.data.email);
    const url = `https://${SHOPIFY_DOMAIN}/account/login?checkout_url=/tools/checkout/orders/track?order_number=${encodeURIComponent(result.data.orderNumber)}&email=${encodedEmail}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-header-primary/10 mb-4">
            <Package className="w-8 h-8 text-header-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground uppercase tracking-wide mb-2">
            Order Tracking
          </h1>
          <p className="text-muted-foreground">
            Enter your order number and email to check the status of your order.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-5"
        >
          <div className="space-y-1.5">
            <Label htmlFor="orderNumber">
              Order Number <span className="text-header-primary">*</span>
            </Label>
            <Input
              id="orderNumber"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. 1001"
              maxLength={50}
            />
            {errors.orderNumber && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.orderNumber}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="trackEmail">
              Email Address <span className="text-header-primary">*</span>
            </Label>
            <Input
              id="trackEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="The email used for your order"
              maxLength={255}
            />
            {errors.email && (
              <p className="text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-header-primary hover:bg-header-primary-hover text-white font-bold uppercase tracking-wide"
          >
            <Search className="w-4 h-4 mr-2" />
            Track Order
          </Button>
        </form>

        {/* Info Steps */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-header-primary/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-header-primary" />
            </div>
            <h3 className="font-semibold text-sm text-foreground">Enter Details</h3>
            <p className="text-xs text-muted-foreground">
              Provide your order number and email address
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-header-primary/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-header-primary" />
            </div>
            <h3 className="font-semibold text-sm text-foreground">View Status</h3>
            <p className="text-xs text-muted-foreground">
              See real-time updates on your shipment
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-header-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-header-primary" />
            </div>
            <h3 className="font-semibold text-sm text-foreground">Get Delivered</h3>
            <p className="text-xs text-muted-foreground">
              Track until your order arrives at your door
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
