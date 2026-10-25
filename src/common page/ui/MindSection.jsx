import React from 'react';
import { FilterPills } from './FilterPills';
import { 
  foodCategories, 
  shopCategories, 
  groceryCategories, 
  serviceCategories, 
  rideCategories, 
  travelCategories, 
  rentCategories 
} from '../../data/mockData';

export const MindSection = ({ 
  activeTab, 
  onSelectCategory, 
  showToast, 
  activeFilter: externalFilter, 
  onFilterChange: externalFilterChange 
}) => {
  const [internalFilter, setInternalFilter] = React.useState('none');
  const currentFilter = externalFilter !== undefined ? externalFilter : internalFilter;

  const handleFilterChange = (filterId) => {
    const next = currentFilter === filterId ? 'none' : filterId;
    setInternalFilter(next);
    if (externalFilterChange) {
      externalFilterChange(next);
    }
    if (showToast) {
      showToast(next === 'none' ? 'Filter cleared' : `Applied ${filterId} filter`);
    }
  };

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

  const getTitle = () => {
    switch (activeTab) {
      case 'shop': return 'Shop by category';
      case 'grocery':
      case 'instamart': return 'Groceries for you';
      case 'service': return 'Services at your door';
      case 'ride': return 'Quick Ride options';
      case 'travel': return 'Travel highlights';
      case 'rent': return 'Rental picks';
      case 'scenes': return 'Explore the scene';
      case 'cityos': return 'City highlights';
      default: return "What's on your mind?";
    }
  };

  return (
    <section className="w-full bg-white py-6 mb-2 select-none" aria-label="Quick Categories">
      <div className="px-4 mb-5">
        <h3 className="text-[19px] font-black text-[#800020] tracking-tight leading-none">
          {getTitle()}
        </h3>
      </div>

      {/* Categories Row - Exactly 7 visible */}
      <div className="flex flex-nowrap gap-[6px] px-4 overflow-x-auto no-scrollbar scroll-smooth mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory && onSelectCategory(cat)}
            className="flex flex-col items-center gap-2 shrink-0 group transition-transform active:scale-95 cursor-pointer"
            style={{ width: 'calc((100% - 68px) / 7)' }}
          >
            <div className="relative w-full aspect-square rounded-full overflow-hidden bg-white border border-slate-200 shadow-xs transition-all duration-300 group-hover:shadow-md group-hover:border-slate-300">
              <img src={cat.image} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="text-[11px] font-bold text-slate-800 text-center leading-tight line-clamp-2 min-h-[28px] px-0.5">
              {cat.name}
            </span>
          </button>
        ))}
      </div>

      {/* Filter Row */}
      <div className="w-full border-t border-slate-50 pt-5">
        <FilterPills 
          activeFilter={currentFilter} 
          onFilterChange={handleFilterChange} 
        />
      </div>
    </section>
  );
};
