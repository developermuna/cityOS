import React from 'react';
import { BoltIcon } from './CustomIcons';

export const BoltBanner = ({ onOrderNow }) => {
  return (
    <div className="w-full px-4 mb-3.5 select-none">
      <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#6b142b] via-[#540f21] to-[#400b19] p-4 flex items-center justify-between shadow-[0_8px_20px_rgba(84,15,33,0.35)] border border-white/10">
        
        {/* Left Side Content */}
        <div className="flex flex-col items-start z-10 max-w-[58%]">
          {/* Header */}
          <div className="flex items-center gap-1.5 text-white font-extrabold text-[15px] tracking-tight">
            <span className="text-white font-black">Bolt</span>
            <span className="text-[#ff9800] inline-flex items-center">
              <BoltIcon size={14} className="fill-[#ff9800]" />
            </span>
            <span className="text-white/60 font-normal">|</span>
            <span className="text-white text-[13px] font-bold">Food In 15 Mins!</span>
          </div>

          {/* Subtitle */}
          <p className="text-[12px] text-[#fcd7df] font-normal mt-1 leading-snug">
            Fresh, hot & crisp delights for you.
          </p>

          {/* ORDER NOW button */}
          <button
            onClick={onOrderNow}
            className="mt-3.5 px-4 py-1.5 bg-[#fc8019] hover:bg-[#e07115] active:scale-95 text-white text-[11px] font-black tracking-wider uppercase rounded-full shadow-[0_2px_8px_rgba(252,128,25,0.4)] transition-all cursor-pointer"
          >
            ORDER NOW
          </button>
        </div>

        {/* Right Side Food Image with subtle steam/glow effect */}
        <div className="relative w-32 h-24 shrink-0 flex items-center justify-end">
          <img
            src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80"
            alt="Delicious Biryani Bowl"
            className="w-24 h-24 object-cover rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.6)] border-2 border-white/20 transform hover:scale-105 transition-transform duration-300"
          />
          {/* Drink badge overlay */}
          <div className="absolute -bottom-1 -left-2 w-11 h-11 rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&auto=format&fit=crop&q=80"
              alt="Cold Beverage"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
