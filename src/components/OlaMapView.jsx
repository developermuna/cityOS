import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

if (typeof maplibregl.setWorkerUrl === 'function') {
  maplibregl.setWorkerUrl(workerUrl);
}

import { 
  OLA_MAP_STYLES, 
  SATELLITE_STYLE,
  DARK_FALLBACK_STYLE,
  DEFAULT_COORDINATES, 
  reverseGeocode 
} from '../services/olaMapsService';
import { Layers, Navigation, Plus, Minus } from 'lucide-react';

/**
 * Fallback OSM raster style
 */
const FALLBACK_STYLE = {
  version: 8,
  sources: {
    'osm-tiles': {
      type: 'raster',
      tiles: [
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution: '&copy; OpenStreetMap contributors',
    },
  },
  layers: [
    {
      id: 'osm-tiles-layer',
      type: 'raster',
      source: 'osm-tiles',
      minzoom: 0,
      maxzoom: 19,
    },
  ],
};

export const OlaMapView = ({
  center = [DEFAULT_COORDINATES.lng, DEFAULT_COORDINATES.lat],
  zoom = 14,
  pickupCoord = null,
  destCoord = null,
  routeCoordinates = null,
  vehiclePosition = null,
  vehicleIcon = '🛵',
  vehicleHeading = 0,
  interactive = true,
  className = 'w-full h-full',
  onMapClick = null,
  onLocationFound = null,
  showControls = true,
  mapTheme = 'standard',
  onThemeChange = null,
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const pickupMarkerRef = useRef(null);
  const destMarkerRef = useRef(null);
  const vehicleMarkerRef = useRef(null);
  const surroundingDriversRef = useRef([]);

  const [isLocating, setIsLocating] = useState(false);
  const [styleBadge, setStyleBadge] = useState('Standard Map');

  const getStyleForTheme = useCallback((theme) => {
    if (theme === 'satellite') return SATELLITE_STYLE;
    if (theme === 'dark') return DARK_FALLBACK_STYLE;
    return FALLBACK_STYLE;
  }, []);

  useEffect(() => {
    if (mapTheme === 'satellite') setStyleBadge('🛰️ Satellite Imagery');
    else if (mapTheme === 'dark') setStyleBadge('🌙 Night Mode');
    else setStyleBadge('🗺️ Standard Map');
  }, [mapTheme]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Map instance initialization

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: getStyleForTheme(mapTheme),
      center: center,
      zoom: zoom,
      interactive: interactive,
      attributionControl: false,
      workerCount: 0, // Disable web workers to fix "Worker failed to load" in this environment
    });

    mapInstanceRef.current = map;

    map.on('click', (e) => {
      if (onMapClick) {
        onMapClick({
          lat: e.lngLat.lat,
          lng: e.lngLat.lng,
        });
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const updateRouteLayer = useCallback((coords) => {
    const map = mapInstanceRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const routeSourceId = 'ola-ride-route-source';
    const routeLayerId = 'ola-ride-route-line';

    if (coords && coords.length > 1) {
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: coords,
        },
      };

      if (map.getSource(routeSourceId)) {
        map.getSource(routeSourceId).setData(geojson);
      } else {
        map.addSource(routeSourceId, {
          type: 'geojson',
          data: geojson,
        });

        map.addLayer({
          id: routeLayerId,
          type: 'line',
          source: routeSourceId,
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: {
            'line-color': '#10b981',
            'line-width': 5,
            'line-opacity': 0.95,
          },
        });
      }

      try {
        const bounds = coords.reduce(
          (b, coord) => b.extend(coord),
          new maplibregl.LngLatBounds(coords[0], coords[0])
        );
        map.fitBounds(bounds, {
          padding: 60,
          maxZoom: 16,
          duration: 900,
        });
      } catch (err) {}
    } else {
      if (map.getLayer(routeLayerId)) map.removeLayer(routeLayerId);
      if (map.getSource(routeSourceId)) map.removeSource(routeSourceId);
    }
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.setStyle(getStyleForTheme(mapTheme));
    map.once('style.load', () => {
      updateRouteLayer(routeCoordinates);
    });
  }, [mapTheme, getStyleForTheme, routeCoordinates, updateRouteLayer]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (map.isStyleLoaded()) {
      updateRouteLayer(routeCoordinates);
    } else {
      map.once('style.load', () => updateRouteLayer(routeCoordinates));
    }
  }, [routeCoordinates, updateRouteLayer]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !pickupCoord) return;
    
    if (!pickupMarkerRef.current) {
      const el = document.createElement('div');
      el.className = 'flex flex-col items-center cursor-pointer';
      el.innerHTML = `<div class="relative flex items-center justify-center">
          <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-emerald-400 opacity-75"></span>
          <div class="relative w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white font-black text-sm z-10">📍</div>
        </div>`;
      pickupMarkerRef.current = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat(pickupCoord)
        .addTo(map);
    } else {
      pickupMarkerRef.current.setLngLat(pickupCoord);
    }
  }, [pickupCoord]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !destCoord) return;

    if (!destMarkerRef.current) {
      const el = document.createElement('div');
      el.className = 'flex flex-col items-center cursor-pointer';
      el.innerHTML = `<div class="relative flex items-center justify-center">
          <div class="relative w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white font-black text-sm z-10">🏁</div>
        </div>`;
      destMarkerRef.current = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat(destCoord)
        .addTo(map);
    } else {
      destMarkerRef.current.setLngLat(destCoord);
    }
  }, [destCoord]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !vehiclePosition) return;

    if (!vehicleMarkerRef.current) {
      const el = document.createElement('div');
      el.className = 'flex items-center justify-center';
      el.innerHTML = `<div class="vehicle-inner w-10 h-10 rounded-full bg-amber-400 shadow-xl border-2 border-white flex items-center justify-center text-xl transition-transform duration-200">
          ${vehicleIcon}
        </div>`;
      vehicleMarkerRef.current = new maplibregl.Marker({ element: el })
        .setLngLat(vehiclePosition)
        .addTo(map);
    } else {
      vehicleMarkerRef.current.setLngLat(vehiclePosition);
      const inner = vehicleMarkerRef.current.getElement().querySelector('.vehicle-inner');
      if (inner) inner.style.transform = `rotate(${vehicleHeading}deg)`;
    }
  }, [vehiclePosition, vehicleIcon, vehicleHeading]);

  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setIsLocating(false);
        const { latitude: lat, longitude: lng } = pos.coords;
        mapInstanceRef.current?.flyTo({ center: [lng, lat], zoom: 15, duration: 1200 });
        const info = await reverseGeocode(lat, lng);
        if (onLocationFound) onLocationFound({ lat, lng, name: info.name, address: info.formattedAddress });
      },
      () => setIsLocating(false)
    );
  };

  return (
    <div className={`relative ${className} bg-slate-100`}>
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute top-3 left-3 z-10">
        <div className="bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-slate-200 text-[10px] font-black shadow-sm">
          {styleBadge}
        </div>
      </div>
      {showControls && (
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          <button onClick={handleLocateMe} className="w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center border border-slate-200">
            <Navigation className={`w-4 h-4 text-emerald-600 ${isLocating ? 'animate-spin' : ''}`} />
          </button>
          <button onClick={() => onThemeChange?.(mapTheme === 'standard' ? 'satellite' : 'standard')} className="w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center border border-slate-200">
            <Layers className="w-4 h-4 text-blue-600" />
          </button>
          <button onClick={() => mapInstanceRef.current?.zoomIn()} className="w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center border border-slate-200">
            <Plus className="w-4 h-4" />
          </button>
          <button onClick={() => mapInstanceRef.current?.zoomOut()} className="w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center border border-slate-200">
            <Minus className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default OlaMapView;
