/**
 * Rental Marketplace Constants & Enums
 */

export const RENTAL_CATEGORIES = [
  {
    id: 'homes',
    name: 'Homes & Properties',
    shortName: 'Homes',
    icon: '🏠',
    badge: 'Zero Brokerage',
    desc: 'Flats, houses, villas, PG, shops & event halls',
    startingPrice: '₹3,500/mo',
    bgGradient: 'from-orange-500/20 to-amber-500/10',
    borderColor: 'border-orange-300/40',
    iconBg: 'bg-orange-100 text-orange-700',
    subcategories: [
      'Houses',
      'Flats/Apartment',
      'Rooms',
      'PG',
      'Hostels',
      'Villas',
      'Shops',
      'Offices',
      'Commercial buildings',
      'Warehouses',
      'Godowns',
      'Land/plots',
      'Event halls',
      'Marriage halls',
      'Guest houses',
      'Farmhouses'
    ]
  },
  {
    id: 'vehicles',
    name: 'Vehicle Rentals',
    shortName: 'Vehicles',
    icon: '🚗',
    badge: 'Self-drive & Driver',
    desc: 'Bikes, scooters, cars, SUVs, autos & commercial',
    startingPrice: '₹400/day',
    bgGradient: 'from-amber-500/20 to-orange-500/10',
    borderColor: 'border-amber-300/40',
    iconBg: 'bg-amber-100 text-amber-700',
    subcategories: [
      'Bikes',
      'Scooters',
      'Cars',
      'SUVs',
      'Auto-rickshaws',
      'E-rickshaws',
      'Vans',
      'Tempo',
      'Pickup vehicles',
      'Trucks',
      'Construction vehicles',
      'Vehicles with driver',
      'Self-drive vehicles'
    ]
  },
  {
    id: 'furniture',
    name: 'Furniture Rentals',
    shortName: 'Furniture',
    icon: '🪑',
    badge: 'Free Setup',
    desc: 'Beds, sofas, dining, study tables & packages',
    startingPrice: '₹199/mo',
    bgGradient: 'from-rose-500/20 to-orange-500/10',
    borderColor: 'border-rose-300/40',
    iconBg: 'bg-rose-100 text-rose-700',
    subcategories: [
      'Bed',
      'Mattress',
      'Sofa',
      'Chair',
      'Table',
      'Dining table',
      'Wardrobe',
      'Study table',
      'Office furniture',
      'Appliances/furniture packages',
      'Complete room packages'
    ]
  },
  {
    id: 'equipment',
    name: 'Equipment & Assets',
    shortName: 'Equipment',
    icon: '🛠️',
    badge: 'With Operator Opt',
    desc: 'Tools, generators, drilling, sound & IT assets',
    startingPrice: '₹150/day',
    bgGradient: 'from-blue-500/20 to-orange-500/10',
    borderColor: 'border-blue-300/40',
    iconBg: 'bg-blue-100 text-blue-700',
    subcategories: [
      'Construction equipment',
      'Agricultural equipment',
      'Tools',
      'Generator',
      'Welding machine',
      'Drilling machine',
      'Ladders',
      'Sound systems',
      'Projectors',
      'Cameras',
      'Computers/laptops',
      'Printers',
      'Event equipment',
      'Party equipment'
    ]
  },
  {
    id: 'events',
    name: 'Event & Functions',
    shortName: 'Events',
    icon: '🎉',
    badge: 'Complete Setup',
    desc: 'Tents, stages, lights, DJ, catering & decoration',
    startingPrice: '₹1,500/event',
    bgGradient: 'from-purple-500/20 to-orange-500/10',
    borderColor: 'border-purple-300/40',
    iconBg: 'bg-purple-100 text-purple-700',
    subcategories: [
      'Decoration items',
      'Chairs',
      'Tables',
      'Stage',
      'Tent',
      'Lighting equipment',
      'Sound system',
      'DJ equipment',
      'Projector',
      'Catering equipment'
    ]
  },
  {
    id: 'other',
    name: 'Other Rentals',
    shortName: 'Other',
    icon: '🏕️',
    badge: 'Flexible Tenure',
    desc: 'Camping, sports, instruments, baby & medical gear',
    startingPrice: '₹99/day',
    bgGradient: 'from-emerald-500/20 to-orange-500/10',
    borderColor: 'border-emerald-300/40',
    iconBg: 'bg-emerald-100 text-emerald-700',
    subcategories: [
      'Camping equipment',
      'Sports equipment',
      'Musical instruments',
      'Travel equipment',
      'Baby equipment',
      'Medical equipment',
      'Temporary storage',
      'Other local rental items'
    ]
  }
];

export const RENTAL_SORT_OPTIONS = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'nearest', label: 'Nearest' },
  { id: 'price_low', label: 'Lowest Price' },
  { id: 'price_high', label: 'Highest Price' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'newest', label: 'Newest' },
  { id: 'most_rented', label: 'Most Rented' },
];

export const RENTAL_BOOKING_STATUS = {
  CONFIRMED: 'CONFIRMED',
  ACTIVE: 'ACTIVE',
  RETURNING: 'RETURNING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export const RENTAL_COUPONS = [
  {
    code: 'RENTFIRST',
    discountPercent: 15,
    maxDiscount: 500,
    minRental: 1000,
    description: '15% OFF up to ₹500 on your first rental'
  },
  {
    code: 'HOMERENT',
    discountAmount: 1000,
    minRental: 10000,
    description: 'Flat ₹1,000 OFF on long-term home/property rentals'
  },
  {
    code: 'VEHICLE10',
    discountPercent: 10,
    maxDiscount: 300,
    minRental: 800,
    description: '10% OFF on all bikes & car rentals'
  },
  {
    code: 'CITYFEST',
    discountPercent: 20,
    maxDiscount: 1500,
    minRental: 2500,
    description: '20% OFF on event, tent & party rentals'
  }
];

export const DURATION_UNITS = [
  { id: 'hour', label: 'Hourly', multiplier: 1 },
  { id: 'day', label: 'Daily', multiplier: 24 },
  { id: 'week', label: 'Weekly', multiplier: 24 * 7 },
  { id: 'month', label: 'Monthly', multiplier: 24 * 30 },
  { id: 'event', label: 'Per Event', multiplier: 24 * 2 }
];
