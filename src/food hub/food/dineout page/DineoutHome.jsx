import React from 'react';
import { PromoBanner } from './PromoBanner';
import { MindSection } from '../../../common page/ui/MindSection';
import { GirfOffers } from './GirfOffers';
import { DiningVenues } from './DiningVenues';

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
