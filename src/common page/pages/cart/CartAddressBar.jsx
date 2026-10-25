import React from 'react';
import { MapPin } from 'lucide-react';

export const CartAddressBar = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white/10 mx-4 mb-4 rounded-xl backdrop-blur-sm border border-white/10">
      <div className="flex items-center gap-2 overflow-hidden">
        <MapPin size={14} className="text-white/60 shrink-0" />
        <p className="text-[10px] font-bold text-white truncate">
          Deliver to: <span className="text-white font-black">Raniguda farm 6th line...</span>
        </p>
      </div>
      <button className="text-[10px] font-black text-white uppercase tracking-tight shrink-0 bg-white/20 px-3 py-1 rounded-lg">
        Change
      </button>
    </div>
  );
};
