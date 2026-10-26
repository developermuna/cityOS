import React from 'react';
import { ServiceMarketplaceView } from '@/categories/service/index.jsx';

export const ServiceHome = ({ showToast, onAddToCart, onTabChange, searchQuery, onSubPageChange }) => {
  return (
    <ServiceMarketplaceView
      showToast={showToast}
      onAddToCart={onAddToCart}
      onTabChange={onTabChange}
      externalSearchQuery={searchQuery}
      onSubPageChange={onSubPageChange}
    />
  );
};

