import React from 'react';
import { Search } from 'lucide-react';

export const GrocerySearch = ({ searchTerm, setSearchTerm, isVisible }) => {
  return (
    <section className={`px-4 py-3 sticky top-0 z-50 bg-white shadow-sm transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`} aria-label="Quick Search">
      <div className="w-full bg-[#f4f4f6] rounded-2xl h-11 px-3.5 flex items-center justify-between border border-slate-200">
        <div className="flex items-center gap-2 w-full">
          <Search size={18} className="text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for 'Zero Sugar Drinks'"
            className="bg-transparent text-sm text-slate-800 placeholder-slate-500 font-medium outline-none w-full"
          />
        </div>
        <div className="text-slate-500 cursor-pointer pl-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7V4h3M20 7V4h-3M4 17v3h3M20 17v3h-3M7 12h10" />
          </svg>
        </div>
      </div>
    </section>
  );
};
