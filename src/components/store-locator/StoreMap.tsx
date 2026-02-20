import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue with bundlers
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const selectedRedIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: markerShadow,
  iconSize: [35, 56],
  iconAnchor: [17, 56],
  popupAnchor: [1, -44],
  shadowSize: [56, 56],
});

interface StorePin {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  isOnline?: boolean;
}

interface StoreMapProps {
  stores: StorePin[];
  selectedStoreId?: string | null;
  onSelectStore: (id: string) => void;
}

export function StoreMap({ stores, selectedStoreId, onSelectStore }: StoreMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  const physicalStores = stores.filter((s) => !s.isOnline);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [39.5, -121.5],
      zoom: 6,
      scrollWheelZoom: false,
      zoomControl: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      dragging: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapRef.current = map;

    // Fit bounds to all stores and lock max zoom out
    if (physicalStores.length > 0) {
      const bounds = L.latLngBounds(physicalStores.map((s) => [s.lat, s.lng] as L.LatLngTuple));
      map.fitBounds(bounds, { padding: [40, 40] });
      // After fitting, lock this as the min zoom (max zoom-out)
      setTimeout(() => {
        const initialZoom = map.getZoom();
        map.setMinZoom(initialZoom);
      }, 100);
    }

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add/update markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    physicalStores.forEach((store) => {
      const isSelected = store.id === selectedStoreId;
      const icon = isSelected ? selectedRedIcon : redIcon;

      const directionsUrl = `https://maps.google.com/?daddr=${encodeURIComponent(
        `${store.address}, ${store.city}, ${store.state}, ${store.zip}`
      )}`;

      // Extract short name (e.g. "San Leandro" from "Fasteners Inc San Leandro")
      const shortName = store.name.replace(/^(Fasteners Inc\s*|Redding Fasteners|Red Bluff Fasteners|Reno Fasteners)/i, '').trim() || store.name;

      // Offset Anderson left so it doesn't overlap with Redding
      const tooltipDirection: L.Direction =
        store.id === "anderson" ? "left" : "right";
      const tooltipOffset: L.PointExpression =
        store.id === "anderson" ? [-12, -14] : [12, -14];

      const marker = L.marker([store.lat, store.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<strong>${store.name}</strong><br/>${store.city}, ${store.state}<br/><a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="color:#c41230;font-weight:600;text-decoration:none;">Get Directions →</a>`
        )
        .bindTooltip(store.name, {
          permanent: true,
          direction: tooltipDirection,
          offset: tooltipOffset,
          className: "store-label-tooltip",
        });

      marker.on("click", () => onSelectStore(store.id));
      markersRef.current.set(store.id, marker);
    });
  }, [physicalStores, selectedStoreId, onSelectStore]);

  // Fly to selected store, or reset to overview
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (selectedStoreId) {
      const store = physicalStores.find((s) => s.id === selectedStoreId);
      if (store) {
        map.flyTo([store.lat, store.lng], 12, { duration: 0.8 });
      }
    } else if (physicalStores.length > 0) {
      const bounds = L.latLngBounds(physicalStores.map((s) => [s.lat, s.lng] as L.LatLngTuple));
      map.flyToBounds(bounds, { padding: [40, 40], duration: 0.8 });
    }
  }, [selectedStoreId, physicalStores]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full z-0" />
      {!selectedStoreId && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-foreground/80 text-background text-xs font-semibold px-3 py-1.5 rounded-full pointer-events-none z-[1000]">
          Click a store to zoom in
        </div>
      )}
    </div>
  );
}
