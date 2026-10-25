# CityOS Ride API Contracts & Realtime WebSocket Events

## 1. REST Endpoints (Authoritative Backend)

### 1.1 `POST /api/v1/ride/estimate`
- **Request**:
```json
{
  "pickup": { "lat": 19.1678, "lng": 83.4147, "address": "Rayagada Station Road" },
  "destination": { "lat": 19.1725, "lng": 83.4210, "address": "Maa Majhighouri Temple" },
  "coupon_code": "SECOND50",
  "coins_to_use": 10
}
```
- **Response**:
```json
{
  "success": true,
  "route": {
    "distance_km": 4.2,
    "duration_mins": 14,
    "polyline": "encoded_polyline_string..."
  },
  "tiers": [
    {
      "tier": "bike",
      "name": "Bike Taxi",
      "icon": "🛵",
      "capacity": 1,
      "base_fare": 20.0,
      "distance_fare": 25.2,
      "booking_fee": 5.0,
      "discount": 10.0,
      "coins_discount": 5.0,
      "final_fare": 35.0,
      "eta_pickup_mins": 2
    },
    {
      "tier": "auto",
      "name": "Auto Rickshaw",
      "icon": "🛺",
      "capacity": 3,
      "base_fare": 30.0,
      "distance_fare": 42.0,
      "booking_fee": 5.0,
      "discount": 15.0,
      "coins_discount": 5.0,
      "final_fare": 57.0,
      "eta_pickup_mins": 3
    }
  ]
}
```

### 1.2 `POST /api/v1/ride/book`
- **Headers**: `X-Idempotency-Key: <uuid>`
- **Request**:
```json
{
  "tier": "bike",
  "pickup": { "lat": 19.1678, "lng": 83.4147, "address": "Rayagada Station Road" },
  "destination": { "lat": 19.1725, "lng": 83.4210, "address": "Maa Majhighouri Temple" },
  "estimated_fare": 35.0,
  "payment_method": "Pay Now",
  "tip_amount": 0
}
```
- **Response**:
```json
{
  "success": true,
  "ride": {
    "ride_id": "ride_od18_88291",
    "status": "searching_driver",
    "otp": "4829",
    "created_at": "2026-10-25T17:20:00Z"
  }
}
```

### 1.3 `POST /api/v1/ride/:ride_id/cancel`
- **Request**:
```json
{
  "reason": "Driver asked to pay extra / ride took too long",
  "cancelled_by": "customer"
}
```
- **Response**:
```json
{
  "success": true,
  "status": "cancelled",
  "cancellation_fee": 0.00
}
```

## 2. Realtime WebSocket Events (`/ws/rides/:ride_id`)

```json
// Event: Driver assigned
{
  "event": "driver.assigned",
  "data": {
    "captain": {
      "id": "capt_01",
      "name": "Rajesh Kumar",
      "rating": 4.9,
      "trips": "1,240 rides",
      "vehicle_model": "Honda Shine 125cc",
      "license_plate": "OD 18 B 4509",
      "avatar": "https://..."
    },
    "otp": "4829",
    "eta_seconds": 135
  }
}

// Event: Driver live position
{
  "event": "driver.location_updated",
  "data": {
    "lat": 19.1668,
    "lng": 83.4138,
    "bearing": 42.5,
    "speed_kmh": 28.0
  }
}

// Event: Driver arrived at pickup
{
  "event": "driver.arrived",
  "data": {
    "arrived_at": "2026-10-25T17:22:15Z"
  }
}

// Event: Ride started (OTP verified)
{
  "event": "ride.started",
  "data": {
    "started_at": "2026-10-25T17:23:00Z"
  }
}

// Event: Ride completed
{
  "event": "ride.completed",
  "data": {
    "completed_at": "2026-10-25T17:35:00Z",
    "final_fare": 35.0,
    "distance_travelled_km": 4.2
  }
}
```
