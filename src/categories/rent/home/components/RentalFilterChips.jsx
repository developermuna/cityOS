import React from 'react';
import { RENTAL_CATEGORIES } from '../../constants/rental.constants';

export const RentalFilterChips = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 px-4">
      <button
        type="button"
        onClick={() => onSelectCategory('all')}
        className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
          activeCategory === 'all'
            ? 'bg-[#FF5200] text-white shadow-xs'
            : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
        }`}
      >
        🌟 All Rentals
      </button>

      {RENTAL_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelectCategory(cat.id)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
            activeCategory === cat.id
              ? 'bg-[#FF5200] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          <span>{cat.icon}</span>
          <span>{cat.shortName || cat.name}</span>
        </button>
      ))}
    </div>
  );
};
