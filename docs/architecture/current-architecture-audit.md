# CityOS: Current Codebase Architecture Audit

## 1. Executive Overview
This document represents a comprehensive architectural audit of the CityOS multi-service web application before initiating the production-grade, self-documenting reorganization.

CityOS is a local multi-service super-app serving:
1. **CityOS (Home/Discovery)**
2. **Shop**
3. **Grocery**
4. **Food & Dineout**
5. **Ride**
6. **Service**
7. **Travel**
8. **Rent**
9. **Scenes (Shorts/Media)**

## 2. Environment & Tooling Audit
- **Language**: JavaScript (ES Modules, JSX) + React 19.3.1.
- **Build Engine**: Vite 8.3.4 with `@tailwindcss/vite` 4.3.3.
- **Mobile Container**: Capacitor-ready React web application.
- **Maps Engine**: MapLibre GL 6.16.0 + Ola Maps Web SDK 1.4.0.
- **Icons & QR**: `lucide-react` (0.475.0), `qrcode.react` (4.2.0).
- **Linter & Test**: `oxlint` (0.16.0), Node.js native test runner (`node --test`).

## 3. Existing Source Code Structure & Anti-Patterns Identified

### Anti-Pattern 1: Directory & File Names with Spaces
The previous directory structure used non-standard folder names containing whitespace:
- `src/cityOS hub/cityOS/cityOS home page/`
- `src/shop hub/shop/shop home page/`, `src/shop hub/shop/product page/`
- `src/food hub/food/food home page/`, `src/food hub/food/dineout page/`
- `src/grocery hub/grocery/grocery home page/`
- `src/ride hub/ride/ride home page/`
- `src/service hub/service/service home page/`
- `src/travel hub/travel/travel home page/`
- `src/rent hub/rent/rent home page/`
- `src/scenes hub/scenes/scenes home page/`
- `src/common page/`
- Multiple files named `1st banner card.jsx` (illegal numeric prefix + whitespace).

*Impact*: Path resolution errors in Unix-based deployment systems, cumbersome terminal navigation, and violation of modern JavaScript architectural conventions.

### Anti-Pattern 2: Arbitrary Nesting Depths
Certain features were nested 4-5 layers deep without logical justification (e.g. `src/rent hub/rent/rent home page/RentHome.jsx` repeating `rent` three times in the path).

### Anti-Pattern 3: Massive Monolithic Components
`RideBookingPage.jsx` contained over 2,000 lines combining:
- Vehicle selection
- Captain search animation
- Audio oscillator siren generation
- In-app masked call VoIP simulation
- Direct in-app chat simulation
- Payment QR generation
- Driver profile modals
- Post-ride rating

### Anti-Pattern 4: Presentation Directly Coupled with Mock Data
Components such as `RentHome.jsx`, `ShopHome.jsx`, and `TravelHome.jsx` frequently inlined data objects directly into UI files, making backend integration and automated unit testing difficult.

### Anti-Pattern 5: Missing Top-Level Architectural Boundaries
No clear demarcation between:
- Application entry & layout (`app/`)
- Pure reusable UI primitives (`common/components/`)
- Domain features (`features/<domain>/`)
- Infrastructure & external services (`services/<domain>/`)
- State management (`state/`)
- Cross-cutting utility functions (`utils/`)

## 4. Reorganization Strategy & Target Architecture

We will implement the Golden Architecture:
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

Target structure:
```text
src/
├── app/                  # App entry point, routes, providers, configuration
├── assets/               # Static icons, svgs, images
├── common/               # Shared global layouts, components, modals, navigation
├── features/             # 8 main business categories + scenes
│   ├── cityos/
│   ├── shop/
│   ├── grocery/
│   ├── food/
│   ├── ride/
│   ├── service/
│   ├── travel/
│   ├── rent/
│   └── scenes/
├── services/             # Maps, location, payment, notification, realtime
├── state/                # Central stores and state machines
├── hooks/                # Reusable business & UI hooks
├── utils/                # Pure formatting, calculation, validation helpers
├── constants/            # Application, category, ride constants
├── types/                # JSDoc type definitions
└── styles/               # CSS globals, variables, Tailwind entry
```

## 5. Backward Compatibility Safeguard
To guarantee zero breakage of existing running services or active build pipelines:
1. `src/App.jsx` will re-export `src/app/App.jsx`.
2. Existing paths will have deprecation bridge exports during the transition.
3. Path alias `@/` will be configured in `vite.config.js` and `jsconfig.json`.
4. Automated verification via `npm test`, `npm run build`, and `npm run check` will run at every milestone.
