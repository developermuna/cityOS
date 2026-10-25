/**
 * Ola Maps & Geocoding Service
 * Authoritative integration with Ola Maps Web SDK & REST APIs.
 */

export const DEFAULT_COORDINATES = {
  lng: 83.4147,
  lat: 19.1678,
};

export const OLA_MAP_STYLES = {
  standard: 'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
  dark: 'https://api.olamaps.io/tiles/vector/v1/styles/default-dark-standard/style.json',
};

export function getOlaMapsApiKey() {
  return import.meta.env.VITE_OLA_MAPS_API_KEY || '';
}

export function isOlaMapsConfigured() {
  return Boolean(getOlaMapsApiKey());
}

/**
 * Autocomplete search for places via Ola Maps Places API.
 */
export async function fetchPlaceSuggestions(query, location = DEFAULT_COORDINATES) {
  if (!query || query.trim().length < 2) return [];

  const apiKey = import.meta.env.VITE_OLA_MAPS_API_KEY;
  if (!apiKey) return [];

  const encodedQuery = encodeURIComponent(query.trim());
  const url = `https://api.olamaps.io/places/v1/autocomplete?input=${encodedQuery}&location=${location.lat},${location.lng}&api_key=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[OlaMaps] Autocomplete failed with status ${res.status}`);
      return [];
    }
    const data = await res.json();
    if (data?.predictions && Array.isArray(data.predictions)) {
      return data.predictions.map((p) => ({
        id: p.place_id || p.reference || Math.random().toString(),
        title: p.structured_formatting?.main_text || p.description?.split(',')[0] || p.description,
        subtitle: p.structured_formatting?.secondary_text || p.description?.split(',').slice(1).join(',').trim() || '',
        description: p.description,
        lat: p.geometry?.location?.lat,
        lng: p.geometry?.location?.lng,
      }));
    }
    return [];
  } catch (err) {
    console.warn('[OlaMaps] Error fetching autocomplete suggestions:', err);
    return [];
  }
}

/**
 * Reverse geocodes a [lat, lng] into a human-readable address.
 */
export async function reverseGeocode(lat, lng) {
  const apiKey = import.meta.env.VITE_OLA_MAPS_API_KEY;
  if (!apiKey) return `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

  const url = `https://api.olamaps.io/places/v1/reverse-geocode?latlng=${lat},${lng}&api_key=${apiKey}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
    const data = await res.json();
    if (data?.results && data.results.length > 0) {
      return data.results[0].formatted_address || data.results[0].name || `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
    }
    return `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
  } catch (err) {
    console.warn('[OlaMaps] Reverse geocode error:', err);
    return `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
  }
}

/**
 * Decodes Google Encoded Polyline algorithm string into array of [lng, lat] coordinate pairs.
 */
export function decodePolyline(encoded) {
  if (!encoded) return [];
  const poly = [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlat = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const dlng = ((result & 1) !== 0 ? ~(result >> 1) : (result >> 1));
    lng += dlng;

    poly.push([lng / 1e5, lat / 1e5]);
  }
  return poly;
}

/**
 * Fetches routing directions from Ola Maps Routing API.
 */
export async function fetchRouteDirections(originCoord, destCoord) {
  const apiKey = import.meta.env.VITE_OLA_MAPS_API_KEY;
  if (!apiKey || !originCoord || !destCoord) return null;

  const originStr = `${originCoord[1]},${originCoord[0]}`; // lat,lng
  const destStr = `${destCoord[1]},${destCoord[0]}`; // lat,lng

  const url = `https://api.olamaps.io/routing/v1/directions?origin=${originStr}&destination=${destStr}&mode=driving&alternatives=false&steps=true&overview=full&api_key=${apiKey}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!res.ok) {
      console.warn(`[OlaMaps] Route directions API returned status ${res.status}`);
      return null;
    }

    const data = await res.json();
    if (data?.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const encodedPolyline = route.overview_polyline;
      const coordinates = decodePolyline(encodedPolyline);

      return {
        coordinates,
        distanceMeters: route.legs?.[0]?.distance || 0,
        distanceKm: Number(((route.legs?.[0]?.distance || 0) / 1000).toFixed(1)),
        durationSeconds: route.legs?.[0]?.duration || 0,
        durationMins: Math.round((route.legs?.[0]?.duration || 0) / 60),
        summary: route.summary || '',
      };
    }
    return null;
  } catch (err) {
    console.warn('[OlaMaps] Error fetching route directions:', err);
    return null;
  }
}
