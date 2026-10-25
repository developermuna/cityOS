import React from 'react';

export const FirstBannerCard = ({ showToast }) => {
  return (
    <section className="px-4 pt-2 pb-1" style={{ perspective: '1200px' }} aria-label="Travel Banner">
      <div 
        onClick={() => showToast && showToast('✈️ Zero convenience fee applied on your flight')}
        className="w-full h-[140px] p-4 rounded-[24px] bg-gradient-to-r from-[#00bfff] via-[#00a8e1] to-[#008cc3] text-slate-950 shadow-md relative overflow-hidden flex flex-col justify-center cursor-pointer active:scale-[0.99] transition-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-white/5 pointer-events-none" />
        <div className="absolute -right-3 -top-3 text-7xl opacity-20 drop-shadow-md">✈️</div>
        <div className="text-[10px] font-black uppercase tracking-widest bg-black/10 px-3 py-0.5 rounded-full inline-block mb-1.5 border border-black/10 self-start z-10">CityOS Travel</div>
        <h2 className="text-2xl font-black leading-tight z-10 drop-shadow-sm">Flights, Hotels & Holidays</h2>
        <p className="text-xs text-slate-950/80 mt-1 font-semibold italic z-10">Zero convenience fee on your first booking.</p>
      </div>
    </section>
  );
};
