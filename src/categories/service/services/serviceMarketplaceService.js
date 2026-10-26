/**
 * Service Marketplace Data Service
 * Provides queries, filtering, provider profiles, and booking management for cityOS Service.
 */

import { SERVICE_CATEGORIES, BOOKING_STATUS } from '../constants/service.constants.js';

export const MOCK_SERVICES = [
  // 1. Electrician
  {
    id: 'elec-1',
    categoryId: 'electrician',
    title: 'Ceiling Fan & Exhaust Installation / Repair',
    description: 'Expert repair of noisy motors, speed regulators, capacitor replacement, and secure ceiling mounting.',
    price: 149,
    originalPrice: 249,
    duration: '30 - 45 mins',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=500&auto=format&fit=crop&q=80'
    ],
    included: [
      'Capacitor & bearing diagnostic',
      'Regulator & wiring inspection',
      'Vibration & balance check',
      '30-day post service warranty'
    ],
    notIncluded: ['New fan appliance cost', 'Concealed wall cutting for extra wiring'],
    rating: 4.8,
    reviewsCount: 1420,
    isEmergency: true,
  },
  {
    id: 'elec-2',
    categoryId: 'electrician',
    title: 'Switchboard, MCB & Fuse Tripping Fix',
    description: 'Instant resolution for short circuits, burnt switch sockets, and main distribution box trippings.',
    price: 199,
    originalPrice: 299,
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=80'],
    included: ['Short circuit detection', 'Socket & switch replacement labor', 'Main earthing check'],
    notIncluded: ['New MCB / Switch hardware cost'],
    rating: 4.9,
    reviewsCount: 980,
    isEmergency: true,
  },

  // 2. Plumber
  {
    id: 'plumb-1',
    categoryId: 'plumber',
    title: 'Water Tap Leakage & Valve Repair',
    description: 'Complete washer change, thread sealant, cartridge replacement, and angle valve fixing.',
    price: 199,
    originalPrice: 349,
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=80'],
    included: ['Washbasin, kitchen tap or shower fix', 'Leakage detection & sealant', 'Pressure check'],
    notIncluded: ['New brass tap / pipe cost'],
    rating: 4.8,
    reviewsCount: 1850,
    isEmergency: true,
  },
  {
    id: 'plumb-2',
    categoryId: 'plumber',
    title: 'Overhead Water Tank Cleaning & Drain Desilting',
    description: 'Mechanized high-pressure jet wash, sludge removal, and UV disinfectant treatment for 500L-2000L tanks.',
    price: 499,
    originalPrice: 799,
    duration: '60 - 90 mins',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80'],
    included: ['Sludge extraction pump', 'Food-grade potassium permanganate treatment', 'Anti-bacterial spray'],
    notIncluded: ['Tank structural crack sealing with epoxy'],
    rating: 4.9,
    reviewsCount: 620,
    isEmergency: false,
  },

  // 3. Carpenter
  {
    id: 'carp-1',
    categoryId: 'carpenter',
    title: 'Door Lock Installation & Wooden Fitting Repair',
    description: 'Godrej/Europa main door lock installation, hinge realignment, handle fixing, and squeak elimination.',
    price: 249,
    originalPrice: 399,
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=500&auto=format&fit=crop&q=80'],
    included: ['Chiseling and alignment', 'Screw tightening & lubrication', '30-day post service warranty'],
    notIncluded: ['New lock cylinder cost'],
    rating: 4.7,
    reviewsCount: 740,
    isEmergency: false,
  },

  // 4. Painter
  {
    id: 'paint-1',
    categoryId: 'painter',
    title: 'Single Room Wall Fresh Painting & Touch-up',
    description: 'Two coats of premium acrylic emulsion, surface putty scraping, and primer application.',
    price: 899,
    originalPrice: 1399,
    duration: '3 - 5 hours',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=80'],
    included: ['Floor masking with plastic sheets', 'Putty sanding & two coat painting', 'Post-painting cleanup'],
    notIncluded: ['Paint bucket purchase cost'],
    rating: 4.8,
    reviewsCount: 380,
    isEmergency: false,
  },

  // 5. Cleaner
  {
    id: 'clean-1',
    categoryId: 'cleaner',
    title: 'Full Home Deep Cleaning (1BHK / 2BHK)',
    description: 'Intense floor scrubbing, bathroom descaling, kitchen grease removal, and window pane buffing.',
    price: 1499,
    originalPrice: 2299,
    duration: '3 - 4 hours',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1581578731548-c64695cc6958?w=500&auto=format&fit=crop&q=80'],
    included: ['Industrial single-disc floor scrubber', 'Eco-friendly Taski chemical sanitizers', 'Tile grout cleaner'],
    notIncluded: ['Terrace washing', 'Terracotta roof tiles scrubbing'],
    rating: 4.9,
    reviewsCount: 2450,
    isEmergency: false,
  },

  // 6. AC Repair & Service
  {
    id: 'ac-1',
    categoryId: 'ac-repair',
    title: 'Split / Window AC Foam Jet Wash Service',
    description: 'Double deep pressure jet cleaning of cooling coils, filter sanitization, drain tray de-clogging and gas check.',
    price: 499,
    originalPrice: 799,
    duration: '45 - 60 mins',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&auto=format&fit=crop&q=80'],
    included: ['Indoor cooling coil foam wash', 'Outdoor condenser jet wash', 'Gas pressure & current reading audit', '30-day warranty'],
    notIncluded: ['Freon R32/R410 gas refill (billed separately)', 'Compressor capacitor replacement'],
    rating: 4.9,
    reviewsCount: 3100,
    isEmergency: true,
  },

  // 7. Appliance Repair
  {
    id: 'appl-1',
    categoryId: 'appliance-repair',
    title: 'Washing Machine Drum & Motor Repair',
    description: 'Diagnose spinning issues, drain motor blockage, error codes (E1/E2), and excessive vibration.',
    price: 349,
    originalPrice: 549,
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&auto=format&fit=crop&q=80'],
    included: ['Inlet/outlet pump check', 'Motor belt check', 'Control board diagnostic'],
    notIncluded: ['New PCB board or drum motor hardware'],
    rating: 4.7,
    reviewsCount: 890,
    isEmergency: true,
  },

  // 8. RO / Water Purifier
  {
    id: 'ro-1',
    categoryId: 'ro-service',
    title: 'RO Water Purifier Filter & Membrane Service',
    description: 'Complete sediment & carbon filter check, TDS calibration, membrane flush, and pump pressure testing.',
    price: 299,
    originalPrice: 499,
    duration: '40 mins',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=500&auto=format&fit=crop&q=80'],
    included: ['Water TDS pre & post test', 'Sediment bowl cleaning', 'Leakage test under pressure'],
    notIncluded: ['New RO membrane replacement cartridge'],
    rating: 4.8,
    reviewsCount: 1120,
    isEmergency: false,
  },

  // 9. Mobile / Computer
  {
    id: 'mob-1',
    categoryId: 'mobile-computer',
    title: 'Laptop / PC Formatting, Cleaning & SSD Upgrade',
    description: 'Thermal paste re-application, dust blower cleaning, Windows/Linux OS installation, and fast SSD setup.',
    price: 399,
    originalPrice: 699,
    duration: '60 mins',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=80'],
    included: ['Internal cooling fan dust removal', 'Arctic MX-4 thermal paste renewal', 'Driver & OS setup'],
    notIncluded: ['SSD hardware cost'],
    rating: 4.9,
    reviewsCount: 650,
    isEmergency: false,
  },

  // 10. Construction Labour
  {
    id: 'labour-1',
    categoryId: 'construction-labour',
    title: 'General Construction & Daily Shifting Helper',
    description: 'Reliable, energetic manual labour for loading/unloading bricks, cement bags, digging, and rubble clearance.',
    price: 499,
    originalPrice: 650,
    duration: 'Full Day (8 hrs)',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80'],
    included: ['Verified local worker', 'Full day 8-hour shift', 'Site material movement'],
    notIncluded: ['Specialized mechanical equipment'],
    rating: 4.6,
    reviewsCount: 420,
    isEmergency: false,
  },

  // 11. Mason / Mestry
  {
    id: 'mason-1',
    categoryId: 'mason',
    title: 'Masonry Brickwork, Plastering & Tile Repair',
    description: 'Skilled mestry for floor tile fixing, bathroom slope rectification, crack plastering, and parapet repair.',
    price: 649,
    originalPrice: 899,
    duration: 'Full Day (8 hrs)',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=80'],
    included: ['Skilled masonry tools', 'Laser alignment check', 'Smooth sponge plaster finishing'],
    notIncluded: ['Cement, sand & tile materials'],
    rating: 4.8,
    reviewsCount: 310,
    isEmergency: false,
  },

  // 12. Driver
  {
    id: 'driver-1',
    categoryId: 'driver',
    title: 'Personal Car Driver (City & Highway)',
    description: 'Experienced commercial license driver for manual & automatic cars. Safe, disciplined and punctual.',
    price: 249,
    originalPrice: 399,
    duration: 'Per 4 Hours',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&auto=format&fit=crop&q=80'],
    included: ['Police-verified driver', 'Valid DL holder', 'Navigation & parking assistance'],
    notIncluded: ['Fuel and toll charges'],
    rating: 4.9,
    reviewsCount: 1670,
    isEmergency: true,
  },

  // 13. Mechanic
  {
    id: 'mech-1',
    categoryId: 'mechanic',
    title: 'Roadside Bike Puncture & Breakdown Assist',
    description: 'On-the-spot tubeless/tube puncture fix, battery jumpstart, spark plug cleaning, and chain lubrication.',
    price: 149,
    originalPrice: 249,
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=500&auto=format&fit=crop&q=80'],
    included: ['Emergency roadside arrival (under 20m)', 'Tyre puncture kit & mini compressor', 'Spark plug cleanup'],
    notIncluded: ['New tyre or battery replacement cost'],
    rating: 4.8,
    reviewsCount: 2200,
    isEmergency: true,
  },

  // 14. Beauty / Salon
  {
    id: 'beauty-1',
    categoryId: 'beauty-salon',
    title: 'Glow Facial, Hair Spa & Cleanup Combo',
    description: '100% hygienic salon session with mono-dose kits, disposable towels, and certified aesthetician.',
    price: 699,
    originalPrice: 1299,
    duration: '60 mins',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=500&auto=format&fit=crop&q=80'],
    included: ['Organic scrub & fruit peel', 'Steam & blackhead extraction', 'Pressure point face massage', 'Disposable kits'],
    notIncluded: ['Hair coloring chemical products'],
    rating: 4.9,
    reviewsCount: 1540,
    isEmergency: false,
  },

  // 15. Home Shifting
  {
    id: 'shift-1',
    categoryId: 'home-shifting',
    title: 'Local House Shifting (Mini Truck + 2 Helpers)',
    description: 'Tata Ace / Piaggio truck with 2 experienced loaders, protective blanket covers, and bubble wrap.',
    price: 1199,
    originalPrice: 1899,
    duration: '3 hours',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format&fit=crop&q=80'],
    included: ['Vehicle transport within 15 km', '2 verified loading helpers', 'Furniture protective blankets'],
    notIncluded: ['Inter-district highway toll charges'],
    rating: 4.7,
    reviewsCount: 510,
    isEmergency: false,
  },

  // 16. Other Local
  {
    id: 'cctv-1',
    categoryId: 'other-local',
    title: 'CCTV Camera Setup & Mobile App Configuration',
    description: 'Indoor & outdoor dome/bullet camera installation, DVR connection, BNC cabling, and live phone streaming setup.',
    price: 399,
    originalPrice: 699,
    duration: '60 mins',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500&auto=format&fit=crop&q=80',
    images: ['https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500&auto=format&fit=crop&q=80'],
    included: ['Camera mounting on walls', 'Cable crimping & routing', 'Mobile remote app connection'],
    notIncluded: ['Camera & DVR hardware cost'],
    rating: 4.8,
    reviewsCount: 390,
    isEmergency: false,
  },
];

