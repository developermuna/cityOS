import React, { useState, useEffect } from 'react';
import { BannerBurgerWithBurst, BannerPizzaWithBurst } from './CustomIcons';

export const MegaPromoBanner = () => {
  // Real ticking timer initialized exactly at 03:02:17 from category header.jpeg
  const [secondsLeft, setSecondsLeft] = useState(3 * 3600 + 2 * 60 + 17);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSec) => {
    const hrs = String(Math.floor(totalSec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSec % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSec % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="w-full px-4 mb-4 select-none">
      <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-[#130732] to-[#160838] pt-3 pb-4 px-2 flex items-center justify-between border border-white/5 shadow-md">
        
        {/* Left: 3D Burger with Dark Purple Starburst Silhouette */}
        <div className="shrink-0 flex items-center justify-center pl-1">
          <BannerBurgerWithBurst size={86} />
        </div>

        {/* Center: Promo Offer & Dual Segment Timer Pill */}
        <div className="flex flex-col items-center justify-center text-center px-1 z-10">
          {/* 80% OFF */}
          <div className="text-[34px] font-black text-white tracking-tighter leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
            80% OFF
          </div>

          {/* UP TO ₹160 with hand-drawn scribble underline */}
          <div className="relative flex flex-col items-center mt-1">
            <span className="text-[13.5px] font-black text-white tracking-wider uppercase">
              UP TO ₹160
            </span>
            {/* Subtle curved underline accent */}
            <svg width="42" height="6" viewBox="0 0 42 6" fill="none" className="opacity-80 mt-[1px]">
              <path d="M1 4.5C12 2 28 2 41 3.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Dual Segment Timer Pill: [Clock + Ends In] | [03:02:17] */}
          <div className="mt-2.5 inline-flex items-center rounded-full overflow-hidden border border-[#5b32a8] shadow-md">
            {/* Left Segment: Yellow background with clock and "Ends In" */}
            <div className="bg-[#f6ba23] text-slate-950 px-2.5 py-1 flex items-center gap-1.5 font-black text-[11px] tracking-tight">
              {/* Clock Icon */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Ends In</span>
            </div>

            {/* Right Segment: Deep purple background with ticking countdown */}
            <div className="bg-[#24114f] text-white px-3 py-1 font-mono font-bold text-[12px] tracking-wider tabular-nums">
              {formatTimer(secondsLeft)}
            </div>
          </div>
        </div>

        {/* Right: 3D Pizza Slice with Dark Purple Starburst Silhouette */}
        <div className="shrink-0 flex items-center justify-center pr-1">
          <BannerPizzaWithBurst size={86} />
        </div>

      </div>
    </div>
  );
};
