import React from 'react';
import { TravelDealCard } from '@/features/travel/components/TravelDealCard/TravelDealCard';

export const TravelDealsList = ({ showToast }) => {
  const deals = [
    { place: 'Goa Beach Resort', type: 'Flight + 3 Nights Hotel', price: '₹8,999/p', tag: 'TOP PICK', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80' },
    { place: 'Lonavala Villa', type: 'Private Pool & Scenic View', price: '₹4,499/n', tag: '2 HRS AWAY', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop&q=80' },
    { place: 'Manali Snow Retreat', type: 'Luxury Cottage + Bonfire', price: '₹6,299/n', tag: 'HIMALAYAS', image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&auto=format&fit=crop&q=80' },
    { place: 'Udaipur Heritage Palace', type: 'Lake View Suite + Royal Dinner', price: '₹7,899/n', tag: 'ROYAL STAY', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&auto=format&fit=crop&q=80' },
  ];

  return (
    <section className="px-4" aria-label="Getaway Deals">
      <h3 className="text-[17px] font-black text-slate-900 tracking-tight mb-4">Weekend Getaways</h3>
      <div className="space-y-4 pb-4">
        {deals.map((p, i) => (
          <TravelDealCard 
            key={i} 
            deal={p} 
            onBook={() => showToast && showToast(`Booking initiated for ${p.place}!`)}
          />
        ))}
      </div>
    </section>
  );
};
