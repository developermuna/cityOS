import React from 'react';
import { FirstBannerCard } from './1st banner card';
import { ServiceList } from './ServiceList';

export const ServiceHome = ({ showToast, onAddToCart }) => {
  return (
    <div className="space-y-6">
      <FirstBannerCard showToast={showToast} />
      <ServiceList showToast={showToast} onAddToCart={onAddToCart} />
    </div>
  );
};
