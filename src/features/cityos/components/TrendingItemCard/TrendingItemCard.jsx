import React from 'react';

export const TrendingItemCard = ({ item, onClick }) => {
  return (
    <article 
      onClick={onClick}
      className="w-[160px] shrink-0 cursor-pointer group flex flex-col active:scale-95 transition-transform"
      aria-label={`Trending Item: ${item.name}`}
    >
      <div className="relative w-full h-[180px] rounded-3xl overflow-hidden shadow-md border border-slate-100">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-2 left-2">
           <span className={`text-[9px] font-black px-2 py-0.5 rounded-full backdrop-blur-md bg-white/20 text-white`}>{item.tag}</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="text-xl mb-1">{item.icon}</div>
          <h4 className="text-xs font-black leading-tight">{item.name}</h4>
          <p className="text-[10px] text-slate-300 font-medium">{item.desc}</p>
        </div>
      </div>
    </article>
  );
};
