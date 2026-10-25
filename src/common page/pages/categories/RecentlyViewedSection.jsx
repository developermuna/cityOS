import React from 'react';

export const RecentlyViewedSection = ({ items = [], onSelectItem }) => {
  const defaultItems = [
    { name: 'Wired Earphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200', price: '₹2,107' },
    { name: 'Office Study Table', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200', price: '₹4,299' },
    { name: 'Wireless Headphones', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200', price: '₹3,499' },
    { name: 'Galaxy S25 5G', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200', price: '₹59,299' }
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <section aria-label="Recently Viewed Stores">
      <h2 className="text-[14.5px] font-black text-slate-950 mb-3 tracking-tight">
        Recently Viewed Stores
      </h2>

      <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
        {displayItems.map((item, i) => (
          <div 
            key={i} 
            onClick={() => onSelectItem && onSelectItem(item)}
            className="w-[110px] shrink-0 bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-2 flex flex-col items-center gap-1.5 active:scale-95 transition-transform cursor-pointer hover:border-slate-300"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            
            <span className="text-[10px] font-bold text-slate-800 text-center tracking-tight leading-tight line-clamp-2 h-7 flex items-center justify-center">
              {item.name}
            </span>

            {item.price && (
              <span className="text-[9.5px] font-black text-slate-950">
                {item.price}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
