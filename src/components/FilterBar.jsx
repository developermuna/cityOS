import React from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { BoltIcon } from './CustomIcons';

export const FilterBar = ({ selectedFilters = {}, onToggleFilter }) => {
  return (
    <div className="w-full px-4 mb-4 select-none">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
        
        {/* Filter Button */}
        <button
          onClick={() => onToggleFilter('filterModal')}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-bold transition-all bg-white ${
            selectedFilters.filterModal
              ? 'text-slate-900 border-slate-900 ring-1 ring-slate-900/30 shadow-md'
              : 'text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <span>Filter</span>
          <SlidersHorizontal size={13} className="stroke-[2.5]" />
        </button>

        {/* Sort by */}
        <button
          onClick={() => onToggleFilter('sortBy')}
          className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full border text-[12px] font-bold transition-all bg-white ${
            selectedFilters.sortBy
              ? 'text-slate-900 border-slate-900 ring-1 ring-slate-900/30 shadow-md'
              : 'text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <span>Sort by</span>
          <ChevronDown size={14} className="stroke-[2.5]" />
        </button>

        {/* 99 Store Filter */}
        <button
          onClick={() => onToggleFilter('store99')}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-bold transition-all bg-white ${
            selectedFilters.store99
              ? 'text-slate-900 border-amber-500 ring-1 ring-amber-500/40 shadow-md'
              : 'text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <span className="w-4 h-4 rounded-full bg-[#f6ba23] text-slate-950 font-black text-[9px] flex items-center justify-center">
            99
          </span>
          <span>99 Store</span>
        </button>

        {/* Bolt 15 min */}
        <button
          onClick={() => onToggleFilter('bolt15')}
          className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-bold transition-all bg-white ${
            selectedFilters.bolt15
              ? 'text-orange-600 border-orange-500 ring-1 ring-orange-500/40 shadow-md'
              : 'text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <span className="text-orange-500 font-black">Bolt</span>
          <BoltIcon size={12} className="fill-orange-500" />
          <span>15 min</span>
        </button>

        {/* Ratings 4.0+ */}
        <button
          onClick={() => onToggleFilter('rating4')}
          className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full border text-[12px] font-bold transition-all bg-white ${
            selectedFilters.rating4
              ? 'text-emerald-700 border-emerald-500 ring-1 ring-emerald-500/40 shadow-md'
              : 'text-slate-800 border-slate-200 hover:border-slate-300 shadow-2xs'
          }`}
        >
          <span>Rating 4.0+</span>
        </button>

      </div>
    </div>
  );
};
