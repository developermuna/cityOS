import React, { useState } from 'react';
import { Cast, Bell, Search, X, Mic } from 'lucide-react';

export const YouTubeHeader = ({ 
  searchQuery, 
  setSearchQuery, 
  showToast, 
  onProfileClick 
}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-3.5 py-2.5 transition-all">
      {isSearchActive ? (
        <div className="flex items-center gap-2 animate-fade-in">
          <button
            type="button"
            onClick={() => {
              setIsSearchActive(false);
              setSearchQuery('');
            }}
            className="p-1.5 text-slate-600 hover:text-slate-900 cursor-pointer"
            aria-label="Close search"
          >
            <X size={20} />
          </button>

          <div className="flex-1 flex items-center bg-slate-100 rounded-full px-3 py-1.5 border border-slate-200">
            <Search size={16} className="text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search YouTube"
              autoFocus
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => showToast && showToast('Listening with voice search... 🎙️')}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
            aria-label="Voice search"
          >
            <Mic size={16} />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          {/* YouTube Play Logo */}
          <div className="flex items-center gap-1.5 cursor-pointer select-none">
            <div className="w-8 h-6 bg-[#800020] rounded-lg flex items-center justify-center shadow-xs">
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[9px] border-l-white ml-0.5" />
            </div>
            <div className="flex items-center">
              <span className="text-[19px] font-black tracking-tighter text-slate-950 font-sans">
                YouTube
              </span>
              <span className="text-[8px] font-bold text-slate-400 ml-1 mt-[-6px] uppercase tracking-wider">
                IN
              </span>
            </div>
          </div>

          {/* Right Action Icons: Cast, Notification, Search, Profile */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => showToast && showToast('Searching for Chromecast and Smart TVs... 📺')}
              className="text-slate-700 hover:text-slate-950 active:scale-90 transition-transform cursor-pointer p-1"
              aria-label="Cast to TV"
            >
              <Cast size={19} className="stroke-[2.2]" />
            </button>

            <button
              type="button"
              onClick={() => showToast && showToast('You have 3 new notifications 🔔')}
              className="text-slate-700 hover:text-slate-950 relative active:scale-90 transition-transform cursor-pointer p-1"
              aria-label="Notifications"
            >
              <Bell size={19} className="stroke-[2.2]" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#800020] rounded-full ring-2 ring-white" />
            </button>

            <button
              type="button"
              onClick={() => setIsSearchActive(true)}
              className="text-slate-700 hover:text-slate-950 active:scale-90 transition-transform cursor-pointer p-1"
              aria-label="Search"
            >
              <Search size={19} className="stroke-[2.2]" />
            </button>

            <button
              type="button"
              onClick={onProfileClick}
              className="w-7 h-7 rounded-full overflow-hidden border border-slate-200 active:scale-95 transition-transform cursor-pointer ml-0.5 shadow-2xs"
              aria-label="Account profile"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                alt="Account"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
