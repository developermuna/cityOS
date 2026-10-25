# CityOS: Project Navigation Guide

This document is the fast-navigation index for engineers. If you are looking for a specific screen, feature, component, or algorithm, locate it in the index below to jump straight to the source file.

---

## 1. Quick Route Lookup

| What are you looking for? | File / Directory Path |
|---|---|
| **Ride Home Screen** | [`src/features/ride/pages/RideHomePage/RideHomePage.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/pages/RideHomePage/RideHomePage.jsx) |
| **Ride Booking Screen** | [`src/features/ride/pages/RideBookingPage/RideBookingPage.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/pages/RideBookingPage/RideBookingPage.jsx) |
| **Live Driver Tracking Map** | [`src/features/ride/components/RideTrackingMap/RideTrackingMap.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/components/RideTrackingMap/RideTrackingMap.jsx) |
| **Vehicle Tier Selector (Bike, Auto, Cab)** | [`src/features/ride/components/RideTypeSelector/RideTypeSelector.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/components/RideTypeSelector/RideTypeSelector.jsx) |
| **Fare Estimate Breakdown** | [`src/features/ride/components/FareEstimateSection/FareEstimateSection.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/components/FareEstimateSection/FareEstimateSection.jsx) |
| **Ride Fare Calculation Logic** | [`src/features/ride/utils/fareCalculator.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/utils/fareCalculator.js) |
| **Distance & ETA Calculation** | [`src/features/ride/utils/distanceCalculator.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/utils/distanceCalculator.js) |
| **Ride Lifecycle Finite State Machine** | [`src/features/ride/state/rideStore.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/state/rideStore.js) |
| **Ola Maps Routing & Directions Client** | [`src/features/ride/services/routingService.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/services/routingService.js) |
| **GPS Geolocation & Geocoding** | [`src/features/ride/services/locationService.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/services/locationService.js) |
| **Ola Maps Web SDK & Vector Styles** | [`src/services/maps/olaMapsService.js`](file:///c:/Users/marco/Desktop/cityOS/src/services/maps/olaMapsService.js) |
| **Ride Safety Panel (SOS, Siren, Contacts)** | [`src/features/ride/components/SafetyPanel/SafetyPanel.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/components/SafetyPanel/SafetyPanel.jsx) |
| **Payment Modal & UPI QR Code** | [`src/features/ride/components/PaymentModal/PaymentModal.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/components/PaymentModal/PaymentModal.jsx) |
| **Coupon Validation & Discounts** | [`src/features/ride/services/paymentService.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/services/paymentService.js) |
| **Driver Call Simulator** | [`src/features/ride/components/AudioCallModal/AudioCallModal.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/components/AudioCallModal/AudioCallModal.jsx) |
| **Driver Chat Drawer** | [`src/features/ride/components/ChatModal/ChatModal.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/components/ChatModal/ChatModal.jsx) |
| **Ride Unit Tests** | [`src/features/ride/__tests__/ride.test.js`](file:///c:/Users/marco/Desktop/cityOS/src/features/ride/__tests__/ride.test.js) |
| **CityOS Master Home** | [`src/features/cityos/pages/CityOSHome/CityOSHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/cityos/pages/CityOSHome/CityOSHome.jsx) |
| **Shop Storefront** | [`src/features/shop/pages/ShopHome/ShopHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/shop/pages/ShopHome/ShopHome.jsx) |
| **Product Details Page (PDP)** | [`src/features/shop/pages/ProductDetailsPage/ProductDetailsPage.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/shop/pages/ProductDetailsPage/ProductDetailsPage.jsx) |
| **Product Variants Picker** | [`src/features/shop/components/ProductVariants/ProductVariants.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/shop/components/ProductVariants/ProductVariants.jsx) |
| **Product Bundle Section** | [`src/features/shop/components/ProductBundleSection/ProductBundleSection.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/shop/components/ProductBundleSection/ProductBundleSection.jsx) |
| **Product Reviews & Ratings** | [`src/features/shop/components/ProductReviewsSection/ProductReviewsSection.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/shop/components/ProductReviewsSection/ProductReviewsSection.jsx) |
| **Grocery Quick Commerce** | [`src/features/grocery/pages/GroceryHome/GroceryHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/grocery/pages/GroceryHome/GroceryHome.jsx) |
| **Food Delivery Home** | [`src/features/food/pages/FoodHome/FoodHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/food/pages/FoodHome/FoodHome.jsx) |
| **Dineout & Table Booking** | [`src/features/food/pages/DineoutHome/DineoutHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/food/pages/DineoutHome/DineoutHome.jsx) |
| **On-Demand Home Services** | [`src/features/service/pages/ServiceHome/ServiceHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/service/pages/ServiceHome/ServiceHome.jsx) |
| **Intercity Travel & Deals** | [`src/features/travel/pages/TravelHome/TravelHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/travel/pages/TravelHome/TravelHome.jsx) |
| **Rentals (Vehicles & Properties)** | [`src/features/rent/pages/RentHome/RentHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/rent/pages/RentHome/RentHome.jsx) |
| **Scenes (Video Shorts)** | [`src/features/scenes/pages/ScenesHome/ScenesHome.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/features/scenes/pages/ScenesHome/ScenesHome.jsx) |
| **Master Bottom Navigation** | [`src/common/navigation/BottomNav/BottomNav.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/navigation/BottomNav/BottomNav.jsx) |
| **Category Switcher Tabs** | [`src/common/navigation/CategoryTabs/CategoryTabs.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/navigation/CategoryTabs/CategoryTabs.jsx) |
| **Top Header & Search** | [`src/common/navigation/Header/Header.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/navigation/Header/Header.jsx) |
| **Cart & Checkout Page** | [`src/common/pages/CartPage/CartPage.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/pages/CartPage/CartPage.jsx) |
| **User Account & Settings** | [`src/common/pages/AccountPage/AccountPage.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/pages/AccountPage/AccountPage.jsx) |
| **Saved Wishlist / Likes** | [`src/common/pages/LikePage/LikePage.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/pages/LikePage/LikePage.jsx) |
| **Filter Drawer Modal** | [`src/common/modals/FilterDrawer/FilterDrawer.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/common/modals/FilterDrawer/FilterDrawer.jsx) |
| **Application Crash Boundary** | [`src/app/ErrorBoundary.jsx`](file:///c:/Users/marco/Desktop/cityOS/src/app/ErrorBoundary.jsx) |
| **Global App Configuration** | [`src/app/AppConfiguration.js`](file:///c:/Users/marco/Desktop/cityOS/src/app/AppConfiguration.js) |

---

## 2. Decision Tree: "Where Should My New Code Go?"

```text
Are you adding a brand new component?
├── Is it used across multiple categories (e.g., in Shop AND Food)?
│   └── Place it in: src/common/components/<ComponentName>/<ComponentName>.jsx
│
├── Is it specific to a single category (e.g., only in Ride)?
│   ├── Is it used by multiple pages in that category?
│   │   └── Place it in: src/features/<category>/components/<ComponentName>/<ComponentName>.jsx
│   │
│   └── Is it used only by one specific page?
│       └── Place it in: src/features/<category>/pages/<PageName>/components/<ComponentName>/<ComponentName>.jsx
│
├── Is it pure mathematical or transformation logic (no JSX)?
│   ├── If feature-specific: src/features/<category>/utils/<utilityName>.js
│   └── If application-wide: src/utils/<utilityName>.js
│
└── Is it an external SDK or network client?
    ├── If feature-specific: src/features/<category>/services/<serviceName>.js
    └── If application-wide: src/services/<domain>/<serviceName>.js
```
