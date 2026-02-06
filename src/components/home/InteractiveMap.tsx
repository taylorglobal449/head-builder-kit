import { useState } from "react";
import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";

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

const locations: Location[] = [
  {
    id: "minneapolis",
    name: "Minneapolis Headquarters",
    address: "1234 Industrial Blvd",
    city: "Minneapolis",
    state: "MN",
    zip: "55401",
    phone: "(612) 555-0100",
    hours: "Mon-Fri 7AM-6PM, Sat 8AM-4PM",
    coords: { x: 48, y: 32 }
  },
  {
    id: "chicago",
    name: "Chicago Distribution",
    address: "5678 Commerce Way",
    city: "Chicago",
    state: "IL",
    zip: "60601",
    phone: "(312) 555-0200",
    hours: "Mon-Fri 7AM-5PM, Sat 8AM-2PM",
    coords: { x: 52, y: 38 }
  },
  {
    id: "denver",
    name: "Denver Branch",
    address: "910 Mountain View Dr",
    city: "Denver",
    state: "CO",
    zip: "80201",
    phone: "(303) 555-0300",
    hours: "Mon-Fri 7AM-5PM",
    coords: { x: 32, y: 42 }
  },
  {
    id: "dallas",
    name: "Dallas Warehouse",
    address: "2468 Texas Trade Pkwy",
    city: "Dallas",
    state: "TX",
    zip: "75201",
    phone: "(214) 555-0400",
    hours: "Mon-Fri 6AM-6PM, Sat 7AM-3PM",
    coords: { x: 42, y: 62 }
  },
  {
    id: "phoenix",
    name: "Phoenix Service Center",
    address: "1357 Desert Industrial",
    city: "Phoenix",
    state: "AZ",
    zip: "85001",
    phone: "(602) 555-0500",
    hours: "Mon-Fri 6AM-5PM",
    coords: { x: 22, y: 58 }
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
      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
        {/* Map Container */}
        <div className="relative bg-muted rounded-lg overflow-hidden min-h-[400px]">
          {/* Simple US Map Background */}
          <svg 
            viewBox="0 0 100 60" 
            className="w-full h-full absolute inset-0"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Simplified US outline */}
            <path
              d="M10,15 L25,12 L40,10 L55,8 L70,10 L85,15 L90,25 L88,35 L90,45 L85,55 L70,58 L55,55 L40,58 L25,55 L15,50 L10,40 L8,30 L10,15 Z"
              fill="hsl(var(--muted))"
              stroke="hsl(var(--border))"
              strokeWidth="0.5"
              className="opacity-80"
            />
          </svg>
          
          {/* Location Pins */}
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              onMouseEnter={() => setHoveredLocation(location.id)}
              onMouseLeave={() => setHoveredLocation(null)}
              className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-200 ${
                selectedLocation?.id === location.id || hoveredLocation === location.id
                  ? 'scale-125 z-10'
                  : 'scale-100'
              }`}
              style={{ left: `${location.coords.x}%`, top: `${location.coords.y}%` }}
            >
              <MapPin 
                className={`w-8 h-8 drop-shadow-lg transition-colors ${
                  selectedLocation?.id === location.id 
                    ? 'text-header-primary fill-header-primary/20' 
                    : 'text-destructive fill-destructive/20'
                }`} 
              />
              {(hoveredLocation === location.id || selectedLocation?.id === location.id) && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-popover text-popover-foreground px-3 py-1.5 rounded-md shadow-lg whitespace-nowrap text-sm font-medium border border-border">
                  {location.city}, {location.state}
                </div>
              )}
            </button>
          ))}
          
          {/* Map overlay for interactivity hint */}
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-md text-xs text-muted-foreground">
            Click a pin to view location details
          </div>
        </div>
        
        {/* Location List */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="bg-header-secondary px-4 py-3">
            <h3 className="text-primary-foreground font-bold text-sm uppercase tracking-wide">
              Our Locations
            </h3>
          </div>
          
          <div className="divide-y divide-border max-h-[400px] overflow-y-auto">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className={`w-full text-left px-4 py-4 transition-colors ${
                  selectedLocation?.id === location.id 
                    ? 'bg-header-primary/10' 
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-sm mb-1 ${
                      selectedLocation?.id === location.id ? 'text-header-primary' : 'text-foreground'
                    }`}>
                      {location.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {location.address}, {location.city}, {location.state} {location.zip}
                    </p>
                    
                    {selectedLocation?.id === location.id && (
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Phone className="w-3.5 h-3.5" />
                          <span>{location.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{location.hours}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-transform ${
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
