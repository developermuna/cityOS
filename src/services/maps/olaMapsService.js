/**
 * Rayagada Local Maps & Geocoding Service
 * Provides local landmark data and realistic fallback routing for Rayagada city.
 * Removed proprietary Ola Maps API integration as requested.
 */

export const DEFAULT_COORDINATES = {
  lng: 83.4147,
  lat: 19.1678,
  name: 'Rayagada Railway Station Road',
};

// Built-in landmark registry for Rayagada city
const LOCAL_LANDMARKS = [
  // Govt Offices
  { id: 'collectorate', title: 'District Collectorate Rayagada', subtitle: 'Gautam Nagar, Main Administrative Block', lat: 19.1640, lng: 83.4110, category: 'govt' },
  { id: 'sp-office', title: 'SP Office Rayagada', subtitle: 'Police Line Road, Station Colony', lat: 19.1660, lng: 83.4130, category: 'govt' },
  { id: 'drda-office', title: 'DRDA & Sub-Collector Office', subtitle: 'Subash Bose Road, New Colony', lat: 19.1680, lng: 83.4150, category: 'govt' },
  { id: 'tehsil-rto', title: 'Rayagada Tehsil & RTO Office', subtitle: 'JK Pur Highway Junction', lat: 19.1750, lng: 83.4250, category: 'govt' },
  
  // Tourist Places
  { id: 'majhighouri', title: 'Maa Majhighouri Temple', subtitle: 'Main Temple Road, Town Center', lat: 19.1725, lng: 83.4210, category: 'tourist' },
  { id: 'hanging-bridge', title: 'Chekkaguda Hanging Bridge', subtitle: 'Nagavali River Riverside Park', lat: 19.1820, lng: 83.4250, category: 'tourist' },
  { id: 'devagiri', title: 'Devagiri Hill Cave Temple', subtitle: 'Kalyansingpur Road', lat: 19.1550, lng: 83.3800, category: 'tourist' },
  { id: 'hatipathar', title: 'Hatipathar Waterfalls', subtitle: 'Nagavali River Rock Boulders', lat: 19.2100, lng: 83.4500, category: 'tourist' },

  // Transit Hubs
  { id: 'railway', title: 'Rayagada Railway Station', subtitle: 'Station Road, Railway Colony', lat: 19.1678, lng: 83.4147, category: 'transit' },
  { id: 'bus-stand', title: 'New Bus Stand Rayagada', subtitle: 'Rama Krishna Nagar, SH-18 Bypass', lat: 19.1720, lng: 83.4180, category: 'transit' },
  { id: 'airport', title: 'Rayagada Airstrip', subtitle: 'SH-18, Rayagada', lat: 19.1450, lng: 83.4000, category: 'transit' },

  // Local Spots
  { id: 'giet-gate', title: 'GIET University Campus Gate', subtitle: 'Govindpur Educational Complex', lat: 19.1850, lng: 83.4450, category: 'local' },
  { id: 'gcd-ground', title: 'GCD High School Ground', subtitle: 'College Road, Sports Complex', lat: 19.1610, lng: 83.4190, category: 'local' },
  { id: 'm-chowk', title: 'Muncipal Chowk', subtitle: 'Main Market Area, Rayagada', lat: 19.1700, lng: 83.4195, category: 'local' },
];

export function getOlaMapsApiKey() {
  return ''; // Removed API key
}

export function isOlaMapsConfigured() {
  return false;
}

/**
 * Autocomplete search for places in Rayagada.
 */
export async function fetchPlaceSuggestions(query, location = DEFAULT_COORDINATES) {
  if (!query || query.trim().length < 2) return [];

  const trimmedQuery = query.trim().toLowerCase();
  
  // Pure local matching for Rayagada city
  const matched = LOCAL_LANDMARKS.filter(
    (l) => l.title.toLowerCase().includes(trimmedQuery) || l.subtitle.toLowerCase().includes(trimmedQuery)
  );

  return matched.map((m) => ({
    id: m.id,
    title: m.title,
    subtitle: m.subtitle,
    description: `${m.title}, ${m.subtitle}`,
    lat: m.lat,
    lng: m.lng,
    geometry: { location: { lat: m.lat, lng: m.lng } }
  }));
}

/**
 * Reverse geocodes a [lat, lng] into a human-readable address.
 */
