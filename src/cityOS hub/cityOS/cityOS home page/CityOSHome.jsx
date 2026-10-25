import React from 'react';
import { FirstBannerCard } from './1st banner card';
import { TrendingLocations } from './TrendingLocations';

export const CityOSHome = ({ onTabChange, showToast }) => {
  return (
    <div className="space-y-4">
      <FirstBannerCard onTabChange={onTabChange} showToast={showToast} />
      <TrendingLocations onTabChange={onTabChange} showToast={showToast} />
    </div>
  );
};
