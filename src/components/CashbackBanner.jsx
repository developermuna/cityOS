import React from 'react';
import { GoldCoinMedallion } from './CustomIcons';

export const CashbackBanner = ({ onClaim }) => {
  return (
    <div className="w-full px-4 mb-5 select-none">
      <div 
        onClick={onClaim}
        className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#0c1630] via-[#132247] to-[#0d1733] py-3.5 px-4 flex items-center justify-between shadow-[0_6px_20px_rgba(12,22,48,0.4)] border border-blue-900/40 cursor-pointer group"
      >
        {/* Floating tiny golden coin accents */}
        <div className="absolute top-1 left-28 w-2.5 h-2.5 rounded-full bg-amber-400 opacity-60 blur-[0.5px]"></div>
        <div className="absolute bottom-1 right-24 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-300 opacity-70"></div>
        <div className="absolute top-1/2 left-3 w-1.5 h-1.5 rounded-full bg-yellow-200 opacity-40"></div>

        {/* Left Typography */}
        <div className="flex flex-col max-w-[65%] z-10">
          <h3 className="text-white font-extrabold text-[14.5px] leading-tight tracking-tight">
            Use your <span className="text-amber-300">₹20</span> free cash
          </h3>
          <p className="text-slate-300 text-[12.5px] font-semibold leading-tight mt-0.5">
            auto applied at checkout
          </p>
        </div>

        {/* Right Gold Medallion */}
        <div className="relative shrink-0 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
          <GoldCoinMedallion />
        </div>

      </div>
    </div>
  );
};