export const MOCK_PROVIDERS = [
  {
    id: 'prov-1',
    name: 'Rajesh Senapati',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    skills: ['Electrician', 'AC Repair'],
    experience: '7+ Years',
    rating: 4.9,
    reviewsCount: 680,
    completedJobs: 1840,
    serviceArea: 'Station Road, Gautam Nagar, Rayagada',
    verificationBadges: ['Aadhaar Verified', 'Skill Certified', 'Police Checked'],
    isAvailableNow: true,
    distanceKm: 0.8,
    phone: '+91 98765 43210',
    startingPrice: 149,
    bio: 'Licensed electrical contractor specializing in modern home appliances, inverter setups, and swift emergency troubleshooting.',
  },
  {
    id: 'prov-2',
    name: 'Bhabani Shankar Patnaik',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    skills: ['Plumber', 'RO / Water Purifier'],
    experience: '9+ Years',
    rating: 4.85,
    reviewsCount: 520,
    completedJobs: 1430,
    serviceArea: 'New Colony, Subash Bose Road, Rayagada',
    verificationBadges: ['Aadhaar Verified', 'Trade Certified'],
    isAvailableNow: true,
    distanceKm: 1.2,
    phone: '+91 98765 12345',
    startingPrice: 199,
    bio: 'Expert master plumber skilled in CPVC piping, leak detection, water pump maintenance, and sanitary ware installation.',
  },
  {
    id: 'prov-3',
    name: 'Kishore Kumar Das',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    skills: ['Cleaner', 'Painter'],
    experience: '5+ Years',
    rating: 4.92,
    reviewsCount: 430,
    completedJobs: 980,
    serviceArea: 'Chekkaguda, River View Road, Rayagada',
    verificationBadges: ['Aadhaar Verified', 'Background Cleared'],
    isAvailableNow: true,
    distanceKm: 1.5,
    phone: '+91 98765 67890',
    startingPrice: 399,
    bio: 'Dedicated deep cleaning specialist equipped with single-disc floor scrubbers and non-toxic hospital-grade sanitizers.',
  },
  {
    id: 'prov-4',
    name: 'Pooja Mohanty',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    skills: ['Beauty / Salon at Home'],
    experience: '6+ Years',
    rating: 4.95,
    reviewsCount: 890,
    completedJobs: 1650,
    serviceArea: 'Town Center, Rayagada & JK Pur',
    verificationBadges: ['CIDESCO Certified', 'Aadhaar Verified'],
    isAvailableNow: true,
    distanceKm: 0.6,
    phone: '+91 98765 88888',
    startingPrice: 399,
    bio: 'Professional beautician trained in premium skincare, fruit facials, salon hair spa, and hygienic bridal preparations.',
  },
  {
    id: 'prov-5',
    name: 'Suresh Chandra Sahu',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    skills: ['Mechanic', 'On-Demand Driver'],
    experience: '8+ Years',
    rating: 4.88,
    reviewsCount: 710,
    completedJobs: 2100,
    serviceArea: 'Bypass Highway & Rayagada Bus Stand',
    verificationBadges: ['Commercial DL', 'Aadhaar Verified'],
    isAvailableNow: true,
    distanceKm: 0.9,
    phone: '+91 98765 99999',
    startingPrice: 149,
    bio: 'Fast roadside breakdown technician and professional chauffeur available for 24/7 urgent roadside assistance.',
  },
];

