import React from 'react';

export const SpotlightSection = () => {
  return (
    <section className="px-4 pt-4 pb-2" aria-label="Spotlight">
      <div className="flex items-center justify-between">
         <h3 className="text-[19px] font-black text-slate-900 tracking-tight">In The Spotlight</h3>
         <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Sponsored</div>
      </div>
      <div className="w-full h-1.5 bg-indigo-600/10 rounded-full overflow-hidden mt-3 shadow-inner">
         <div className="w-1/3 h-full bg-indigo-600 rounded-full animate-pulse" />
      </div>
    </section>
  );
};
