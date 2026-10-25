import React from 'react';
import { FirstBannerCard } from '@/features/service/sections/FirstBannerCardSection/FirstBannerCard';
import { ServiceList } from '@/features/service/sections/ServiceListSection/ServiceList';

export const ServiceHome = ({ showToast, onAddToCart }) => {
  return (
    <div className="space-y-6">
      <FirstBannerCard showToast={showToast} />
      <ServiceList showToast={showToast} onAddToCart={onAddToCart} />
    </div>
  );
};
