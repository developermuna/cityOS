import React from 'react';

export const RideOptionCard = ({ ride, isSelected, onClick }) => {
  return (
    <article
      onClick={onClick}
      className={`p-4 rounded-[28px] border-2 transition-all flex items-center justify-between cursor-pointer ${
        isSelected 
          ? 'bg-[#800020]/5 border-[#800020] shadow-md ring-4 ring-[#800020]/15' 
          : 'bg-white border-slate-100 text-slate-800 hover:border-slate-200'
      }`}
      aria-label={`Ride Option: ${ride.name}`}
    >
      <div className="flex items-center gap-4">
        <div className="text-3xl">{ride.icon}</div>
        <div>
          <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
            {ride.name}
          </div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter mt-0.5">{ride.time} • {ride.desc}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xl font-black text-slate-900">{ride.price}</div>
      </div>
    </article>
  );
};
