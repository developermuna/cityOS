import React from 'react';

export const RouteSelector = () => {
  return (
    <section className="px-4" aria-label="Route Selection">
      <div className="w-full p-4 rounded-[28px] bg-white/60 backdrop-blur-sm border-slate-200/60 shadow-inner border-2 border-slate-100">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
            <div className="flex flex-col flex-grow">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PICKUP</span>
              <span className="text-sm font-bold text-slate-900 leading-tight">Rayagada Railway Station</span>
            </div>
          </div>
          <div className="ml-1 w-[1px] h-6 bg-slate-200 border-dashed border-l-2 ml-[4.5px]" />
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
            <div className="flex flex-col flex-grow">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DESTINATION</span>
              <input 
                type="text" 
                defaultValue="Maa Majhighouri Temple, Rayagada"
                className="bg-transparent text-sm font-bold text-slate-900 outline-none w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
