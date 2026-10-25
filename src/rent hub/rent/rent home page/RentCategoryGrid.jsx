import React from 'react';
import { RentCategoryItem } from './RentCategoryItem';

export const RentCategoryGrid = ({ showToast }) => {
  const categories = [
    { label: 'Flats', icon: '🏢', image: 'https://images.unsplash.com/photo-1545324418-f1d3c5b53574?w=300&auto=format&fit=crop&q=80' },
    { label: 'Bikes', icon: '🛵', image: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?w=300&auto=format&fit=crop&q=80' },
    { label: 'Furniture', icon: '🛋️', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&auto=format&fit=crop&q=80' },
    { label: 'Appliance', icon: '📺', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&auto=format&fit=crop&q=80' }
  ];

  return (
    <section className="w-full" aria-label="Rental Categories">
      <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar scroll-smooth">
        {categories.map((item, i) => (
          <RentCategoryItem 
            key={i} 
            item={item} 
            onClick={() => showToast && showToast(`Browsing ${item.label} rental listings`)}
          />
        ))}
      </div>
    </section>
  );
};
