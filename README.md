# CityOS — Production-Grade Multi-Service Super-App

Welcome to **CityOS**, a high-performance local multi-service super-app built with React 19, Vite 8, Tailwind CSS 4, and MapLibre GL / Ola Maps.

This codebase is organized with a **self-documenting, self-navigating architecture**. A new developer can understand the system from the folder tree and jump directly to any page, screen, section, component, or service without global searching.

---

## Table of Contents
1. [What is CityOS?](#1-what-is-cityos)
2. [Technology Stack](#2-technology-stack)
3. [Application Architecture](#3-application-architecture)
4. [Repository Structure](#4-repository-structure)
5. [Feature Structure](#5-feature-structure)
6. [Naming Conventions](#6-naming-conventions)
7. [How Frontend Works](#7-how-frontend-works)
8. [How Backend Works](#8-how-backend-works)
9. [How Database Works](#9-how-database-works)
10. [How Authentication Works](#10-how-authentication-works)
11. [How Payments Work](#11-how-payments-work)
12. [How Maps Work](#12-how-maps-work)
13. [How Realtime Works](#13-how-realtime-works)
14. [How to Run Locally](#14-how-to-run-locally)
15. [Environment Variables](#15-environment-variables)
16. [Testing](#16-testing)
17. [Deployment](#17-deployment)
18. [Where to Modify Common Functionality](#18-where-to-modify-common-functionality)
19. [Where to Modify Each Category](#19-where-to-modify-each-category)
20. [Where to Add a New Feature](#20-where-to-add-a-new-feature)

---

## 1. What is CityOS?

CityOS is a local commerce and mobility super-app unifying 8 primary categories under a single seamless mobile-first experience:
1. **CityOS**: Central discovery feed, local deals, hero carousels, and city highlights.
2. **Shop**: E-commerce storefront with multi-variant picking, bundle discounts, and photo reviews.
3. **Grocery**: Quick-commerce grocery catalog with sub-minute cart workflows.
4. **Food**: Restaurant delivery and dineout table reservation portal.
5. **Ride**: On-demand ride-hailing with live Ola Maps tracking, vehicle tiers (Bike, Auto, Prime, Sedan), emergency SOS, and dynamic UPI payments.
6. **Service**: On-demand professional home repairs, cleaning, and beauty services.
7. **Travel**: Intercity bus, train, flight, and hotel booking portal.
8. **Rent**: Verified property, vehicle, and equipment rental listings.
9. **Scenes**: Community multimedia and vertical video feed.

---

## 2. Technology Stack

- **Core Framework**: React 19.3.1 (ES Modules, JSX)
- **Bundler & Tooling**: Vite 8.3.4 with Rolldown compiler
- **Styling**: Tailwind CSS 4.3.3 (`@tailwindcss/vite`)
- **Map & Geocoding Engine**: MapLibre GL 6.16.0 + Ola Maps Web SDK 1.4.0
- **Iconography**: `lucide-react` (0.475.0)
- **QR Code Engine**: `qrcode.react` (4.2.0)
- **Linter**: `oxlint` (0.16.0)
- **Unit Testing**: Node.js native test runner (`node:test`, `node:assert/strict`)
- **Mobile Container**: Capacitor-ready responsive layout

---

## 3. Application Architecture

CityOS strictly enforces a predictable 6-tier hierarchy:

```text
Application ➔ Main Category ➔ Page ➔ Screen ➔ Section ➔ Component ➔ Sub-component
```

### The Three Golden Rules
1. **One Responsibility Per File**: Never bundle business math, network calls, state stores, and UI into one file.
2. **One Major Component Per File**: Distinct components have dedicated, discoverable files.
3. **Folder and Component Name Match**: The folder name, component file name, and exported React component identifier must match identically:
   ```text
   RideTypeSelector/
   ├── RideTypeSelector.jsx
   └── index.js
   ```

---

## 4. Repository Structure

```text
src/
├── app/                  # Application bootstrap, routing & error boundaries
│   ├── App.jsx           # Master application shell
│   ├── AppConfiguration.js # Global configurations and tokens
│   └── ErrorBoundary.jsx # React crash prevention boundary
│
├── assets/               # Static graphics, fonts, illustrations
│
├── common/               # Truly shared components & layouts
│   ├── components/       # Cross-cutting UI cards, banners & pills
│   ├── feedback/         # Animated toast alert system
│   ├── icons/            # SVG vector icon library (CustomIcons)
│   ├── layouts/          # MobileFrame, PageLayout, Header/Body wrappers
│   ├── modals/           # Application filter drawer & dialogs
│   ├── navigation/       # BottomNav, CategoryTabs, Header, SearchBar
│   └── pages/            # AccountPage, CartPage, LikePage, OrdersPage
│
├── features/             # The 8 Core Super-App Categories + Scenes
│   ├── cityos/           # Central discovery & city feeds
│   ├── shop/             # E-commerce, PDP, variants, bundle sections
│   ├── grocery/          # Quick-commerce grocery grids
│   ├── food/             # Restaurant discovery & dineout venues
│   ├── ride/             # Ride-hailing, maps, dispatch & fare estimation
│   ├── service/          # Home & professional on-demand services
│   ├── travel/           # Intercity flights, trains & hotels
│   ├── rent/             # Vehicle & property rental listings
│   └── scenes/           # Interactive shorts & multimedia feed
│
├── services/             # Shared API clients & external SDK wrappers
│   └── maps/             # Ola Maps vector styles, autocomplete & routing
│
├── components/           # Core platform visual adapters (OlaMapView)
└── data/                 # CityOS mock catalogue and catalog data
```

---

## 5. Feature Structure

Every category inside `src/features/` follows this standard organization:

```text
features/<category>/
├── pages/                # Category root entry pages and view controllers
├── screens/              # Dedicated full-screen sub-flows
├── sections/             # Major visual page divisions
├── components/           # Feature-specific UI components
├── hooks/                # Feature-specific React hooks
├── services/             # Feature-specific network & API clients
├── state/                # Feature-specific state stores & machines
├── utils/                # Pure calculation, distance & validation utilities
├── constants/            # Feature-specific status codes and enums
└── __tests__/            # Colocated unit test suite
```

---

## 6. Naming Conventions

- **Component Folders & Files**: PascalCase (`RideTypeSelector/RideTypeSelector.jsx`).
- **Services & Utilities**: camelCase (`distanceCalculator.js`, `fareCalculator.js`).
- **Constants**: `.constants.js` suffix with SCREAMING_SNAKE_CASE keys (`RIDE_STATUS.SEARCHING_DRIVER`).
- **Variables & Functions**: Explicit, human-readable names. Single-letter variables (`d`, `x`, `res`) are strictly forbidden.

---

## 7. How Frontend Works

- CityOS renders inside a simulated or native mobile frame container (`MobileFrame.jsx`).
- Top navigation provides GPS city detection (`LocationHeader.jsx`), global search (`SearchBar.jsx`), and 8-category tabs (`CategoryTabs.jsx`).
- Category switching dynamically renders the active category page within `src/app/App.jsx`.
- All cross-module imports use the configured path alias `@/` (e.g. `@/common/...`, `@/features/...`, `@/services/...`).

---

## 8. How Backend Works

- API services are decoupled from UI components.
- Frontend services (`src/services/` and `src/features/<category>/services/`) provide clean abstraction layers over REST/WebSocket endpoints.
- External responses are sanitized and normalized before being passed into UI components or state stores.

---

## 9. How Database Works

- Domain data entities follow documented schemas in `src/features/<category>/constants/` and `types/`.
- Local UI state and active workflows (such as in-progress ride bookings or cart items) are tracked via reactive state stores (`rideStore.js`).

---

## 10. How Authentication Works

- User session and profile metadata are managed in [`src/common/pages/AccountPage/AccountPage.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/pages/AccountPage/AccountPage.jsx).
- Stored user addresses, emergency contacts, and notification preferences are accessible through dedicated sub-views.

---

## 11. How Payments Work

- Dynamic UPI deep-linking and QR code rendering via `qrcode.react`.
- Supports Google Pay, PhonePe, Paytm, and BHIM UPI intents (`upi://pay?pa=...`).
- Automated coupon validation and trip discount engine in [`src/features/ride/services/paymentService.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/services/paymentService.js).

---

## 12. How Maps Work

- Powered by **MapLibre GL** with **Ola Maps Web SDK** and vector tile endpoints.
- **Dark & Light Styles**: Dynamically selected vector styles via `OLA_MAP_STYLES`.
- **Autocomplete & Routing**: Reverse geocoding and real-time turn-by-turn routing via `src/services/maps/olaMapsService.js`.
- **Graceful Fallback**: If an API key is not present or offline, maps seamlessly fall back to OpenStreetMap raster tiles without crashing the application.

---

## 13. How Realtime Works

- Ride dispatch, captain vehicle coordinates, and distance calculations update in real time via reactive subscribers in [`src/features/ride/state/rideStore.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/state/rideStore.js).
- Simulated masked VoIP calling and in-app chat drawers enable real-time driver-passenger communication.

---

## 14. How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
# http://localhost:3000
```

---

## 15. Environment Variables

Create a `.env` file in the project root:

```env
# Ola Maps Web API Key
VITE_OLA_MAPS_API_KEY=your_ola_maps_api_key_here
```

---

## 16. Testing

Run the automated test suite powered by the Node.js native test runner:

```bash
npm test
```

Run static code analysis and linting:

```bash
npm run check
```

Validate production build:

```bash
npm run build
```

---

## 17. Deployment

Build optimized static assets:

```bash
npm run build
```

Preview the production bundle locally:

```bash
npm run preview
```

Output is emitted to `dist/`, ready for hosting on Vercel, Netlify, Cloudflare Pages, or syncing to Capacitor for mobile deployment (`npx cap sync`).

---

## 18. Where to Modify Common Functionality

| Task | File Path |
|---|---|
| **Bottom Navigation Bar** | [`src/common/navigation/BottomNav/BottomNav.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/navigation/BottomNav/BottomNav.jsx) |
| **Top Header & Search** | [`src/common/navigation/Header/Header.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/navigation/Header/Header.jsx) |
| **Category Switcher Tabs** | [`src/common/navigation/CategoryTabs/CategoryTabs.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/navigation/CategoryTabs/CategoryTabs.jsx) |
| **Shopping Cart Page** | [`src/common/pages/CartPage/CartPage.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/pages/CartPage/CartPage.jsx) |
| **User Profile & Settings** | [`src/common/pages/AccountPage/AccountPage.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/pages/AccountPage/AccountPage.jsx) |
| **Toast Notifications** | [`src/common/feedback/ToastNotification/ToastNotification.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/feedback/ToastNotification/ToastNotification.jsx) |
| **Filter Bottom Sheet** | [`src/common/modals/FilterDrawer/FilterDrawer.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/modals/FilterDrawer/FilterDrawer.jsx) |

---

## 19. Where to Modify Each Category

| Category | Primary Entry Page |
|---|---|
| **CityOS (Home)** | [`src/features/cityos/pages/CityOSHome/CityOSHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/cityos/pages/CityOSHome/CityOSHome.jsx) |
| **Shop** | [`src/features/shop/pages/ShopHome/ShopHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/shop/pages/ShopHome/ShopHome.jsx) |
| **Grocery** | [`src/features/grocery/pages/GroceryHome/GroceryHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/grocery/pages/GroceryHome/GroceryHome.jsx) |
| **Food & Dineout** | [`src/features/food/pages/FoodHome/FoodHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/food/pages/FoodHome/FoodHome.jsx) |
| **Ride** | [`src/features/ride/pages/RideHomePage/RideHomePage.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/pages/RideHomePage/RideHomePage.jsx) |
| **Service** | [`src/features/service/pages/ServiceHome/ServiceHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/service/pages/ServiceHome/ServiceHome.jsx) |
| **Travel** | [`src/features/travel/pages/TravelHome/TravelHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/travel/pages/TravelHome/TravelHome.jsx) |
| **Rent** | [`src/features/rent/pages/RentHome/RentHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/rent/pages/RentHome/RentHome.jsx) |
| **Scenes** | [`src/features/scenes/pages/ScenesHome/ScenesHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/scenes/pages/ScenesHome/ScenesHome.jsx) |

---

## 20. Where to Add a New Feature

When introducing a new feature to CityOS:
1. **Identify the Category**: Determine if it belongs to one of the 8 categories or constitutes a new category under `src/features/<new_category>/`.
2. **Follow Feature Structure**: Create `pages/`, `components/`, `services/`, and `constants/` within that directory.
3. **Keep Components Local**: If a component is only used by that feature, place it inside the feature directory—never in global `common/`.
4. **Use `@/` Path Aliases**: Import shared elements via `@/common/...` or `@/services/...`.
5. **Add Tests**: Write pure calculation or domain tests in `__tests__/` and verify with `npm test`.
6. **Update Navigation Docs**: Add the new screens to [`docs/navigation/project-navigation.md`](file:///c:/Users/marco/Desktop/cityOS/docs/navigation/project-navigation.md).

---

## Documentation Suite

For in-depth architectural and development details, consult:
- [Architecture Audit & Anti-Patterns](docs/architecture/current-architecture-audit.md)
- [Architecture Overview & Principles](docs/architecture/architecture-overview.md)
- [Complete Project Directory Tree](docs/navigation/project-structure.md)
- [Project Navigation Guide ("Where is X?")](docs/navigation/project-navigation.md)
- ["Where Do I Change This?" Guide](docs/navigation/where-to-change.md)
- [Naming Conventions](docs/development/naming-conventions.md)
- [Coding Guidelines](docs/development/coding-guidelines.md)
