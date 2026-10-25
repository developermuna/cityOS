# Rapido Safety & Emergency Response Architecture

## 1. Safety Pillars
1. **Physical Pre-Trip Verification**:
   - 4-Digit One Time Password (OTP) required before trip can begin, preventing mistaken boardings.
   - Driver facial badge and vehicle number plate comparison screen.
2. **Real-time Incident Detection**:
   - Long unintended stop detection (geofence stationary timer > 5 mins away from route).
   - Major route deviation detection (> 1 km departure from designated polyline).
3. **Emergency Escalation (SOS)**:
   - Dedicated floating SOS Shield icon during active trips.
   - Direct trigger to emergency response helpline (112 in India).
   - Instant SMS / WhatsApp message to pre-registered emergency contacts containing live tracking link.
   - Audible siren synthesis option on the rider's device to attract public attention in dangerous situations.
4. **Identity & Privacy Protection**:
   - Number masking / virtual phone bridge so Captains and riders never view each other's private mobile numbers.
   - Ephemeral in-app chat with automatic cleanup after ride completion.
