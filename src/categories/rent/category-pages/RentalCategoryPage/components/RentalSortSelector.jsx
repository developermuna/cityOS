import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { RENTAL_SORT_OPTIONS } from '../../../constants/rental.constants';

export const RentalSortSelector = ({ sortBy, onSelectSort }) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-0.5 shrink-0 pl-1">
        <ArrowUpDown className="w-2.5 h-2.5" /> Sort:
      </span>
      {RENTAL_SORT_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => onSelectSort(opt.id)}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
            sortBy === opt.id
              ? 'bg-slate-900 text-white font-bold shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};
