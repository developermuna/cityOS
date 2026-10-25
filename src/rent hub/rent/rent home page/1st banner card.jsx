import React from 'react';

export const FirstBannerCard = ({ showToast }) => {
  return (
    <section className="px-4 pt-2 pb-1" style={{ perspective: '1200px' }} aria-label="Rent Banner">
      <div 
        onClick={() => showToast && showToast('🏠 CityOS Rentals: 0 Brokerage & direct owner listings')}
        className="w-full h-[140px] p-4 rounded-[24px] bg-gradient-to-r from-[#ff5200] via-[#f74c00] to-[#e64a00] text-white shadow-md relative overflow-hidden flex flex-col justify-center cursor-pointer active:scale-[0.99] transition-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-white/5 pointer-events-none" />
        <div className="absolute -right-3 -bottom-3 text-8xl opacity-20 rotate-12 drop-shadow-md">🏠</div>
        <div className="text-[10px] font-bold uppercase tracking-widest bg-black/20 px-3 py-0.5 rounded-full inline-block mb-1.5 border border-white/20 self-start z-10">CityOS Rentals</div>
        <h2 className="text-2xl font-black leading-tight z-10 drop-shadow-md">Rent Flats & Furniture</h2>
        <p className="text-xs text-white/90 mt-1 font-medium z-10">Verified homes with zero brokerage & easy rentals.</p>
      </div>
    </section>
  );
};
