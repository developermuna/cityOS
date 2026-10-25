# CityOS: "Where Do I Change This?" Guide

Use this task-oriented guide when you need to make changes to specific functionalities in CityOS.

---

## 1. Ride & Mobility

### To change vehicle tiers (e.g. add "Auto Plus", "Electric Bike"):
- File: [`src/features/ride/constants/ride.constants.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/constants/ride.constants.js)
- Modify `VEHICLE_TIERS` object with the new tier key, display name, base fare, rate per km, and minimum fare.
- File: [`src/features/ride/components/RideTypeSelector/RideTypeSelector.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/components/RideTypeSelector/RideTypeSelector.jsx)
- Update tier visual icons or rendering badges if customized.

### To adjust ride fare algorithms (surge, coupon math, per-minute pricing):
- File: [`src/features/ride/utils/fareCalculator.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/utils/fareCalculator.js)
- Edit `calculateFare()` function.
- Update tests in: [`src/features/ride/__tests__/ride.test.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/__tests__/ride.test.js) and run `npm test`.

### To change distance estimation or ETA logic:
- File: [`src/features/ride/utils/distanceCalculator.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/utils/distanceCalculator.js)
- Edit `calculateHaversineDistance()` or `estimateDurationMinutes()`.

### To change ride status transitions (state machine):
- File: [`src/features/ride/constants/ride.constants.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/constants/ride.constants.js)
- Update `RIDE_STATUS` enum or `VALID_TRANSITIONS` map.
- File: [`src/features/ride/state/rideStore.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/state/rideStore.js)
- Update transition handler.

### To modify Ola Maps vector styles or API integration:
- File: [`src/services/maps/olaMapsService.js`](file:///c:/Users/marco/Desktop/cityOS/src/services/maps/olaMapsService.js)
- Update `OLA_MAP_STYLES` for dark/light vector tile endpoints.
- Update `fetchPlaceSuggestions` or `fetchRouteDirections`.

### To change the emergency SOS or safety features:
- File: [`src/features/ride/components/SafetyPanel/SafetyPanel.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/components/SafetyPanel/SafetyPanel.jsx)
- Modify `SAFETY_CONFIG` or Web Audio siren synthesizer logic.

---

## 2. E-Commerce & Shop

### To change product specifications, bundle discounts, or reviews:
- Bundle items & cross-sell: [`src/features/shop/components/ProductBundleSection/ProductBundleSection.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/shop/components/ProductBundleSection/ProductBundleSection.jsx)
- Photo reviews & rating stars: [`src/features/shop/components/ProductReviewsSection/ProductReviewsSection.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/shop/components/ProductReviewsSection/ProductReviewsSection.jsx)
- Variant selectors (sizes, colors): [`src/features/shop/components/ProductVariants/ProductVariants.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/shop/components/ProductVariants/ProductVariants.jsx)
- Product image shimmer loader: [`src/features/shop/components/ProgressiveImage/ProgressiveImage.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/shop/components/ProgressiveImage/ProgressiveImage.jsx)

---

## 3. Categories & Global Navigation

### To add or rename a super-app category tab:
- File: [`src/common/navigation/CategoryTabs/CategoryTabs.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/navigation/CategoryTabs/CategoryTabs.jsx)
- Update `categories` list with the new category ID and label.
- File: [`src/app/App.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/app/App.jsx)
- Add the corresponding category switch case to render the feature page.

### To change the bottom navigation bar:
- File: [`src/common/navigation/BottomNav/BottomNav.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/navigation/BottomNav/BottomNav.jsx)
- Modify `navItems` array to change icons, badges, or tab targets.

### To modify the application frame / mobile layout:
- Mobile device simulator frame: [`src/common/layouts/MobileFrame/MobileFrame.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/layouts/MobileFrame/MobileFrame.jsx)
- Top header with location & search: [`src/common/navigation/Header/Header.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/navigation/Header/Header.jsx)
- Filter drawer bottom sheet: [`src/common/modals/FilterDrawer/FilterDrawer.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/modals/FilterDrawer/FilterDrawer.jsx)

---

## 4. Payments & Discounts

### To change coupons or discount logic:
- File: [`src/features/ride/services/paymentService.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/services/paymentService.js)
- Modify `AVAILABLE_COUPONS` map or `validateCoupon()` function.
- Modal UI: [`src/features/ride/components/CouponModal/CouponModal.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/components/CouponModal/CouponModal.jsx)

### To change UPI QR code generator:
- File: [`src/features/ride/services/paymentService.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/services/paymentService.js)
- Update `generateUpiPaymentString()` to modify payee VPA (`pa`) or merchant code (`mc`).
- Modal UI: [`src/features/ride/components/PaymentModal/PaymentModal.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/components/PaymentModal/PaymentModal.jsx)
