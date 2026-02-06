import { useState } from "react";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Clock, Mail, Briefcase, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We'll get back to you within 1–2 business days.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-foreground mb-2 uppercase tracking-wide">
          Contact Us
        </h1>
        <p className="text-center text-muted-foreground mb-10">
          Have a question or need help? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-header-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground text-sm uppercase">Address</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    3721 Electro Way<br />
                    Redding, CA 96002, US
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-header-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground text-sm uppercase">Call Us</h3>
                  <a href="tel:5303193120" className="text-sm text-header-primary hover:underline font-medium">
                    (530) 319-3120
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-header-primary mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground text-sm uppercase">Business Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Monday – Friday: 9:00 AM – 5:00 PM PST<br />
                    Saturday – Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-3">
              <h3 className="font-bold text-foreground uppercase text-sm mb-2">Quick Links</h3>
              <a
                href="/quote"
                className="flex items-center gap-2 text-sm text-foreground hover:text-header-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                Request a Quote
              </a>
              <a
                href="https://www.fastenersinc.net/pages/careers"
                className="flex items-center gap-2 text-sm text-foreground hover:text-header-primary transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                Careers
              </a>
              <a
                href="https://www.fastenersinc.net/pages/receive-deals-by-text"
                className="flex items-center gap-2 text-sm text-foreground hover:text-header-primary transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Receive Deals by Text
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 md:p-8 space-y-5">
            <h2 className="font-bold text-foreground uppercase text-sm mb-2">Send Us a Message</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="c-firstName">
                  First Name <span className="text-header-primary">*</span>
                </Label>
                <Input id="c-firstName" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="c-lastName">
                  Last Name <span className="text-header-primary">*</span>
                </Label>
                <Input id="c-lastName" required />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-email">
                Email <span className="text-header-primary">*</span>
              </Label>
              <Input id="c-email" type="email" required />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-phone">Phone Number</Label>
              <Input id="c-phone" type="tel" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-subject">
                Subject <span className="text-header-primary">*</span>
              </Label>
              <Input id="c-subject" required placeholder="How can we help?" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-message">
                Message <span className="text-header-primary">*</span>
              </Label>
              <Textarea id="c-message" required rows={5} placeholder="Tell us more about your question or request..." />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="c-privacy"
                checked={privacyAgreed}
                onCheckedChange={(v) => setPrivacyAgreed(v === true)}
              />
              <Label htmlFor="c-privacy" className="text-xs font-normal cursor-pointer leading-relaxed">
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

            <Button
              type="submit"
              className="w-full bg-header-primary hover:bg-header-primary-hover text-white font-bold uppercase tracking-wide"
            >
              Send Message
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
