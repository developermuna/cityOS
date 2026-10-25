import React from 'react';

export const PopularStoresSection = ({ stores = [], title = 'Popular Store', onSelectStore }) => {
  if (!stores || stores.length === 0) return null;

  return (
    <section aria-label={title}>
      <h2 className="text-[14.5px] font-black text-slate-950 mb-3 tracking-tight">
        {title}
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {stores.map((store, i) => (
          <div 
            key={i} 
            onClick={() => onSelectStore && onSelectStore(store)}
            className="flex flex-col items-center gap-1 group cursor-pointer active:scale-95 transition-transform"
          >
            {/* Square App Icon */}
            <div className="w-full aspect-square rounded-[22px] overflow-hidden bg-[#f8f9fb] border border-slate-200/80 shadow-2xs p-1.5 flex items-center justify-center group-hover:shadow-md transition-shadow">
              <img 
                src={store.image} 
                alt={store.label || store.name} 
                className="w-full h-full object-cover rounded-xl mix-blend-multiply" 
              />
            </div>

            {/* Label Underneath */}
            <span className="text-[10px] text-center font-bold text-slate-800 leading-tight tracking-tight line-clamp-1">
              {store.label || store.name}
            </span>

            {/* Sub-status tag (e.g. Live now, Play now, Join queue, Discover Luxe, Value 365) */}
            {store.name && (
              <span className="text-[9px] text-center font-bold text-slate-500 line-clamp-1">
                {store.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
