import React from 'react';
import { TravelModeItem } from '@/features/travel/components/TravelModeItem/TravelModeItem';

export const TravelModeGrid = ({ showToast }) => {
  const modes = [
    { label: 'Flights', icon: '✈️', color: 'bg-[#00bfff]' },
    { label: 'Hotels', icon: '🏨', color: 'bg-emerald-500' },
    { label: 'Trains', icon: '🚆', color: 'bg-amber-500' },
    { label: 'Buses', icon: '🚌', color: 'bg-sky-600' }
  ];

  return (
    <section className="w-full" aria-label="Travel Mode Selection">
      <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar scroll-smooth">
        {modes.map((item, i) => (
          <TravelModeItem 
            key={i} 
            item={item} 
            onClick={() => showToast && showToast(`Searching available ${item.label}...`)}
          />
        ))}
      </div>
    </section>
  );
};
