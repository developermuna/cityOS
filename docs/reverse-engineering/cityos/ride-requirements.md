# CityOS Ride Requirements Specification

## 1. Functional Requirements
### 1.1 Multimodal Vehicle Tiers
- **Bike Taxi**: Fast solo commuter, lowest base rate, helmet safety prompt.
- **Auto Rickshaw**: 3-seater meterless fare, local city transit.
- **Cab Economy (Mini)**: 4-seater compact hatchback with AC.
- **Cab Comfort (Sedan)**: 4-seater sedan with luggage space and premium AC.

### 1.2 Geolocation & Map Interaction
- High-performance vector tile map using Ola Maps Web SDK & MapLibre GL.
- Current location detection and reverse geocoding to human-readable address.
- Interactive search with autocomplete suggestions for pickup and dropoff.
- Precise polyline routing between origin and destination with distance (km) and duration (mins).
- Real-time animated vehicle position marker rendering along route.

### 1.3 Booking & State Progression
- Strict ride state machine: `IDLE` ➔ `LOCATION_SELECTED` ➔ `FARE_ESTIMATED` ➔ `BOOKING_REQUESTED` ➔ `SEARCHING_DRIVER` ➔ `DRIVER_ASSIGNED` ➔ `DRIVER_ARRIVING` ➔ `DRIVER_ARRIVED` ➔ `RIDE_STARTED` ➔ `RIDE_IN_PROGRESS` ➔ `RIDE_COMPLETED` ➔ `PAYMENT_PENDING` ➔ `PAYMENT_COMPLETED` ➔ `RATED`.
- 4-digit numeric verification OTP displayed prominently to rider and verified before trip starts.
- Safe cancellation workflow with confirmation modal and reason tracking.

### 1.4 Driver & Customer Interaction
- Driver identity verification: Captain photo, name, rating, vehicle make, model, license plate number.
- In-app masked VoIP calling simulation with active call duration timer, mute toggle, and speakerphone.
- In-app chat with real-time canned message chips (*"I'm at the gate"*, *"2 minutes away"*, etc.).

### 1.5 Safety & SOS Suite
- Emergency SOS button with audible distress siren synthesis (Web Audio API).
- Instant trigger for Police helpline (112) and emergency contact broadcast.
- Share Live Trip link generation for WhatsApp / SMS.

### 1.6 Billing & Payment
- Configurable fare calculator (base fare + distance fare + time fare + booking fee - coupons + tip).
- Dynamic UPI QR generation with scan-to-pay functionality, Card, and Cash options.
- CityOS Coins loyalty deduction support.
- Post-trip rating (1-5 stars), review tags, and optional driver tip.

## 2. Non-Functional Requirements
- **Security**: No secrets or private credentials exposed in frontend code; all Ola Maps API keys stored in `.env`.
- **Performance**: Sub-50ms UI transitions, 60fps marker interpolation, lazy-loaded components.
- **Responsive**: Fully responsive design supporting mobile frame viewport (375px - 430px) as well as full-width responsive displays.
- **Resilience**: Graceful error handling for missing GPS, Ola Maps network timeouts, 401/403/429 status codes, and driver dispatch timeouts.
