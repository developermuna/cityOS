/**
 * CityOS Location Service
 * Handles browser GPS geolocation, watch position, and reverse geocoding.
 */

import { DEFAULT_CITYOS_COORDS } from '../constants/ride.constants';
import { reverseGeocode, fetchPlaceSuggestions } from '@/services/olaMapsService';

/**
 * Gets user's current GPS position with fallback to default city coordinates.
 *
 * @returns {Promise<{ lng: number, lat: number, address: string, isFallback: boolean }>}
 */
export async function getCurrentUserLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        lng: DEFAULT_CITYOS_COORDS.lng,
        lat: DEFAULT_CITYOS_COORDS.lat,
        address: DEFAULT_CITYOS_COORDS.address,
        isFallback: true,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lng = pos.coords.longitude;
        const lat = pos.coords.latitude;
        try {
          const revAddress = await reverseGeocode(lat, lng);
          resolve({
            lng,
            lat,
            address: revAddress || `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
            isFallback: false,
          });
        } catch {
          resolve({
            lng,
            lat,
            address: `Current Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
            isFallback: false,
          });
        }
      },
      (_err) => {
        // Geolocation denied or unavailable -> return standard city default
        resolve({
          lng: DEFAULT_CITYOS_COORDS.lng,
          lat: DEFAULT_CITYOS_COORDS.lat,
          address: DEFAULT_CITYOS_COORDS.address,
          isFallback: true,
        });
      },
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 30000 }
    );
  });
}

export { fetchPlaceSuggestions, reverseGeocode };
