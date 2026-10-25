/**
 * CityOS Ride Central State Store & Pub/Sub Session Manager
 */

import { RIDE_STATUS, VEHICLE_TIERS } from '../constants/ride.constants.js';
import { isValidTransition } from '../utils/rideValidation.js';

class RideStore {
  constructor() {
    this.listeners = new Set();
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      rideId: null,
      status: RIDE_STATUS.IDLE,
      selectedTier: 'bike',
      pickup: null, // { lng, lat, address }
      destination: null, // { lng, lat, address }
      routeData: null,
      routeCoordinates: [],
      otp: null,
      captain: null,
      fareBreakdown: null,
      paymentMethod: 'Pay Now',
      appliedCoupon: 'SECOND50',
      couponDiscount: 0,
      tipAmount: 0,
      cityOsCoinsUsed: 0,
      etaSeconds: 120,
      vehiclePosition: null, // [lng, lat]
      vehicleHeading: 0,
      cancellationReason: null,
      error: null,
    };
  }

  getState() {
    return this.state;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      try {
        listener(this.state);
      } catch (err) {
        console.error('[RideStore] Listener error:', err);
      }
    }
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    this.notify();
  }

  /**
   * Transitions state safely with guard verification.
   *
   * @param {string} nextStatus
   * @param {Object} [additionalData={}]
   * @returns {boolean} whether transition was applied
   */
  transitionTo(nextStatus, additionalData = {}) {
    const currentStatus = this.state.status;

    if (!isValidTransition(currentStatus, nextStatus)) {
      console.warn(
        `[RideStore] Invalid transition attempted: ${currentStatus} -> ${nextStatus}`
      );
      return false;
    }

    this.state = {
      ...this.state,
      ...additionalData,
      status: nextStatus,
    };
    this.notify();
    return true;
  }

  reset() {
    this.state = this.getInitialState();
    this.notify();
  }
}

export const rideStore = new RideStore();
