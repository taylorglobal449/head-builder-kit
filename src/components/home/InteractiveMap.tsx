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
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(locations[0]);

  return (
    <section className="py-8 border-t border-border">
      <h2 className="text-xl font-black text-foreground uppercase tracking-wide mb-4">
        Find A Location Near You
      </h2>

      {/* Compact horizontal layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Map Image - 1/4 width on desktop */}
        <div className="lg:col-span-3 rounded-lg overflow-hidden border border-border h-fit">
          <img 
            src={locationMapImage}
            alt="Fasteners Inc Locations Map"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Company Story - 5/12 width */}
        <div className="lg:col-span-5 bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-foreground leading-relaxed mb-3">
            We are a proud, family-owned business built on trust, hard work, and a passion for quality tools. With 9 retail locations—and many more on the way—we've been serving communities across California, Nevada, and Oregon for years. Our commitment has always been simple: <strong>Better Tools, Better Prices.</strong>
          </p>
          <p className="text-sm text-foreground leading-relaxed mb-3">
            At our stores and online, you'll find over 40,000 different items—from bolts, nuts, and fasteners to power tools, safety gear, and more. We're more than just a hardware store; we're your one-stop shop for everything you need to build, repair, and create.
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            We know that when you need a tool, you need it now. That's why we offer a variety of convenient shipping options to get your order to you quickly—no matter where you are. From our family to yours, we'll always be there when you need a new tool.
          </p>
        </div>
        
        {/* Location List - 4/12 width */}
        <div className="lg:col-span-4 bg-card border border-border rounded-lg overflow-hidden h-fit">
          <div className="bg-header-secondary px-4 py-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary-foreground" />
            <h3 className="text-primary-foreground font-bold text-xs uppercase tracking-wide">
              Our {locations.length} Locations
            </h3>
          </div>
          
          <div className="divide-y divide-border max-h-[280px] overflow-y-auto">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className={`w-full text-left px-3 py-2 transition-colors ${
                  selectedLocation?.id === location.id 
                    ? 'bg-muted' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-xs mb-0.5 ${
                      selectedLocation?.id === location.id ? 'text-header-primary' : 'text-foreground'
                    }`}>
                      {location.name}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {location.city}, {location.state}
                    </p>
                    
                    {selectedLocation?.id === location.id && (
                      <div className="mt-1 space-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3 flex-shrink-0" />
                          <a href={`tel:${location.phone}`} className="hover:text-header-primary">
                            {location.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 flex-shrink-0" />
                          <span>{location.hours}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <ChevronRight className={`w-3 h-3 flex-shrink-0 mt-0.5 transition-transform ${
                    selectedLocation?.id === location.id 
                      ? 'text-header-primary rotate-90' 
                      : 'text-muted-foreground'
                  }`} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
