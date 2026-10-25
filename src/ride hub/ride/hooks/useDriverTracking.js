/**
 * CityOS useDriverTracking Hook
 * Tracks vehicle coordinates along polyline and updates ETA.
 */

import { useState, useEffect } from 'react';

/**
 * Hook to animate vehicle along a route polyline.
 *
 * @param {Array<[number, number]>} routeCoordinates - Array of [lng, lat]
 * @param {boolean} isTrackingActive - Whether tracking animation should run
 * @param {number} [speedMultiplier=1]
 * @returns {{ vehicleCoord: [number, number]|null, heading: number, progressPercent: number, isFinished: boolean }}
 */
export function useDriverTracking(routeCoordinates = [], isTrackingActive = false, speedMultiplier = 1) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [vehicleCoord, setVehicleCoord] = useState(null);
  const [heading, setHeading] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!routeCoordinates || routeCoordinates.length === 0) {
      setVehicleCoord(null);
      setCurrentIndex(0);
      setIsFinished(false);
      return;
    }

    setVehicleCoord(routeCoordinates[0]);
    setCurrentIndex(0);
    setIsFinished(false);
  }, [routeCoordinates]);

  useEffect(() => {
    if (!isTrackingActive || !routeCoordinates || routeCoordinates.length < 2) return;

    const intervalTime = Math.max(100, Math.round(1000 / speedMultiplier));
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= routeCoordinates.length) {
          setIsFinished(true);
          clearInterval(interval);
          return routeCoordinates.length - 1;
        }

        const curr = routeCoordinates[prev];
        const nxt = routeCoordinates[next];
        if (curr && nxt) {
          // Compute heading angle
          const dLng = nxt[0] - curr[0];
          const dLat = nxt[1] - curr[1];
          const angleDeg = (Math.atan2(dLng, dLat) * 180) / Math.PI;
          setHeading(angleDeg);
          setVehicleCoord(nxt);
        }

        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isTrackingActive, routeCoordinates, speedMultiplier]);

  const progressPercent =
    routeCoordinates && routeCoordinates.length > 0
      ? Math.round((currentIndex / (routeCoordinates.length - 1)) * 100)
      : 0;

  return {
    vehicleCoord,
    heading,
    progressPercent,
    isFinished,
  };
}
