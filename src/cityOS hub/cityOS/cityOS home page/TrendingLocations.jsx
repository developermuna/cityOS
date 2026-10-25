import React from 'react';
import { TrendingItemCard } from './TrendingItemCard';

export const TrendingLocations = ({ onTabChange, showToast }) => {
  const trendingItems = [
    { id: 'scenes', name: 'Bastian Beach Club', desc: 'Sunday Circuit • 4.9 ★', icon: '🎉', color: 'bg-pink-500/10 text-pink-500', tag: 'Trending', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80' },
    { id: 'food', name: 'Burgers at ₹99', desc: 'Flash deal ending soon', icon: '🍔', color: 'bg-amber-500/10 text-amber-500', tag: '80% OFF', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80' },
    { id: 'shop', name: 'Apple iPhone 16 Pro', desc: 'Pre-order now open', icon: '📱', color: 'bg-red-900/10 text-red-900', tag: 'NEW', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80' }
  ];

  return (
    <section className="w-full pb-6" aria-label="Trending Locations">
      <div className="px-4 mb-4 flex items-center justify-between">
        <h3 className="text-[17px] font-black text-slate-900 tracking-tight">Trending in Mumbai Central</h3>
        <span 
          onClick={() => showToast && showToast('Showing all trending hot spots in Mumbai Central')}
          className="text-xs font-black text-orange-500 uppercase cursor-pointer hover:underline"
        >
          View All
        </span>
      </div>
      <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar scroll-smooth pb-4">
        {trendingItems.map((item) => (
          <TrendingItemCard 
            key={item.name}
            item={item}
            onClick={() => {
              if (onTabChange) onTabChange(item.id);
              if (showToast) showToast(`Viewing ${item.name}`);
            }}
          />
        ))}
      </div>
    </section>
  );
};
