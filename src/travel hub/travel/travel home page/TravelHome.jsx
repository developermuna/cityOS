import React from 'react';
import { FirstBannerCard } from './1st banner card';
import { TravelModeGrid } from './TravelModeGrid';
import { TravelDealsList } from './TravelDealsList';

export const TravelHome = ({ showToast }) => {
  return (
    <div className="space-y-6">
      <FirstBannerCard showToast={showToast} />
      <TravelModeGrid showToast={showToast} />
      <TravelDealsList showToast={showToast} />
    </div>
  );
};
