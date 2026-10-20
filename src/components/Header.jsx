import React from 'react';
import { ChevronRight } from 'lucide-react';
import { CategoryTabs } from './CategoryTabs';

export const Header = ({ 
  activeTab = 'food', 
  onTabChange, 
  onMenuClick, 
  onLocationClick,
  theme = 'dark' // 'dark' | 'white' | 'cream' | 'black'
}) => {
  const isCream = theme === 'cream';
  const isWhite = theme === 'white';

  // Only the color tokens change; geometry, layout, and size remain 100% fixed and identical
  const titleColor = isCream ? 'text-[#233f20]' : isWhite ? 'text-slate-900' : 'text-white';
  const subColor = isCream ? 'text-[#6f7e6c]' : isWhite ? 'text-slate-500' : 'text-[#9d93b1]';
  const menuBtnBg = isCream 
    ? 'bg-[#ede8dc] border-[#dfd7c5] text-[#233f20]' 
    : isWhite 
    ? 'bg-slate-100 border-slate-200 text-slate-800' 
    : 'bg-[#140b29] border-white/10 text-white';
  const barColor = isCream ? 'bg-[#233f20]' : isWhite ? 'bg-slate-900' : 'bg-white';

  return (
    <header className="w-full pt-2.5 pb-0 bg-transparent select-none">
      
      {/* FIXED ADDRESS & MENU BAR: Exact same layout, size, and height across all pages */}
      <div className="flex items-center justify-between h-12 mb-1.5 px-4 w-full">
        {/* Location Left */}
        <div 
          onClick={onLocationClick}
          className="flex flex-col cursor-pointer active:opacity-85 transition-opacity max-w-[280px]"
        >
          <div className={`flex items-center gap-1 text-[18px] font-bold tracking-tight leading-none ${titleColor}`}>
            <span>Mumbai Central</span>
            <ChevronRight size={18} className="stroke-[3] mt-[1px]" />
          </div>
          <p className={`text-[12px] font-medium tracking-tight truncate mt-1 leading-none ${subColor}`}>
            Mumbai Central, Mumbai, Maharash...
          </p>
        </div>

        {/* Circular Profile / Hamburger Menu Button */}
        <button 
          onClick={onMenuClick}
          className={`w-10 h-10 rounded-full border flex flex-col items-center justify-center gap-[4px] hover:scale-105 active:scale-95 transition-all shadow-sm shrink-0 cursor-pointer ${menuBtnBg}`}
          aria-label="Profile and menu"
        >
          <span className={`w-[16px] h-[2px] rounded-full ${barColor}`}></span>
          <span className={`w-[16px] h-[2px] rounded-full ${barColor}`}></span>
          <span className={`w-[11px] h-[2px] rounded-full self-start ml-[13px] ${barColor}`}></span>
        </button>
      </div>

      {/* Category Tabs with Continuous Edge-to-Edge Border Line */}
      <CategoryTabs 
        activeTab={activeTab}
        onTabChange={onTabChange}
        theme={theme}
      />
    </header>
  );
};
