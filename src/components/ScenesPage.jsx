import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Header } from './Header';

export const ScenesPage = ({ onTabChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full min-h-screen bg-[#0a0a0c] text-white pb-12 select-none flex flex-col justify-start">
      {/* Top Header Section with Black Theme */}
      <div className="w-full bg-[#050507]">
        {/* Location & Trapezoidal Category Tabs with Scenes ACTIVE */}
        <Header
          activeTab="scenes"
          onTabChange={onTabChange}
          theme="black"
        />
      </div>

      {/* Page Transition Content */}
      <div className="page-transition">
        {/* Dark Search Bar matching scene page.jpeg */}
        <div className="px-4 mt-3 mb-5">
          <div className="w-full bg-[#18181b] rounded-2xl h-[50px] px-4 flex items-center border border-white/10 shadow-inner">
            <Search size={20} className="text-neutral-400 mr-3 shrink-0 stroke-[2.2]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="w-full bg-transparent text-[15px] text-white placeholder-neutral-400 font-normal outline-none"
            />
          </div>
        </div>

        {/* Main Story / Poster Card Section (Bastian Beach Club) */}
        <div className="w-full px-4 mb-4">
          <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#e3c79e] to-[#c79c65] shadow-2xl border border-white/10">
            
            {/* Sandy Beach Shore with Ocean Waves Image */}
            <div className="relative w-full h-[470px]">
              {/* Background image of beach with foamy waves */}
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80"
                alt="Beach Shore"
                className="w-full h-full object-cover filter brightness-95"
              />

              {/* Frothy white surf top overlay */}
              <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/80 via-white/40 to-transparent pointer-events-none" />

              {/* Typography Overlay Embossed on Sand */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between items-center text-center">
                
                {/* Top: Bastian Beach Logo with Palm Tree */}
                <div className="flex flex-col items-center pt-2">
                  <span className="text-xl">🌴</span>
                  <span className="font-serif italic text-xl font-bold tracking-wider text-[#b43e26] drop-shadow-sm -mt-1">
                    Bastian
                  </span>
                  <span className="text-[9px] font-black tracking-widest text-[#b43e26] uppercase">
                    BEACH
                  </span>
                </div>

                {/* Center: THE SUNDAY CIRCUIT in 3D Sand Emboss */}
                <div className="flex flex-col items-center my-auto">
                  <span className="text-sm font-black tracking-widest text-[#7a5732] uppercase opacity-90">
                    THE
                  </span>
                  <h2 className="text-[36px] font-black tracking-wider text-[#634321] leading-none uppercase drop-shadow-[1px_2px_1px_rgba(255,255,255,0.7)]">
                    SUNDAY
                  </h2>
                  <h2 className="text-[36px] font-black tracking-wider text-[#634321] leading-none uppercase drop-shadow-[1px_2px_1px_rgba(255,255,255,0.7)]">
                    CIRCUIT
                  </h2>

                  <div className="flex items-center gap-2 mt-3 text-[11px] font-black tracking-wider text-[#7a5732] uppercase">
                    <span>AQUA FITNESS</span>
                    <span>•</span>
                    <span>SPIN + PILATES</span>
                  </div>
                </div>

                {/* Bottom Details */}
                <div className="w-full flex flex-col items-center pb-2">
                  <div className="w-full flex items-end justify-between px-2 text-[10px] font-black text-[#573919]">
                    <span className="font-serif italic text-base">Bastian</span>
                    <div className="flex flex-col text-center">
                      <span className="text-[11px] font-black text-[#573919]">25TH OCTOBER, SUNDAY</span>
                      <span className="text-[10px] font-bold text-[#6a4722]">7AM ONWARDS</span>
                    </div>
                    <span className="font-serif text-sm font-bold border border-[#573919] rounded-full w-6 h-6 flex items-center justify-center">
                      T
                    </span>
                  </div>

                  {/* Red Circular Location Pin */}
                  <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center mt-3 border border-slate-200">
                    <div className="w-5 h-5 rounded-full bg-[#e11d48] flex items-center justify-center text-white">
                      <MapPin size={11} className="fill-white stroke-none" />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Card Title & Location below poster */}
          <div className="mt-4 px-1 flex flex-col">
            <h3 className="text-[20px] font-black text-white uppercase tracking-tight leading-tight">
              SUNDAY CIRCUIT AT BASTIAN BEACH CLUB
            </h3>
            <p className="text-[13px] text-neutral-400 font-medium mt-0.5">
              Bastian Beach Club
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
