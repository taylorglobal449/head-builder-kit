import { useState } from "react";
import { Phone, Clock, ChevronRight, MapPin } from "lucide-react";
import locationMapImage from "@/assets/location-map.jpg";

interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  hours: string;
}

const locations: Location[] = [
  {
    id: "anderson",
    name: "Anderson Fasteners Inc",
    address: "2030 Ponderosa Dr",
    city: "Anderson",
    state: "CA",
    zip: "96007",
    phone: "(530) 365-1777",
    hours: "Mon-Fri 7AM-5PM"
  },
  {
    id: "fresno",
    name: "Fresno Fasteners Inc",
    address: "5611 N Blackstone Ave",
    city: "Fresno",
    state: "CA",
    zip: "93710",
    phone: "(559) 353-2099",
    hours: "Mon-Fri 7AM-5PM"
  },
  {
    id: "medford",
    name: "Medford Fasteners Inc",
    address: "2160 N Pacific Hwy",
    city: "Medford",
    state: "OR",
    zip: "97501",
    phone: "(541) 772-0144",
    hours: "Mon-Fri 7AM-5PM"
  },
  {
    id: "red-bluff",
    name: "Red Bluff Fasteners Inc",
    address: "585 Antelope Blvd",
    city: "Red Bluff",
    state: "CA",
    zip: "96080",
    phone: "(530) 690-2641",
    hours: "Mon-Fri 7AM-5PM"
  },
  {
    id: "redding",
    name: "Redding Fasteners Inc",
    address: "8912 Airport Rd",
    city: "Redding",
    state: "CA",
    zip: "96002",
    phone: "(530) 223-4002",
    hours: "Mon-Fri 7AM-5PM"
  },
  {
    id: "reno",
    name: "Reno Fasteners",
    address: "570 Kietzke Lane",
    city: "Reno",
    state: "NV",
    zip: "89502",
    phone: "(775) 516-6050",
    hours: "Mon-Fri 7AM-5PM"
  },
  {
    id: "sacramento",
    name: "Sacramento Fasteners Inc",
    address: "6701 Power Inn Rd",
    city: "Sacramento",
    state: "CA",
    zip: "95828",
    phone: "(916) 661-6975",
    hours: "Mon-Fri 7AM-5PM"
  },
  {
    id: "san-jose",
    name: "San Jose Fasteners Inc",
    address: "2897 Monterey Hwy",
    city: "San Jose",
    state: "CA",
    zip: "95111",
    phone: "(408) 440-4746",
    hours: "Mon-Fri 7AM-5PM"
  },
  {
    id: "san-leandro",
    name: "San Leandro Fasteners Inc",
    address: "534 Lewelling Blvd",
    city: "San Leandro",
    state: "CA",
    zip: "94579",
    phone: "(510) 777-6050",
    hours: "Mon-Fri 7AM-5PM"
  },
];

export function InteractiveMap() {
  return (
    <section className="py-8 border-t border-border">
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Map */}
          <div className="md:col-span-4 p-4 md:p-6">
            <div className="w-full rounded-xl border border-border bg-muted/30 p-3">
              <img
                src={locationMapImage}
                alt="Fasteners Inc locations map"
                className="w-full h-[260px] md:h-[300px] lg:h-[340px] object-contain"
              />
            </div>
          </div>

          {/* Locations */}
          <div className="md:col-span-8 lg:col-span-4 p-4 md:p-6">
            <h2 className="text-xl font-black uppercase tracking-wide mb-4 text-center text-header-primary">
              Our Locations
            </h2>

            <div className="relative">
              {/* Red scroll indicator (visual) */}
              <div className="pointer-events-none absolute right-1 top-2 bottom-2 w-1 rounded-full bg-header-primary" />

              <div className="h-[260px] md:h-[300px] lg:h-[340px] overflow-y-auto pr-5 space-y-4">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className="bg-background border border-border rounded-lg p-4"
                  >
                    <h3 className="font-bold text-header-primary mb-1">
                      {location.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {location.address}, {location.city}, {location.state} {location.zip}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Phone:{" "}
                      <a
                        href={`tel:${location.phone}`}
                        className="hover:text-header-primary"
                      >
                        {location.phone}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Who we are */}
          <div className="md:col-span-12 lg:col-span-4 p-4 md:p-6">
            <h2 className="text-xl font-black uppercase tracking-wide mb-4 text-center text-header-primary">
              Who We Are
            </h2>

            <div className="bg-background border border-border rounded-xl p-5 text-sm text-foreground leading-relaxed space-y-4 md:h-auto lg:h-[340px] overflow-y-auto">
              <p>
                We are a proud, family-owned business built on trust, hard work, and a passion for quality tools. With 9 retail locations—and many more on the way—we&apos;ve been serving communities across California, Nevada, and Oregon for years. Our commitment has always been simple: <strong>Better Tools, Better Prices.</strong> Whether you&apos;re a professional contractor, a weekend DIYer, or somewhere in between, we&apos;re here to help you get the job done right.
              </p>
              <p>
                At our stores and online, you&apos;ll find over 40,000 different items—from bolts, nuts, and fasteners to power tools, safety gear, and more. We&apos;re more than just a hardware store; we&apos;re your one-stop shop for everything you need to build, repair, and create. We also offer bulk discounts and custom quotes, ensuring you always get the best value no matter the size of your project.
              </p>
              <p>
                We know that when you need a tool, you need it now. That&apos;s why we offer a variety of convenient shipping options to get your order to you quickly—no matter where you are. Our team is dedicated to delivering the products, service, and support you can rely on, every single time. From our family to yours, we&apos;ll always be there when you need a new tool.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

