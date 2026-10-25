import React from 'react';
import { mainHubCategories } from './youtubeData';
import { getCategoryTheme } from '../../../theme/categoryColors';

export const YouTubeFilterChips = ({ 
  activeCategory = 'All', 
  onSelectCategory
}) => {
  return (
    <div className="w-full bg-white/95 border-b border-slate-200/80 py-2 px-3.5 select-none sticky top-14 z-30 shadow-2xs backdrop-blur-md">
      {/* Main Hub Category Filter Chips with matching theme colors when active */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
        {mainHubCategories.map((cat) => {
          const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();
          const catTheme = getCategoryTheme(cat.id.toLowerCase());

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              style={isActive ? { backgroundColor: catTheme.hex, borderColor: catTheme.hex } : undefined}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11.5px] font-black transition-all shrink-0 cursor-pointer border ${
                isActive
                  ? 'text-white shadow-xs scale-102'
                  : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
