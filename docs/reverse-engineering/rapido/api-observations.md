# Rapido Inferred API Observations (Clean-Room Synthesis)

## 1. Clean-Room Boundary Notice
These API observations are inferred from observable client-server interactions in standard ride-hailing mobile applications, public documentation, and standard mobility engineering practices. No private credentials, internal tokens, or decompiled proprietary endpoints are recorded here.

## 2. Inferred Endpoint Architecture
Modern mobility platforms split their API landscape into three tiers:
1. **Public Geocoding & Routing Services**: Maps, places autocomplete, reverse geocoding, route matrix.
2. **REST Transactional APIs**: Auth, ride estimation, booking creation, cancellation, invoice generation, ratings.
3. **High-Frequency Realtime Pub/Sub**: WebSocket / MQTT channels for vehicle telemetry, driver dispatch countdown, in-app chat.

## 3. Inferred Contract Specifications
### A. Fare Estimation (`POST /api/v1/rides/estimate`)
**Purpose**: Calculates upfront estimates across all vehicle tiers between two points.
- **Request**:
```json
{
  "pickup": {
    "lat": 19.1678,
    "lng": 83.4147,
    "address": "Rayagada Station Road, Rayagada"
  },
  "destination": {
    "lat": 19.1725,
    "lng": 83.4210,
    "address": "Maa Majhighouri Temple, Rayagada"
  },
  "coupon_code": "SECOND50"
}
```
- **Response**:
```json
{
  "currency": "INR",
  "distance_km": 4.2,
  "duration_mins": 14,
  "options": [
    {
      "tier": "bike",
      "display_name": "Bike Taxi",
      "base_fare": 20.0,
      "estimated_fare": 35.0,
      "discount": 10.0,
      "final_fare": 25.0,
      "eta_pickup_mins": 2
    },
    {
      "tier": "auto",
      "display_name": "Auto Rickshaw",
      "base_fare": 30.0,
      "estimated_fare": 65.0,
      "discount": 15.0,
      "final_fare": 50.0,
      "eta_pickup_mins": 3
    },
    {
      "tier": "mini",
      "display_name": "Cab Economy",
      "base_fare": 60.0,
      "estimated_fare": 130.0,
      "discount": 20.0,
      "final_fare": 110.0,
      "eta_pickup_mins": 5
    }
  ]
}
```

### B. Create Ride Booking (`POST /api/v1/rides/create`)
**Purpose**: Issues a ride request to initiate matching.
- **Headers**:
  - `Authorization: Bearer <token>`
  - `X-Idempotency-Key: <uuid-v4>` (prevents duplicate booking on network retry)
- **Request**:
```json
{
  "tier": "bike",
  "pickup": { "lat": 19.1678, "lng": 83.4147, "address": "Rayagada Station Road" },
  "destination": { "lat": 19.1725, "lng": 83.4210, "address": "Maa Majhighouri Temple" },
  "fare_estimate_id": "est_99214a",
  "payment_method": "UPI",
  "tip_amount": 0
}
```
- **Response**:
```json
{
  "ride_id": "ride_od18_88291",
  "status": "searching_driver",
  "timeout_seconds": 90,
  "created_at": "2026-10-25T17:15:00Z"
}
```

### C. Ride Status & Telemetry (`GET /api/v1/rides/:ride_id`)
**Purpose**: Authoritative status inquiry / sync fallback when socket reconnects.
- **Response**:
```json
{
  "ride_id": "ride_od18_88291",
  "status": "driver_assigned",
  "otp": "4829",
  "driver": {
    "id": "drv_rajesh_01",
    "name": "Rajesh Kumar",
    "rating": 4.9,
    "photo_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    "total_trips": 1240,
    "vehicle": {
      "type": "bike",
      "model": "Honda Shine 125cc",
      "color": "Gloss Black",
      "license_plate": "OD 18 B 4509"
    },
    "current_location": { "lat": 19.1662, "lng": 83.4130 },
    "eta_seconds": 120
  }
}
```
