# CityOS Ride Reverse Engineering & Clean-Room Architecture

## Overview
This directory contains clean-room reverse-engineering analysis of observable product flows in modern ride-hailing applications (specifically Rapido as a UX and lifecycle reference), alongside the independently designed architecture, specifications, state machines, and implementation details for **CityOS Ride**.

## Strict Clean-Room & Legal Boundary
- **Clean-room methodology**: All analysis is based strictly on authorized, publicly observable application behavior, standard industry UX flows, and product interactions.
- **Zero proprietary code or assets**: No proprietary source code, internal schemas, access tokens, API secrets, certificates, trademarks, or copyrighted assets are extracted, copied, or stored.
- **Independent CityOS Implementation**: All CityOS ride services, state machines, fare engines, and UI components are created independently and owned by CityOS.

## Directory Structure
```
docs/reverse-engineering/
├── README.md                               # This document
├── cityos-ride-current-state.md            # Technical audit of existing CityOS Ride code
├── rapido/                                 # Observable analysis of reference ride-hailing app
│   ├── product-overview.md                 # Product positioning and vehicle tiers
│   ├── user-flows.md                       # End-to-end customer booking journeys
│   ├── screen-inventory.md                 # UI screen inventory and transition tables
│   ├── ride-lifecycle.md                   # State machine of observable ride statuses
│   ├── api-observations.md                 # Inferred API contracts and boundary endpoints
│   ├── network-observations.md             # Polling, WebSocket, and latency characteristics
│   ├── data-model-observations.md          # Inferred entities (Driver, Ride, Fare, Vehicle)
│   ├── realtime-observations.md            # Realtime event pub/sub behavior
│   ├── payment-observations.md             # Payment methods, split payments, coupons, tips
│   ├── safety-observations.md              # SOS, trip sharing, masked calling, emergency contacts
│   └── limitations.md                      # Observable constraints and fallback behaviors
├── cityos/                                 # Original CityOS specifications & engineering
│   ├── ride-requirements.md                # Functional and non-functional specifications
│   ├── feature-mapping.md                  # Gap analysis: Reference vs Current vs Target
│   ├── architecture.md                     # High-level architecture and component topology
│   ├── data-model.md                       # Relational and document data models for CityOS
│   ├── api-contracts.md                    # REST and Realtime WebSocket event specifications
│   └── implementation-plan.md              # Phased rollout and integration plan
└── evidence/
    ├── screenshots/                        # Visual references and diagrams
    ├── recordings/                         # UI interaction capture notes
    └── notes/                              # Clean-room investigation and toolchain logs
```

## Toolchain & Verification Status
- **Node.js**: v24.18.0
- **npm**: 12.0.2
- **git**: 2.55.0.windows.4
- **adb**: 1.0.41 (platform-tools 37.0.1)
- **REA CLI**: 6.7.0 (`rea-agents` installed globally and registered via MCP)
- **Map Engine**: Ola Maps Web SDK & MapLibre GL (`@olamaps/olamaps-web-sdk`, `maplibre-gl`)
