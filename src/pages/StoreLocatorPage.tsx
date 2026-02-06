import { useState } from "react";
import { Header } from "@/components/Header";
import { MapPin, Phone, Mail, Clock, Navigation, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StoreMap } from "@/components/store-locator/StoreMap";

interface StoreHours {
  day: string;
  hours: string;
}

interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  image: string;
  lat: number;
  lng: number;
  description: string;
  hoursTable: StoreHours[];
  shortHours: string;
  isOnline?: boolean;
}

const STORES: Store[] = [
  {
    id: "san-leandro",
    name: "Fasteners Inc San Leandro",
    address: "534 Lewelling Blvd",
    city: "San Leandro",
    state: "CA",
    zip: "94579",
    phone: "510-777-6050",
    email: "slsales@fastenersinc.net",
    image: "https://sl.storeify.app/images/base/store-1737447941.png",
    lat: 37.6947,
    lng: -122.1561,
    description: "Fasteners Inc. has opened a brand new store in San Leandro. In addition to our extensive range of fasteners, we also stock power tools from top brands like DeWalt, Makita, Milwaukee, and Metabo. We're your one-stop shop in San Leandro for power tools, fasteners, accessories, and so much more! We proudly offer free deliveries to your business or job site in the bay area. Conveniently located off Hesperian Blvd near the 880-238 interchange.",
    shortHours: "Mon–Fri 7am–6pm, Sat 9am–5pm, Sun Closed",
    hoursTable: [
      { day: "Monday", hours: "7:00 AM – 6:00 PM" },
      { day: "Tuesday", hours: "7:00 AM – 6:00 PM" },
      { day: "Wednesday", hours: "7:00 AM – 6:00 PM" },
      { day: "Thursday", hours: "7:00 AM – 6:00 PM" },
      { day: "Friday", hours: "7:00 AM – 6:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 5:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
  },
  {
    id: "sacramento",
    name: "Fasteners Inc Sacramento",
    address: "6701 Power Inn Rd Ste A",
    city: "Sacramento",
    state: "CA",
    zip: "95828",
    phone: "(916) 661-6975",
    email: "sales@fastenersinc.net",
    image: "https://sl.storeify.app/images/base/store-1714427121.jpg",
    lat: 38.5119,
    lng: -121.4419,
    description: "Since 2017, Sacramento Fasteners Inc. has been a reliable place to find low prices and deals on power tools, accessories, batteries, workwear, and fasteners. Being the biggest Fasteners Inc. store in California, you can expect to find all your tool needs in our large showroom. We have one of the largest displays of Occidental Leather in the US. Find amazing deals on DeWalt, Makita, Milwaukee, Knipex, Diablo, Wera, Vessel, Veto, and more. Located on Power Inn Road between Florin and Elder Creek.",
    shortHours: "Mon–Fri 7am–5:30pm, Sat–Sun 9am–3pm",
    hoursTable: [
      { day: "Monday", hours: "7:00 AM – 5:30 PM" },
      { day: "Tuesday", hours: "7:00 AM – 5:30 PM" },
      { day: "Wednesday", hours: "7:00 AM – 5:30 PM" },
      { day: "Thursday", hours: "7:00 AM – 5:30 PM" },
      { day: "Friday", hours: "7:00 AM – 5:30 PM" },
      { day: "Saturday", hours: "9:00 AM – 3:00 PM" },
      { day: "Sunday", hours: "9:00 AM – 3:00 PM" },
    ],
  },
  {
    id: "san-jose",
    name: "Fasteners Inc San Jose",
    address: "2897 Monterey Rd",
    city: "San Jose",
    state: "CA",
    zip: "95111",
    phone: "(408) 440-4746",
    email: "sjsales@fastenersinc.net",
    image: "https://www.fastenersinc.net/images/base/store-1645058524.jpg",
    lat: 37.2947,
    lng: -121.8547,
    description: "Our San Jose store opened just TWO days before the 2020 COVID shutdown. Withstanding the test of the economy and global pandemic, our San Jose location is now an established destination for power tools, accessories, workwear, hand tools, and hardware. We have the largest display of Festool and Knipex in the south bay area, and also stock harder-to-find brands like Shaper, Bessey, Vessel, Wera, Blaklader, and many more! Located on Monterey Highway and Pullman Way.",
    shortHours: "Mon–Fri 7am–6pm, Sat–Sun 9am–5pm",
    hoursTable: [
      { day: "Monday", hours: "7:00 AM – 6:00 PM" },
      { day: "Tuesday", hours: "7:00 AM – 6:00 PM" },
      { day: "Wednesday", hours: "7:00 AM – 6:00 PM" },
      { day: "Thursday", hours: "7:00 AM – 6:00 PM" },
      { day: "Friday", hours: "7:00 AM – 6:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 5:00 PM" },
      { day: "Sunday", hours: "9:00 AM – 5:00 PM" },
    ],
  },
  {
    id: "anderson",
    name: "Fasteners Inc Anderson",
    address: "2030 Ponderosa Dr",
    city: "Anderson",
    state: "CA",
    zip: "96007",
    phone: "(530) 365-1777",
    email: "andsales@fastenersinc.net",
    image: "https://sl.storeify.app/images/base/store-1643814050.png",
    lat: 40.4485,
    lng: -122.2953,
    description: "Our Anderson store has been proudly serving its community since October 2008. After 15 years, it has established itself as a popular place for power tools, accessories, hardware, woodworking equipment, and consumables. We stock well-known brands like DeWalt, Makita, Milwaukee, Mirka, Knipex and more at the best prices in Anderson! Located off Highway 273 by the factory outlet stores.",
    shortHours: "Mon–Fri 7am–5pm, Sat 9am–3pm, Sun Closed",
    hoursTable: [
      { day: "Monday", hours: "7:00 AM – 5:00 PM" },
      { day: "Tuesday", hours: "7:00 AM – 5:00 PM" },
      { day: "Wednesday", hours: "7:00 AM – 5:00 PM" },
      { day: "Thursday", hours: "7:00 AM – 5:00 PM" },
      { day: "Friday", hours: "7:00 AM – 5:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 3:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
  },
  {
    id: "reno",
    name: "Reno Fasteners",
    address: "570 Kietzke Lane",
    city: "Reno",
    state: "NV",
    zip: "89502",
    phone: "775-516-6050",
    email: "sales@renofasteners.com",
    image: "",
    lat: 39.5122,
    lng: -119.7967,
    description: "Reno Fasteners brings the Fasteners Inc. experience to Northern Nevada. Visit us for power tools, fasteners, accessories, and hardware from all the top brands. Located on Kietzke Lane in Reno.",
    shortHours: "Mon–Fri 7am–5pm, Sat 9am–3pm, Sun Closed",
    hoursTable: [
      { day: "Monday", hours: "7:00 AM – 5:00 PM" },
      { day: "Tuesday", hours: "7:00 AM – 5:00 PM" },
      { day: "Wednesday", hours: "7:00 AM – 5:00 PM" },
      { day: "Thursday", hours: "7:00 AM – 5:00 PM" },
      { day: "Friday", hours: "7:00 AM – 5:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 3:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
  },
  {
    id: "redding",
    name: "Redding Fasteners",
    address: "8912 Airport Rd.",
    city: "Redding",
    state: "CA",
    zip: "96002",
    phone: "(530) 223-4002",
    email: "rdgsales@fastenersinc.net",
    image: "https://sl.storeify.app/images/base/store-1645087170.jpeg",
    lat: 40.5093,
    lng: -122.3531,
    description: "Operating for over 17 years, our Redding location on Airport Road is the original Fasteners Inc. This store specializes in what we first started selling — fasteners. We are Redding's go-to place for fasteners, unistrut, structural fasteners, and threaded rod. We also sell power tools and accessories from DeWalt, Makita, Milwaukee, and many more brands. Located on Airport Road and Charlanne Drive.",
    shortHours: "Mon–Fri 6am–5pm, Sat 9am–3pm, Sun Closed",
    hoursTable: [
      { day: "Monday", hours: "6:00 AM – 5:00 PM" },
      { day: "Tuesday", hours: "6:00 AM – 5:00 PM" },
      { day: "Wednesday", hours: "6:00 AM – 5:00 PM" },
      { day: "Thursday", hours: "6:00 AM – 5:00 PM" },
      { day: "Friday", hours: "6:00 AM – 5:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 3:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
  },
  {
    id: "medford",
    name: "Fasteners Inc Medford",
    address: "2160 N Pacific Hwy",
    city: "Medford",
    state: "OR",
    zip: "97501",
    phone: "(541) 772-0144",
    email: "mdfsales@fastenersinc.net",
    image: "https://sl.storeify.app/images/base/store-1645059358.jpg",
    lat: 42.3478,
    lng: -122.8684,
    description: "Established in 2022, our Medford store is the go-to place for power tools, accessories, fasteners, and woodworking tools in Southern Oregon. Located in the old Medford Tools building, Fasteners Inc. Medford has become a woodworking and machinery supplies hotspot. Find DeWalt, Makita, Milwaukee, Sawstop, Jet, Festool, Wera, and Knipex at top deals. Located near the Rogue Valley Mall off North Pacific Highway. Don't forget to check out our beautiful Milwaukee mural!",
    shortHours: "Mon–Fri 8am–6pm, Sat 9am–3pm, Sun Closed",
    hoursTable: [
      { day: "Monday", hours: "8:00 AM – 6:00 PM" },
      { day: "Tuesday", hours: "8:00 AM – 6:00 PM" },
      { day: "Wednesday", hours: "8:00 AM – 6:00 PM" },
      { day: "Thursday", hours: "8:00 AM – 6:00 PM" },
      { day: "Friday", hours: "8:00 AM – 6:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 3:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
  },
  {
    id: "red-bluff",
    name: "Red Bluff Fasteners",
    address: "585 Antelope Boulevard",
    city: "Red Bluff",
    state: "CA",
    zip: "96080",
    phone: "(530) 690-2641",
    email: "rbsales@fastenersinc.net",
    image: "https://sl.storeify.app/images/base/store-1675987276.jpg",
    lat: 40.1787,
    lng: -122.2359,
    description: "Fasteners Inc. at Red Bluff has been operating for over ten years as the go-to destination for Senco fastening supplies. We have the largest open floor plan fastener selection in all of Tehama County! We also carry power tools from DeWalt, Makita, Milwaukee, and Metabo. We're Red Bluff's one-shop stop and we offer free deliveries to your business or job site! Located off Antelope Blvd by the Tehama County Fairgrounds.",
    shortHours: "Mon–Fri 8am–5pm, Sat–Sun Closed",
    hoursTable: [
      { day: "Monday", hours: "8:00 AM – 5:00 PM" },
      { day: "Tuesday", hours: "8:00 AM – 5:00 PM" },
      { day: "Wednesday", hours: "8:00 AM – 5:00 PM" },
      { day: "Thursday", hours: "8:00 AM – 5:00 PM" },
      { day: "Friday", hours: "8:00 AM – 5:00 PM" },
      { day: "Saturday", hours: "Closed" },
      { day: "Sunday", hours: "Closed" },
    ],
  },
  {
    id: "online",
    name: "Fasteners Inc Online Sales",
    address: "3721 Electro Way",
    city: "Redding",
    state: "CA",
    zip: "96002",
    phone: "(530) 319-3120",
    email: "onlinesales@fastenersinc.net",
    image: "https://sl.storeify.app/images/base/store-1645087132.jpeg",
    lat: 40.5565,
    lng: -122.3275,
    description: "Our Internet & Distribution center is the heartbeat of Fasteners Inc. This location ensures the success of each brick and mortar storefront and guarantees the satisfaction of every online customer. This department has the highest volume of nuts, bolts, and assorted hardware sold — hundreds of online customer invoices are fulfilled daily spanning across the entire United States! Although you won't be able to physically buy from this center, feel free to make purchases anytime through our website.",
    shortHours: "Mon–Fri 6am–5pm PST, Sat–Sun Closed",
    hoursTable: [
      { day: "Monday", hours: "6:00 AM – 5:00 PM" },
      { day: "Tuesday", hours: "6:00 AM – 5:00 PM" },
      { day: "Wednesday", hours: "6:00 AM – 5:00 PM" },
      { day: "Thursday", hours: "6:00 AM – 5:00 PM" },
      { day: "Friday", hours: "6:00 AM – 5:00 PM" },
      { day: "Saturday", hours: "Closed" },
      { day: "Sunday", hours: "Closed" },
    ],
    isOnline: true,
  },
  {
    id: "fresno",
    name: "Fasteners Inc Fresno",
    address: "5611 N Blackstone Ave",
    city: "Fresno",
    state: "CA",
    zip: "93710",
    phone: "(559) 353-2099",
    email: "fresnosales@fastenersinc.net",
    image: "https://sl.storeify.app/images/base/store-1737449050.jpg",
    lat: 36.8107,
    lng: -119.7879,
    description: "Being our newest tool store, Fresno Fasteners Inc. strives for the same success we have had in all our other stores. We are eager to serve Fresno residents with a quality selection of power tools, accessories, fasteners, woodworking tools, and workwear. Enjoy top deals on DeWalt, Makita, Milwaukee, Festool, and much more. Located in central Fresno off Blackstone/Bullard Street in the old Rasputin Records building.",
    shortHours: "Mon–Fri 7am–6pm, Sat 9am–4pm, Sun Closed",
    hoursTable: [
      { day: "Monday", hours: "7:00 AM – 6:00 PM" },
      { day: "Tuesday", hours: "7:00 AM – 6:00 PM" },
      { day: "Wednesday", hours: "7:00 AM – 6:00 PM" },
      { day: "Thursday", hours: "7:00 AM – 6:00 PM" },
      { day: "Friday", hours: "7:00 AM – 6:00 PM" },
      { day: "Saturday", hours: "9:00 AM – 4:00 PM" },
      { day: "Sunday", hours: "Closed" },
    ],
  },
];

// Build a Google Maps embed URL showing all store pins
function getAllPinsMapUrl() {
  // Use the "place" embed for multiple markers via a search query
  // This approach uses a custom My Maps or we build a directions-style multi-waypoint URL
  // Best approach: use Maps Embed API with a center + markers via waypoints
  const locations = STORES.filter((s) => !s.isOnline)
    .map((s) => `${s.lat},${s.lng}`)
    .join("|");
  // Use a directions embed that shows all waypoints as pins on the map
  const origin = `${STORES[0].lat},${STORES[0].lng}`;
  const waypoints = STORES.filter((s) => !s.isOnline)
    .slice(1, -1)
    .map((s) => `${s.lat},${s.lng}`)
    .join("|");
  const dest = `${STORES[STORES.length - 1].lat},${STORES[STORES.length - 1].lng}`;

  // Alternative: Use a simple search-based embed centered on California showing "Fasteners Inc"
  return `https://www.google.com/maps/d/embed?mid=1&z=5&center=39.5,-121.5`;
}

export default function StoreLocatorPage() {
  const [search, setSearch] = useState("");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const filteredStores = STORES.filter((s) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.state.toLowerCase().includes(q) ||
      s.zip.includes(q)
    );
  });

  const getDirectionsUrl = (store: Store) =>
    `https://maps.google.com/?daddr=${encodeURIComponent(
      `${store.address}, ${store.city}, ${store.state}, ${store.zip}`
    )}`;

  const handleSelectStore = (store: Store) => {
    setSelectedStore(store);
    setDetailOpen(true);
  };

  const getDayOfWeek = () => {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()];
  };

  const today = getDayOfWeek();

  // Build an overview map URL with all store markers
  const overviewMapSrc = (() => {
    // Use Google Maps embed showing multiple places via search
    // We'll use a "view" mode centered on California with a reasonable zoom
    const center = "39.3,-121.5";
    return `https://www.google.com/maps?q=Fasteners+Inc&z=6&ll=${center}&output=embed`;
  })();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-foreground text-background py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
            Store Locator
          </h1>
          <p className="mt-2 text-sm md:text-base max-w-2xl mx-auto opacity-80">
            Find a Fasteners Inc location near you. We have 9 retail stores across California, Oregon & Nevada — plus nationwide online sales.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="mb-6 flex gap-3 max-w-md">
          <Input
            placeholder="Search by city, state, or zip..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          {search && (
            <Button variant="outline" size="sm" onClick={() => setSearch("")}>
              Clear
            </Button>
          )}
        </div>

        <div className="grid lg:grid-cols-[400px_1fr] gap-6">
          {/* Store List */}
          <div>
            <div className="bg-foreground text-background px-4 py-2 rounded-t-md font-bold text-sm uppercase tracking-wide">
              Store List ({filteredStores.length} locations)
            </div>
            <ScrollArea className="h-[700px] border border-t-0 rounded-b-md">
              <div className="divide-y divide-border">
                {filteredStores.map((store) => (
                  <div
                    key={store.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-accent ${
                      selectedStore?.id === store.id
                        ? "bg-accent ring-2 ring-inset ring-header-primary"
                        : ""
                    }`}
                    onClick={() => handleSelectStore(store)}
                  >
                    {store.image && (
                      <img
                        src={store.image}
                        alt={store.name}
                        className="w-full h-36 object-cover rounded-md mb-3"
                        loading="lazy"
                      />
                    )}
                    <h3 className="font-bold text-header-primary text-base">
                      {store.name}
                      {store.isOnline && (
                        <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase bg-muted text-muted-foreground px-2 py-0.5 rounded">
                          <Globe className="w-3 h-3" /> Online Only
                        </span>
                      )}
                    </h3>
                    <div className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>
                          {store.address}, {store.city}, {store.state}{" "}
                          {store.zip}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 shrink-0" />
                        <a
                          href={`tel:${store.phone}`}
                          className="hover:text-header-primary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {store.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 shrink-0" />
                        <a
                          href={`mailto:${store.email}`}
                          className="hover:text-header-primary transition-colors truncate"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {store.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span>{store.shortHours}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a
                          href={getDirectionsUrl(store)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Navigation className="w-3 h-3 mr-1" />
                          Directions
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        className="text-xs bg-header-primary hover:bg-header-primary-hover text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectStore(store);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                {filteredStores.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    No stores found matching "{search}"
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Map Area */}
          <div className="rounded-md border overflow-hidden bg-muted min-h-[500px] lg:min-h-0 flex flex-col relative">
            {/* Detail overlay panel */}
            {selectedStore && detailOpen && (
              <div className="absolute inset-0 z-20 bg-card overflow-auto">
                <div className="sticky top-0 bg-card border-b z-10 p-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-header-primary">
                    {selectedStore.name}
                  </h2>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setDetailOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <div className="p-5">
                  {selectedStore.image && (
                    <img
                      src={selectedStore.image}
                      alt={selectedStore.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {selectedStore.description}
                  </p>

                  {/* Contact info */}
                  <div className="space-y-2 text-sm mb-5">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-0.5 text-header-primary shrink-0" />
                      <span>
                        {selectedStore.address}, {selectedStore.city},{" "}
                        {selectedStore.state} {selectedStore.zip}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-header-primary shrink-0" />
                      <a
                        href={`tel:${selectedStore.phone}`}
                        className="hover:text-header-primary transition-colors font-medium"
                      >
                        {selectedStore.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-header-primary shrink-0" />
                      <a
                        href={`mailto:${selectedStore.email}`}
                        className="hover:text-header-primary transition-colors"
                      >
                        {selectedStore.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours table */}
                  <div className="mb-5">
                    <h3 className="font-bold text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-header-primary" />
                      Store Hours
                    </h3>
                    <div className="border rounded-md overflow-hidden">
                      {selectedStore.hoursTable.map((h) => (
                        <div
                          key={h.day}
                          className={`flex justify-between px-3 py-2 text-sm border-b last:border-b-0 ${
                            h.day === today
                              ? "bg-header-primary/10 font-semibold"
                              : ""
                          }`}
                        >
                          <span>{h.day}</span>
                          <span
                            className={
                              h.hours === "Closed"
                                ? "text-destructive"
                                : ""
                            }
                          >
                            {h.hours}
                            {h.day === today && h.hours !== "Closed" && (
                              <span className="ml-2 text-[10px] uppercase bg-header-new text-white px-1.5 py-0.5 rounded font-bold">
                                Today
                              </span>
                            )}
                            {h.day === today && h.hours === "Closed" && (
                              <span className="ml-2 text-[10px] uppercase bg-destructive text-white px-1.5 py-0.5 rounded font-bold">
                                Today
                              </span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    <Button
                      className="bg-header-primary hover:bg-header-primary-hover text-white"
                      asChild
                    >
                      <a
                        href={getDirectionsUrl(selectedStore)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation className="w-4 h-4 mr-1.5" />
                        Get Directions
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={`tel:${selectedStore.phone}`}>
                        <Phone className="w-4 h-4 mr-1.5" />
                        Call Store
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={`mailto:${selectedStore.email}`}>
                        <Mail className="w-4 h-4 mr-1.5" />
                        Email
                      </a>
                    </Button>
                  </div>

                  {/* Embedded map for this store */}
                  <div className="rounded-md overflow-hidden border h-[300px]">
                    <iframe
                      title={`Map of ${selectedStore.name}`}
                      src={`https://www.google.com/maps?q=${selectedStore.lat},${selectedStore.lng}&z=15&output=embed`}
                      className="w-full h-full border-0"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Overview map with all pins */}
            <div className="flex flex-col h-full">
              <div className="p-4 bg-card border-b">
                <h2 className="font-bold text-lg">All Locations</h2>
                <p className="text-sm text-muted-foreground">
                  Click a pin to see full details, hours, and directions.
                </p>
              </div>
              <div className="flex-1 min-h-[400px]">
                <StoreMap
                  stores={STORES}
                  selectedStoreId={selectedStore?.id}
                  onSelectStore={(id) => {
                    const store = STORES.find((s) => s.id === id);
                    if (store) handleSelectStore(store);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* All stores quick grid for mobile */}
        <div className="mt-12 lg:hidden">
          <h2 className="text-2xl font-bold mb-6 uppercase tracking-tight">
            Quick Contact
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {STORES.filter((s) => !s.isOnline).map((store) => (
              <div
                key={store.id}
                className="border rounded-md p-4 bg-card hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleSelectStore(store)}
              >
                <h3 className="font-bold text-header-primary text-sm">
                  {store.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {store.city}, {store.state} {store.zip}
                </p>
                <a
                  href={`tel:${store.phone}`}
                  className="text-xs text-header-primary font-semibold mt-1 block"
                  onClick={(e) => e.stopPropagation()}
                >
                  {store.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