export const MOCK_REVIEWS = [
  {
    id: 'rev-1',
    userName: 'Debasis Mishra',
    rating: 5,
    date: '2 days ago',
    comment: 'Arrived in less than 20 minutes! Fixed the short circuit and ceiling fan regulator very neatly. Very polite professional.',
    tags: ['On-time Arrival', 'Polite', 'Clean Work'],
  },
  {
    id: 'rev-2',
    userName: 'Snehalata Jena',
    rating: 5,
    date: '1 week ago',
    comment: 'AC jet cleaning was phenomenal. Cooling is now instant and the water dripping stopped completely. Great job!',
    tags: ['Super Cooling', 'Fair Price'],
  },
  {
    id: 'rev-3',
    userName: 'Prasanta Tripathy',
    rating: 4,
    date: '2 weeks ago',
    comment: 'Plumber resolved the leaking tap and tested the overhead water pressure. Clear pricing without hidden costs.',
    tags: ['Genuine Work'],
  },
];

// In-memory active bookings registry with seed entries
let activeBookings = [
  {
    id: 'SRV-8941',
    serviceId: 'elec-1',
    serviceTitle: 'Ceiling Fan & Exhaust Installation / Repair',
    categoryId: 'electrician',
    basePrice: 149,
    totalAmount: 168,
    discount: 0,
    emergencyFee: 0,
    scheduledDate: 'Today',
    scheduledTimeSlot: '11:00 AM - 01:00 PM',
    address: 'Flat 302, Gautam Nagar, Near Collectorate, Rayagada',
    problemDescription: 'Fan making loud humming sound and speed regulator not changing speed.',
    photos: [],
    paymentMethod: 'UPI',
    paymentStatus: 'Paid Online',
    bookingStatus: BOOKING_STATUS.PROVIDER_ARRIVING,
    status: BOOKING_STATUS.PROVIDER_ARRIVING,
    otp: '6392',
    provider: MOCK_PROVIDERS[0],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'SRV-8712',
    serviceId: 'ac-1',
    serviceTitle: 'Split / Window AC Foam Jet Wash Service',
    categoryId: 'ac-repair',
    basePrice: 499,
    totalAmount: 469,
    discount: 50,
    emergencyFee: 0,
    scheduledDate: 'Yesterday',
    scheduledTimeSlot: '02:00 PM - 04:00 PM',
    address: 'Station Colony, Quarter 14, Rayagada',
    problemDescription: 'Annual pre-summer AC servicing.',
    photos: [],
    paymentMethod: 'Cash',
    paymentStatus: 'Completed',
    bookingStatus: BOOKING_STATUS.SERVICE_COMPLETED,
    status: BOOKING_STATUS.SERVICE_COMPLETED,
    otp: '4821',
    provider: MOCK_PROVIDERS[0],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

/**
 * Service Marketplace Query & Mutation Functions
 */
export const serviceMarketplaceService = {
  getCategories: () => SERVICE_CATEGORIES,

  getCategoryById: (categoryId) => {
    return SERVICE_CATEGORIES.find((c) => c.id === categoryId) || null;
  },

  getAllServices: () => MOCK_SERVICES,

  getServicesByCategory: (categoryId) => {
    if (!categoryId || categoryId === 'all') return MOCK_SERVICES;
    return MOCK_SERVICES.filter((s) => s.categoryId === categoryId);
  },

  getServiceById: (serviceId) => {
    return MOCK_SERVICES.find((s) => s.id === serviceId) || MOCK_SERVICES[0];
  },

  getProviders: () => MOCK_PROVIDERS,

  getProviderById: (providerId) => {
    return MOCK_PROVIDERS.find((p) => p.id === providerId) || MOCK_PROVIDERS[0];
  },

  getReviews: () => MOCK_REVIEWS,

  // Bookings management
  getBookings: () => activeBookings.map((b) => ({
    ...b,
    status: b.status || b.bookingStatus || BOOKING_STATUS.PROVIDER_ASSIGNED,
    bookingStatus: b.bookingStatus || b.status || BOOKING_STATUS.PROVIDER_ASSIGNED,
  })),

  getBookingById: (bookingId) => {
    return activeBookings.find((b) => b.id === bookingId) || null;
  },

  createBooking: (bookingPayload) => {
    const newId = `SRV-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomOtp = String(Math.floor(1000 + Math.random() * 9000));
    const randomProvider = MOCK_PROVIDERS.find((p) => 
      p.skills.some(skill => skill.toLowerCase().includes(bookingPayload.categoryId?.toLowerCase() || ''))
    ) || MOCK_PROVIDERS[0];

    const newBooking = {
      id: newId,
      serviceId: bookingPayload.serviceId,
      serviceTitle: bookingPayload.serviceTitle,
      categoryId: bookingPayload.categoryId,
      basePrice: bookingPayload.basePrice || 199,
      totalAmount: bookingPayload.totalAmount || 199,
      discount: bookingPayload.discount || 0,
      emergencyFee: bookingPayload.emergencyFee || 0,
      scheduledDate: bookingPayload.scheduledDate || 'Today',
      scheduledTimeSlot: bookingPayload.scheduledTimeSlot || 'Within 30 mins',
      address: bookingPayload.address || 'Gautam Nagar, Rayagada',
      problemDescription: bookingPayload.problemDescription || 'Standard service request',
      photos: bookingPayload.photos || [],
      paymentMethod: bookingPayload.paymentMethod || 'Cash',
      paymentStatus: bookingPayload.paymentMethod === 'Cash' ? 'Pending (Pay after work)' : 'Paid Online',
      bookingStatus: BOOKING_STATUS.PROVIDER_ASSIGNED,
      status: BOOKING_STATUS.PROVIDER_ASSIGNED,
      otp: randomOtp,
      provider: randomProvider,
      createdAt: new Date().toISOString(),
    };

    activeBookings = [newBooking, ...activeBookings];
    return newBooking;
  },

  updateBookingStatus: (bookingId, newStatus, extra = {}) => {
    activeBookings = activeBookings.map((b) => 
      b.id === bookingId ? { ...b, bookingStatus: newStatus, status: newStatus, ...extra } : b
    );
    return activeBookings.find((b) => b.id === bookingId);
  },

  cancelBooking: (bookingId, _reason = '') => {
    return serviceMarketplaceService.updateBookingStatus(bookingId, BOOKING_STATUS.CANCELLED, {
      cancellationReason: _reason,
    });
  },
};
