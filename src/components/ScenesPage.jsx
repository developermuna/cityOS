import React from 'react';
import { MapPin } from 'lucide-react';

export const ScenesPageContent = () => {
  return (
    <div className="space-y-6">
      {/* Main Story / Poster Card Section (Bastian Beach Club) */}
      <div className="w-full px-4 mb-4">
        <div className="relative w-full rounded-[36px] overflow-hidden bg-gradient-to-b from-[#e3c79e] to-[#c79c65] shadow-2xl border border-slate-200/50">
          
          {/* Sandy Beach Shore with Ocean Waves Image */}
          <div className="relative w-full h-[500px]">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80"
              alt="Beach Shore"
              className="w-full h-full object-cover filter brightness-95"
            />

            {/* Frothy white surf top overlay */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/90 via-white/40 to-transparent pointer-events-none" />

            {/* Typography Overlay Embossed on Sand */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between items-center text-center">
              
              {/* Top: Bastian Beach Logo with Palm Tree */}
              <div className="flex flex-col items-center pt-4">
                <span className="text-2xl drop-shadow-md">🌴</span>
                <span className="font-serif italic text-2xl font-black tracking-wider text-[#b43e26] drop-shadow-sm -mt-1">
                  Bastian
                </span>
                <span className="text-[10px] font-black tracking-[0.3em] text-[#b43e26] uppercase -mt-0.5">
                  BEACH
                </span>
              </div>

              {/* Center: THE SUNDAY CIRCUIT in 3D Sand Emboss */}
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

              {/* Bottom Details */}
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

                {/* Red Circular Location Pin */}
                <div className="w-10 h-10 rounded-full bg-white shadow-2xl flex items-center justify-center mt-5 border border-slate-200 active:scale-90 transition-transform cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-[#e11d48] flex items-center justify-center text-white">
                    <MapPin size={14} className="fill-white stroke-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Title & Location below poster */}
        <div className="mt-5 px-2 flex flex-col">
          <h3 className="text-[22px] font-black text-slate-900 uppercase tracking-tight leading-none">
            SUNDAY CIRCUIT AT BASTIAN BEACH CLUB
          </h3>
          <p className="text-[14px] text-slate-500 font-bold mt-2 uppercase tracking-wide">
            Bastian Beach Club • Mumbai
          </p>
        </div>
      </div>

      {/* More Scenes - List Style */}
      <div className="px-4 pb-8">
        <h3 className="text-[17px] font-black text-slate-900 tracking-tight mb-4">Trending Scenes</h3>
        <div className="space-y-4">
          {[
            { name: "Sun-Downer at Soho House", loc: "Juhu", tag: "EXCLUSIVE", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=80" },
            { name: "Rooftop Yoga session", loc: "Bandra", tag: "WELLNESS", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80" }
          ].map((s, i) => (
            <div key={i} className="flex bg-slate-50 p-4 rounded-[28px] border border-slate-100 shadow-sm">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
              </div>
              <div className="ml-4 flex-grow flex flex-col justify-between py-1">
                <div>
                   <span className="text-[9px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full uppercase">{s.tag}</span>
                   <h4 className="text-[15px] font-black text-slate-900 leading-tight mt-1.5">{s.name}</h4>
                   <p className="text-[11px] text-slate-500 font-bold uppercase mt-1">{s.loc}</p>
                </div>
                <div className="text-right">
                   <button className="px-5 py-1.5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase">JOIN SCENE</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
