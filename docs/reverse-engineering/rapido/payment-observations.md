# Rapido Payment & Settlement Observations

## 1. Supported Payment Rails
- **UPI (Unified Payments Interface)**:
  - Intent flow on mobile (Google Pay, PhonePe, Paytm).
  - Dynamic QR generation for web / desktop testing or cash-counter settlement.
  - Autopay / recurring mandate for zero-friction ride exit.
- **Credit / Debit Cards**: Tokenized card checkout via RBI-compliant payment aggregators (Razorpay, Cashfree, Juspay).
- **Wallets**: Amazon Pay, Mobikwik, Paytm Wallet.
- **Cash**: Direct physical currency handover to the Captain upon arrival at destination.
- **Platform Coins / Loyalty Credits**: Rapido Coins / CityOS Coins applicable as direct partial deductions at booking.

## 2. Dynamic Coupon & Voucher Engine
- Fixed discount vouchers (e.g. `SECOND50` = 50% off up to ₹50).
- Minimum trip value threshold checks.
- Per-user redemption limit (e.g. 1 use per user, first 3 rides).
- Expiry date and city-zone applicability checks.

## 3. Gratuity / Driver Tipping
- Pre-ride tip addition during matching to incentivize Captain acceptance in high-demand or bad-weather periods (e.g., +₹10, +₹20, +₹30).
- Post-ride tip addition on the rating screen directly credited to Captain wallet.
