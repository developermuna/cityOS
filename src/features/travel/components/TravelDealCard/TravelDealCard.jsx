import React from 'react';

export const TravelDealCard = ({ deal, onBook }) => {
  return (
    <article className="flex bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-sm transition-all hover:shadow-md p-3 rounded-2xl border" aria-label={`Deal: ${deal.place}`}>
      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
        <img src={deal.image} alt={deal.place} className="w-full h-full object-cover" />
      </div>
      <div className="ml-4 flex-grow flex flex-col justify-between py-0.5">
        <div>
          <span className="text-[9px] font-black bg-[#00bfff] text-slate-950 px-2 py-0.5 rounded-full">{deal.tag}</span>
          <h4 className="text-[14px] font-black text-slate-900 mt-1.5 leading-tight">{deal.place}</h4>
          <p className="text-[11px] text-slate-500 font-bold">{deal.type}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-base font-black text-[#00bfff]">{deal.price}</span>
          <button 
            type="button"
            onClick={onBook}
            className="px-5 py-2 rounded-xl bg-[#00bfff] hover:bg-[#00a8e1] text-slate-950 text-[11px] font-black active:scale-95 uppercase shadow-sm cursor-pointer"
          >
            BOOK
          </button>
        </div>
      </div>
    </article>
  );
};
