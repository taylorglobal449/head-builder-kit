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

const selectedIconOptions: L.IconOptions = {
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [35, 56],
  iconAnchor: [17, 56],
  popupAnchor: [1, -44],
  shadowSize: [56, 56],
};

interface StorePin {
  id: string;
  name: string;
  city: string;
  state: string;
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
      scrollWheelZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapRef.current = map;

    // Fit bounds to all stores
    if (physicalStores.length > 0) {
      const bounds = L.latLngBounds(physicalStores.map((s) => [s.lat, s.lng] as L.LatLngTuple));
      map.fitBounds(bounds, { padding: [40, 40] });
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
      const icon = isSelected
        ? L.icon(selectedIconOptions)
        : new L.Icon.Default();

      const marker = L.marker([store.lat, store.lng], { icon })
        .addTo(map)
        .bindPopup(`<strong>${store.name}</strong><br/>${store.city}, ${store.state}`);

      marker.on("click", () => onSelectStore(store.id));
      markersRef.current.set(store.id, marker);
    });
  }, [physicalStores, selectedStoreId, onSelectStore]);

  // Fly to selected store
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedStoreId) return;
    const store = physicalStores.find((s) => s.id === selectedStoreId);
    if (store) {
      map.flyTo([store.lat, store.lng], 12, { duration: 0.8 });
    }
  }, [selectedStoreId, physicalStores]);

  return <div ref={containerRef} className="w-full h-full z-0" />;
}
