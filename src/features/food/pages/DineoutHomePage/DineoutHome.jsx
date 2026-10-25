import React from 'react';
import { PromoBanner } from '@/features/food/sections/PromoBannerSection/PromoBanner';
import { MindSection } from '@/common/components/MindSection/MindSection';
import { GirfOffers } from '@/features/food/sections/GirfOffersSection/GirfOffers';
import { DiningVenues } from '@/features/food/sections/DiningVenuesSection/DiningVenues';

export const DineoutHome = ({ showToast }) => {
  return (
    <div className="space-y-6">
      <PromoBanner showToast={showToast} />
      <MindSection 
        activeTab="food" 
        showToast={showToast} 
        onSelectCategory={(cat) => showToast(`Selected ${cat.name}`)}
      />
      <GirfOffers showToast={showToast} />
      <DiningVenues showToast={showToast} />
    </div>
  );
};