export async function reverseGeocode(lat, lng) {
  // Find nearest local landmark
  let nearest = null;
  let minDist = Infinity;

  for (const l of LOCAL_LANDMARKS) {
    const dLat = l.lat - lat;
    const dLng = l.lng - lng;
    const dist = dLat * dLat + dLng * dLng;
    if (dist < minDist) {
      minDist = dist;
      nearest = l;
    }
  }

  if (nearest && minDist < 0.0005) { // Roughly ~2km range
    return {
      name: nearest.title,
      formattedAddress: `${nearest.title}, ${nearest.subtitle}, Rayagada, Odisha`,
      lat,
      lng,
      toString() { return nearest.title; },
    };
  }

  const fallback = `Rayagada Area (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
  return {
    name: fallback,
    formattedAddress: `${fallback}, Odisha, India`,
    lat,
    lng,
    toString() { return fallback; },
  };
}

/**
 * Generates realistic road geometry between two points.
 */
export function generateRealisticRoutePoints(startCoord, endCoord, numPoints = 28) {
  const [lng1, lat1] = startCoord;
  const [lng2, lat2] = endCoord;
  const points = [];

  const midLng = (lng1 + lng2) / 2;
  const midLat = (lat1 + lat2) / 2;
  const dx = lng2 - lng1;
  const dy = lat2 - lat1;

  // Realistic city grid road curvature
  const perpX = -dy * 0.15;
  const perpY = dx * 0.15;
  const controlLng = midLng + perpX;
  const controlLat = midLat + perpY;

  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints;
    const curLng = (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * controlLng + t * t * lng2;
    const curLat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * controlLat + t * t * lat2;
    points.push([Number(curLng.toFixed(6)), Number(curLat.toFixed(6))]);
  }
  return points;
}

/**
 * Realistic routing directions between two points in Rayagada.
 */
export async function fetchRouteDirections(arg1, arg2) {
  let originCoord;
  let destCoord;

  if (arg1 && typeof arg1 === 'object' && ('origin' in arg1 || 'destination' in arg1)) {
    const o = arg1.origin;
    const d = arg1.destination;
    originCoord = Array.isArray(o) ? o : (o?.lat !== undefined ? [o.lng, o.lat] : [DEFAULT_COORDINATES.lng, DEFAULT_COORDINATES.lat]);
    destCoord = Array.isArray(d) ? d : (d?.lat !== undefined ? [d.lng, d.lat] : [DEFAULT_COORDINATES.lng + 0.008, DEFAULT_COORDINATES.lat + 0.008]);
  } else {
    originCoord = Array.isArray(arg1) ? arg1 : (arg1?.lat !== undefined ? [arg1.lng, arg1.lat] : null);
    destCoord = Array.isArray(arg2) ? arg2 : (arg2?.lat !== undefined ? [arg2.lng, arg2.lat] : null);
  }

  if (!originCoord || !destCoord) return null;

  const coordinates = generateRealisticRoutePoints(originCoord, destCoord);
  const dx = (destCoord[0] - originCoord[0]) * 111;
  const dy = (destCoord[1] - originCoord[1]) * 111;
  const approxDistanceKm = Math.max(0.5, Number((Math.sqrt(dx * dx + dy * dy) * 1.3).toFixed(1)));
  const approxDurationMins = Math.max(2, Math.round(approxDistanceKm * 3.5));

  return {
    coordinates,
    distanceMeters: Math.round(approxDistanceKm * 1000),
    distanceKm: approxDistanceKm,
    distance: `${approxDistanceKm} km`,
    durationSeconds: approxDurationMins * 60,
    durationMins: approxDurationMins,
    summary: 'Via Town Center Main Road',
    steps: [
      { instruction: 'Start from pickup point' },
      { instruction: 'Turn onto Main Market Road' },
      { instruction: 'Proceed through Muncipal Chowk' },
      { instruction: 'Arrive at destination point' },
    ],
  };
}

export const OLA_MAP_STYLES = {
  standard: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', // Switched to OSM
  dark: 'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
};

export const SATELLITE_STYLE = {
  version: 8,
  sources: {
    'satellite-tiles': {
      type: 'raster',
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
      tileSize: 256,
      attribution: 'Esri, Maxar',
    },
  },
  layers: [{ id: 'satellite-tiles-layer', type: 'raster', source: 'satellite-tiles' }],
};

export const DARK_FALLBACK_STYLE = {
  version: 8,
  sources: {
    'dark-tiles': {
      type: 'raster',
      tiles: ['https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '&copy; CartoDB',
    },
  },
  layers: [{ id: 'dark-tiles-layer', type: 'raster', source: 'dark-tiles' }],
};
