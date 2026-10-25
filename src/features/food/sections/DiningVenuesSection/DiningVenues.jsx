import React from 'react';
import { DiningVenueCard } from '@/features/food/components/DiningVenueCard/DiningVenueCard';

export const DiningVenues = ({ showToast }) => {
  const venues = [
    { name: "Bastian Beach", loc: "Worli", discount: "25% OFF", rating: "4.9", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80" },
    { name: "The Bombay Canteen", loc: "Lower Parel", discount: "15% OFF", rating: "4.8", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80" }
  ];

  return (
    <div className="px-4 pb-8">
      <h3 className="text-[17px] font-black text-slate-900 tracking-tight mb-4">Explore Dining in Mumbai</h3>
      <div className="space-y-4">
        {venues.map((venue, i) => (
          <DiningVenueCard 
            key={i} 
            venue={venue} 
            onBook={() => showToast && showToast(`Table reserved at ${venue.name} with ${venue.discount}!`)}
          />
        ))}
      </div>
    </div>
  );
};
