import React, { useEffect, useRef, useState } from 'react';
import { FavoritePlace, PartnerLocation, UserProfile } from '../types';
import L from 'leaflet';
import { MapPin, Battery, Smile, Plus, Navigation, Heart, Compass } from 'lucide-react';

interface LocationMapViewProps {
  currentUser: UserProfile;
  partnerLocation: PartnerLocation;
  places: FavoritePlace[];
  onAddPlace: (place: FavoritePlace) => void;
}

export const LocationMapView: React.FC<LocationMapViewProps> = ({
  currentUser,
  partnerLocation,
  places,
  onAddPlace,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New place form
  const [placeName, setPlaceName] = useState('');
  const [category, setCategory] = useState<FavoritePlace['category']>('Lugar Especial');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState('40.416775');
  const [lng, setLng] = useState('-3.70379');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Initialize Leaflet Map centered around Madrid or default coordinates
      const map = L.map(mapContainerRef.current).setView([40.416775, -3.70379], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add Partner Location Marker
    const partnerIcon = L.divIcon({
      className: 'custom-leaflet-marker',
      html: `<div style="background-color: #f43f5e; color: white; padding: 6px 10px; border-radius: 12px; font-weight: bold; font-size: 11px; border: 2px solid white; box-shadow: 0 4px 10px rgba(244,63,94,0.4); display: flex; items-center; gap: 4px;">
        💖 ${partnerLocation.user} (${partnerLocation.batteryLevel}%)
      </div>`,
    });

    L.marker([partnerLocation.lat, partnerLocation.lng], { icon: partnerIcon })
      .addTo(map)
      .bindPopup(`<b>${partnerLocation.user}</b><br/>${partnerLocation.address}<br/>Estado: ${partnerLocation.statusMood}`);

    // Add Favorite Couple Places Markers
    places.forEach((p) => {
      const placeIcon = L.divIcon({
        className: 'custom-place-marker',
        html: `<div style="background-color: #a855f7; color: white; padding: 4px 8px; border-radius: 10px; font-size: 10px; border: 1.5px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
          📍 ${p.name}
        </div>`,
      });

      L.marker([p.lat, p.lng], { icon: placeIcon })
        .addTo(map)
        .bindPopup(`<b>${p.name}</b> (${p.category})<br/>${p.description}`);
    });
  }, [partnerLocation, places]);

  const handleCreatePlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!placeName) return;

    const newPlace: FavoritePlace = {
      id: `pl-${Date.now()}`,
      name: placeName,
      category,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      address: address.trim() || 'Ubicación de pareja',
      description: description.trim() || 'Nuestro lugar especial',
    };

    onAddPlace(newPlace);
    setShowAddModal(false);
    setPlaceName('');
    setDescription('');
  };

  const partnerName = currentUser === 'Sofi' ? 'Fer' : 'Sofi';

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-white">Ubicación & Mapa de Lugares Especiales</h2>
          </div>
          <p className="text-xs text-slate-400">
            Sigue la posición de {partnerName} y guarda los rincones donde vive su amor 💕
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Añadir Lugar Especial</span>
        </button>
      </div>

      {/* Partner Live Status Bar */}
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
          <div>
            <h3 className="text-xs font-bold text-white">{partnerName} está en:</h3>
            <p className="text-xs text-rose-300 font-medium">{partnerLocation.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Battery className="w-4 h-4 text-emerald-400" /> {partnerLocation.batteryLevel}%</span>
          <span className="flex items-center gap-1"><Smile className="w-4 h-4 text-amber-400" /> {partnerLocation.statusMood}</span>
        </div>
      </div>

      {/* Leaflet Interactive Map Container */}
      <div className="h-96 w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative z-10">
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Favorite Places Cards */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Compass className="w-4 h-4 text-purple-400" />
          <span>Rincones Mágicos Guardados ({places.length})</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {places.map((p) => (
            <div key={p.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-3 shadow-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">
                    {p.category}
                  </span>
                  <h4 className="text-xs font-bold text-white">{p.name}</h4>
                </div>
                <p className="text-xs text-slate-300">{p.description}</p>
                <p className="text-[10px] text-slate-500">📍 {p.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Place Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-serif">Guardar Lugar Especial</h3>

            <form onSubmit={handleCreatePlace} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Nombre del lugar:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Mirador del Atardecer, Restaurante del 1er Aniversario..."
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Categoría:</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                >
                  <option value="Restaurante">Restaurante</option>
                  <option value="Primer Beso">Primer Beso</option>
                  <option value="Viaje">Viaje</option>
                  <option value="Lugar Especial">Lugar Especial</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Dirección / Descripción:</label>
                <input
                  type="text"
                  placeholder="Ej: Av. Principal 12..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Latitud:</label>
                  <input
                    type="text"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Longitud:</label>
                  <input
                    type="text"
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                >
                  Guardar Lugar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
