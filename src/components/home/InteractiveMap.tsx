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
    <section className="py-6 border-t border-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Map */}
        <div className="lg:col-span-3">
          <img
            src={locationMapImage}
            alt="Fasteners Inc locations map"
            className="w-full h-[340px] object-cover rounded-lg border border-border"
          />
        </div>

        {/* Locations */}
        <div className="lg:col-span-4">
          <h2 className="text-lg font-black uppercase tracking-wide mb-3 text-header-primary">
            Our Locations
          </h2>
          <div className="h-[300px] overflow-y-auto pr-1 space-y-2">
            {locations.map((location) => (
              <div key={location.id} className="border-b border-border pb-2 last:border-b-0">
                <h3 className="font-bold text-header-primary text-sm">{location.name}</h3>
                <p className="text-xs text-muted-foreground">{location.address}, {location.city}, {location.state} {location.zip}</p>
                <p className="text-xs text-muted-foreground">
                  Phone: <a href={`tel:${location.phone}`} className="hover:text-header-primary">{location.phone}</a>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Who we are */}
        <div className="lg:col-span-5">
          <h2 className="text-lg font-black uppercase tracking-wide mb-3 text-header-primary">
            Who We Are
          </h2>
          <div className="h-[300px] overflow-y-auto pr-1 text-sm text-foreground leading-relaxed space-y-3">
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
        </div>
      </div>
    </section>
  );
}

