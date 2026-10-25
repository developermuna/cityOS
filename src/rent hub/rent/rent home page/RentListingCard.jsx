import React from 'react';

export const RentListingCard = ({ listing, onInquire }) => {
  return (
    <article className="flex bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-sm transition-all hover:shadow-md p-3 rounded-2xl border" aria-label={`Listing: ${listing.title}`}>
      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
        <img src={listing.image} alt={listing.title} className="w-full h-full object-cover" />
      </div>
      <div className="ml-4 flex-grow flex flex-col justify-between py-0.5">
        <div>
          <span className="text-[9px] font-black bg-[#ff5200] text-white px-2 py-0.5 rounded-full">{listing.tag}</span>
          <h4 className="text-[14px] font-black text-slate-900 mt-1.5 leading-tight">{listing.title}</h4>
          <p className="text-[11px] text-slate-500 font-bold">{listing.deposit}</p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-black text-[#ff5200]">{listing.rent}</span>
          <button 
            type="button"
            onClick={onInquire}
            className="px-5 py-2 rounded-xl bg-[#ff5200] hover:bg-[#e64a00] text-white text-[11px] font-black active:scale-95 uppercase shadow-sm cursor-pointer"
          >
            INQUIRE
          </button>
        </div>
      </div>
    </article>
  );
};
