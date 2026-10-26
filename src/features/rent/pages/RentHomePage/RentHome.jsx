import React from 'react';
import { RentalMarketplaceView } from '@/categories/rent/index.jsx';

export const RentHome = ({ showToast, searchQuery, onSubPageChange }) => {
  return (
    <RentalMarketplaceView
      showToast={showToast}
      externalSearchQuery={searchQuery}
      onSubPageChange={onSubPageChange}
    />
  );
};
