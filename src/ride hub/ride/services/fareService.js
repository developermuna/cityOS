/**
 * CityOS Fare Service
 * Estimates fares across all active vehicle tiers for a given route.
 */

import { VEHICLE_TIERS } from '../constants/ride.constants';
import { calculateFare } from '../utils/fareCalculator';

/**
 * Calculates estimates for all vehicle tiers.
 *
 * @param {Object} params
 * @param {number} params.distanceKm
 * @param {number} params.durationMins
 * @param {string} [params.couponCode]
 * @param {number} [params.couponDiscount=0]
 * @param {number} [params.cityOsCoins=0]
 * @param {number} [params.surgeMultiplier=1.0]
 * @returns {Array<Object>} list of tier estimates
 */
export function estimateAllTiers({
  distanceKm = 2.0,
  durationMins = 8,
  couponCode = null,
  couponDiscount = 0,
  cityOsCoins = 0,
  surgeMultiplier = 1.0,
}) {
  return Object.keys(VEHICLE_TIERS).map((tierId) => {
    const tier = VEHICLE_TIERS[tierId];
    const fareDetails = calculateFare({
      tierId,
      distanceKm,
      durationMins,
      surgeMultiplier,
      couponDiscount,
      cityOsCoins,
    });

    return {
      id: tierId,
      name: tier.name,
      tagline: tier.tagline,
      icon: tier.icon,
      capacity: tier.capacity,
      helmetRequired: tier.helmetRequired,
      etaMins: Math.max(1, Math.round(tier.baseFare / 15)),
      fareDetails,
      couponCode,
    };
  });
}
