import { useState } from "react";
import { Header } from "@/components/Header";
import { MapPin, Phone, Mail, Clock, ExternalLink, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  hours: string;
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
    hours: "Mon–Fri 7am–5pm, Sat 8am–4pm",
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
    hours: "Mon–Fri 7am–5pm, Sat 8am–4pm",
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
    image: "https://sl.storeify.app/images/base/store-1645058524.jpg",
    lat: 37.2947,
    lng: -121.8547,
    hours: "Mon–Fri 7am–5pm, Sat 8am–4pm",
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
    hours: "Mon–Fri 7am–5pm, Sat 8am–4pm",
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
    hours: "Mon–Fri 7am–5pm, Sat 8am–4pm",
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
    hours: "Mon–Fri 7am–5pm, Sat 8am–4pm",
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
    hours: "Mon–Fri 7am–5pm, Sat 8am–4pm",
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
    hours: "Mon–Fri 7am–5pm, Sat 8am–4pm",
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
    hours: "Mon–Fri 7am–5pm PST",
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
    hours: "Mon–Fri 7am–5pm, Sat 8am–4pm",
  },
];

export default function StoreLocatorPage() {
  const [search, setSearch] = useState("");
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

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

  const getStaticMapUrl = () => {
    const markers = STORES.map(
      (s) => `&markers=color:red%7C${s.lat},${s.lng}`
    ).join("");
    return `https://maps.googleapis.com/maps/api/staticmap?size=800x600&maptype=roadmap${markers}&key=`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-foreground text-background py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight">
            Store Locator
          </h1>
          <p className="mt-2 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
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
                      selectedStore?.id === store.id ? "bg-accent ring-2 ring-inset ring-header-primary" : ""
                    }`}
                    onClick={() => setSelectedStore(store)}
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
                        <span>{store.hours}</span>
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
                        variant="outline"
                        className="text-xs"
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a
                          href={`https://www.fastenersinc.net/a/store-locator/${store.id}.html`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Details
                        </a>
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
          <div className="rounded-md border overflow-hidden bg-muted min-h-[500px] lg:min-h-0 flex flex-col">
            {selectedStore ? (
              <div className="flex flex-col h-full">
                {/* Selected store detail */}
                <div className="p-6 bg-card border-b">
                  <div className="flex items-start gap-4">
                    {selectedStore.image && (
                      <img
                        src={selectedStore.image}
                        alt={selectedStore.name}
                        className="w-24 h-24 object-cover rounded-md shrink-0"
                      />
                    )}
                    <div>
                      <h2 className="text-xl font-bold text-header-primary">
                        {selectedStore.name}
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedStore.address}, {selectedStore.city},{" "}
                        {selectedStore.state} {selectedStore.zip}
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          className="bg-header-primary hover:bg-header-primary-hover text-white"
                          asChild
                        >
                          <a
                            href={getDirectionsUrl(selectedStore)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Navigation className="w-3 h-3 mr-1" />
                            Get Directions
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`tel:${selectedStore.phone}`}>
                            <Phone className="w-3 h-3 mr-1" />
                            Call
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`mailto:${selectedStore.email}`}>
                            <Mail className="w-3 h-3 mr-1" />
                            Email
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Embedded map for selected store */}
                <div className="flex-1 min-h-[400px]">
                  <iframe
                    title={`Map of ${selectedStore.name}`}
                    src={`https://www.google.com/maps?q=${selectedStore.lat},${selectedStore.lng}&z=15&output=embed`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              /* Overview map */
              <div className="flex flex-col h-full">
                <div className="p-4 bg-card border-b">
                  <h2 className="font-bold text-lg">All Locations</h2>
                  <p className="text-sm text-muted-foreground">
                    Click a store on the left to see details and a focused map.
                  </p>
                </div>
                <div className="flex-1 min-h-[400px]">
                  <iframe
                    title="All Fasteners Inc Locations"
                    src="https://www.google.com/maps?q=Fasteners+Inc+Redding+CA&z=5&output=embed"
                    className="w-full h-full border-0"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
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
                className="border rounded-md p-4 bg-card hover:shadow-md transition-shadow"
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
