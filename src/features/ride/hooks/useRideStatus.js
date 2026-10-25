/**
 * CityOS useRideStatus Hook
 * Subscribes to ride status changes and exposes helper predicates.
 */

import { useState, useEffect } from 'react';
import { rideStore } from '../state/rideStore';
import { RIDE_STATUS } from '../constants/ride.constants';

export function useRideStatus() {
  const [status, setStatus] = useState(() => rideStore.getState().status);

  useEffect(() => {
    const unsub = rideStore.subscribe((state) => {
      setStatus(state.status);
    });
    return unsub;
  }, []);

  return {
    status,
    isIdle: status === RIDE_STATUS.IDLE,
    isSearching: status === RIDE_STATUS.SEARCHING_DRIVER,
    isDriverAssigned: status === RIDE_STATUS.DRIVER_ASSIGNED,
    isDriverArriving: status === RIDE_STATUS.DRIVER_ARRIVING,
    isDriverArrived: status === RIDE_STATUS.DRIVER_ARRIVED,
    isStarted: status === RIDE_STATUS.RIDE_STARTED,
    isInProgress: status === RIDE_STATUS.RIDE_IN_PROGRESS,
    isCompleted: status === RIDE_STATUS.RIDE_COMPLETED,
    isPaymentPending: status === RIDE_STATUS.PAYMENT_PENDING,
    isPaymentCompleted: status === RIDE_STATUS.PAYMENT_COMPLETED,
    isRated: status === RIDE_STATUS.RATED,
    isCancelled: status === RIDE_STATUS.CANCELLED,
  };
}
