import React from 'react';
import { FirstBannerCard } from '@/features/rent/sections/FirstBannerCardSection/FirstBannerCard';
import { RentCategoryGrid } from '@/features/rent/sections/RentCategorySection/RentCategoryGrid';
import { RentListingsList } from '@/features/rent/sections/RentListingsSection/RentListingsList';

export const RentHome = ({ showToast }) => {
  return (
    <div className="space-y-6">
      <FirstBannerCard showToast={showToast} />
      <RentCategoryGrid showToast={showToast} />
      <RentListingsList showToast={showToast} />
    </div>
  );
};
