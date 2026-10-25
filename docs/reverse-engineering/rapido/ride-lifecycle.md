# Rapido Observable Ride Lifecycle State Machine

## 1. Formal State Machine Diagram
```
    [IDLE]
       │ (User enters pickup and destination)
       ▼
[LOCATION_SELECTED]
       │ (Routing engine returns polyline and distance)
       ▼
[FARE_ESTIMATED]
       │ (User taps 'Book Ride')
       ▼
[BOOKING_REQUESTED]
       │ (Matching service begins driver broadcast)
       ▼
[SEARCHING_DRIVER] ──(Timeout / User cancels)──► [CANCELLED]
       │ (Captain accepts dispatch)
       ▼
[DRIVER_ASSIGNED] ──(Driver or Customer cancels)──► [CANCELLED]
       │ (Captain approaches pickup radius < 500m)
       ▼
[DRIVER_ARRIVING]
       │ (Captain arrives at pickup coordinate < 50m)
       ▼
[DRIVER_ARRIVED]
       │ (Captain enters matching 4-digit OTP)
       ▼
[RIDE_STARTED]
       │ (Vehicle leaves pickup geofence)
       ▼
[RIDE_IN_PROGRESS] ──(Emergency / Dispute)──► [SOS_TRIGGERED] (parallel)
       │ (Destination geofence entered & Captain ends trip)
       ▼
[RIDE_COMPLETED]
       │ (Invoice computed)
       ▼
[PAYMENT_PENDING]
       │ (UPI / Card / Cash settlement acknowledged)
       ▼
[PAYMENT_COMPLETED]
       │ (Feedback submitted or skipped)
       ▼
[RATED] ──► [COMPLETED / IDLE]
```

## 2. Observable State Transition Table
| Source State | Event Trigger | Valid Target State | Guard Conditions |
|---|---|---|---|
| `IDLE` | `SELECT_DESTINATION` | `LOCATION_SELECTED` | Valid destination coordinates |
| `LOCATION_SELECTED` | `ROUTE_CALCULATED` | `FARE_ESTIMATED` | Polyline decoded, distance > 0 |
| `FARE_ESTIMATED` | `CONFIRM_BOOKING` | `BOOKING_REQUESTED` | Payment method chosen |
| `BOOKING_REQUESTED` | `DISPATCH_BROADCAST` | `SEARCHING_DRIVER` | Active dispatch batch exists |
| `SEARCHING_DRIVER` | `DRIVER_ACCEPTED` | `DRIVER_ASSIGNED` | Driver ID assigned, OTP generated |
| `SEARCHING_DRIVER` | `SEARCH_TIMEOUT` / `USER_CANCEL` | `CANCELLED` | No penalty if no driver assigned |
| `DRIVER_ASSIGNED` | `PROXIMITY_UNDER_500M` | `DRIVER_ARRIVING` | GPS telemetry verifies distance |
| `DRIVER_ARRIVING` | `PROXIMITY_UNDER_50M` | `DRIVER_ARRIVED` | Captain signals arrival or geofence |
| `DRIVER_ARRIVED` | `VERIFY_OTP` | `RIDE_STARTED` | 4-digit OTP match confirmed |
| `DRIVER_ARRIVED` | `CUSTOMER_CANCEL` / `NO_SHOW` | `CANCELLED` | Possible cancellation fee applies |
| `RIDE_STARTED` | `TELEMETRY_STREAM` | `RIDE_IN_PROGRESS` | Speed > 0, heading toward destination |
| `RIDE_IN_PROGRESS` | `CAPTAIN_END_TRIP` | `RIDE_COMPLETED` | Proximity to destination confirmed |
| `RIDE_COMPLETED` | `INVOICE_GENERATED` | `PAYMENT_PENDING` | Final fare computed |
| `PAYMENT_PENDING` | `PAYMENT_SUCCESS` | `PAYMENT_COMPLETED` | Gateway receipt or cash acknowledged |
| `PAYMENT_COMPLETED` | `SUBMIT_FEEDBACK` | `RATED` | Valid rating (1-5) |
| `RATED` | `FINISH_SESSION` | `IDLE` | Reset to home state |

## 3. Disallowed Transitions (Validation Invariants)
- `RIDE_COMPLETED` cannot transition to `SEARCHING_DRIVER`.
- `RIDE_IN_PROGRESS` cannot transition to `DRIVER_ASSIGNED`.
- `IDLE` cannot transition directly to `RIDE_STARTED`.
- Once `VERIFY_OTP` succeeds, customer self-service cancellation without penalty is locked.
