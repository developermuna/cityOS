/**
 * CityOS Routing Service
 * Fetches directions via Ola Maps Routing API and decodes GeoJSON coordinates.
 */

import { fetchRouteDirections } from '../../../services/olaMapsService';
import { calculateHaversineDistance, estimateDurationMinutes } from '../utils/distanceCalculator';

/**
 * Retrieves route directions and polyline coordinates between pickup and destination.
 *
 * @param {[number, number]} pickupCoord - [lng, lat]
 * @param {[number, number]} destCoord - [lng, lat]
 * @returns {Promise<{
 *   coordinates: [number, number][],
 *   distanceKm: number,
 *   durationMins: number,
 *   source: 'olamaps' | 'fallback_straight_line'
 * }>}
 */
export async function getRideRoute(pickupCoord, destCoord) {
  if (!pickupCoord || !destCoord) {
    throw new Error('Both pickup and destination coordinates are required for routing');
  }

  try {
    const routeRes = await fetchRouteDirections(pickupCoord, destCoord);
    if (routeRes && routeRes.coordinates && routeRes.coordinates.length > 0) {
      return {
        coordinates: routeRes.coordinates,
        distanceKm: routeRes.distanceKm || calculateHaversineDistance(pickupCoord, destCoord),
        durationMins: routeRes.durationMins || estimateDurationMinutes(routeRes.distanceKm || 2),
        source: 'olamaps',
      };
    }
  } catch (err) {
    console.warn('[RoutingService] Ola Maps routing call failed, falling back to straight-line interpolation:', err);
  }

  // Graceful fallback: 10-point interpolation between pickup and dest
  const dist = calculateHaversineDistance(pickupCoord, destCoord) || 2.5;
  const steps = 10;
  const fallbackCoords = [];
  for (let i = 0; i <= steps; i++) {
    const ratio = i / steps;
    const lng = pickupCoord[0] + (destCoord[0] - pickupCoord[0]) * ratio;
    const lat = pickupCoord[1] + (destCoord[1] - pickupCoord[1]) * ratio;
    fallbackCoords.push([lng, lat]);
  }

  return {
    coordinates: fallbackCoords,
    distanceKm: dist,
    durationMins: estimateDurationMinutes(dist),
    source: 'fallback_straight_line',
  };
}
