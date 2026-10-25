import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

export const OrdersSearchFilters = ({ 
  searchQuery, 
  setSearchQuery, 
  searchPlaceholder = 'Search your order...', 
  filterTabs = [], 
  activeFilter = 'All', 
  onSelectFilter,
  onOpenFilters
}) => {
  return (
    <div className="w-full px-4 pt-2 pb-3 select-none bg-white border-b border-slate-100">
      {/* Search Input & Filter Button */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 h-[42px] flex items-center gap-2.5 focus-within:border-[#800020] transition-colors shadow-2xs">
          <Search size={17} className="text-slate-400 shrink-0 stroke-[2.2]" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-transparent text-[13px] text-slate-800 placeholder-slate-400 font-medium outline-none truncate"
          />
        </div>

        <button
          type="button"
          onClick={onOpenFilters}
          className="h-[42px] px-3.5 bg-white border border-slate-200 rounded-xl flex items-center gap-2 text-slate-700 hover:border-slate-300 active:scale-95 transition-all shadow-2xs cursor-pointer shrink-0"
        >
          <SlidersHorizontal size={15} className="stroke-[2.2] text-[#800020]" />
          <span className="text-[13px] font-bold">Filters</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {filterTabs.map((tab) => {
          const isActive = activeFilter.toLowerCase() === tab.toLowerCase();

          return (
            <button
              key={tab}
              type="button"
              onClick={() => onSelectFilter && onSelectFilter(tab)}
              className={`px-4 py-2 rounded-xl text-[12.5px] font-bold tracking-tight transition-all duration-200 shrink-0 cursor-pointer ${
                isActive 
                  ? 'bg-[#800020] text-white shadow-xs' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
};
