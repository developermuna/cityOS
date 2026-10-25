/**
 * CityOS Ride Validation & State Transition Guards
 */

import { RIDE_STATUS } from '../constants/ride.constants.js';

/**
 * Valid allowed state transitions map.
 * Invariant: Any transition not listed here will be rejected.
 */
export const ALLOWED_TRANSITIONS = {
  [RIDE_STATUS.IDLE]: [
    RIDE_STATUS.LOCATION_SELECTED,
    RIDE_STATUS.DESTINATION_SELECTED,
  ],
  [RIDE_STATUS.LOCATION_SELECTED]: [
    RIDE_STATUS.DESTINATION_SELECTED,
    RIDE_STATUS.FARE_ESTIMATED,
    RIDE_STATUS.IDLE,
  ],
  [RIDE_STATUS.DESTINATION_SELECTED]: [
    RIDE_STATUS.FARE_ESTIMATED,
    RIDE_STATUS.LOCATION_SELECTED,
    RIDE_STATUS.IDLE,
  ],
  [RIDE_STATUS.FARE_ESTIMATED]: [
    RIDE_STATUS.BOOKING_REQUESTED,
    RIDE_STATUS.LOCATION_SELECTED,
    RIDE_STATUS.IDLE,
  ],
  [RIDE_STATUS.BOOKING_REQUESTED]: [
    RIDE_STATUS.SEARCHING_DRIVER,
    RIDE_STATUS.CANCELLED,
    RIDE_STATUS.IDLE,
  ],
  [RIDE_STATUS.SEARCHING_DRIVER]: [
    RIDE_STATUS.DRIVER_ASSIGNED,
    RIDE_STATUS.CANCELLED,
  ],
  [RIDE_STATUS.DRIVER_ASSIGNED]: [
    RIDE_STATUS.DRIVER_ARRIVING,
    RIDE_STATUS.CANCELLED,
  ],
  [RIDE_STATUS.DRIVER_ARRIVING]: [
    RIDE_STATUS.DRIVER_ARRIVED,
    RIDE_STATUS.CANCELLED,
  ],
  [RIDE_STATUS.DRIVER_ARRIVED]: [
    RIDE_STATUS.RIDE_STARTED,
    RIDE_STATUS.CANCELLED,
  ],
  [RIDE_STATUS.RIDE_STARTED]: [
    RIDE_STATUS.RIDE_IN_PROGRESS,
  ],
  [RIDE_STATUS.RIDE_IN_PROGRESS]: [
    RIDE_STATUS.RIDE_COMPLETED,
  ],
  [RIDE_STATUS.RIDE_COMPLETED]: [
    RIDE_STATUS.PAYMENT_PENDING,
    RIDE_STATUS.PAYMENT_COMPLETED,
  ],
  [RIDE_STATUS.PAYMENT_PENDING]: [
    RIDE_STATUS.PAYMENT_COMPLETED,
  ],
  [RIDE_STATUS.PAYMENT_COMPLETED]: [
    RIDE_STATUS.RATED,
    RIDE_STATUS.IDLE,
  ],
  [RIDE_STATUS.RATED]: [
    RIDE_STATUS.IDLE,
  ],
  [RIDE_STATUS.CANCELLED]: [
    RIDE_STATUS.IDLE,
    RIDE_STATUS.FARE_ESTIMATED,
  ],
};

/**
 * Validates whether a state transition from currentStatus to nextStatus is permissible.
 *
 * @param {string} currentStatus
 * @param {string} nextStatus
 * @returns {boolean}
 */
export function isValidTransition(currentStatus, nextStatus) {
  if (!currentStatus || !nextStatus) return false;
  if (currentStatus === nextStatus) return true; // Idempotent no-op

  const allowed = ALLOWED_TRANSITIONS[currentStatus];
  if (!allowed) return false;
  return allowed.includes(nextStatus);
}

/**
 * Validates coordinate array [longitude, latitude].
 *
 * @param {any} coord
 * @returns {boolean}
 */
export function isValidCoordinate(coord) {
  if (!Array.isArray(coord) || coord.length !== 2) return false;
  const [lng, lat] = coord;
  return (
    typeof lng === 'number' &&
    typeof lat === 'number' &&
    !isNaN(lng) &&
    !isNaN(lat) &&
    lng >= -180 &&
    lng <= 180 &&
    lat >= -90 &&
    lat <= 90
  );
}

/**
 * Validates 4-digit ride OTP.
 *
 * @param {string} otp
 * @returns {boolean}
 */
export function isValidOtp(otp) {
  return typeof otp === 'string' && /^\d{4}$/.test(otp.trim());
}
