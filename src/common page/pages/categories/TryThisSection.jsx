import React from 'react';
import { ArrowDown } from 'lucide-react';

export const TryThisSection = ({ items = [], title = 'Have you tried?', onSelectFeature }) => {
  const defaultItems = [
    { name: 'Claim Now', label: 'Student\'s Club', icon: '🎓', color: 'bg-blue-50/80', badge: 'CLAIM' },
    { name: 'cityOS UPI', label: 'Fast UPI', icon: '📱', color: 'bg-indigo-50/80', badge: 'FAST' },
    { name: 'SuperCoin', label: 'Rewards', icon: '💰', color: 'bg-amber-50/80', badge: 'EARN' },
    { name: 'Plus Zone', label: 'VIP Pass', icon: '✨', color: 'bg-purple-50/80', badge: 'VIP' },
    { name: 'Bills & Recharges', label: '0 Fee', icon: '⚡', color: 'bg-yellow-50/80', badge: '0 FEE' },
    { name: 'cityOS Pay', label: 'Pay Later', icon: '💳', color: 'bg-blue-50/80', badge: 'CREDIT' },
    { name: 'Pay in 3', label: '0% Interest', icon: '📊', color: 'bg-emerald-50/80', badge: '3 MONTHS' }
  ];

  const displayItems = items.length > 0 ? items : defaultItems;

  return (
    <section aria-label={title}>
      <h2 className="text-[14.5px] font-black text-slate-950 mb-3 tracking-tight">
        {title}
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {displayItems.map((item, i) => (
          <div 
            key={i} 
            onClick={() => onSelectFeature && onSelectFeature(item)}
            className="flex flex-col items-center gap-1 group cursor-pointer active:scale-95 transition-transform"
          >
            <div className={`w-full aspect-square rounded-[22px] ${item.color || 'bg-slate-50'} flex items-center justify-center border border-slate-200/80 shadow-2xs relative`}>
              <span className="text-2xl">{item.icon}</span>
              {item.badge && (
                <span className="absolute top-1 right-1 text-[7px] font-black bg-[#800020] text-white px-1 py-0.2 rounded uppercase">
                  {item.badge}
                </span>
              )}
            </div>

            <span className="text-[10px] text-center font-bold text-slate-800 leading-tight tracking-tight line-clamp-1 mt-0.5">
              {item.name}
            </span>
          </div>
        ))}

        {/* View All Card */}
        <div 
          onClick={() => onSelectFeature && onSelectFeature({ name: 'All Features' })}
          className="flex flex-col items-center gap-1 group cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-full aspect-square rounded-[22px] bg-slate-100 flex flex-col items-center justify-center border border-slate-200/80 shadow-2xs group-hover:bg-slate-200/60 transition-colors">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs">
              <ArrowDown size={18} className="text-[#800020]" />
            </div>
          </div>
          <span className="text-[10px] text-center font-bold text-slate-800 tracking-tight leading-tight mt-0.5">
            View All
          </span>
        </div>
      </div>
    </section>
  );
};
