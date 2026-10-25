import React, { useState, useEffect } from 'react';

export const OrdersBanner = ({ banner, showToast }) => {
  const [activeDot, setActiveDot] = useState(4); // Match screenshot active dot position

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 7);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (!banner) return null;

  return (
    <div className="px-4 pt-3 pb-2 select-none">
      <div 
        onClick={() => showToast && showToast(`Offer applied: ${banner.sub}`)}
        className="w-full bg-[#1b2230] rounded-2xl overflow-hidden text-white flex items-center justify-between p-4 cursor-pointer relative shadow-sm border border-slate-800"
      >
        <div className="flex flex-col z-10 max-w-[62%]">
          {/* Logo row */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-black text-[13px] tracking-tight">{banner.brand}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="font-extrabold text-[13px] text-amber-300">{banner.partner}</span>
          </div>

          {/* Offer text */}
          <span className="text-[11px] font-bold text-slate-300">{banner.sub}</span>
          <h3 className="text-[15px] font-black tracking-tight leading-snug mt-0.5 text-white">
            {banner.title}
          </h3>
        </div>

        {/* Right side visual */}
        <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10">
          <img 
            src={banner.image} 
            alt="Promotion"
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#1b2230]/40" />
        </div>
      </div>

      {/* Carousel dots */}
      <div className="flex items-center justify-center gap-1.5 mt-2">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === activeDot ? 'w-5 bg-slate-900' : 'w-1.5 bg-slate-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
