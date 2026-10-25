/**
 * CityOS Primary Ride Service
 * Orchestrates ride lifecycle state transitions, bookings, and Captain dispatch.
 */

import { RIDE_STATUS } from '../constants/ride.constants';
import { rideStore } from '../state/rideStore';
import { assignCaptainForTier } from './driverService';
import { calculateFare } from '../utils/fareCalculator';

/**
 * Initiates a new ride booking search.
 *
 * @param {Object} params
 * @param {string} params.tierId - 'bike' | 'auto' | 'mini' | 'sedan'
 * @param {Object} params.pickup - { lng, lat, address }
 * @param {Object} params.destination - { lng, lat, address }
 * @param {Object} params.route - { coordinates, distanceKm, durationMins }
 * @param {number} [params.couponDiscount=0]
 * @param {number} [params.cityOsCoins=0]
 * @param {number} [params.tipAmount=0]
 * @returns {string} generated rideId
 */
export function initiateRideBooking({
  tierId = 'bike',
  pickup,
  destination,
  route,
  couponDiscount = 0,
  cityOsCoins = 0,
  tipAmount = 0,
}) {
  const rideId = `COS-RIDE-${Date.now().toString(36).toUpperCase()}`;
  const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();

  const fare = calculateFare({
    tierId,
    distanceKm: route?.distanceKm || 2.0,
    durationMins: route?.durationMins || 8,
    couponDiscount,
    cityOsCoins,
    tipAmount,
  });

  rideStore.transitionTo(RIDE_STATUS.SEARCHING_DRIVER, {
    rideId,
    selectedTier: tierId,
    pickup,
    destination,
    routeData: route,
    routeCoordinates: route?.coordinates || [],
    otp: randomOtp,
    fareBreakdown: fare,
    tipAmount,
    couponDiscount,
    cityOsCoinsUsed: cityOsCoins,
  });

  return rideId;
}

/**
 * Confirms Captain assignment after matching search.
 *
 * @param {string} tierId
 * @returns {Object} assigned Captain profile
 */
export function assignCaptain(tierId) {
  const captain = assignCaptainForTier(tierId);
  rideStore.transitionTo(RIDE_STATUS.DRIVER_ASSIGNED, {
    captain,
    etaSeconds: 135,
  });
  return captain;
}

/**
 * Signals that Captain has arrived at pickup.
 */
export function markCaptainArrived() {
  rideStore.transitionTo(RIDE_STATUS.DRIVER_ARRIVED);
}

/**
 * Starts the active trip upon verifying the 4-digit OTP.
 *
 * @param {string} enteredOtp
 * @returns {boolean} whether OTP matched
 */
export function startRideWithOtp(enteredOtp) {
  const currentOtp = rideStore.getState().otp;
  if (enteredOtp && enteredOtp.trim() === currentOtp) {
    rideStore.transitionTo(RIDE_STATUS.RIDE_STARTED);
    rideStore.transitionTo(RIDE_STATUS.RIDE_IN_PROGRESS);
    return true;
  }
  return false;
}

/**
 * Completes the ride upon arrival at destination.
 */
export function completeRide() {
  rideStore.transitionTo(RIDE_STATUS.RIDE_COMPLETED);
  rideStore.transitionTo(RIDE_STATUS.PAYMENT_PENDING);
}

/**
 * Cancels the active ride with a recorded reason.
 *
 * @param {string} reason
 */
export function cancelActiveRide(reason = 'User requested cancellation') {
  rideStore.transitionTo(RIDE_STATUS.CANCELLED, {
    cancellationReason: reason,
  });
}

/**
 * Confirms payment settlement.
 *
 * @param {string} method - 'UPI' | 'Card' | 'Cash'
 */
export function confirmPayment(method = 'Pay Now') {
  rideStore.transitionTo(RIDE_STATUS.PAYMENT_COMPLETED, {
    paymentMethod: method,
  });
}

/**
 * Submits post-ride rating and finishes session.
 *
 * @param {Object} reviewData
 */
export function submitRideRating(reviewData) {
  rideStore.transitionTo(RIDE_STATUS.RATED, {
    review: reviewData,
  });
  // Reset session after rating
  setTimeout(() => {
    rideStore.reset();
  }, 1000);
}
