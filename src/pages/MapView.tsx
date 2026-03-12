import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import {
  Building2, Cross, Clock, Phone, Star, Navigation,
  Filter, MapPin, Stethoscope, Pill, AlertCircle
} from 'lucide-react';
import { useGeolocation } from '../hooks/useGeolocation';
import { generateNearbyClinics } from '../data/clinics';
import { Clinic } from '../types';

// Fix Leaflet default icons
const defaultIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="width:14px;height:14px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const markerColors: Record<Clinic['type'], string> = {
  hospital: '#dc2626',
  urgent_care: '#f97316',
  clinic: '#059669',
  pharmacy: '#7c3aed',
};

function makeIcon(type: Clinic['type']) {
  const color = markerColors[type];
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="width:32px;height:32px;background:${color};border:3px solid white;border-radius:50%;box-shadow:0 2px 12px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        ${type === 'hospital' ? '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>' :
          type === 'pharmacy' ? '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>' :
          type === 'urgent_care' ? '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>' :
          '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>'}
      </svg>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  map.setView([lat, lng], 14);
  return null;
}

const typeConfig = {
  hospital: { label: 'Hospital', icon: Building2, color: 'text-red-600 bg-red-50 border-red-200' },
  urgent_care: { label: 'Urgent Care', icon: Cross, color: 'text-orange-600 bg-orange-50 border-orange-200' },
  clinic: { label: 'Clinic', icon: Stethoscope, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  pharmacy: { label: 'Pharmacy', icon: Pill, color: 'text-purple-600 bg-purple-50 border-purple-200' },
};

export default function MapView() {
  const { lat, lng, loading, error } = useGeolocation();
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  const clinics = useMemo(() => generateNearbyClinics(lat, lng), [lat, lng]);

  const filteredClinics = selectedType === 'all'
    ? clinics
    : clinics.filter(c => c.type === selectedType);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <div className="w-full lg:w-96 bg-white border-r border-slate-200 flex flex-col shrink-0 h-1/2 lg:h-full overflow-hidden">
        {/* Sidebar header */}
        <div className="p-4 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            Find Care Nearby
          </h1>
          {error && (
            <div className="mt-2 flex items-center gap-2 text-xs text-amber-600">
              <AlertCircle className="w-3 h-3" />
              {error}
            </div>
          )}

          {/* Filters */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setSelectedType('all')}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                selectedType === 'all'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Filter className="w-3 h-3 inline mr-1" />
              All ({clinics.length})
            </button>
            {Object.entries(typeConfig).map(([key, conf]) => {
              const count = clinics.filter(c => c.type === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedType(key)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    selectedType === key
                      ? conf.color
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {conf.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Clinic list */}
        <div className="flex-1 overflow-y-auto">
          {filteredClinics.map(clinic => {
            const conf = typeConfig[clinic.type];
            const Icon = conf.icon;
            const isSelected = selectedClinic?.id === clinic.id;

            return (
              <motion.button
                key={clinic.id}
                layout
                onClick={() => setSelectedClinic(clinic)}
                className={`w-full text-left p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                  isSelected ? 'bg-emerald-50 border-l-4 border-l-emerald-500' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${conf.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900 text-sm truncate">{clinic.name}</h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{clinic.address}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-amber-600">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {clinic.rating}
                      </span>
                      <span className="text-xs text-slate-400">{clinic.distance}</span>
                      <span className={`text-xs font-medium ${clinic.openNow ? 'text-emerald-600' : 'text-red-500'}`}>
                        {clinic.openNow ? 'Open' : 'Closed'}
                      </span>
                    </div>
                  </div>
                  <Navigation className="w-4 h-4 text-slate-300 shrink-0 mt-1" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative h-1/2 lg:h-full">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center bg-slate-100">
            <div className="text-center">
              <div className="w-10 h-10 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-slate-500">Fetching your location...</p>
            </div>
          </div>
        ) : (
          <MapContainer
            center={[lat, lng]}
            zoom={14}
            className="w-full h-full z-0"
            zoomControl={false}
          >
            <RecenterMap lat={lat} lng={lng} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* User location */}
            <Marker position={[lat, lng]} icon={defaultIcon}>
              <Popup>
                <div className="text-center p-1">
                  <strong className="text-sm">Your Location</strong>
                </div>
              </Popup>
            </Marker>

            {/* Clinics */}
            {filteredClinics.map(clinic => (
              <Marker
                key={clinic.id}
                position={[clinic.lat, clinic.lng]}
                icon={makeIcon(clinic.type)}
                eventHandlers={{
                  click: () => setSelectedClinic(clinic),
                }}
              >
                <Popup>
                  <div className="min-w-[200px] p-1">
                    <h3 className="font-bold text-sm text-slate-900">{clinic.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{clinic.address}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {clinic.rating}
                      </span>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs text-slate-500">{clinic.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span className="text-xs text-slate-500">{clinic.hours}</span>
                    </div>
                    <a href={`tel:${clinic.phone}`} className="flex items-center gap-2 mt-2 text-emerald-600 text-xs font-medium">
                      <Phone className="w-3 h-3" />
                      {clinic.phone}
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        {/* Selected clinic detail overlay */}
        {selectedClinic && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 lg:left-4 lg:right-auto lg:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 z-[1000]"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${typeConfig[selectedClinic.type].color}`}>
                  {typeConfig[selectedClinic.type].label}
                </span>
                <h3 className="font-bold text-slate-900 mt-2">{selectedClinic.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{selectedClinic.address}</p>
              </div>
              <button
                onClick={() => setSelectedClinic(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="text-center">
                <Star className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <div className="text-sm font-bold text-slate-900">{selectedClinic.rating}</div>
                <div className="text-xs text-slate-500">Rating</div>
              </div>
              <div className="text-center">
                <Navigation className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                <div className="text-sm font-bold text-slate-900">{selectedClinic.distance}</div>
                <div className="text-xs text-slate-500">Distance</div>
              </div>
              <div className="text-center">
                <Clock className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                <div className={`text-sm font-bold ${selectedClinic.openNow ? 'text-emerald-600' : 'text-red-500'}`}>
                  {selectedClinic.openNow ? 'Open' : 'Closed'}
                </div>
                <div className="text-xs text-slate-500">Status</div>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <a
                href={`tel:${selectedClinic.phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call
              </a>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${selectedClinic.lat},${selectedClinic.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <Navigation className="w-4 h-4" />
                Directions
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
