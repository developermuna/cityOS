import React from 'react';

export const ServiceCategoryCard = ({ category, onClick, isSelected }) => {
  const priceDisplay = category.price 
    ? category.price 
    : category.startingPrice 
      ? `₹${category.startingPrice}` 
      : null;

  return (
    <button
      type="button"
      onClick={() => onClick && onClick(category)}
      className={`group relative flex flex-col items-center justify-between p-2 sm:p-2.5 rounded-xl border transition-all duration-200 text-center cursor-pointer active:scale-95 ${
        isSelected
          ? 'bg-[#606C38]/15 border-[#606C38] shadow-sm ring-2 ring-[#606C38]/20'
          : 'bg-white hover:bg-slate-50/90 border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-slate-300'
      }`}
      aria-label={`Category: ${category.name}`}
    >
      {/* Tiny Badge if urgent/fast */}
      {category.badge && (
        <span className="absolute -top-1.5 -right-0.5 text-[7px] sm:text-[7.5px] font-black uppercase tracking-tight px-1.5 py-0.2 rounded-full bg-[#606C38] text-white shadow-2xs z-10">
          {category.badge}
        </span>
      )}

      {/* Small Compact Icon */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200/70 group-hover:from-[#606C38]/15 group-hover:to-[#606C38]/25 flex items-center justify-center text-lg sm:text-xl shadow-2xs transition-transform duration-200 group-hover:scale-105 shrink-0 mb-1.5">
        <span>{category.icon}</span>
      </div>

      {/* Title & Price */}
      <div className="w-full flex flex-col items-center">
        <h4 className="text-[11px] sm:text-[11.5px] font-bold text-slate-800 leading-tight group-hover:text-[#606C38] transition-colors line-clamp-1 w-full">
          {category.name}
        </h4>
        {priceDisplay && (
          <p className="text-[9px] sm:text-[9.5px] text-slate-500 font-semibold mt-0.5 truncate w-full">
            From {priceDisplay}
          </p>
        )}
      </div>
    </button>
  );
};
