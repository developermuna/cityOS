# CityOS: Naming Conventions & Code Standards

In CityOS, all identifiers, files, and directories must be immediately understandable to any developer without requiring code inspection.

---

## 1. Directory and File Naming Rules

### Component Folders and Files
- Component folders and primary component files must use **PascalCase** and have **identical names**:
  ```text
  RideTypeSelector/
  ├── RideTypeSelector.jsx
  └── index.js
  ```
- **NEVER** use generic file names inside a component folder:
  - ❌ `RideTypeSelector/component.jsx`
  - ❌ `RideTypeSelector/index.jsx` (Use `index.js` only as a thin re-export)
  - ❌ `RideTypeSelector/view.jsx`
  - ✅ `RideTypeSelector/RideTypeSelector.jsx`

### Utility and Service Files
- Utility and service modules must use **camelCase**:
  - ✅ `distanceCalculator.js`
  - ✅ `fareCalculator.js`
  - ✅ `olaMapsService.js`
  - ❌ `calc.js`
  - ❌ `Distance.js`

### Constant Files
- Constant files must be named using `.constants.js` suffix:
  - ✅ `ride.constants.js`
  - ✅ `order.constants.js`
  - ❌ `const.js`
  - ❌ `vars.js`

---

## 2. Variable Naming Rules

Variables must be descriptive human-readable names. Single-letter and cryptic abbreviations are strictly forbidden.

| ❌ Cryptic / Bad | ✅ Descriptive / Good |
|---|---|
| `const d = ...` | `const driverLocation = ...` |
| `const x = ...` | `const pickupCoordinates = ...` |
| `const res = ...` | `const rideBookingResponse = ...` |
| `const data = ...` | `const vehicleTierCatalog = ...` |
| `const obj = ...` | `const fareBreakdown = ...` |
| `const temp = ...` | `const activeCouponDiscount = ...` |
| `const arr = ...` | `const nearbyCaptainsList = ...` |

---

## 3. Function Naming Rules

Functions must begin with a clear verb indicating their action and specify the subject of the operation.

| ❌ Ambiguous / Bad | ✅ Explicit / Good |
|---|---|
| `handle()` | `handleRideBooking()` |
| `getData()` | `fetchAvailableRides()` |
| `process()` | `calculateEstimatedFare()` |
| `run()` | `initiateEmergencySos()` |
| `cancel()` | `executeRideCancellation()` |
| `calc()` | `calculateHaversineDistance()` |
| `validate()` | `validatePickupCoordinates()` |

---

## 4. Component Naming Rules

Component names must represent their concrete UI responsibility. Avoid arbitrary generic names like `Box`, `Card1`, `Section2`, or `Container`.

| ❌ Generic / Bad | ✅ Semantic / Good |
|---|---|
| `Card1` | `RideOptionCard` |
| `SectionA` | `FareEstimateSection` |
| `ModalView` | `CancellationSurveyModal` |
| `MapBox` | `RideTrackingMap` |
| `Details` | `DriverInformationCard` |
| `Btn` | `ConfirmRideBookingButton` |

---

## 5. Constants & Enums

Global constants and enumerations must use **SCREAMING_SNAKE_CASE**:

```javascript
// ✅ Correct
export const RIDE_STATUS = {
  IDLE: 'idle',
  SEARCHING_DRIVER: 'searching_driver',
  DRIVER_ASSIGNED: 'driver_assigned',
  DRIVER_ARRIVED: 'driver_arrived',
  RIDE_IN_PROGRESS: 'ride_in_progress',
  RIDE_COMPLETED: 'ride_completed',
  CANCELLED: 'cancelled',
};

// ❌ Incorrect
export const status = {
  idle: 'idle',
  searching: 'searching',
};
```
