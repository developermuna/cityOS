import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

export const MobileFrame = ({ children }) => {
  const [viewMode, setViewMode] = useState('phone'); // 'phone' | 'responsive'

  return (
    <div className="min-h-screen bg-[#07040e] flex flex-col items-center justify-start relative text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* Desktop Top Control Bar (Visible only on lg+ screens) */}
      <div className="hidden lg:flex items-center justify-between w-full max-w-5xl px-6 py-3 border-b border-white/5 bg-[#0f091f]/60 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#fc8019] to-amber-400 flex items-center justify-center text-white font-black text-xs shadow-md">
            cOS
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>cityOS Mobile App</span>
              <span className="text-[10px] bg-orange-500/20 text-orange-400 font-extrabold px-1.5 py-0.2 rounded-full border border-orange-500/30">
                Pixel-Perfect Replica
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              Mobile-first responsive web application
            </p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-[#1b122e] p-1 rounded-full border border-white/10 shadow-inner">
          <button
            onClick={() => setViewMode('phone')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              viewMode === 'phone'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone size={13} />
            <span>Mobile Device (390×844)</span>
          </button>

          <button
            onClick={() => setViewMode('responsive')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
              viewMode === 'responsive'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor size={13} />
            <span>Full Responsive</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="w-full flex justify-center items-start lg:py-6 px-0 lg:px-4">
        {viewMode === 'phone' ? (
          /* Phone Frame Container */
          <div className="w-full sm:w-[410px] min-h-screen sm:min-h-[880px] bg-[#120c24] sm:rounded-[46px] shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-0 sm:border-[8px] sm:border-[#2b1f47] relative flex flex-col overflow-hidden sm:ring-1 sm:ring-white/10">
            
            {/* Realistic Top Speaker Grille & Dynamic Island on phone frame (sm+ only) */}
            <div className="hidden sm:flex absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full items-center justify-center z-50 shadow-inner pointer-events-none">
              <div className="w-10 h-1 bg-neutral-800 rounded-full mr-2"></div>
              <div className="w-2.5 h-2.5 bg-neutral-900 rounded-full border border-neutral-700/60"></div>
            </div>

            {/* Inner App Content */}
            <div className="w-full min-h-screen bg-white flex flex-col relative overflow-x-hidden">
              {children}
            </div>

            {/* Home Indicator Bar (sm+ only) */}
            <div className="hidden sm:flex w-full py-2 bg-white items-center justify-center pointer-events-none sticky bottom-0 z-40">
              <div className="w-32 h-1 bg-slate-400 rounded-full"></div>
            </div>

          </div>
        ) : (
          /* Responsive Centered App Container */
          <div className="w-full max-w-md min-h-screen bg-white shadow-2xl relative flex flex-col">
            {children}
          </div>
        )}
      </div>

    </div>
  );
};
