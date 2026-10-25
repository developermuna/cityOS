/**
 * CityOS Driver Discovery & Matching Service
 */

export const DRIVER_PROFILES = {
  bike: {
    id: 'capt_rajesh_bike',
    name: 'Rajesh Kumar',
    rating: 4.9,
    trips: '1,240 rides',
    experience: '3.5 yrs on platform',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    vehicleName: 'Honda Shine 125cc',
    vehicleColor: 'Gloss Black',
    licensePlate: 'OD 18 B 4509',
    badges: ['Top Captain', 'Vaccinated'],
    language: 'Hindi, Odia, English',
    satisfaction: '99% positive reviews',
    phone: '+91 98765 43210',
  },
  auto: {
    id: 'capt_suresh_auto',
    name: 'Suresh Chandra Mohanty',
    rating: 4.85,
    trips: '2,180 rides',
    experience: '5 yrs on platform',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    vehicleName: 'Bajaj RE Auto Rickshaw',
    vehicleColor: 'Yellow & Green',
    licensePlate: 'OD 18 A 2012',
    badges: ['Top Captain'],
    language: 'Odia, Hindi',
    satisfaction: '98% positive reviews',
    phone: '+91 98765 12345',
  },
  mini: {
    id: 'capt_amitabh_mini',
    name: 'Amitabh Pradhan',
    rating: 4.92,
    trips: '3,410 rides',
    experience: '4 yrs on platform',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    vehicleName: 'Maruti Suzuki WagonR AC',
    vehicleColor: 'Silver Metallic',
    licensePlate: 'OD 18 C 9812',
    badges: ['Clean Vehicle', 'AC Specialist'],
    language: 'Odia, English, Hindi',
    satisfaction: '99.5% positive reviews',
    phone: '+91 98765 67890',
  },
  sedan: {
    id: 'capt_vikram_sedan',
    name: 'Vikramaditya Patnaik',
    rating: 4.98,
    trips: '4,520 rides',
    experience: '6 yrs on platform',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    vehicleName: 'Hyundai Aura Sedan AC',
    vehicleColor: 'Pearl White',
    licensePlate: 'OD 18 D 7700',
    badges: ['Premier Driver', 'Comfort Expert'],
    language: 'English, Odia, Hindi',
    satisfaction: '100% positive reviews',
    phone: '+91 98765 99999',
  },
};

/**
 * Generates simulated nearby Captains around a center coordinate.
 *
 * @param {[number, number]} centerCoord - [lng, lat]
 * @returns {Array<Object>} nearby captains
 */
export function getNearbyCaptains(centerCoord = [83.4147, 19.1678]) {
  const [lng, lat] = centerCoord;
  const offsets = [
    { name: 'Captain Rajesh (1240+ rides)', dist: '0.2 km', dLng: 0.0015, dLat: 0.001 },
    { name: 'Captain Suresh (2180+ rides)', dist: '0.3 km', dLng: -0.0018, dLat: 0.0016 },
    { name: 'Captain Amitabh (3410+ rides)', dist: '0.4 km', dLng: 0.0022, dLat: -0.0012 },
    { name: 'Captain Vikram (4520+ rides)', dist: '0.5 km', dLng: -0.0025, dLat: -0.0019 },
    { name: 'Captain Deepak (980+ rides)', dist: '0.6 km', dLng: 0.003, dLat: 0.0025 },
  ];

  return offsets.map((o, index) => ({
    id: index + 1,
    name: o.name,
    dist: o.dist,
    lng: Number((lng + o.dLng).toFixed(5)),
    lat: Number((lat + o.dLat).toFixed(5)),
  }));
}

/**
 * Assigns an optimal Captain for the chosen vehicle tier.
 *
 * @param {string} tierId
 * @returns {Object} captain profile
 */
export function assignCaptainForTier(tierId) {
  return DRIVER_PROFILES[tierId] || DRIVER_PROFILES.bike;
}
