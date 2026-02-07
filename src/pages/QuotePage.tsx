import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "District of Columbia","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota",
  "Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey",
  "New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon",
  "Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah",
  "Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

interface ProductLine {
  id: number;
  link: string;
  quantity: string;
}

export default function QuotePage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<ProductLine[]>([{ id: 1, link: "", quantity: "" }]);
  const [emailOptIn, setEmailOptIn] = useState(false);

  const addProduct = () => {
    setProducts((prev) => [...prev, { id: Date.now(), link: "", quantity: "" }]);
  };

  const removeProduct = (id: number) => {
    if (products.length > 1) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const updateProduct = (id: number, field: "link" | "quantity", value: string) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Request Submitted",
      description: "A Fasteners Inc representative will contact you within two business days.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-foreground mb-6 uppercase tracking-wide">
          Request a Quote
        </h1>

        <div className="text-sm text-foreground leading-relaxed mb-4 space-y-3">
          <p>
            At Fasteners Inc., we're happy to work out better pricing when folks are ordering in larger
            quantities—especially on tools, equipment, and accessories that don't always show special
            volume pricing online.
          </p>
          <p>
            If you're putting together a bigger order, just drop the part numbers and quantities you're
            looking at into the form below. We'll review everything and get you our best possible numbers.
          </p>
          <p>
            Same goes if you need freight figured into a quote on any piece of equipment, or if you just
            want more specs, availability, lead time—whatever—on a particular item. Fill out the form
            with what you need and we'll have one of our team reach out within a couple business days
            (usually sooner if we're not slammed).
          </p>
          <p className="font-medium">Looking forward to helping you get what you need at the right price.</p>
        </div>

        <p className="text-center text-header-primary font-bold text-sm uppercase mb-8">
          Customer Support Hours: Monday – Friday 9:00 AM – 5:00 PM PST
        </p>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-5">
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="firstName">
                First Name <span className="text-header-primary">*</span>
              </Label>
              <Input id="firstName" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="lastName">
                Last Name <span className="text-header-primary">*</span>
              </Label>
              <Input id="lastName" required />
            </div>
          </div>

          {/* Company */}
          <div className="space-y-1.5">
            <Label htmlFor="company">Company</Label>
            <Input id="company" />
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <Label htmlFor="address">
              Street Address <span className="text-header-primary">*</span>
            </Label>
            <Input id="address" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="zip">
                ZIP Code <span className="text-header-primary">*</span>
              </Label>
              <Input id="zip" placeholder="Example: 12345" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="city">
                City <span className="text-header-primary">*</span>
              </Label>
              <Input id="city" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="state">
                State <span className="text-header-primary">*</span>
              </Label>
              <Select required>
                <SelectTrigger id="state">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">
                Email <span className="text-header-primary">*</span>
              </Label>
              <Input id="email" type="email" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" />
            </div>
          </div>

          {/* Opt-in */}
          <div className="flex items-start gap-2">
            <Checkbox
              id="optIn"
              checked={emailOptIn}
              onCheckedChange={(v) => setEmailOptIn(v === true)}
              className="mt-0.5"
            />
            <Label htmlFor="optIn" className="text-xs font-normal cursor-pointer leading-relaxed">
              By checking this box, you agree to receive email notifications from Fasteners, Inc. for our newsletter and promotions.{" "}
              <a
                href="https://www.fastenersinc.net/pages/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-header-primary hover:text-header-primary-hover"
              >
                Privacy Policy
              </a>
            </Label>
          </div>

          {/* Products section */}
          <div className="border-t border-border pt-5">
            <h2 className="font-bold text-foreground uppercase text-sm mb-4">Select Products</h2>
            <div className="space-y-3">
              {products.map((product, idx) => (
                <div key={product.id} className="flex items-end gap-3">
                  <div className="flex-1 space-y-1.5">
                    <Label htmlFor={`plink-${product.id}`}>SKU or Title</Label>
                    <Input
                      id={`plink-${product.id}`}
                      value={product.link}
                      onChange={(e) => updateProduct(product.id, "link", e.target.value)}
                      placeholder="Enter SKU or product title"
                    />
                  </div>
                  <div className="w-24 space-y-1.5">
                    <Label htmlFor={`qty-${product.id}`}>Qty</Label>
                    <Input
                      id={`qty-${product.id}`}
                      value={product.quantity}
                      onChange={(e) => updateProduct(product.id, "quantity", e.target.value)}
                      type="number"
                      min="1"
                    />
                  </div>
                  {products.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProduct(product.id)}
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" onClick={addProduct} className="mt-3">
              <Plus className="w-4 h-4 mr-1" /> Add Another Product
            </Button>
          </div>

          {/* Additional notes */}
          <div className="space-y-1.5">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea id="notes" placeholder="Any special requirements, freight needs, etc." rows={4} />
          </div>

          <Button
            type="submit"
            className="w-full bg-header-primary hover:bg-header-primary-hover text-white font-bold uppercase tracking-wide"
          >
            Submit Quote Request
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
