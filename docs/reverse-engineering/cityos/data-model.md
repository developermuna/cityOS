# CityOS Ride Data Model & Relational Schema

## 1. Relational Schema (PostgreSQL / Supabase compatible)

```sql
-- 1. VEHICLE TIERS
CREATE TABLE ride_tiers (
    tier_id VARCHAR(32) PRIMARY KEY, -- 'bike', 'auto', 'mini', 'sedan'
    display_name VARCHAR(64) NOT NULL,
    base_fare DECIMAL(8, 2) NOT NULL,
    min_fare DECIMAL(8, 2) NOT NULL,
    per_km_rate DECIMAL(8, 2) NOT NULL,
    per_minute_rate DECIMAL(8, 2) NOT NULL,
    capacity INT NOT NULL DEFAULT 1,
    booking_fee DECIMAL(8, 2) NOT NULL DEFAULT 5.00,
    is_active BOOLEAN DEFAULT TRUE
);

-- 2. DRIVERS (CAPTAINS)
CREATE TABLE captains (
    captain_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(128) NOT NULL,
    phone_number VARCHAR(16) NOT NULL UNIQUE,
    virtual_number VARCHAR(16),
    rating DECIMAL(3, 2) DEFAULT 5.00,
    total_trips INT DEFAULT 0,
    avatar_url TEXT,
    tier_id VARCHAR(32) REFERENCES ride_tiers(tier_id),
    vehicle_model VARCHAR(128) NOT NULL,
    vehicle_color VARCHAR(64),
    license_plate VARCHAR(32) NOT NULL UNIQUE,
    is_online BOOLEAN DEFAULT FALSE,
    is_engaged BOOLEAN DEFAULT FALSE,
    current_lat DOUBLE PRECISION,
    current_lng DOUBLE PRECISION,
    last_ping_at TIMESTAMP WITH TIME ZONE
);

-- 3. RIDE ORDERS
CREATE TABLE ride_orders (
    ride_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    captain_id UUID REFERENCES captains(captain_id),
    tier_id VARCHAR(32) REFERENCES ride_tiers(tier_id),
    status VARCHAR(32) NOT NULL DEFAULT 'idle',
    start_otp VARCHAR(4) NOT NULL,
    pickup_address TEXT NOT NULL,
    pickup_lat DOUBLE PRECISION NOT NULL,
    pickup_lng DOUBLE PRECISION NOT NULL,
    destination_address TEXT NOT NULL,
    dest_lat DOUBLE PRECISION NOT NULL,
    dest_lng DOUBLE PRECISION NOT NULL,
    estimated_distance_km DECIMAL(6, 2) NOT NULL,
    estimated_duration_mins INT NOT NULL,
    route_polyline TEXT,
    base_fare DECIMAL(8, 2) NOT NULL,
    discount_amount DECIMAL(8, 2) DEFAULT 0.00,
    coins_deducted DECIMAL(8, 2) DEFAULT 0.00,
    tip_amount DECIMAL(8, 2) DEFAULT 0.00,
    final_fare DECIMAL(8, 2) NOT NULL,
    payment_method VARCHAR(32) DEFAULT 'Pay Now',
    payment_status VARCHAR(32) DEFAULT 'pending',
    cancellation_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    accepted_at TIMESTAMP WITH TIME ZONE,
    arrived_at TIMESTAMP WITH TIME ZONE,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE
);

-- 4. RIDE REVIEWS
CREATE TABLE ride_reviews (
    review_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ride_id UUID REFERENCES ride_orders(ride_id) UNIQUE,
    rating_stars INT CHECK (rating_stars BETWEEN 1 AND 5),
    feedback_tags TEXT[],
    comment TEXT,
    tip_amount DECIMAL(8, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. SAFETY & SOS LOGS
CREATE TABLE safety_incidents (
    incident_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ride_id UUID REFERENCES ride_orders(ride_id),
    incident_type VARCHAR(64) NOT NULL, -- 'sos_button', 'route_deviation', 'long_halt'
    trigger_lat DOUBLE PRECISION NOT NULL,
    trigger_lng DOUBLE PRECISION NOT NULL,
    siren_activated BOOLEAN DEFAULT FALSE,
    police_notified BOOLEAN DEFAULT FALSE,
    contacts_notified BOOLEAN DEFAULT FALSE,
    triggered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
