import React from 'react';

export const DiningVenueCard = ({ venue, onBook }) => {
  return (
    <div className="flex bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-sm transition-all hover:shadow-md p-3 rounded-2xl border">
      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
        <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
      </div>
      <div className="ml-4 flex-grow flex flex-col justify-between py-1">
        <div>
           <h4 className="text-[15px] font-black text-slate-900 leading-tight">{venue.name}</h4>
           <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest mt-1">{venue.loc} • {venue.rating} ★</p>
        </div>
        <div className="flex items-center justify-between">
           <span className="text-[11px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">{venue.discount}</span>
           <button 
             type="button"
             onClick={onBook}
             className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase cursor-pointer active:scale-95 transition-all"
           >
             BOOK TABLE
           </button>
        </div>
      </div>
    </div>
  );
};
