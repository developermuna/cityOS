import React from 'react';
import { 
  foodCategories, 
  shopCategories, 
  groceryCategories, 
  serviceCategories, 
  rideCategories, 
  travelCategories, 
  rentCategories 
} from '@/data/mockData';

export const MindCategories = ({ activeTab, onSelectCategory, themeConfig }) => {
  const isDark = themeConfig?.isDark;
  const categories = (() => {
    switch (activeTab) {
      case 'shop': return shopCategories;
      case 'grocery':
      case 'instamart': return groceryCategories;
      case 'service': return serviceCategories;
      case 'ride': return rideCategories;
      case 'travel': return travelCategories;
      case 'rent': return rentCategories;
      default: return foodCategories;
    }
  })();

  const [activeId, setActiveId] = React.useState(categories[0]?.id);

  return (
    <nav className="w-full select-none my-0.5 py-1" aria-label="Quick Category Selection">
      {/* Horizontal flex container with top clearance to prevent ring/scale clipping */}
      <div className="flex flex-nowrap items-start gap-1.5 px-3 pt-2 pb-1 overflow-x-auto no-scrollbar scroll-smooth">
        {categories.map((cat) => {
          const isActive = activeId === cat.id;
          
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveId(cat.id);
                if (onSelectCategory) onSelectCategory(cat);
              }}
              /* 
                Calculated for exactly 7 items visible on screen:
                px-3 = 24px total padding
                6 gaps of 2px = 12px
                Total offset = 36px
              */
              className="flex flex-col items-center gap-1 shrink-0 transition-all duration-300 group cursor-pointer pt-0.5"
              style={{ 
                flex: '0 0 calc((100% - 36px) / 7)', 
                minWidth: 'calc((100% - 36px) / 7)',
                maxWidth: 'calc((100% - 36px) / 7)'
              }}
              aria-label={`Select Category: ${cat.name}`}
            >
              {/* Uniform, slightly smaller circular container (same size for all) */}
              <div className={`relative w-[42px] h-[42px] rounded-full overflow-hidden transition-all duration-300 border-2 shrink-0 flex items-center justify-center ${
                isActive 
                  ? 'border-white ring-2 ring-white/90 shadow-md scale-105' 
                  : isDark 
                    ? 'border-white/20 bg-white/10 hover:border-white/40' 
                    : 'border-slate-200/80 bg-white shadow-2xs hover:border-slate-300'
              }`}>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover rounded-full transition-transform group-hover:scale-110 duration-300" 
                />
                {cat.badgeTitle && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-[7px] px-1 rounded-full font-black animate-pulse z-10 leading-none py-0.5 shadow-2xs">
                    {cat.badgeTitle}
                  </div>
                )}
              </div>

              {/* Label */}
              <span className={`text-[9.5px] font-extrabold text-center leading-tight transition-colors line-clamp-1 truncate w-full px-0.5 tracking-tighter ${
                isActive 
                  ? 'text-white font-black drop-shadow-sm' 
                  : isDark 
                    ? 'text-white/90' 
                    : 'text-slate-900'
              }`}>
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
