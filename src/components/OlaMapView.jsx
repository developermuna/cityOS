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
  OLA_MAP_STYLES, 
  SATELLITE_STYLE,
  DARK_FALLBACK_STYLE,
  DEFAULT_COORDINATES, 
  reverseGeocode 
} from '../services/olaMapsService';
import { Layers, Navigation, Plus, Minus, MapPin, Flag } from 'lucide-react';

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
  pickupName = '',
  destName = '',
  routeCoordinates = null, // Array of [lng, lat]
  vehiclePosition = null, // [lng, lat]
  vehicleIcon = '🛵',
  vehicleHeading = 0,
  interactive = true,
  className = 'w-full h-full',
  onMapClick = null,
  onLocationFound = null,
  showControls = true,
  mapTheme = 'standard', // 'standard' | 'satellite' | 'dark'
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

  // Determine current style URL or Style Object based on theme and API key
  const getStyleForTheme = useCallback((theme) => {
    if (theme === 'satellite') {
      return SATELLITE_STYLE;
    }
    const key = getOlaMapsApiKey();
    if (!key) {
      return theme === 'dark' ? DARK_FALLBACK_STYLE : FALLBACK_STYLE;
    }

    let styleUrl = OLA_MAP_STYLES[theme] || OLA_MAP_STYLES.standard;
    return `${styleUrl}?api_key=${key}`;
  }, []);

  // Update style notification badge text
  useEffect(() => {
    if (mapTheme === 'satellite') setStyleBadge('🛰️ Real Satellite Imagery');
    else if (mapTheme === 'dark') setStyleBadge('🌙 Night Dark Map');
    else setStyleBadge('🗺️ Standard Map');
  }, [mapTheme]);

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
      // If Ola Maps tile request fails, gracefully fallback
      if (e?.error?.status === 401 || e?.error?.status === 403) {
        console.warn('[OlaMaps] Tile authorization error, switching to backup visual layer');
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

  // Update Route Polyline Layer with Rapido-style glowing casing & line
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

        // Outer Glow / Casing for contrast
        map.addLayer({
          id: routeCasingId,
          type: 'line',
          source: routeSourceId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#064e3b', // Deep emerald casing
            'line-width': 8,
            'line-opacity': 0.6,
          },
        });

        // Main Route Polyline (Vibrant Emerald / Cyan)
        map.addLayer({
          id: routeLayerId,
          type: 'line',
          source: routeSourceId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#10b981', // Vibrant emerald route line
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
          padding: { top: 60, bottom: 60, left: 60, right: 60 },
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
  }, [mapTheme, getStyleForTheme, routeCoordinates, updateRouteLayer]);

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

  // Sync Rapido-Style Pickup Marker (Green Dot + Pulsing Wave + Tooltip Chip)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (pickupCoord && Array.isArray(pickupCoord)) {
      if (!pickupMarkerRef.current) {
        const el = document.createElement('div');
        el.className = 'rapido-pickup-marker flex flex-col items-center cursor-pointer select-none';
        el.innerHTML = `
          <div class="relative flex items-center justify-center">
            <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-emerald-400 opacity-75"></span>
            <div class="relative w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xl border-2 border-white font-black text-sm z-10">
              📍
            </div>
          </div>
          <div class="bg-slate-950/95 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg border border-emerald-400/50 mt-1 whitespace-nowrap flex items-center gap-1 backdrop-blur-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>PICKUP</span>
          </div>
        `;
        pickupMarkerRef.current = new maplibregl.Marker({ element: el, anchor: 'bottom' })
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

  // Sync Rapido-Style Destination Marker (Crimson Pin + Tooltip Chip)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (destCoord && Array.isArray(destCoord)) {
      if (!destMarkerRef.current) {
        const el = document.createElement('div');
        el.className = 'rapido-dest-marker flex flex-col items-center cursor-pointer select-none';
        el.innerHTML = `
          <div class="relative flex items-center justify-center">
            <span class="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-rose-400 opacity-60"></span>
            <div class="relative w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xl border-2 border-white font-black text-sm z-10">
              🏁
            </div>
          </div>
          <div class="bg-rose-950/95 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg border border-rose-400/50 mt-1 whitespace-nowrap flex items-center gap-1 backdrop-blur-sm">
            <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            <span>DROP</span>
          </div>
        `;
        destMarkerRef.current = new maplibregl.Marker({ element: el, anchor: 'bottom' })
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

  // Fit bounds when both pickup and destination exist and no route polyline is yet loaded
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || routeCoordinates?.length > 1) return;

    if (pickupCoord && destCoord) {
      try {
        const bounds = new maplibregl.LngLatBounds(pickupCoord, destCoord);
        map.fitBounds(bounds, {
          padding: { top: 70, bottom: 70, left: 60, right: 60 },
          maxZoom: 15,
          duration: 900,
        });
      } catch (_) {}
    }
  }, [pickupCoord, destCoord, routeCoordinates]);

  // Sync Real-Time Captain / Vehicle Marker with Smooth Heading Orientation
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (vehiclePosition && Array.isArray(vehiclePosition)) {
      if (!vehicleMarkerRef.current) {
        const el = document.createElement('div');
        el.className = 'rapido-captain-marker flex items-center justify-center select-none';
        el.innerHTML = `
          <div class="relative flex items-center justify-center">
            <span class="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-amber-400 opacity-60"></span>
            <div class="vehicle-inner w-11 h-11 rounded-full bg-amber-400 shadow-2xl border-2 border-white flex items-center justify-center text-2xl transform transition-transform duration-200 filter drop-shadow-lg">
              ${vehicleIcon}
            </div>
          </div>
        `;
        vehicleMarkerRef.current = new maplibregl.Marker({ element: el })
          .setLngLat(vehiclePosition)
          .addTo(map);
      } else {
        vehicleMarkerRef.current.setLngLat(vehiclePosition);
        const inner = vehicleMarkerRef.current.getElement().querySelector('.vehicle-inner');
        if (inner && vehicleHeading !== undefined) {
          inner.style.transform = `rotate(${vehicleHeading}deg)`;
        }
      }
    } else if (vehicleMarkerRef.current) {
      vehicleMarkerRef.current.remove();
      vehicleMarkerRef.current = null;
    }
  }, [vehiclePosition, vehicleIcon, vehicleHeading]);

  // Add surrounding nearby drivers when idle for authentic ride hailing feel
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || vehiclePosition) return;

    // Clean prior idle drivers
    surroundingDriversRef.current.forEach((m) => m.remove());
    surroundingDriversRef.current = [];

    const baseLng = pickupCoord ? pickupCoord[0] : center[0];
    const baseLat = pickupCoord ? pickupCoord[1] : center[1];

    const driverOffsets = [
      { lng: 0.003, lat: 0.002, icon: '🛵', label: '2 min' },
      { lng: -0.0025, lat: 0.0035, icon: '🛺', label: '3 min' },
      { lng: 0.004, lat: -0.003, icon: '🚗', label: '4 min' },
      { lng: -0.0035, lat: -0.002, icon: '🛵', label: '1 min' },
    ];

    driverOffsets.forEach((d) => {
      const el = document.createElement('div');
      el.className = 'flex flex-col items-center select-none cursor-pointer hover:scale-110 transition-transform';
      el.innerHTML = `
        <div class="p-1.5 bg-white/95 rounded-full shadow-md border border-slate-200 flex items-center justify-center text-base">
          ${d.icon}
        </div>
        <span class="text-[8px] font-black bg-slate-900/80 text-amber-300 px-1 rounded shadow mt-0.5">
          ${d.label}
        </span>
      `;
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

  // Locate Me / Navigation Button handler
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
            zoom: 16,
            pitch: 25,
            duration: 1400,
          });
        }

        // Reverse geocode via Ola Maps
        const placeInfo = await reverseGeocode(lat, lng);
        if (onLocationFound) {
          onLocationFound({
            lat,
            lng,
            name: placeInfo.name || placeInfo.formattedAddress || 'My Current Location',
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
            duration: 1200,
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

      {/* Current Style Toast Badge on Top Left */}
      <div className="absolute top-3 left-3 z-10 pointer-events-none">
        <div className="bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-slate-700/60 shadow-lg flex items-center gap-1.5">
          <span>{styleBadge}</span>
        </div>
      </div>

      {/* Controls: Zoom, Locate Me, Theme */}
      {showControls && (
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          {/* Locate Me / Navigation Button */}
          <button
            onClick={handleLocateMe}
            disabled={isLocating}
            title="Navigate to my current GPS location"
            className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/90 flex items-center justify-center text-slate-800 hover:bg-white active:scale-90 transition-all cursor-pointer"
          >
            <Navigation className={`w-4 h-4 text-emerald-600 fill-emerald-600 ${isLocating ? 'animate-spin' : ''}`} />
          </button>

          {/* Theme / Tile switcher (Standard -> Satellite -> Dark) */}
          {onThemeChange && (
            <button
              onClick={() => {
                const next = mapTheme === 'standard' ? 'satellite' : mapTheme === 'satellite' ? 'dark' : 'standard';
                onThemeChange(next);
              }}
              title="Switch Map Tiles (Standard, Satellite, Dark)"
              className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/90 flex items-center justify-center text-slate-800 hover:bg-white active:scale-90 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-blue-600" />
            </button>
          )}

          {/* Zoom In */}
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/90 flex items-center justify-center text-slate-800 hover:bg-white active:scale-90 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Zoom Out */}
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-slate-200/90 flex items-center justify-center text-slate-800 hover:bg-white active:scale-90 transition-all cursor-pointer"
          >
            <Minus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default OlaMapView;
