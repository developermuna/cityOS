/**
 * CityOS useCurrentLocation Hook
 * React hook to fetch and monitor current user GPS coordinates.
 */

import { useState, useEffect, useCallback } from 'react';
import { getCurrentUserLocation } from '../services/locationService';
import { DEFAULT_CITYOS_COORDS } from '../constants/ride.constants';

export function useCurrentLocation() {
  const [coordinates, setCoordinates] = useState([DEFAULT_CITYOS_COORDS.lng, DEFAULT_CITYOS_COORDS.lat]);
  const [address, setAddress] = useState(DEFAULT_CITYOS_COORDS.address);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refreshLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getCurrentUserLocation();
      setCoordinates([res.lng, res.lat]);
      setAddress(res.address);
    } catch (err) {
      setError(err?.message || 'Failed to detect current location');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshLocation();
  }, [refreshLocation]);

  return {
    coordinates, // [lng, lat]
    address,
    isLoading,
    error,
    refreshLocation,
  };
}
