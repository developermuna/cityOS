import React from 'react';

export const MoreOnCityOSSection = ({ items = [], title = 'More on cityOS', onSelectMore }) => {
  const defaultItems = [
    { name: 'Netflix', label: 'Stream', image: 'https://cdn-icons-png.flaticon.com/512/732/732228.png', color: 'bg-rose-50/80' },
    { name: 'Uber Rides', label: 'Free Cabs', image: 'https://cdn-icons-png.flaticon.com/512/732/732251.png', color: 'bg-slate-100' },
    { name: 'Pet Supplies', label: 'Pet Store', icon: '🐾', color: 'bg-emerald-50/80' },
    { name: 'cityOS EMI', label: 'Easy EMI', icon: '🏦', color: 'bg-amber-50/80' },
    { name: 'NextGen Brands', label: 'New Age', icon: '🏷️', color: 'bg-purple-50/80' },
    { name: 'Green Earth', label: 'Eco Friendly', icon: '🌍', color: 'bg-green-50/80' }
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <section className="pb-16" aria-label={title}>
      <h2 className="text-[14.5px] font-black text-slate-950 mb-3 tracking-tight">
        {title}
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {displayItems.map((item, i) => (
          <div 
            key={i} 
            onClick={() => onSelectMore && onSelectMore(item)}
            className="flex flex-col items-center gap-1 group cursor-pointer active:scale-95 transition-transform"
          >
            <div className={`w-full aspect-square rounded-[22px] ${item.color || 'bg-slate-50'} flex items-center justify-center border border-slate-200/80 shadow-2xs overflow-hidden p-2`}>
              {item.image ? (
                <img src={item.image} className="w-10 h-10 object-contain opacity-90" alt={item.name} />
              ) : (
                <span className="text-2xl">{item.icon}</span>
              )}
            </div>

            <span className="text-[10px] text-center font-bold text-slate-800 leading-tight tracking-tight line-clamp-1 mt-0.5">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
