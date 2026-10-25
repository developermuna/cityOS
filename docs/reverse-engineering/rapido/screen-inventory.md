# Rapido Screen Inventory & Transition Table

## Complete Screen Inventory
| Screen ID | Screen Name | Purpose / Responsibility | Key Inputs | Key Outputs / Views | Possible States | CityOS Mapping |
|---|---|---|---|---|---|---|
| `SCR-01` | **Ride Home** | Primary mobility dashboard, shows current map and entry into booking | Current GPS position, recent searches | Full-screen interactive map, 'Where to?' card, quick saved addresses, nearby available vehicles | Initializing, Geolocation Allowed, Geolocation Denied, Offline | `RideHome.jsx` |
| `SCR-02` | **Location Search / Picker** | Set or change pickup and destination addresses | Keystroke text query, history tap, map pin drag | Autocomplete suggestion list, recent locations, saved places (Home/Work) | Empty query, Searching, Suggestions displayed, Zero results, Network error | `LocationSearch` / `RouteSelector` |
| `SCR-03` | **Vehicle & Fare Comparison** | Review route polyline, vehicle tiers, fares, and ETA | Selected pickup & dropoff coordinates | Polyline on map, Tier cards (Bike, Auto, Cab), Estimated price, Coupon trigger, Payment method picker | Loading route, Route calculated, Route error, Coupon applied | `RideBookingPage` / `RideOptionsList` |
| `SCR-04` | **Coupon & Promotion Drawer** | Browse and apply promotional discount vouchers | Coupon code input, promo card selection | Discount amount deduction, validity notice, terms and conditions | Input idle, Validating, Coupon applied, Invalid coupon | `CouponModal` |
| `SCR-05` | **Driver Search Radar** | Radial radar search for nearest matching Captain | Confirmed ride request, ride tier, fare | Radar pulsing animation, proximity radius, tip increment button, Cancel button | Searching, Retry required, No Captain found (Timeout), Driver Assigned | `RideSearching` / Captain assigning |
| `SCR-06` | **Driver Assigned / En Route** | Show driver details, OTP, and tracking driver approach to pickup | Driver telemetry feed | 4-digit OTP card, Driver photo, name, rating, vehicle license plate, vehicle model, Call/Chat buttons, ETA | En route, Arriving shortly, Driver arrived at pickup | `DriverAssigned` / Driver card |
| `SCR-07` | **In-App Call (VoIP / Masked)** | Voice communication with driver without exposing real phone numbers | Audio permissions, call button | In-call screen, duration timer, mute button, speakerphone toggle, end call button | Ringing, Connected, In-Call, Ended | `InAppCallModal` |
| `SCR-08` | **In-App Chat Drawer** | Direct messaging with driver with canned responses | Text input, chip taps | Chat bubble stream, time stamps, read receipts, canned chip selectors | Idle, Message sent, Driver replied | `ChatDrawer` |
| `SCR-09` | **Active Ride / In-Trip** | Live navigation from pickup to destination after OTP validation | Realtime GPS coordinates of vehicle | Live map with progress polyline, live speed/ETA, SOS floating button, Share Trip button | In progress, Minor reroute, Approaching destination | `ActiveRide` |
| `SCR-10` | **Safety / SOS Panel** | Emergency assistance and rapid contact notification | Tap SOS button, confirm emergency | Audible siren button, 112 police call trigger, Emergency contacts SMS blast with live tracking URL | Idle, Triggered, Siren sounding, Police dialed | `SafetyPanel` / `SOSModal` |
| `SCR-11` | **Ride Completion & Bill** | Fare breakdown and payment settlement | Trip completion trigger | Total fare, itemized bill (base + distance + time + taxes - discounts), UPI QR / cash / card selector | Payment pending, Payment processing, Payment successful | `RideCompleted` / Bill receipt |
| `SCR-12` | **Rating & Tip Drawer** | Captain performance feedback and optional gratuity | Star selection (1-5), feedback chip toggles, tip selection (₹10/₹20/₹50) | Confirmation toast, receipt archiving | Rating idle, Star selected, Submitting, Submitted | `RideRatingModal` |
| `SCR-13` | **Ride History** | Historical trip listing and invoice download | User account session | Past ride cards with date, vehicle type, route, fare, status | Loading, List rendered, Empty state | `RideHistory` |

## Screen Transition Matrix
- `SCR-01` (Home) → tap search → `SCR-02` (Location Search)
- `SCR-02` → select dropoff → `SCR-03` (Vehicle & Fare Comparison)
- `SCR-03` → tap coupon → `SCR-04` (Coupon Drawer) → returns to `SCR-03`
- `SCR-03` → tap Book Ride → `SCR-05` (Driver Search Radar)
- `SCR-05` → match success → `SCR-06` (Driver Assigned)
- `SCR-05` → match timeout → prompt tip boost or cancel → returns to `SCR-03` or `SCR-01`
- `SCR-06` → tap call → `SCR-07` (In-App Call)
- `SCR-06` → tap chat → `SCR-08` (In-App Chat)
- `SCR-06` → OTP entered by driver → `SCR-09` (Active Ride)
- `SCR-09` → tap SOS → `SCR-10` (Safety Panel)
- `SCR-09` → destination reached → `SCR-11` (Ride Completion & Bill)
- `SCR-11` → payment confirmed → `SCR-12` (Rating & Tip)
- `SCR-12` → submit rating → `SCR-01` (Home)
