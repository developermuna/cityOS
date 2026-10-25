import React, { useState } from 'react';
import { ArrowLeft, Search, Heart, X } from 'lucide-react';

export const PlayHeader = ({ 
  onBack, 
  searchQuery, 
  setSearchQuery, 
  likedCount = 0, 
  onOpenLiked, 
  _showToast 
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 px-3.5 py-2.5 transition-all select-none">
      <div className="flex items-center justify-between gap-3 h-10">
        {/* Left: Back Arrow Button */}
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shrink-0 shadow-2xs"
          aria-label="Go back"
        >
          <ArrowLeft size={20} className="stroke-[2.5]" />
        </button>

        {/* Center: Search Input OR Page Title */}
        {isSearchOpen ? (
          <div className="flex-1 flex items-center bg-slate-100 rounded-full px-3 py-1.5 border border-slate-200 animate-fade-in">
            <Search size={16} className="text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos or shorts..."
              autoFocus
              className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
              className="ml-1 text-[11px] font-bold text-[#800020] cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-start ml-1">
            <h1 className="text-[18px] font-black tracking-tight text-slate-900">
              Explore
            </h1>
          </div>
        )}

        {/* Right: Search Icon + Like Button */}
        <div className="flex items-center gap-2 shrink-0">
          {!isSearchOpen && (
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
              aria-label="Search"
            >
              <Search size={18} className="stroke-[2.2]" />
            </button>
          )}

          {/* Like Button with Saved Badge */}
          <button
            type="button"
            onClick={onOpenLiked}
            className="relative w-9 h-9 rounded-full bg-[#800020]/10 hover:bg-[#800020]/20 text-[#800020] flex items-center justify-center active:scale-90 transition-transform cursor-pointer"
            aria-label="Liked videos"
          >
            <Heart 
              size={19} 
              className={likedCount > 0 ? 'fill-[#800020] stroke-[#800020]' : 'stroke-[2.2]'} 
            />
            {likedCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 bg-[#800020] text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white shadow-xs">
                {likedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
