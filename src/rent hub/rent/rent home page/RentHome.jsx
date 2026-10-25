import React from 'react';
import { FirstBannerCard } from './1st banner card';
import { RentCategoryGrid } from './RentCategoryGrid';
import { RentListingsList } from './RentListingsList';

export const RentHome = ({ showToast }) => {
  return (
    <div className="space-y-6">
      <FirstBannerCard showToast={showToast} />
      <RentCategoryGrid showToast={showToast} />
      <RentListingsList showToast={showToast} />
    </div>
  );
};
