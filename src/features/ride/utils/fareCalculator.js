/**
 * CityOS Configurable Fare Engine
 * Calculates base, distance, duration, taxes, discounts, and tips.
 */

import { VEHICLE_TIERS } from '../constants/ride.constants.js';

/**
 * Calculates itemized and final fare for a given vehicle tier and route.
 *
 * @param {Object} params
 * @param {string} params.tierId - 'bike' | 'auto' | 'mini' | 'sedan'
 * @param {number} params.distanceKm - Distance in kilometers
 * @param {number} [params.durationMins=0] - Estimated travel time in minutes
 * @param {number} [params.surgeMultiplier=1.0] - Dynamic surge factor (e.g. 1.15 for peak)
 * @param {number} [params.couponDiscount=0] - Absolute coupon deduction in ₹
 * @param {number} [params.cityOsCoins=0] - CityOS loyalty coins applied (1 coin = ₹1)
 * @param {number} [params.tipAmount=0] - Optional gratuity for the Captain
 * @returns {Object} itemized breakdown and finalFare
 */
export function calculateFare({
  tierId = 'bike',
  distanceKm = 1.0,
  durationMins = 5,
  surgeMultiplier = 1.0,
  couponDiscount = 0,
  cityOsCoins = 0,
  tipAmount = 0,
}) {
  const tier = VEHICLE_TIERS[tierId] || VEHICLE_TIERS.bike;

  const validDist = Math.max(0.2, Number(distanceKm) || 1.0);
  const validDuration = Math.max(1, Number(durationMins) || 5);

  const baseFare = tier.baseFare;
  const distanceFare = Math.round(validDist * tier.perKmRate);
  const timeFare = Math.round(validDuration * tier.perMinRate);
  const bookingFee = tier.bookingFee;

  // Subtotal before surge and tax
  const subtotal = baseFare + distanceFare + timeFare + bookingFee;
  const surgeFare = Math.round(subtotal * (Math.max(1.0, surgeMultiplier) - 1.0));

  // Minimum fare guarantee
  const preTaxFare = Math.max(tier.minFare, subtotal + surgeFare);

  // 5% GST/Taxes on transport aggregator services
  const gstTax = Math.round(preTaxFare * 0.05);

  const grossFare = preTaxFare + gstTax;

  // Apply discounts capped at 75% of gross fare
  const maxAllowableDiscount = Math.round(grossFare * 0.75);
  const validCoupon = Math.min(Number(couponDiscount) || 0, maxAllowableDiscount);
  const validCoins = Math.min(Number(cityOsCoins) || 0, Math.max(0, maxAllowableDiscount - validCoupon));

  const totalDiscount = validCoupon + validCoins;
  const netFare = Math.max(tier.minFare, grossFare - totalDiscount);
  const finalFare = Math.round(netFare + (Number(tipAmount) || 0));

  return {
    tierId,
    tierName: tier.name,
    distanceKm: Number(validDist.toFixed(1)),
    durationMins: Math.round(validDuration),
    baseFare,
    distanceFare,
    timeFare,
    bookingFee,
    surgeMultiplier,
    surgeFare,
    gstTax,
    grossFare,
    couponDiscount: validCoupon,
    coinsDeduction: validCoins,
    totalDiscount,
    tipAmount: Number(tipAmount) || 0,
    finalFare,
  };
}
