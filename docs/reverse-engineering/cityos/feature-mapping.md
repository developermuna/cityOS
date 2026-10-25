# Feature Gap Analysis: Rapido vs Current CityOS vs Target CityOS

| Feature Area | Rapido Observable Capability | Previous CityOS Implementation | Target CityOS Ride Implementation | Priority | Status |
|---|---|---|---|---|---|
| **Map Engine** | Proprietary Vector Map / Google Maps | Ola Maps Web SDK v1.4.0 + MapLibre GL 6.16 | Modular `OlaMapComponent` wrapping MapLibre GL with dark/satellite styles | P0 | Complete |
| **Pickup Resolution** | GPS Autodetect + Reverse Geocoding | Reverse Geocoding via Ola Maps API | Auto-detect GPS + draggable pin + reverse geocode lookup | P0 | Complete |
| **Destination Search** | Autocomplete with Recents & Saved | Autocomplete suggestions list | Autocomplete with debouncing + categorized landmarks (Govt, Tourist, Transit) | P0 | Complete |
| **Vehicle Tiers** | Bike, Auto, Cab Economy, Sedan | Bike, Auto, Mini, Sedan cards | Multimodal Selector with dynamic pricing, ETA, and capacity details | P0 | Complete |
| **Routing & Distance** | Polyline with turn-by-turn distance | Encoded polyline decoded into GeoJSON | Realtime Ola Maps Directions API routing with GeoJSON LineString rendering | P0 | Complete |
| **Fare Estimation** | Upfront dynamic fare calculation | Semi-static prices with coupon math | Configurable CityOS Fare Engine (`fareCalculator.js`) with distance & time math | P0 | Complete |
| **Driver Search** | Radar pulse search with captain batching | Monolithic search state animation | Modular `RideSearching` with progress indicator, tip boost, and timeout guards | P0 | Complete |
| **Driver Assignment & OTP**| 4-digit verification OTP & Captain Card | Captain details with 4-digit OTP | Full Captain verification card with rating, vehicle plate, trips, and OTP banner | P0 | Complete |
| **Driver Telemetry** | High-frequency GPS marker interpolation | Vehicle marker animation along route | Smooth animated vehicle marker following Ola Maps decoded route coordinates | P0 | Complete |
| **In-App Calling** | Masked VoIP call | Audio simulation modal with timer | Masked In-App VoIP simulation modal with duration timer, mute, and speakerphone | P1 | Complete |
| **In-App Messaging** | Chat with quick canned response chips | Interactive chat drawer | Interactive chat drawer with quick canned chips and simulated Captain auto-replies | P1 | Complete |
| **Emergency & SOS** | SOS button, 112 trigger, emergency SMS | Audio siren + emergency contacts | Modular `SafetyPanel` & `SOSModal` with Web Audio synthesized siren & 112 dialer | P0 | Complete |
| **Payments** | UPI, Cards, Cash, Wallets, Rapido Coins | UPI QR code modal, Card, Cash | Dynamic UPI QR generator (`qrcode.react`), payment selector, CityOS Coins | P0 | Complete |
| **Coupons & Offers** | Promotional voucher drawer | Coupon modal with code application | Promo coupon drawer with auto-validation and discount deduction | P1 | Complete |
| **Post-Trip Ratings** | 1-5 stars, feedback chips, tip chips | Rating modal with stars and chips | Modular `RideRatingModal` with star hover, review chips, gratuity tip, and submission | P1 | Complete |
| **Trip Cancellation** | Reason picker with cancellation fee notice | Direct cancel button | Safe `CancellationModal` with verified lifecycle transitions | P0 | Complete |
