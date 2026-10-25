import React from 'react';

export const TravelModeItem = ({ item, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center shrink-0 cursor-pointer group"
      aria-label={`Search: ${item.label}`}
    >
      <div className={`w-16 h-16 rounded-3xl ${item.color} flex items-center justify-center text-3xl text-white shadow-lg group-hover:scale-105 active:scale-95 transition-all`}>
        {item.icon}
      </div>
      <span className="text-[12px] font-black text-slate-800 mt-2 tracking-tight">{item.label}</span>
    </div>
  );
};
