import React from 'react';
import { RentListingCard } from '@/features/rent/components/RentListingCard/RentListingCard';

export const RentListingsList = ({ showToast }) => {
  const listings = [
    { title: '1 BHK Furnished • Bandra', rent: '₹34k/mo', deposit: '1 Month Dep', tag: 'SEA FACING', image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&auto=format&fit=crop&q=80' },
    { title: 'Honda Activa 6G', rent: '₹2.5k/mo', deposit: 'Free Service', tag: 'IMMEDIATE', image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=400&auto=format&fit=crop&q=80' },
    { title: 'MacBook Pro M3 Max • 36GB', rent: '₹4.2k/mo', deposit: 'Zero Deposit', tag: 'PRO TECH', image: 'https://images.unsplash.com/photo-1517336712603-d51ff17d7dad?w=400&auto=format&fit=crop&q=80' },
    { title: 'Royal Enfield Hunter 350', rent: '₹5.8k/mo', deposit: 'Helmet + Insured', tag: 'WEEKLY/MO', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&auto=format&fit=crop&q=80' },
  ];

  return (
    <section className="px-4 pb-8" aria-label="Verified Rental Listings">
      <h3 className="text-[17px] font-black text-slate-900 tracking-tight mb-4">Verified Listings</h3>
      <div className="space-y-4">
        {listings.map((item, i) => (
          <RentListingCard 
            key={i} 
            listing={item} 
            onInquire={() => showToast && showToast(`Inquiry sent to verified owner for ${item.title}`)}
          />
        ))}
      </div>
    </section>
  );
};
