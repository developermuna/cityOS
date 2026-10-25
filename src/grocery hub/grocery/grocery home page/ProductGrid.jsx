import React from 'react';
import { ChevronRight } from 'lucide-react';
import { GroceryProductCard } from './GroceryProductCard';

export const ProductGrid = ({ title, items, onAddToCart, showSeeAll = true }) => {
  return (
    <section className="px-4 mb-5" aria-label={`${title} Section`}>
      <div className="flex items-center justify-between mb-2.5">
        <h3 className="text-base font-black text-slate-900">{title}</h3>
        {showSeeAll && (
          <span className="text-xs font-bold text-[#2E7D32] flex items-center cursor-pointer">
            See All <ChevronRight size={14} />
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {items.map((item) => (
          <GroceryProductCard 
            key={item.id} 
            item={item} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
      {!showSeeAll && (
         <button className="w-full mt-3 py-2 rounded-full border border-emerald-200 text-[#2E7D32] font-black text-xs flex items-center justify-center gap-1 hover:bg-emerald-50">
           <span>See All</span>
           <ChevronRight size={14} />
         </button>
      )}
    </section>
  );
};
