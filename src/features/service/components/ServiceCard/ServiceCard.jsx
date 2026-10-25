import React from 'react';

export const ServiceCard = ({ service, onAddToCart, showToast }) => {
  return (
    <article className="flex bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-sm transition-all hover:shadow-md p-3 rounded-2xl border" aria-label={`Service: ${service.title}`}>
      <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
      </div>
      <div className="ml-4 flex-grow flex flex-col justify-between py-0.5">
        <div>
          <h4 className="text-[13px] font-black text-slate-900 leading-tight">{service.title}</h4>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[11px] text-slate-900 font-black uppercase tracking-tighter">{service.time}</span>
            <span className="text-[11px] text-slate-400 font-bold">• {service.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-base font-black text-slate-900">{service.price}</span>
          <button 
            type="button"
            onClick={() => {
              if (onAddToCart) onAddToCart({ id: service.id, name: service.title, dealPrice: service.dealPrice, image: service.image });
              if (showToast) showToast(`Added ${service.title} to your booked services`);
            }}
            className="px-6 py-2 rounded-xl bg-[#606C38] hover:bg-[#4A5626] text-white text-[11px] font-black active:scale-95 shadow-md shadow-[#606C38]/20 transition-all cursor-pointer"
          >
            BOOK
          </button>
        </div>
      </div>
    </article>
  );
};
