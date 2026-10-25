import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

// Explicitly register worker URL for Vite compatibility
if (typeof maplibregl.setWorkerUrl === 'function') {
  maplibregl.setWorkerUrl(workerUrl);
}
import { 
  getOlaMapsApiKey, 
  isOlaMapsConfigured, 
  OLA_MAP_STYLES, 
  DEFAULT_COORDINATES, 
  reverseGeocode 
} from '../services/olaMapsService';
import { Layers, Navigation, Plus, Minus } from 'lucide-react';

/**
 * Fallback OSM raster style when Ola Maps key is not yet provided or pending
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
  pickupCoord = null, // [lng, lat]
  destCoord = null,   // [lng, lat]
  routeCoordinates = null, // Array of [lng, lat]
  vehiclePosition = null, // [lng, lat]
  vehicleIcon = '🛵',
  vehicleHeading = 0,
  interactive = true,
  className = 'w-full h-full',
  onMapClick = null,
  onLocationFound = null,
  showControls = true,
  mapTheme = 'standard', // 'standard' | 'dark' | 'satellite'
  onThemeChange = null,
}) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const pickupMarkerRef = useRef(null);
  const destMarkerRef = useRef(null);
  const vehicleMarkerRef = useRef(null);
  const surroundingDriversRef = useRef([]);

  const [isLocating, setIsLocating] = useState(false);

  // Determine current style URL based on theme and API key
  const getStyleForTheme = useCallback((theme) => {
    const key = getOlaMapsApiKey();
    if (!key) return FALLBACK_STYLE;

    let styleUrl = OLA_MAP_STYLES[theme] || OLA_MAP_STYLES.standard;
    return `${styleUrl}?api_key=${key}`;
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const apiKey = getOlaMapsApiKey();
    const style = getStyleForTheme(mapTheme);

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: style,
      center: center,
      zoom: zoom,
      interactive: interactive,
      attributionControl: false,
      transformRequest: (url) => {
        if (apiKey && url.includes('api.olamaps.io') && !url.includes('api_key=')) {
          const sep = url.includes('?') ? '&' : '?';
          return { url: `${url}${sep}api_key=${apiKey}` };
        }
        return { url };
      },
    });

    mapInstanceRef.current = map;

    map.on('error', (e) => {
      // If Ola Maps tile request fails (e.g. invalid key or unwhitelisted domain), fallback gracefully
      if (e?.error?.status === 401 || e?.error?.status === 403) {
        console.warn('Ola Maps authorization error, switching to backup visual layer', e);
        try {
          map.setStyle(FALLBACK_STYLE);
        } catch (_) {}
      }
    });

    map.on('click', (e) => {
      if (onMapClick) {
        onMapClick({
          lat: e.lngLat.lat,
          lng: e.lngLat.lng,
        });
      }
    });

    // Clean up
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Run once on mount

  // Handle map style / theme change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    const newStyle = getStyleForTheme(mapTheme);
    try {
      map.setStyle(newStyle);
      map.once('style.load', () => {
        // Re-add route layer after style reload if exists
        updateRouteLayer(routeCoordinates);
      });
    } catch (err) {
      console.warn('Error updating map style:', err);
    }
  }, [mapTheme, getStyleForTheme]);

  // Update Route Polyline Layer
  const updateRouteLayer = useCallback((coords) => {
    const map = mapInstanceRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const routeSourceId = 'ola-ride-route-source';
    const routeLayerId = 'ola-ride-route-line';
    const routeCasingId = 'ola-ride-route-casing';

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

        // Outer Glow/Casing
        map.addLayer({
          id: routeCasingId,
          type: 'line',
          source: routeSourceId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#1d4ed8',
            'line-width': 8,
            'line-opacity': 0.4,
          },
        });

        // Main Route Polyline
        map.addLayer({
          id: routeLayerId,
          type: 'line',
          source: routeSourceId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#2563eb',
            'line-width': 5,
            'line-opacity': 0.95,
          },
        });
      }

      // Automatically frame route inside viewport
      try {
        const bounds = coords.reduce(
          (b, coord) => b.extend(coord),
          new maplibregl.LngLatBounds(coords[0], coords[0])
        );
        map.fitBounds(bounds, {
          padding: { top: 60, bottom: 60, left: 50, right: 50 },
          maxZoom: 16,
          duration: 900,
        });
      } catch (err) {
        console.warn('Error adjusting bounds for route:', err);
      }
    } else {
      if (map.getLayer(routeLayerId)) map.removeLayer(routeLayerId);
      if (map.getLayer(routeCasingId)) map.removeLayer(routeCasingId);
      if (map.getSource(routeSourceId)) map.removeSource(routeSourceId);
    }
  }, []);

  // Sync Route Coordinates
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (map.isStyleLoaded()) {
      updateRouteLayer(routeCoordinates);
    } else {
      map.once('style.load', () => updateRouteLayer(routeCoordinates));
    }
  }, [routeCoordinates, updateRouteLayer]);

  // Sync Pickup Marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (pickupCoord && Array.isArray(pickupCoord)) {
      if (!pickupMarkerRef.current) {
        const el = document.createElement('div');
        el.className = 'ola-pickup-marker flex flex-col items-center cursor-pointer';
        el.innerHTML = `
          <div class="relative flex items-center justify-center">
            <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-emerald-400 opacity-75"></span>
            <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white font-bold text-xs">
              📍
            </div>
          </div>
          <span class="bg-slate-900/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">
            Pickup
          </span>
        `;
        pickupMarkerRef.current = new maplibregl.Marker({ element: el })
          .setLngLat(pickupCoord)
          .addTo(map);
      } else {
        pickupMarkerRef.current.setLngLat(pickupCoord);
      }
    } else if (pickupMarkerRef.current) {
      pickupMarkerRef.current.remove();
      pickupMarkerRef.current = null;
    }
  }, [pickupCoord]);

  // Sync Destination Marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (destCoord && Array.isArray(destCoord)) {
      if (!destMarkerRef.current) {
        const el = document.createElement('div');
        el.className = 'ola-dest-marker flex flex-col items-center cursor-pointer';
        el.innerHTML = `
          <div class="relative flex items-center justify-center">
            <div class="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg border-2 border-white font-bold text-xs">
              🏁
            </div>
          </div>
          <span class="bg-rose-900/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow mt-1 whitespace-nowrap">
            Dropoff
          </span>
        `;
        destMarkerRef.current = new maplibregl.Marker({ element: el })
          .setLngLat(destCoord)
          .addTo(map);
      } else {
        destMarkerRef.current.setLngLat(destCoord);
      }
    } else if (destMarkerRef.current) {
      destMarkerRef.current.remove();
      destMarkerRef.current = null;
    }
  }, [destCoord]);

  // Sync Moving Vehicle Marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (vehiclePosition && Array.isArray(vehiclePosition)) {
      if (!vehicleMarkerRef.current) {
        const el = document.createElement('div');
        el.className = 'ola-vehicle-marker flex items-center justify-center transition-transform duration-300';
        el.innerHTML = `
          <div class="w-10 h-10 rounded-full bg-white shadow-xl border-2 border-emerald-500 flex items-center justify-center text-xl transform transition-transform">
            ${vehicleIcon}
          </div>
        `;
        vehicleMarkerRef.current = new maplibregl.Marker({ element: el })
          .setLngLat(vehiclePosition)
          .addTo(map);
      } else {
        vehicleMarkerRef.current.setLngLat(vehiclePosition);
        const inner = vehicleMarkerRef.current.getElement().querySelector('div');
        if (inner && vehicleHeading) {
          inner.style.transform = `rotate(${vehicleHeading}deg)`;
        }
      }
    } else if (vehicleMarkerRef.current) {
      vehicleMarkerRef.current.remove();
      vehicleMarkerRef.current = null;
    }
  }, [vehiclePosition, vehicleIcon, vehicleHeading]);

  // Add surrounding nearby drivers for realistic ride hailing experience
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || vehiclePosition) return; // Don't show random idle drivers during an active trip

    // Clean prior idle drivers
    surroundingDriversRef.current.forEach((m) => m.remove());
    surroundingDriversRef.current = [];

    const baseLng = pickupCoord ? pickupCoord[0] : center[0];
    const baseLat = pickupCoord ? pickupCoord[1] : center[1];

    const driverOffsets = [
      { lng: 0.003, lat: 0.002, icon: '🛵' },
      { lng: -0.0025, lat: 0.0035, icon: '🛺' },
      { lng: 0.004, lat: -0.003, icon: '🚗' },
      { lng: -0.0035, lat: -0.002, icon: '🛵' },
    ];

    driverOffsets.forEach((d) => {
      const el = document.createElement('div');
      el.className = 'text-base p-1 bg-white/90 rounded-full shadow border border-slate-200 animate-pulse';
      el.innerText = d.icon;
      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([baseLng + d.lng, baseLat + d.lat])
        .addTo(map);
      surroundingDriversRef.current.push(marker);
    });

    return () => {
      surroundingDriversRef.current.forEach((m) => m.remove());
      surroundingDriversRef.current = [];
    };
  }, [pickupCoord, center, vehiclePosition]);

  // Locate Me handler
  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setIsLocating(false);
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo({
            center: [lng, lat],
            zoom: 15,
            duration: 1200,
          });
        }

        // Reverse geocode via Ola Maps
        const placeInfo = await reverseGeocode(lat, lng);
        if (onLocationFound) {
          onLocationFound({
            lat,
            lng,
            name: placeInfo.name,
            address: placeInfo.formattedAddress,
          });
        }
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation error:', err);
        // Default to Rayagada Center
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo({
            center: [DEFAULT_COORDINATES.lng, DEFAULT_COORDINATES.lat],
            zoom: 15,
          });
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Zoom handlers
  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  return (
    <div className={`relative ${className} select-none overflow-hidden bg-slate-100`}>
      {/* Map Container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

      {/* Controls: Zoom, Locate Me, Theme */}
      {showControls && (
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          {/* Locate Me */}
          <button
            onClick={handleLocateMe}
            disabled={isLocating}
            title="Locate my position with GPS"
            className="w-9 h-9 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition"
          >
            <Navigation className={`w-4 h-4 text-blue-600 ${isLocating ? 'animate-spin' : ''}`} />
          </button>

          {/* Theme switcher */}
          {onThemeChange && (
            <button
              onClick={() => {
                const next = mapTheme === 'standard' ? 'satellite' : mapTheme === 'satellite' ? 'dark' : 'standard';
                onThemeChange(next);
              }}
              title="Toggle Map Style (Standard, Satellite, Dark)"
              className="w-9 h-9 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition"
            >
              <Layers className="w-4 h-4 text-emerald-600" />
            </button>
          )}

          {/* Zoom In */}
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="w-9 h-9 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition"
          >
            <Plus className="w-4 h-4" />
          </button>

          {/* Zoom Out */}
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="w-9 h-9 rounded-xl bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
