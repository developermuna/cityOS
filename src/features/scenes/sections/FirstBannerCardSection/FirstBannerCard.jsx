import React from 'react';
import { MapPin } from 'lucide-react';

export const FirstBannerCard = ({ showToast }) => {
  return (
    <section className="w-full px-4 mb-3" aria-label="Featured Scene">
      <div 
        onClick={() => showToast && showToast('🎉 Bastian Beach Club: Sunday Circuit entry pass booked!')}
        className="relative w-full rounded-[28px] overflow-hidden bg-[#d8b88d] shadow-lg cursor-pointer active:scale-[0.99] transition-transform"
      >
        <div className="relative w-full h-[360px]">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80"
            alt="Beach Shore"
            className="w-full h-full object-cover filter brightness-95"
          />

          <div className="absolute top-0 inset-x-0 h-40 bg-white/40 pointer-events-none" />

          <div className="absolute inset-0 p-6 flex flex-col justify-between items-center text-center">
            
            <div className="flex flex-col items-center pt-4">
              <span className="text-2xl drop-shadow-md">🌴</span>
              <span className="font-serif italic text-2xl font-black tracking-wider text-[#b43e26] drop-shadow-sm -mt-1">
                Bastian
              </span>
              <span className="text-[10px] font-black tracking-[0.3em] text-[#b43e26] uppercase -mt-0.5">
                BEACH
              </span>
            </div>

            <div className="flex flex-col items-center my-auto">
              <span className="text-sm font-black tracking-[0.2em] text-[#7a5732] uppercase opacity-90 drop-shadow-sm">
                THE
              </span>
              <h2 className="text-[42px] font-black tracking-tighter text-[#634321] leading-none uppercase drop-shadow-[1px_2px_1px_rgba(255,255,255,0.7)]">
                SUNDAY
              </h2>
              <h2 className="text-[42px] font-black tracking-tighter text-[#634321] leading-none uppercase drop-shadow-[1px_2px_1px_rgba(255,255,255,0.7)]">
                CIRCUIT
              </h2>

              <div className="flex items-center gap-3 mt-4 text-[10px] font-black tracking-widest text-[#7a5732] uppercase bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30">
                <span>AQUA FITNESS</span>
                <span className="opacity-40">•</span>
                <span>SPIN + PILATES</span>
              </div>
            </div>

            <div className="w-full flex flex-col items-center pb-4">
              <div className="w-full flex items-end justify-between px-4 text-[11px] font-black text-[#573919]">
                <span className="font-serif italic text-lg opacity-80">Bastian</span>
                <div className="flex flex-col text-center">
                  <span className="text-[12px] font-black text-[#573919] uppercase tracking-tighter">25TH OCT, SUN</span>
                  <span className="text-[11px] font-bold text-[#6a4722] opacity-90">7AM ONWARDS</span>
                </div>
                <span className="font-serif text-lg font-black border-2 border-[#573919] rounded-full w-8 h-8 flex items-center justify-center opacity-80">
                  T
                </span>
              </div>

              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  if (showToast) showToast('📍 Bastian Beach Club: Worli Sea Face, Mumbai');
                }}
                className="w-10 h-10 rounded-full bg-white shadow-2xl flex items-center justify-center mt-5 border border-slate-200 active:scale-90 transition-transform cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-[#e11d48] flex items-center justify-center text-white">
                  <MapPin size={14} className="fill-white stroke-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 px-2 flex flex-col">
        <h3 className="text-[22px] font-black text-slate-900 uppercase tracking-tight leading-none">
          SUNDAY CIRCUIT AT BASTIAN BEACH CLUB
        </h3>
        <p className="text-[14px] text-slate-500 font-bold mt-2 uppercase tracking-wide">
          Bastian Beach Club • Mumbai
        </p>
      </div>
    </section>
  );
};
