import React from 'react';
import { FirstBannerCard } from '@/features/travel/sections/FirstBannerCardSection/FirstBannerCard';
import { TravelModeGrid } from '@/features/travel/sections/TravelModeSection/TravelModeGrid';
import { TravelDealsList } from '@/features/travel/sections/TravelDealsSection/TravelDealsList';

export const TravelHome = ({ showToast }) => {
  return (
    <div className="space-y-6">
      <FirstBannerCard showToast={showToast} />
      <TravelModeGrid showToast={showToast} />
      <TravelDealsList showToast={showToast} />
    </div>
  );
};
