import React from 'react';
import { ArrowDown } from 'lucide-react';

export const UpcomingLaunchesSection = ({ launches = [], themeColor = '#800020', onSelectLaunch }) => {
  if (!launches || launches.length === 0) return null;

  return (
    <section aria-label="New & Upcoming Launches">
      <h2 className="text-[14.5px] font-black text-slate-950 mb-3 tracking-tight">
        New & Upcoming Launches
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {launches.map((item, i) => {
          const isBuyNow = item.tag && item.tag.includes('BUY');
          const isSaleLive = item.tag && item.tag.includes('SALE');
          
          return (
            <div 
              key={i} 
              onClick={() => onSelectLaunch && onSelectLaunch(item)}
              className="flex flex-col items-center gap-1 group cursor-pointer active:scale-95 transition-transform"
            >
              <div className="relative w-full aspect-square rounded-[22px] overflow-hidden bg-slate-50 border border-slate-200/80 shadow-2xs">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                
                {/* Status Badge Bar at Bottom of Image Card */}
                {item.tag && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 py-0.5 text-[7px] font-black text-white text-center tracking-tighter uppercase shadow-xs truncate px-0.5"
                    style={{ 
                      backgroundColor: isBuyNow 
                        ? '#059669' 
                        : (isSaleLive ? '#0284c7' : themeColor) 
                    }}
                  >
                    {item.tag}
                  </div>
                )}
              </div>

              <span className="text-[10px] text-center font-bold text-slate-800 leading-tight tracking-tight line-clamp-2 mt-0.5">
                {item.name}
              </span>
            </div>
          );
        })}

        {/* View All Button Card matching screenshot */}
        <div 
          onClick={() => onSelectLaunch && onSelectLaunch({ name: 'All Launches' })}
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
