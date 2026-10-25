# Rapido Network & Transport Layer Observations

## 1. Network Profile & Traffic Classification
Ride-hailing client applications exhibit distinct network traffic patterns depending on the active state:
- **Pre-Booking (Idle)**:
  - Low-frequency geocoding and reverse geocoding on pan/zoom (debounced ~300-500ms).
  - Low-frequency nearby captain polling (every 10-15 seconds) or lightweight geohash-based pub/sub.
- **Searching Phase**:
  - Dispatch heartbeat every 2-3 seconds or long-polling / WebSocket broadcast.
  - Back-off retry with jitter on connectivity drop.
- **Active Trip (En Route / In Transit)**:
  - High-frequency telemetry updates: driver location stream received every 1-3 seconds.
  - Client performs marker interpolation (bearing, speed, smooth easing) locally rather than redrawing routes on each coordinate.
  - Routing API is invoked only on rerouting or significant deviation (>50m off route).

## 2. Protocol Selection
| Function | Protocol | Observable Behavior | Reason |
|---|---|---|---|
| Place Search & Geocoding | HTTPS REST | Query param with session token / debounce | Cacheable, standard HTTP semantics |
| Fare Calculation | HTTPS POST | Server-side authoritative computation | High security, cryptographic quote ID |
| Ride Creation | HTTPS POST | Idempotency Key header | Prevents duplicate charge on retry |
| Driver Telemetry | WSS / MQTT / SSE | Binary protobuf or JSON payload | Low overhead, sub-second latency |
| In-App Chat | WSS / Socket.io | Ephemeral message packets with ack | Bi-directional immediate delivery |
| In-App VoIP Call | WebRTC / SIP Gateway | Peer-to-peer audio with relay fallback | Low-latency full-duplex voice |

## 3. Resilience & Offline Handling
1. **Socket Disconnect & Resynchronization**:
   - When the phone switches between Wi-Fi and 5G or enters poor coverage, the socket disconnects.
   - Upon reconnection, client sends a `sync_ride_state` message with the last acknowledged timestamp.
   - Server returns current authoritative status; client snaps or animates to the new coordinate.
2. **Exponential Backoff**:
   - Polling fallback triggers if WebSocket fails consecutively 3 times, with intervals: 2s, 4s, 8s, max 15s.
