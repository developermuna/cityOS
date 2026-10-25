import React from 'react';

export const CategorySidebarItem = ({ category, isActive, themeColor = '#800020', onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex flex-col items-center py-3.5 px-1 gap-1 transition-all relative select-none cursor-pointer ${
        isActive ? 'bg-white font-black shadow-2xs' : 'bg-transparent hover:bg-slate-200/50 font-bold'
      }`}
    >
      {/* Left indicator accent pill when active */}
      {isActive && (
        <div 
          className="absolute left-0 top-1 bottom-1 w-[4px] rounded-r-full shadow-xs" 
          style={{ backgroundColor: themeColor }}
        />
      )}

      {/* Category Icon / Image Circle */}
      <div className={`w-11 h-11 rounded-full overflow-hidden flex items-center justify-center p-0.5 transition-transform ${
        isActive ? 'bg-white ring-2 shadow-xs scale-105' : 'bg-white/80'
      }`} style={isActive ? { borderColor: themeColor, ringColor: `${themeColor}20` } : {}}>
        {category.image ? (
          <img src={category.image} className="w-full h-full object-cover rounded-full" alt={category.name} />
        ) : (
          <span className="text-xl">{category.icon || '🛍️'}</span>
        )}
      </div>

      {/* Category Label */}
      <span 
        className={`text-[9.5px] text-center tracking-tight leading-tight px-0.5 transition-colors line-clamp-2 ${
          isActive ? 'font-black text-slate-950' : 'font-bold text-slate-600'
        }`}
      >
        {category.name}
      </span>
    </button>
  );
};
