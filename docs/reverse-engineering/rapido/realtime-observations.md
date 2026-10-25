# Rapido Realtime Event Architecture Observations

## 1. Event-Driven Realtime Subsystem
Ride-hailing relies heavily on asynchronous event dispatch. The interaction between passenger and captain is mediated through private real-time topics (channels).

## 2. Observable Event Catalog
| Event Topic / Name | Direction | Payload Synopsis | Client Action |
|---|---|---|---|
| `ride.created` | Server ➔ Rider | `{ ride_id, status: 'searching' }` | Display radar search animation |
| `ride.driver_assigned` | Server ➔ Rider | `{ ride_id, driver, vehicle, otp, eta }` | Render Captain details, show 4-digit OTP |
| `driver.location_updated` | Driver ➔ Server ➔ Rider | `{ driver_id, lat, lng, bearing, speed }` | Smoothly lerp driver vehicle marker |
| `driver.arrived` | Server ➔ Rider | `{ ride_id, arrived_at, wait_timer }` | Send push notification, sound chime |
| `ride.started` | Server ➔ Rider | `{ ride_id, started_at }` | Switch view to In-Trip active navigation |
| `ride.completed` | Server ➔ Rider | `{ ride_id, completed_at, invoice }` | Open bill sheet, prompt payment & rating |
| `ride.cancelled` | Server ➔ Rider | `{ ride_id, reason, fee }` | Show cancellation modal, reset to home |
| `chat.message` | Bi-directional | `{ message_id, sender, text, timestamp }` | Append message bubble, update badge |
| `sos.alert_triggered` | Rider ➔ Server | `{ ride_id, gps, timestamp }` | Trigger backend safety escalation & emergency contacts |

## 3. Telemetry Interpolation & Road Snapping
- Drivers transmit coordinates at intervals of 1 to 3 seconds.
- Raw GPS coordinates can be jittery or drift off the road.
- The client applies **spherical linear interpolation (lerp)** to animate vehicle position and heading between consecutive pings, avoiding jumpy marker rendering.
- MapLibre GL marker coordinate updates are executed in a requestAnimationFrame loop.
