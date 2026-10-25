# CityOS Ride Implementation & Modularization Plan

## 1. Overview
The goal is to provide a clean-room, robust, production-oriented architecture for CityOS Ride located under `src/ride hub/ride/`, integrating with Ola Maps Web SDK & MapLibre GL, while preserving and enhancing the rich interactivity already built into the application.

## 2. Phase Breakdown

### Phase 1: Foundation & Core Logic
1. **Constants (`src/ride hub/ride/constants/ride.constants.js`)**:
   - `RIDE_STATUS` enum.
   - `VEHICLE_TIERS` definitions.
   - `CANCELLATION_REASONS` catalog.
   - `SAFETY_CONFIG` defaults.
2. **Utilities (`src/ride hub/ride/utils/`)**:
   - `fareCalculator.js`: Base fare, per km, per min, dynamic surge, coupon discounts, CityOS coins deduction.
   - `distanceCalculator.js`: Haversine formula, ETA formatting, coordinate validation.
   - `rideValidation.js`: Strict state machine transition validation matrix preventing invalid state jumps.
3. **State Container (`src/ride hub/ride/state/rideStore.js`)**:
   - Centralized, observable state manager for active ride sessions with transition validators and event subscriptions.

### Phase 2: Service Layer
1. `src/ride hub/ride/services/rideService.js`: Ride lifecycle dispatcher (estimate, book, cancel, complete, rate).
2. `src/ride hub/ride/services/driverService.js`: Driver matching algorithm, proximity discovery, vehicle telematics simulation.
3. `src/ride hub/ride/services/fareService.js`: Fare quote generation.
4. `src/ride hub/ride/services/locationService.js`: Geolocation permission handling and reverse geocoding bridge.
5. `src/ride hub/ride/services/paymentService.js`: Payment verification, UPI QR string generator.

### Phase 3: Custom Hooks
1. `src/ride hub/ride/hooks/useRide.js`: Exposes active ride state, booking actions, and cancellation.
2. `src/ride hub/ride/hooks/useDriverTracking.js`: Exposes vehicle marker coordinate updates, smooth interpolation, and ETA countdown.
3. `src/ride hub/ride/hooks/useCurrentLocation.js`: Manages GPS permissions and current coordinate states.
4. `src/ride hub/ride/hooks/useRideStatus.js`: Observes ride status transitions.

### Phase 4: UI Component Modularization
1. `src/ride hub/ride/components/OlaMapComponent.jsx`: Wrapper to `OlaMapView.jsx` providing clean props.
2. Modular components:
   - `RideTypeSelector.jsx`
   - `DriverCard.jsx`
   - `SafetyPanel.jsx`
   - `SOSButton.jsx`
   - `CancellationModal.jsx`
   - `PaymentModal.jsx`
   - `CouponModal.jsx`
   - `InAppCallModal.jsx`
   - `ChatDrawer.jsx`
   - `RideRatingModal.jsx`

### Phase 5: Verification & Testing
- Unit tests for fare calculation and state transitions.
- Build verification with `npm run build` and `oxlint`.
- Dev server runtime check.
