import React from 'react';
import { FirstBannerCard } from '@/features/cityos/sections/FirstBannerCardSection/FirstBannerCard';
import { TrendingLocations } from '@/features/cityos/sections/TrendingLocationsSection/TrendingLocations';

export const CityOSHome = ({ onTabChange, showToast }) => {
  return (
    <div className="space-y-4">
      <FirstBannerCard onTabChange={onTabChange} showToast={showToast} />
      <TrendingLocations onTabChange={onTabChange} showToast={showToast} />
    </div>
  );
};
