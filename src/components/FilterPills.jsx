import React from 'react';

export const FilterPills = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="w-full px-4 mb-3.5 select-none">
      <div className="grid grid-cols-2 gap-2.5">
        
        {/* Left Pill: MIN Rs. 100 OFF */}
        <button
          onClick={() => onFilterChange && onFilterChange('discount100')}
          className={`py-2 px-3 rounded-full text-center font-extrabold text-[12px] tracking-tight transition-all duration-200 border cursor-pointer ${
            activeFilter === 'discount100'
              ? 'bg-white text-[#fc8019] border-[#fc8019] shadow-sm ring-1 ring-[#fc8019]/30'
              : 'bg-white text-[#fc8019] border-slate-100 hover:border-slate-200 shadow-sm'
          }`}
        >
          MIN Rs. 100 OFF
        </button>

        {/* Right Pill: FAST DELIVERY */}
        <button
          onClick={() => onFilterChange && onFilterChange('fastDelivery')}
          className={`py-2 px-3 rounded-full text-center font-extrabold text-[12px] tracking-tight transition-all duration-200 border cursor-pointer ${
            activeFilter === 'fastDelivery'
              ? 'bg-white text-slate-900 border-slate-900 shadow-sm ring-1 ring-slate-900/20'
              : 'bg-white text-[#414449] border-slate-100 hover:border-slate-200 shadow-sm'
          }`}
        >
          FAST DELIVERY
        </button>

      </div>
    </div>
  );
};
