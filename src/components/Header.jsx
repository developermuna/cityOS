import React from 'react';
import { ChevronRight, Bell, User } from 'lucide-react';
import { CategoryTabs } from './CategoryTabs';

export const Header = ({ 
  activeTab = 'cityos', 
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
  const iconBg = isCream 
    ? 'bg-[#ede8dc] border-[#dfd7c5] text-[#233f20]' 
    : isWhite 
    ? 'bg-slate-100 border-slate-200 text-slate-800' 
    : 'bg-[#140b29] border-white/10 text-white';
  const iconColor = isCream ? 'text-[#233f20]' : isWhite ? 'text-slate-900' : 'text-white';

  return (
    <header className="w-full pt-[10px] pb-0 bg-transparent select-none">
      {/* FIXED ADDRESS BAR: Horizontal row with Location and Actions */}
      <div className="flex items-center justify-between h-10 mb-1.5 px-4 w-full gap-1">
        {/* Location Left (expanded) */}
        <div 
          onClick={onLocationClick}
          className="flex flex-col cursor-pointer active:opacity-85 transition-opacity flex-grow min-w-0"
        >
          <div className={`flex items-center gap-1 text-[16px] font-bold tracking-tight leading-none ${titleColor}`}>
            <span className="truncate">Mumbai Central</span>
            <ChevronRight size={16} className="stroke-[3] mt-[1px] shrink-0" />
          </div>
          <p className={`text-[11px] font-medium tracking-tight truncate mt-0.5 leading-none ${subColor}`}>
            Mumbai Central, Mumbai, Maharash...
          </p>
        </div>

        {/* Action Group Right */}
        <div className="flex items-center gap-0.5 shrink-0">
          {/* Notification Icon (No circle box) */}
          <button 
            onClick={() => alert("Notifications")}
            className="p-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={21} className={iconColor} />
          </button>

          {/* Account Icon (Boxed) */}
          <button 
            onClick={onMenuClick}
            className={`w-9 h-9 rounded-full border flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer ${iconBg}`}
            aria-label="Account"
          >
            <User size={18} className={iconColor} />
          </button>
        </div>
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
