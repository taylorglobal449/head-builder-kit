import { useState } from "react";
import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";
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
  coords: { x: number; y: number }; // Percentage positions on map
}

// Coordinates based on the actual Fasteners Inc location map image
// The map shows California, Oregon, and Nevada region
const locations: Location[] = [
  {
    id: "medford",
    name: "Medford Fasteners Inc",
    address: "2160 N Pacific Hwy",
    city: "Medford",
    state: "OR",
    zip: "97501",
    phone: "(541) 772-0144",
    hours: "Mon-Fri 7AM-5PM",
    coords: { x: 28, y: 12 } // Southern Oregon, top of map
  },
  {
    id: "redding",
    name: "Redding Fasteners Inc",
    address: "8912 Airport Rd",
    city: "Redding",
    state: "CA",
    zip: "96002",
    phone: "(530) 223-4002",
    hours: "Mon-Fri 7AM-5PM",
    coords: { x: 30, y: 24 } // Northern CA
  },
  {
    id: "anderson",
    name: "Anderson Fasteners Inc",
    address: "2030 Ponderosa Dr",
    city: "Anderson",
    state: "CA",
    zip: "96007",
    phone: "(530) 365-1777",
    hours: "Mon-Fri 7AM-5PM",
    coords: { x: 32, y: 26 } // Just south of Redding
  },
  {
    id: "red-bluff",
    name: "Red Bluff Fasteners Inc",
    address: "585 Antelope Blvd",
    city: "Red Bluff",
    state: "CA",
    zip: "96080",
    phone: "(530) 690-2641",
    hours: "Mon-Fri 7AM-5PM",
    coords: { x: 31, y: 30 } // South of Anderson
  },
  {
    id: "reno",
    name: "Reno Fasteners",
    address: "570 Kietzke Lane",
    city: "Reno",
    state: "NV",
    zip: "89502",
    phone: "(775) 516-6050",
    hours: "Mon-Fri 7AM-5PM",
    coords: { x: 55, y: 35 } // Nevada, east side of map
  },
  {
    id: "sacramento",
    name: "Sacramento Fasteners Inc",
    address: "6701 Power Inn Rd",
    city: "Sacramento",
    state: "CA",
    zip: "95828",
    phone: "(916) 661-6975",
    hours: "Mon-Fri 7AM-5PM",
    coords: { x: 35, y: 45 } // Central CA
  },
  {
    id: "san-leandro",
    name: "San Leandro Fasteners Inc",
    address: "534 Lewelling Blvd",
    city: "San Leandro",
    state: "CA",
    zip: "94579",
    phone: "(510) 777-6050",
    hours: "Mon-Fri 7AM-5PM",
    coords: { x: 22, y: 52 } // Bay Area, north
  },
  {
    id: "san-jose",
    name: "San Jose Fasteners Inc",
    address: "2897 Monterey Hwy",
    city: "San Jose",
    state: "CA",
    zip: "95111",
    phone: "(408) 440-4746",
    hours: "Mon-Fri 7AM-5PM",
    coords: { x: 24, y: 58 } // Bay Area, south of San Leandro
  },
  {
    id: "fresno",
    name: "Fresno Fasteners Inc",
    address: "5611 N Blackstone Ave",
    city: "Fresno",
    state: "CA",
    zip: "93710",
    phone: "(559) 353-2099",
    hours: "Mon-Fri 7AM-5PM",
    coords: { x: 38, y: 68 } // Central Valley, south
  },
];

export function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(locations[0]);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  return (
    <section className="py-8 border-t border-border">
      <h2 className="text-xl font-black text-foreground uppercase tracking-wide mb-6">
        Find A Location Near You
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Map Container */}
        <div className="relative bg-muted rounded-lg overflow-hidden" style={{ minHeight: '500px' }}>
          {/* Location Map Image */}
          <img 
            src={locationMapImage}
            alt="Fasteners Inc Locations Map"
            className="w-full h-full object-contain absolute inset-0"
          />
          
          {/* Location Pins Overlay */}
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              onMouseEnter={() => setHoveredLocation(location.id)}
              onMouseLeave={() => setHoveredLocation(null)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 z-10 ${
                selectedLocation?.id === location.id || hoveredLocation === location.id
                  ? 'scale-150 z-20'
                  : 'scale-100'
              }`}
              style={{ left: `${location.coords.x}%`, top: `${location.coords.y}%` }}
              title={`${location.city}, ${location.state}`}
            >
              <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                selectedLocation?.id === location.id 
                  ? 'bg-header-primary' 
                  : 'bg-destructive'
              }`} />
              {(hoveredLocation === location.id || selectedLocation?.id === location.id) && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-popover text-popover-foreground px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap text-xs font-bold border border-border">
                  {location.city}, {location.state}
                </div>
              )}
            </button>
          ))}
        </div>
        
        {/* Location List */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="bg-header-secondary px-4 py-3">
            <h3 className="text-primary-foreground font-bold text-sm uppercase tracking-wide">
              Our {locations.length} Locations
            </h3>
          </div>
          
          <div className="divide-y divide-border max-h-[500px] overflow-y-auto">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className={`w-full text-left px-4 py-3 transition-colors ${
                  selectedLocation?.id === location.id 
                    ? 'bg-header-primary/10' 
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-sm mb-0.5 ${
                      selectedLocation?.id === location.id ? 'text-header-primary' : 'text-foreground'
                    }`}>
                      {location.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {location.address}, {location.city}, {location.state} {location.zip}
                    </p>
                    
                    {selectedLocation?.id === location.id && (
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="w-3 h-3 flex-shrink-0" />
                          <a href={`tel:${location.phone}`} className="hover:text-header-primary">
                            {location.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 flex-shrink-0" />
                          <span>{location.hours}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-0.5 transition-transform ${
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
