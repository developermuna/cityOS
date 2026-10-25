# Rapido Clean-Room Analysis: Observable Limitations & Unknowns

## 1. Clean-Room Boundary Constraints
The following operational details cannot and should not be reverse-engineered from public client telemetry or proprietary systems:
- **Internal Matching & Ranking Algorithms**: Specific weights used in Captain proximity ranking, driver acceptance rates, and dispatch penalty batching are proprietary server-side logic.
- **Dynamic Pricing & Surge Formula**: The exact internal surge multipliers, supply-demand density tensors, and historical elasticity coefficients are private backend algorithms.
- **Direct Database Schemas & Microservice Topologies**: Internal partition keys, distributed locking semantics, and service mesh internals cannot be directly examined.

## 2. CityOS Clean-Room Strategy
Rather than copying or guessing private internal algorithms, CityOS implements:
1. **An Independent, Transparent Fare Engine**: Explicit rules for base fare, distance, duration, wait time, surge, and platform commission.
2. **A Deterministic Proximity Dispatcher**: Proximity calculation based on Haversine / routing distance, vehicle tier filtering, and timeout-based sequential captain batch dispatch.
3. **Open Standards Integration**: Ola Maps Routing and Autocomplete APIs for map telemetry and routing.
