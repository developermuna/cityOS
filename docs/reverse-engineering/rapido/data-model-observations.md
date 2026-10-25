# Rapido Data Model Observations & Inferred Schema

## 1. Primary Domain Entities
An observable ride-hailing architecture involves six core entities:
1. **User (Customer)**: Profile, saved locations, payment preferences, trust score.
2. **Driver (Captain)**: Profile, vehicle verification, current shift status, rating, KYC.
3. **Vehicle**: Registration number, make/model, category tier, insurance/fitness status.
4. **Ride Order (Booking)**: Pickup/destination geometry, ride lifecycle status, start OTP, timestamps.
5. **Fare Estimate & Bill**: Upfront quote vs actual trip distance/time, breakdown of base, per-km, per-min, taxes, tolls, discounts, and tips.
6. **Safety & Incident Log**: SOS triggers, shared session links, route deviation alerts.

## 2. Inferred Entity Relationships
```
[User] ──(requests)──► [Ride Order] ◄──(assigned to)── [Driver]
                             │                              │
                             ├──► [Fare Bill]               └──► [Vehicle]
                             │
                             └──► [Safety Incident]
```

## 3. Observable Field Mapping
### Ride Order Entity
- `ride_id`: Unique identifier (e.g. UUID or friendly code `OD-18-XXXX`).
- `user_id`: Customer ID.
- `driver_id`: Assigned Captain ID (null during searching).
- `vehicle_tier`: Enum (`bike`, `auto`, `mini`, `sedan`).
- `status`: Lifecycle enum (`idle` through `completed` / `cancelled`).
- `pickup_location`: `{ latitude, longitude, address, landmark }`.
- `destination_location`: `{ latitude, longitude, address, landmark }`.
- `route_polyline`: Encoded polyline string representing path.
- `distance_meters`: Estimated route distance.
- `duration_seconds`: Estimated travel time.
- `start_otp`: 4-digit numeric verification token (e.g. `4829`).
- `timestamps`: `{ created_at, accepted_at, arrived_at, started_at, completed_at, cancelled_at }`.

### Driver Profile Entity
- `driver_id`: Unique Captain identifier.
- `full_name`: Name displayed to passenger.
- `photo_url`: Avatar photo.
- `rating`: Float rating (e.g. 4.92).
- `total_trips`: Completed lifetime rides.
- `experience_years`: Platform tenure.
- `vehicle_model`: String (e.g. "Honda Shine 125cc", "Bajaj RE Auto").
- `license_plate`: String (e.g. "OD 18 B 4509").
- `phone_virtual`: Masked contact routing number.
