import React from 'react';

export const FirstBannerCard = () => {
  return (
    <section className="px-4 pt-2 pb-1" aria-label="Promotion Banner">
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#2E7D32] p-3.5 text-white shadow-sm">
        <div className="absolute top-2.5 right-2.5 bg-black/25 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">
          POWERED BY NOICE
        </div>

        <div className="max-w-[62%] z-10 relative">
          <h2 className="text-base font-black leading-tight tracking-tight">
            Let The Sweetness Triumph!
          </h2>
          <p className="text-[11px] text-emerald-100 font-medium mt-0.5 leading-snug">
            Get premium, ghee-rich sweet boxes for your faves!
          </p>
          <button className="mt-2.5 px-3.5 py-1 bg-white text-[#2E7D32] text-[11px] font-black rounded-full shadow-2xs uppercase tracking-wider">
            SHOP NOW
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400&auto=format&fit=crop&q=80"
          alt="Sweet Boxes"
          className="absolute -right-2 bottom-0 w-28 h-24 object-cover rounded-tl-xl shadow-md transform rotate-3"
        />

      </div>
    </section>
  );
};
