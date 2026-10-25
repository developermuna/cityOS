import React from 'react';
import { SlidersHorizontal, ChevronDown, Zap } from 'lucide-react';

export const FilterPills = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'filter', label: 'Filter', icon: SlidersHorizontal },
    { id: 'sort', label: 'Sort by', icon: ChevronDown },
    { id: 'store99', label: '99 Store', badge: '99' },
    { id: 'bolt15', label: 'Bolt 15 min', icon: Zap },
    { id: 'rating', label: 'Ratings 4.0+' },
    { id: 'offers', label: 'Great Offers' }
  ];

  return (
    <nav className="w-full mb-4 select-none" aria-label="Search Filters">
      <div className="flex gap-2 px-4 overflow-x-auto no-scrollbar scroll-smooth">
        {filters.map((f) => {
          const Icon = f.icon;
          const isActive = activeFilter === f.id;

          return (
            <button
              key={f.id}
              onClick={() => onFilterChange && onFilterChange(f.id)}
              className={`flex items-center gap-1.5 shrink-0 px-3.5 py-2.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-[13px] font-bold tracking-tight shadow-sm whitespace-nowrap active:scale-95 ${
                isActive 
                  ? 'bg-[#800020] border-[#800020] ring-2 ring-[#800020]/30 text-white shadow-md' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {f.badge && (
                <span className="w-4 h-4 bg-white/20 text-white text-[10px] font-black rounded-full flex items-center justify-center -ml-0.5">
                  {f.badge}
                </span>
              )}
              {Icon && <Icon size={14} className={isActive ? 'text-white' : 'text-slate-500'} />}
              <span>{f.label}</span>
              {f.id === 'bolt15' && <span className="sr-only">Quick delivery</span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

