/**
 * CityOS Geospatial & Distance Utilities
 */

/**
 * Calculates straight-line great-circle distance between two GPS coordinates using the Haversine formula.
 *
 * @param {[number, number]} coord1 - [lng, lat]
 * @param {[number, number]} coord2 - [lng, lat]
 * @returns {number} distance in kilometers
 */
export function calculateHaversineDistance(coord1, coord2) {
  if (!Array.isArray(coord1) || !Array.isArray(coord2)) return 0;
  const [lng1, lat1] = coord1;
  const [lng2, lat2] = coord2;

  const R = 6371; // Earth radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}

/**
 * Formats duration in seconds to a friendly string: "X min" or "X hr Y min"
 *
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatDuration(totalSeconds) {
  const mins = Math.max(1, Math.round(totalSeconds / 60));
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hrs} hr ${remainingMins} min`;
}

/**
 * Estimates city travel duration in minutes based on distance and vehicle type.
 *
 * @param {number} distanceKm
 * @param {string} [vehicleType='bike']
 * @returns {number}
 */
export function estimateDurationMinutes(distanceKm, vehicleType = 'bike') {
  const speeds = {
    bike: 32, // km/h
    auto: 25,
    mini: 24,
    sedan: 24,
  };
  const speed = speeds[vehicleType] || 25;
  const hours = distanceKm / speed;
  // Add 3 minutes buffer for traffic lights/turn delays
  return Math.max(3, Math.round(hours * 60 + 3));
}
