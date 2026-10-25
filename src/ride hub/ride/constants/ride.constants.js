/**
 * CityOS Ride Constants & State Machine Enumerations
 */

export const RIDE_STATUS = {
  IDLE: 'idle',
  LOCATION_SELECTED: 'location_selected',
  DESTINATION_SELECTED: 'destination_selected',
  FARE_ESTIMATED: 'fare_estimated',
  BOOKING_REQUESTED: 'booking_requested',
  SEARCHING_DRIVER: 'searching_driver',
  DRIVER_ASSIGNED: 'driver_assigned',
  DRIVER_ARRIVING: 'driver_arriving',
  DRIVER_ARRIVED: 'driver_arrived',
  RIDE_STARTED: 'ride_started',
  RIDE_IN_PROGRESS: 'ride_in_progress',
  RIDE_COMPLETED: 'ride_completed',
  PAYMENT_PENDING: 'payment_pending',
  PAYMENT_COMPLETED: 'payment_completed',
  RATED: 'rated',
  CANCELLED: 'cancelled',
};

export const VEHICLE_TIERS = {
  bike: {
    id: 'bike',
    name: 'Bike Taxi',
    tagline: 'Fastest in traffic, solo commute',
    icon: '🛵',
    capacity: 1,
    baseFare: 20,
    minFare: 25,
    perKmRate: 9.5,
    perMinRate: 1.2,
    bookingFee: 5,
    helmetRequired: true,
    avgSpeedKmh: 35,
  },
  auto: {
    id: 'auto',
    name: 'Auto Rickshaw',
    tagline: 'Meter-free, everyday pocket-friendly',
    icon: '🛺',
    capacity: 3,
    baseFare: 30,
    minFare: 40,
    perKmRate: 13.5,
    perMinRate: 1.5,
    bookingFee: 6,
    helmetRequired: false,
    avgSpeedKmh: 30,
  },
  mini: {
    id: 'mini',
    name: 'Cab Economy',
    tagline: 'Comfy AC hatchback, budget friendly',
    icon: '🚗',
    capacity: 4,
    baseFare: 55,
    minFare: 75,
    perKmRate: 17.0,
    perMinRate: 2.0,
    bookingFee: 10,
    helmetRequired: false,
    avgSpeedKmh: 28,
  },
  sedan: {
    id: 'sedan',
    name: 'Cab Comfort',
    tagline: 'Premium spacious sedan, top rated captains',
    icon: '🚘',
    capacity: 4,
    baseFare: 75,
    minFare: 110,
    perKmRate: 21.0,
    perMinRate: 2.5,
    bookingFee: 12,
    helmetRequired: false,
    avgSpeedKmh: 28,
  },
};

export const CANCELLATION_REASONS = [
  { id: 'expected_sooner', label: 'Expected a sooner pickup' },
  { id: 'driver_denied_duty', label: 'Captain asked to cancel / denied duty' },
  { id: 'driver_demanded_extra', label: 'Captain demanded cash outside app' },
  { id: 'wrong_pickup_point', label: 'Wrong pickup location entered' },
  { id: 'changed_my_mind', label: 'Changed my mind / plan cancelled' },
  { id: 'found_alternate_ride', label: 'Found alternate transport' },
  { id: 'driver_not_moving', label: 'Captain is not moving towards pickup' },
];

export const SAFETY_CONFIG = {
  POLICE_EMERGENCY_NUMBER: '112',
  WOMEN_HELPLINE: '1091',
  AMBULANCE: '108',
  CITYOS_SAFETY_DESK: '1800-CITYOS-SAFE',
  ROUTE_DEVIATION_THRESHOLD_KM: 0.8,
  STATIONARY_HAZARD_SECONDS: 300,
};

export const DEFAULT_CITYOS_COORDS = {
  // Rayagada Station Road Center
  lng: 83.4147,
  lat: 19.1678,
  address: 'Rayagada Railway Station Road, Rayagada, Odisha 765001',
};
