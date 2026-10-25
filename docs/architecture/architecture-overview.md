# CityOS: Production-Grade Self-Navigating Architecture Overview

## 1. High-Level Architectural Vision

CityOS is engineered as a production-grade, self-documenting local multi-service super-app. The codebase is organized such that:

> **A new engineer opening the repository can comprehend the entire architecture from the directory tree, navigate directly to any page, screen, section, component, or service, and understand each file's responsibility without global search.**

---

## 2. Primary Architectural Hierarchy

Every feature across CityOS follows a predictable, hierarchical decomposition:

```text
Application
    ↓
Main Category (Feature)
    ↓
Page
    ↓
Screen
    ↓
Section
    ↓
Component
    ↓
Sub-component
```

### Concrete Hierarchy Example

```text
features/
└── ride/
    └── pages/
        └── RideBookingPage/
            ├── RideBookingPage.jsx
            │
            ├── sections/
            │   ├── LocationSelectionSection/
            │   │   ├── LocationSelectionSection.jsx
            │   │   └── components/
            │   │       ├── PickupLocationInput/
            │   │       │   └── PickupLocationInput.jsx
            │   │       └── DestinationLocationInput/
            │   │           └── DestinationLocationInput.jsx
            │   │
            │   ├── RideTypeSelectionSection/
            │   │   ├── RideTypeSelectionSection.jsx
            │   │   └── components/
            │   │       └── RideTypeSelector/
            │   │           └── RideTypeSelector.jsx
            │   │
            │   └── FareEstimateSection/
            │       ├── FareEstimateSection.jsx
            │       └── components/
            │           └── FareAmount/
            │               └── FareAmount.jsx
            │
            └── components/
                ├── RideTrackingMap/
                │   └── RideTrackingMap.jsx
                └── DriverInformationCard/
                    └── DriverInformationCard.jsx
```

---

## 3. The Three Golden Rules

### Rule 1: One Responsibility Per File
Never bundle pages, UI sections, business calculation logic, API network calls, and state management in a single monolithic file. Each file has a discrete, clearly demonstrable responsibility.

### Rule 2: One Major Component Per File
Prefer dedicated, discoverable component files:
- `RideBookingPage.jsx`
- `FareEstimateSection.jsx`
- `RideOptionCard.jsx`
- `ConfirmRideButton.jsx`

Over a single file containing 20 anonymous or unexported inner components.

### Rule 3: Folder Name and Component Name Must Match
```text
RideTypeSelector/
    ├── RideTypeSelector.jsx
    └── index.js
```
The folder name, component file name, and exported React component identifier must match exactly.

---

## 4. Top-Level Source Organization

```text
src/
├── app/                  # Application bootstrap, routing, global providers & error boundaries
│   ├── App.jsx           # Master application shell
│   ├── AppConfiguration.js # App-wide settings and default tokens
│   └── ErrorBoundary.jsx # React Error Boundary for resilient failure handling
│
├── assets/               # Static media, icons, graphics, fonts
│
├── common/               # Truly shared, cross-feature primitives and application shells
│   ├── components/       # Reusable UI widgets (BoltBanner, CashbackBanner, etc.)
│   ├── feedback/         # Global toast, alert, and notification displays
│   ├── icons/            # Brand-specific SVG iconography (CustomIcons)
│   ├── layouts/          # Mobile frame, page layout shell, header/body wrappers
│   ├── modals/           # Application-wide drawers and dialogs (FilterDrawer)
│   ├── navigation/       # Navigation bars (BottomNav, Header, SearchBar, CategoryTabs)
│   └── pages/            # Cross-cutting pages (AccountPage, CartPage, LikePage, etc.)
│
├── features/             # The 8 Core Super-App Categories + Scenes
│   ├── cityos/           # Central discovery, banners, city feeds
│   ├── shop/             # E-commerce, product pages, reviews, bundle offers
│   ├── grocery/          # Quick-commerce grocery catalog, grids, categories
│   ├── food/             # Food delivery, restaurant discovery, dineout venues
│   ├── ride/             # Ride-hailing, Ola Maps tracking, fare estimation, captain dispatch
│   ├── service/          # Home and professional on-demand services
│   ├── travel/           # Intercity, flight, rail, and hotel bookings
│   ├── rent/             # Vehicle, equipment, and residential rental listings
│   └── scenes/           # Interactive video discovery and community stories
│
├── services/             # Third-party integrations and network clients
│   ├── maps/             # Ola Maps vector tile rendering, geocoding & routing
│   ├── location/         # GPS geolocation and device location watchers
│   ├── payment/          # UPI intent generation, payment callbacks
│   └── notification/     # In-app and device notifications
│
├── state/                # Global or domain-specific state stores
├── hooks/                # Custom React lifecycle and workflow hooks
├── utils/                # Pure formatting, math, distance, and validation logic
├── constants/            # Application tokens, status enums, configuration constants
└── types/                # Domain models and schema documentation
```

