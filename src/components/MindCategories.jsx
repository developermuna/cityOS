import React from 'react';
import { mindCategories } from '../data/mockData';

export const MindCategories = ({ onSelectCategory }) => {
  return (
    <div className="w-full mb-4 select-none">
      {/* Title */}
      <div className="px-4 mb-3">
        <h3 className="text-[17px] font-black text-slate-900 tracking-tight">
          What's on your mind?
        </h3>
      </div>

      {/* Horizontal circular categories */}
      <div className="flex gap-4 px-4 overflow-x-auto no-scrollbar scroll-smooth">
        {mindCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory && onSelectCategory(cat)}
            className="flex flex-col items-center shrink-0 cursor-pointer group"
          >
            {/* Circular Image Container */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 shadow-sm border border-slate-100 group-hover:scale-105 active:scale-95 transition-all duration-200">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />

              {/* Sweets badge overlay if corner */}
              {cat.badgeTitle && (
                <div className="absolute inset-0 bg-red-900/60 flex items-center justify-center p-1">
                  <span className="text-[10px] font-black text-white italic tracking-tighter drop-shadow-sm border-b border-amber-300">
                    {cat.badgeTitle}
                  </span>
                </div>
              )}
            </div>

            {/* Category label */}
            <span className="text-[12px] font-bold text-slate-800 mt-1.5 tracking-tight group-hover:text-orange-600 transition-colors">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
