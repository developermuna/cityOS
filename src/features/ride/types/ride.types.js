/**
 * CityOS Ride JSDoc Type Definitions
 */

/**
 * @typedef {Object} LocationPoint
 * @property {number} lat - Latitude
 * @property {number} lng - Longitude
 * @property {string} address - Formatted address string
 * @property {string} [landmark] - Optional landmark or building name
 */

/**
 * @typedef {'bike' | 'auto' | 'mini' | 'sedan'} VehicleTierId
 */

/**
 * @typedef {Object} CaptainProfile
 * @property {string} id - Driver ID
 * @property {string} name - Captain's full name
 * @property {number} rating - Average star rating
 * @property {string} trips - Formatted trips count (e.g. "1,240 rides")
 * @property {string} experience - Platform tenure
 * @property {string} photo - URL to avatar photo
 * @property {string} vehicleName - Vehicle model
 * @property {string} vehicleColor - Color description
 * @property {string} licensePlate - License plate string (e.g. "OD 18 B 4509")
 * @property {string[]} badges - Captain badges
 * @property {string} language - Languages spoken
 * @property {string} satisfaction - Positive review percentage
 * @property {string} phone - Virtual contact number
 */

/**
 * @typedef {Object} RideSession
 * @property {string} rideId - Unique ride session ID
 * @property {string} status - Current RIDE_STATUS
 * @property {VehicleTierId} tier - Selected vehicle tier
 * @property {LocationPoint} pickup - Pickup coordinates & address
 * @property {LocationPoint} destination - Destination coordinates & address
 * @property {string} otp - 4-digit verification code
 * @property {CaptainProfile|null} captain - Assigned Captain details
 * @property {number} fare - Total final fare in INR
 * @property {string} paymentMethod - 'Pay Now' | 'Cash' | 'Card' | 'UPI'
 * @property {number} etaSeconds - Estimated time of arrival in seconds
 * @property {number[][]} [routeCoordinates] - Array of [lng, lat] polyline vertices
 */

export const RIDE_TYPES_DOC = true;
