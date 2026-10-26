import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { ServiceCategoryCard } from '../components/ServiceCategoryCard';

export const ServiceCategoriesSection = ({ categories = [], onSelectCategory, selectedCategory }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Main and commonly used service IDs
  const MAIN_SERVICE_IDS = [
    'electrician',
    'plumber',
    'ac-repair',
    'cleaner',
    'appliance-repair',
    'carpenter',
    'painter',
    'mechanic',
  ];

  // Separate main/frequent services from the rest
  const mainCategories = categories.filter((cat) => MAIN_SERVICE_IDS.includes(cat.id));
  const otherCategories = categories.filter((cat) => !MAIN_SERVICE_IDS.includes(cat.id));

  // Ensure we show top 8 first
  const primaryCategories = mainCategories.length >= 6 
    ? mainCategories 
    : categories.slice(0, 8);
  const remainingCategories = mainCategories.length >= 6 
    ? otherCategories 
    : categories.slice(8);

  const displayedCategories = isExpanded 
    ? [...primaryCategories, ...remainingCategories] 
    : primaryCategories;

  return (
    <section className="px-4" aria-label="All Service Categories">
      <div className="flex items-center justify-between mb-2.5">
        <div>
          <h3 className="text-[16px] font-black text-slate-900 tracking-tight flex items-center gap-1.5">
            Explore All Services
            <Sparkles size={14} className="text-[#606C38]" />
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            {isExpanded 
              ? `${categories.length} verified professional categories in your city`
              : `Showing top ${primaryCategories.length} popular services`}
          </p>
        </div>
        <span className="text-[10px] font-bold text-[#606C38] bg-[#606C38]/10 px-2 py-0.5 rounded-full border border-[#606C38]/20 shrink-0">
          100% Verified
        </span>
      </div>

      {/* Small compact cards in 4-column grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {displayedCategories.map((cat) => (
          <ServiceCategoryCard
            key={cat.id}
            category={cat}
            isSelected={selectedCategory?.id === cat.id}
            onClick={onSelectCategory}
          />
        ))}
      </div>

      {/* View More / View Less Toggle Button */}
      {remainingCategories.length > 0 && (
        <div className="mt-3 flex justify-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#606C38] bg-[#606C38]/8 hover:bg-[#606C38]/15 border border-[#606C38]/25 transition-all duration-200 active:scale-95 cursor-pointer shadow-2xs w-full max-w-xs"
            aria-expanded={isExpanded}
          >
            <span>
              {isExpanded ? 'Show Less Services' : `View More Services (${remainingCategories.length} More)`}
            </span>
            {isExpanded ? (
              <ChevronUp size={15} className="stroke-[2.5]" />
            ) : (
              <ChevronDown size={15} className="stroke-[2.5]" />
            )}
          </button>
        </div>
      )}
    </section>
  );
};
