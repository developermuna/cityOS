# CityOS: Engineering Coding Guidelines

This guide defines the engineering standards and best practices required when contributing to CityOS.

---

## 1. Component Design & Separation of Concerns

### Golden Principle
**UI components are responsible for rendering presentation and handling user interaction events. They are NOT responsible for heavy mathematical computations or raw network protocol details.**

### Anti-Pattern: Business Logic Inside UI
```jsx
// ❌ BAD: 150 lines of fare math in component render
export const RideBookingPage = () => {
  const fare = baseRate * distance + (surgeMultiplier > 1 ? surge * 1.5 : 0) - (coupon ? 50 : 0);
  return <div>{fare}</div>;
};
```

### Preferred Pattern: Extracted Pure Utility
```jsx
// ✅ GOOD: Pure, testable utility function
// src/features/ride/utils/fareCalculator.js
export function calculateFare({ distanceKm, tierId, surgeMultiplier, couponDiscount }) {
  // mathematical logic with unit tests
}

// src/features/ride/pages/RideBookingPage/RideBookingPage.jsx
import { calculateFare } from '@/features/ride/utils/fareCalculator';
```

---

## 2. Import Rules & Path Aliases

1. **Always use the `@/` path alias** for cross-module imports:
   - ✅ `import { Button } from '@/common/components/Button/Button';`
   - ✅ `import { VEHICLE_TIERS } from '@/features/ride/constants/ride.constants';`
   - ❌ `import { Button } from '../../../../common/components/Button/Button';`

2. **Index Re-Exports (Barrel Files)**:
   - Component folders should contain a clean `index.js` re-exporting the primary component.
   - Do **NOT** create massive global barrel files (`src/index.js`) that re-export hundreds of components, as this hurts tree-shaking and can cause circular dependency cycles.

3. **No Circular Dependencies**:
   - `common/` must never import from `features/`.
   - `utils/` must never import from `components/`.
   - Category features (`features/shop/`) must never import from other category features (`features/ride/`). Shared functionality must be elevated to `common/` or `services/`.

---

## 3. Resilience & Graceful Fallbacks

1. **Network & Geolocation Failures**:
   - Never assume GPS or external APIs will always succeed.
   - Always supply default coordinates (`DEFAULT_CITYOS_COORDS`) if browser geolocation is denied or times out.
   - In maps, fall back to open raster tiles (`FALLBACK_STYLE`) if an API key is missing or vector tile network requests fail.

2. **React Error Boundaries**:
   - Top-level components and isolated feature pages are wrapped with `<ErrorBoundary>` to ensure a failure in one feature does not crash the entire super-app.

---

## 4. Testing Standards

1. **Pure Functions First**:
   - All financial algorithms, fare calculators, discount validators, and distance math must have 100% test coverage in `src/features/<category>/__tests__/`.

2. **Running the Test Suite**:
   ```bash
   npm test
   ```
   CityOS uses the high-performance native Node.js test runner (`node:test` and `node:assert/strict`). Tests execute in under 300ms without heavy test-runner overhead.

3. **Writing a New Unit Test**:
   ```javascript
   import test from 'node:test';
   import assert from 'node:assert/strict';
   import { calculateFare } from '../utils/fareCalculator.js';

   test('calculates correct fare for standard bike ride', () => {
     const fare = calculateFare({ tierId: 'bike', distanceKm: 5 });
     assert.ok(fare.finalFare > 0);
   });
   ```

---

## 5. State Management Rules

1. **Component Local State (`useState`)**:
   - Use for UI-transient state: modal visibility, active tab index, accordion toggle, input form values.

2. **Domain State Stores (`src/features/<category>/state/`)**:
   - Use for domain lifecycles that span multiple components or screens (e.g. `rideStore.js` managing the ride dispatch lifecycle from `SEARCHING` to `COMPLETED`).
   - Stores should expose a subscription mechanism (`subscribe`) and pure transition methods (`transitionTo`).
