import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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

const selectedIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [35, 56],
  iconAnchor: [17, 56],
  popupAnchor: [1, -44],
  shadowSize: [56, 56],
});

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

function FitBounds({ stores }: { stores: StorePin[] }) {
  const map = useMap();
  const fitted = useRef(false);
  useEffect(() => {
    if (fitted.current) return;
    const physical = stores.filter((s) => !s.isOnline);
    if (physical.length === 0) return;
    const bounds = L.latLngBounds(physical.map((s) => [s.lat, s.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
    fitted.current = true;
  }, [stores, map]);
  return null;
}

function FlyToSelected({ store }: { store: StorePin | undefined }) {
  const map = useMap();
  useEffect(() => {
    if (store) {
      map.flyTo([store.lat, store.lng], 12, { duration: 0.8 });
    }
  }, [store, map]);
  return null;
}

export function StoreMap({ stores, selectedStoreId, onSelectStore }: StoreMapProps) {
  const physicalStores = stores.filter((s) => !s.isOnline);
  const selected = physicalStores.find((s) => s.id === selectedStoreId);

  return (
    <MapContainer
      center={[39.5, -121.5]}
      zoom={6}
      className="w-full h-full z-0"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds stores={physicalStores} />
      {selected && <FlyToSelected store={selected} />}
      {physicalStores.map((store) => (
        <Marker
          key={store.id}
          position={[store.lat, store.lng]}
          icon={store.id === selectedStoreId ? selectedIcon : new L.Icon.Default()}
          eventHandlers={{
            click: () => onSelectStore(store.id),
          }}
        >
          <Popup>
            <strong>{store.name}</strong>
            <br />
            {store.city}, {store.state}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
