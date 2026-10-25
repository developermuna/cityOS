import React from 'react';
import { Navigation } from 'lucide-react';

export const CurrentLocationButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-4 p-4 rounded-2xl bg-red-50 border border-red-100 text-[#800020] mb-6 hover:bg-red-100 transition-colors group"
    >
      <div className="w-10 h-10 rounded-full bg-[#800020] flex items-center justify-center text-white shrink-0 shadow-sm group-active:scale-90 transition-transform">
        <Navigation size={20} className="fill-current" />
      </div>
      <div className="text-left">
        <p className="font-bold text-[15px] leading-tight">Your current location</p>
        <p className="text-[12px] opacity-80 font-medium">Using GPS</p>
      </div>
    </button>
  );
};