---

## 5. Standard Category Feature Anatomy

Every category under `src/features/` adheres to this predictable directory layout:

```text
features/<category>/
├── pages/                # Category root entry pages and multi-step view controllers
├── screens/              # Full-screen dialogs, overlays, and dedicated sub-flows
├── sections/             # Major page divisions (banners, category grids, promo feeds)
├── components/           # Feature-specific UI components (cards, pills, pickers)
├── hooks/                # Feature-specific lifecycle logic
├── services/             # Feature-specific API clients and network operations
├── state/                # Feature-specific local stores
├── utils/                # Pure calculation and transformation helpers
├── constants/            # Feature-specific status codes and tier constants
└── index.js              # Clean feature boundary export
```

---

## 6. Ride Architecture Deep-Dive

The Ride hailing engine incorporates the following modular subsystems:

```text
src/features/ride/
├── pages/
│   ├── RideHomePage/     # Vehicle selection, category entry, quick booking triggers
│   └── RideBookingPage/  # End-to-end booking flow (Pickup -> Dispatch -> En-route -> Complete)
│
├── components/
│   ├── RideTrackingMap/  # MapLibre GL + Ola Maps vector tiles with live vehicle tracking
│   ├── RideTypeSelector/ # Vehicle tier selection cards (Bike, Auto, Prime, Sedan)
│   ├── FareEstimateSection/ # Real-time fare breakdown with dynamic distance pricing
│   ├── SafetyPanel/      # SOS siren, 112 emergency calling, trusted contact sharing
│   ├── CancellationModal/# Structured cancellation survey with status transitions
│   ├── PaymentModal/     # Dynamic UPI QR codes and payment gateway selection
│   ├── AudioCallModal/   # Simulated masked VoIP captain communication
│   └── ChatModal/        # Direct real-time messaging with captain
│
├── services/
│   ├── locationService.js# Browser GPS watcher and fallback coordinate resolution
│   ├── routingService.js # Ola Maps REST directions client and GeoJSON decoder
│   └── paymentService.js # Dynamic UPI intent string builder & coupon engine
│
├── state/
│   └── rideStore.js      # Finite State Machine managing 9 lifecycle states
│
├── constants/
│   └── ride.constants.js # State enum, vehicle tier matrices, safety contacts
│
└── utils/
    ├── distanceCalculator.js # Haversine distance, speed, and ETA estimation
    ├── fareCalculator.js     # Base fare, minimum guarantees, distance & surge logic
    └── rideValidation.js     # OTP, coordinate, and state transition validation
```

---

## 7. Data Flow & Dependency Direction

To maintain zero circular dependencies and maximize testability, code must strictly obey one-way dependency flow:

```text
UI Page / Screen
    ↓
Section / Component
    ↓
Custom Hook
    ↓
Domain Service / Store
    ↓
Third-party SDK / Native Platform
```

**Architectural Constraints:**
1. Components must never directly instantiate raw SQL or private database connections.
2. Business logic (such as fare multipliers, distance algorithms, or discount coupon mathematics) must reside in `utils/` or `services/`, never in JSX render functions.
3. Path imports must utilize the configured `@/` alias rather than brittle relative paths (`../../../../`).
