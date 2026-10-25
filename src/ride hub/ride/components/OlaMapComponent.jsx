/**
 * CityOS OlaMapComponent
 * Modular Map wrapper providing Ola Maps vector tile rendering, route layers, and vehicle tracking.
 */

import React from 'react';
import { OlaMapView } from '../../../components/OlaMapView';

export const OlaMapComponent = ({
  pickupCoord,
  destCoord,
  routeCoordinates = [],
  vehicleCoord = null,
  vehicleHeading = 0,
  theme = 'standard',
  onThemeChange,
  className = 'w-full h-full min-h-[320px]',
  interactive = true,
  showVehicleMarker = true,
}) => {
  return (
    <OlaMapView
      pickupCoord={pickupCoord}
      destCoord={destCoord}
      routeCoordinates={routeCoordinates}
      vehicleCoord={showVehicleMarker ? vehicleCoord : null}
      vehicleHeading={vehicleHeading}
      theme={theme}
      onThemeChange={onThemeChange}
      className={className}
      interactive={interactive}
    />
  );
};
