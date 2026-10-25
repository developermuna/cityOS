# CityOS: Project Structure Map

This document outlines the complete directory layout of the CityOS project following the architectural refactoring.

```text
cityOS/
├── .env                              # Local environment variables (API keys, endpoints)
├── .env.example                      # Template environment variable schema
├── jsconfig.json                     # IDE path alias configuration (@/* -> src/*)
├── package.json                      # NPM dependencies, scripts, and tooling config
├── vite.config.js                    # Vite bundler, Tailwind CSS 4, and path alias resolver
├── README.md                         # Rapid onboarding and developer guide
│
├── docs/                             # Engineering documentation suite
│   ├── architecture/
│   │   ├── current-architecture-audit.md # Full audit of previous codebase & anti-patterns
│   │   └── architecture-overview.md     # Primary architectural principles and standards
│   ├── navigation/
│   │   ├── project-structure.md         # This comprehensive directory tree
│   │   ├── project-navigation.md        # "Where is X?" index for instant discovery
│   │   └── where-to-change.md           # Task-to-file lookup directory
│   └── development/
│       ├── coding-guidelines.md         # Clean code and component conventions
│       └── naming-conventions.md        # Strict human-readable naming standards
│
└── src/
    ├── main.jsx                      # React DOM root mounting entrypoint
    ├── App.jsx                       # Top-level backward compatibility bridge to src/app/App.jsx
    ├── index.css                     # Global Tailwind CSS and custom typography styles
    │
    ├── app/                          # Application bootstrap & runtime shell
    │   ├── App.jsx                   # Central application component with error boundaries
    │   ├── AppConfiguration.js       # Global feature flags, default cities & metadata
    │   └── ErrorBoundary.jsx         # React UI crash protection boundary
    │
    ├── common/                       # Universally shared components & application scaffolding
    │   ├── components/               # Cross-feature visual blocks
    │   │   ├── BoltBanner/           # Fast delivery bolt banner
    │   │   ├── CashbackBanner/       # Cashback incentive banner
    │   │   ├── FilterPills/          # Horizontal filter pill selector
    │   │   ├── MindCategories/       # Category circular avatars
    │   │   ├── MindSection/          # "What's on your mind?" feed
    │   │   ├── RestaurantCard/       # Universal dining/merchant card
    │   │   └── Store99Section/       # Budget deals curated feed
    │   │
    │   ├── feedback/                 # User notification & toast system
    │   │   └── ToastNotification/    # Floating animated toast alerts
    │   │
    │   ├── icons/                    # Custom SVG vector assets
    │   │   └── CustomIcons/          # GoldCoinMedallion, BoltIcon, and custom brand icons
    │   │
    │   ├── layouts/                  # Frame and viewport wrappers
    │   │   ├── MobileFrame/          # Mobile screen simulator frame with phone shell
    │   │   ├── PageLayout/           # Base mobile container shell
    │   │   ├── LayoutHeaderWrapper/  # Fixed header slot wrapper
    │   │   └── LayoutBodyWrapper/    # Scrollable viewport container
    │   │
    │   ├── modals/                   # Application-wide bottom sheets & overlays
    │   │   └── FilterDrawer/         # Multi-criteria filter drawer
    │   │
    │   ├── navigation/               # Top and bottom navigation bars
    │   │   ├── BottomNav/            # 5-tab super-app bottom bar (Home, Shop, Scenes, Orders, Account)
    │   │   ├── NavItem/              # Individual bottom bar tab button
    │   │   ├── Header/               # Standard top navigation bar
    │   │   ├── HeaderActions/        # Cart badge, search, notification icons
    │   │   ├── LocationHeader/       # GPS location picker & city dropdown
    │   │   ├── CategoryTabs/         # 8 super-app category horizontal selector
    │   │   ├── SearchBar/            # Global multi-service search input
    │   │   └── StatusBar/            # Mobile clock and battery simulator bar
    │   │
    │   └── pages/                    # Shared auxiliary screens
    │       ├── AccountPage/          # User profile, addresses, settings
    │       ├── CartPage/             # Cross-category shopping cart & checkout
    │       ├── CategoriesPage/       # Full-screen category directory
    │       ├── LikePage/             # Saved favorites & wishlist
    │       ├── AddressSelectorPage/  # Saved address manager
    │       ├── NotificationsPage/    # Activity alerts & order notifications
    │       └── OrdersPage/           # Cross-service order history tracker
    │
    ├── features/                     # The 8 Core Super-App Categories + Scenes
    │   │
    │   ├── cityos/                   # Category 1: Home & Discovery
    │   │   ├── pages/
    │   │   │   └── CityOSHome/       # Master home discovery feed
    │   │   └── sections/
    │   │       ├── FirstBannerCard/  # Top hero promotional carousel
    │   │       └── TrendingLocations/# Local hotspot & trending store cards
    │   │
    │   ├── shop/                     # Category 2: E-Commerce
    │   │   ├── pages/
    │   │   │   ├── ShopHome/         # E-commerce storefront
    │   │   │   └── ProductDetailsPage/# Amazon/Flipkart style PDP with gallery & reviews
    │   │   └── components/
    │   │       ├── ProductVariants/  # Size, color, and pack picker
    │   │       ├── ProductBundleSection/ # "Frequently Bought Together" bundles
    │   │       ├── ProductReviewsSection/# Star breakdown, photo reviews & verification
    │   │       ├── ProductInfluencerPicks/# Creator video reviews
    │   │       ├── SuggestedProducts/# Cross-sell product carousel
    │   │       └── ProgressiveImage/ # Shimmer placeholder & blur-up image loader
    │   │
    │   ├── grocery/                  # Category 3: Quick Commerce
    │   │   ├── pages/
    │   │   │   └── GroceryHome/      # Quick delivery grocery storefront
    │   │   └── components/
    │   │       └── ProductGrid/      # Multi-column grocery product cards
    │   │
    │   ├── food/                     # Category 4: Food Delivery & Dineout
    │   │   ├── pages/
    │   │   │   ├── FoodHome/         # Restaurant delivery discovery
    │   │   │   └── DineoutHome/      # Table booking & dineout venue guide
    │   │   ├── sections/
    │   │   │   ├── FirstBannerCard/  # Food festival & promo banner
    │   │   │   └── DiningVenues/     # Dineout venue listings
    │   │   └── components/
    │   │       └── RestaurantList/   # Restaurant cards with rating & delivery time
    │   │
    │   ├── ride/                     # Category 5: Ride-Hailing
    │   │   ├── pages/
    │   │   │   ├── RideHomePage/     # Vehicle selector, category shortcuts
    │   │   │   └── RideBookingPage/  # End-to-end ride booking & tracking flow
    │   │   ├── components/
    │   │   │   ├── RideTrackingMap/  # Ola Maps & MapLibre GL live route visualization
    │   │   │   ├── RideTypeSelector/ # Bike, Auto, Economy, Premium tier selector
    │   │   │   ├── FareEstimateSection/ # Real-time fare and distance breakdown
    │   │   │   ├── SafetyPanel/      # Web Audio siren, 112 SOS, emergency contact share
    │   │   │   ├── CancellationModal/# Cancellation survey & transition handler
    │   │   │   ├── PaymentModal/     # Dynamic UPI QR codes & payment methods
    │   │   │   ├── AudioCallModal/   # Simulated masked VoIP driver calling
    │   │   │   └── ChatModal/        # Real-time driver messaging drawer
    │   │   ├── services/
    │   │   │   ├── locationService.js# Geolocation & reverse geocoding client
    │   │   │   ├── routingService.js # Ola Maps routing & GeoJSON decoding
    │   │   │   └── paymentService.js # UPI link generation & coupon engine
    │   │   ├── state/
    │   │   │   └── rideStore.js      # Finite state machine (9 ride statuses)
    │   │   ├── constants/
    │   │   │   └── ride.constants.js # Status enums, vehicle tier definitions
    │   │   ├── utils/
    │   │   │   ├── distanceCalculator.js # Haversine math & ETA calculation
    │   │   │   ├── fareCalculator.js     # Tier pricing & coupon math
    │   │   │   └── rideValidation.js     # State machine & coordinate guards
    │   │   └── __tests__/
    │   │       └── ride.test.js      # Comprehensive ride domain unit tests
    │   │
    │   ├── service/                  # Category 6: On-Demand Home Services
    │   │   ├── pages/
    │   │   │   └── ServiceHome/      # Home repair, cleaning, salon catalog
    │   │   └── components/
    │   │       └── ServiceList/      # Professional service listings
    │   │
    │   ├── travel/                   # Category 7: Intercity Travel
    │   │   ├── pages/
    │   │   │   └── TravelHome/       # Flight, bus, train, hotel portal
    │   │   └── components/
    │   │       ├── TravelModeGrid/   # Travel mode selector
    │   │       └── TravelDealsList/  # Curated flight & bus discounts
    │   │
    │   ├── rent/                     # Category 8: Rentals
    │   │   ├── pages/
    │   │   │   └── RentHome/         # Vehicle, property & equipment rentals
    │   │   └── components/
    │   │       ├── RentCategoryGrid/ # Rental category selector
    │   │       └── RentListingsList/ # Verified rental property & vehicle listings
    │   │
    │   └── scenes/                   # Multimedia & Video Feed
    │       ├── pages/
    │       │   └── ScenesHome/       # Vertical shorts video player & feed
    │       ├── sections/
    │       │   └── PlayShortsSection/# Video player carousel
    │       └── components/
    │           └── YouTubeFilterChips/# Video category chips
    │
    ├── services/                     # Shared cross-cutting API & platform clients
    │   ├── maps/                     # Ola Maps vector styles, geocoding & routing
    │   │   ├── olaMapsService.js     # Vector styles, place autocomplete & directions
    │   │   └── index.js              # Maps client export
    │   └── olaMapsService.js         # Backward compatibility re-export
    │
    ├── components/                   # Legacy compatibility bridges
    │   └── OlaMapView.jsx            # MapLibre GL wrapper using updated services
    │
    └── data/
        └── mockData.js               # CityOS mock catalogue and category definitions
```
