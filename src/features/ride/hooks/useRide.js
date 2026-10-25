/**
 * CityOS useRide Hook
 * React hook subscribing to active ride store state and dispatch actions.
 */

import { useState, useEffect } from 'react';
import { rideStore } from '../state/rideStore';
import * as rideService from '../services/rideService';

export function useRide() {
  const [rideState, setRideState] = useState(() => rideStore.getState());

  useEffect(() => {
    const unsubscribe = rideStore.subscribe((newState) => {
      setRideState(newState);
    });
    return unsubscribe;
  }, []);

  return {
    ...rideState,
    initiateBooking: rideService.initiateRideBooking,
    assignCaptain: rideService.assignCaptain,
    markArrived: rideService.markCaptainArrived,
    verifyOtpAndStart: rideService.startRideWithOtp,
    completeRide: rideService.completeRide,
    cancelRide: rideService.cancelActiveRide,
    confirmPayment: rideService.confirmPayment,
    submitRating: rideService.submitRideRating,
    resetRide: () => rideStore.reset(),
  };
}
