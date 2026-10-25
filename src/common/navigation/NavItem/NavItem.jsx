import React from 'react';

export const NavItem = ({ item, isActive, activeTheme, onClick }) => {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      style={isActive ? { 
        backgroundColor: activeTheme.hex,
        color: activeTheme.isDark ? '#ffffff' : '#020617' 
      } : undefined}
      className={`flex flex-col items-center gap-0.5 px-1 py-1.5 rounded-2xl transition-all duration-300 min-w-[64px] border-2 ${
        isActive 
          ? 'shadow-md font-black border-slate-900 ring-2 ring-slate-900/20' 
          : 'text-slate-500 hover:text-slate-900 font-bold border-transparent'
      }`}
    >
      <div className="relative">
        <Icon size={18} className={isActive ? 'stroke-[2.5]' : 'stroke-[2.2]'} />
        {item.badge != null && (
          <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 bg-[#800020] text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white shadow-xs">
            {item.badge}
          </span>
        )}
      </div>
      <span className={`text-[8px] uppercase tracking-tighter transition-all duration-300 leading-none ${
        isActive ? 'font-black' : 'font-bold'
      }`}>
        {item.label}
      </span>
    </button>
  );
};
