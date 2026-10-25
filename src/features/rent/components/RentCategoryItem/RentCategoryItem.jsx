import React from 'react';

export const RentCategoryItem = ({ item, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center shrink-0 cursor-pointer group"
      aria-label={`Category: ${item.label}`}
    >
      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm group-hover:scale-105 active:scale-95 transition-all">
        <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
      </div>
      <span className="text-[12px] font-black text-slate-800 mt-2 tracking-tight">{item.label}</span>
    </div>
  );
};
