import test from 'node:test';
import assert from 'node:assert/strict';

import { RIDE_STATUS, VEHICLE_TIERS } from '../constants/ride.constants.js';
import { calculateFare } from '../utils/fareCalculator.js';
import { calculateHaversineDistance, estimateDurationMinutes, formatDuration } from '../utils/distanceCalculator.js';
import { isValidTransition, isValidCoordinate, isValidOtp } from '../utils/rideValidation.js';
import { rideStore } from '../state/rideStore.js';

test('Fare Calculator - calculates basic bike fare correctly', () => {
  const fare = calculateFare({
    tierId: 'bike',
    distanceKm: 4.0,
    durationMins: 10,
    surgeMultiplier: 1.0,
    couponDiscount: 0,
    tipAmount: 0,
  });

  assert.equal(fare.tierId, 'bike');
  assert.equal(fare.baseFare, 20);
  assert.ok(fare.distanceFare > 0);
  assert.ok(fare.finalFare >= VEHICLE_TIERS.bike.minFare);
});

test('Fare Calculator - respects minimum fare guarantee', () => {
  const fare = calculateFare({
    tierId: 'sedan',
    distanceKm: 0.1,
    durationMins: 1,
    couponDiscount: 50,
  });

  assert.ok(fare.finalFare >= VEHICLE_TIERS.sedan.minFare);
});

test('Fare Calculator - applies coupon discounts and tips accurately', () => {
  const fare = calculateFare({
    tierId: 'auto',
    distanceKm: 5.0,
    durationMins: 15,
    couponDiscount: 20,
    tipAmount: 30,
  });

  assert.equal(fare.couponDiscount, 20);
  assert.equal(fare.tipAmount, 30);
  assert.ok(fare.finalFare > 0);
});

test('Distance Calculator - computes great-circle distance accurately', () => {
  // Rayagada station (83.4147, 19.1678) to Majhighouri temple (83.4210, 19.1725)
  const dist = calculateHaversineDistance([83.4147, 19.1678], [83.4210, 19.1725]);
  assert.ok(dist > 0.5 && dist < 2.0);

  // Identical coordinates should yield 0
  const zeroDist = calculateHaversineDistance([83.4147, 19.1678], [83.4147, 19.1678]);
  assert.equal(zeroDist, 0);
});

test('Distance Calculator - formats duration and estimates minutes', () => {
  assert.equal(formatDuration(90), '2 min');
  assert.equal(formatDuration(3600), '1 hr 0 min');
  assert.ok(estimateDurationMinutes(10, 'bike') >= 15);
});

test('Ride State Transition Validation - enforces strict valid transitions', () => {
  assert.equal(isValidTransition(RIDE_STATUS.IDLE, RIDE_STATUS.LOCATION_SELECTED), true);
  assert.equal(isValidTransition(RIDE_STATUS.LOCATION_SELECTED, RIDE_STATUS.FARE_ESTIMATED), true);
  assert.equal(isValidTransition(RIDE_STATUS.SEARCHING_DRIVER, RIDE_STATUS.DRIVER_ASSIGNED), true);
  assert.equal(isValidTransition(RIDE_STATUS.DRIVER_ARRIVED, RIDE_STATUS.RIDE_STARTED), true);
  assert.equal(isValidTransition(RIDE_STATUS.RIDE_IN_PROGRESS, RIDE_STATUS.RIDE_COMPLETED), true);
});

test('Ride State Transition Validation - rejects illegal jumps', () => {
  assert.equal(isValidTransition(RIDE_STATUS.RIDE_COMPLETED, RIDE_STATUS.SEARCHING_DRIVER), false);
  assert.equal(isValidTransition(RIDE_STATUS.IDLE, RIDE_STATUS.RIDE_STARTED), false);
  assert.equal(isValidTransition(RIDE_STATUS.RIDE_IN_PROGRESS, RIDE_STATUS.DRIVER_ASSIGNED), false);
});

test('Input Validation - validates coordinates and OTP', () => {
  assert.equal(isValidCoordinate([83.4147, 19.1678]), true);
  assert.equal(isValidCoordinate([200, 19.1678]), false);
  assert.equal(isValidCoordinate('invalid'), false);

  assert.equal(isValidOtp('4829'), true);
  assert.equal(isValidOtp('482'), false);
  assert.equal(isValidOtp('abcd'), false);
});

test('Ride Store - executes state transitions and subscriber updates', () => {
  rideStore.reset();
  assert.equal(rideStore.getState().status, RIDE_STATUS.IDLE);

  let notified = false;
  const unsub = rideStore.subscribe((state) => {
    if (state.status === RIDE_STATUS.LOCATION_SELECTED) notified = true;
  });

  const res = rideStore.transitionTo(RIDE_STATUS.LOCATION_SELECTED, {
    pickup: { lng: 83.4147, lat: 19.1678, address: 'Station Road' },
  });

  assert.equal(res, true);
  assert.equal(notified, true);
  assert.equal(rideStore.getState().status, RIDE_STATUS.LOCATION_SELECTED);

  unsub();
  rideStore.reset();
});
