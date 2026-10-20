import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag } from 'lucide-react';

export const SearchBar = ({ _onSearch, value = '', onChange, cartCount = 0, onCartClick }) => {
  const placeholders = [
    "Search for 'Sweets'",
    "Search for 'EatRight'",
    "Search for 'Biryani'",
    "Search for 'Pizza'",
    "Search for 'Chinese Wok'"
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  return (
    <div className="w-full px-4 select-none flex items-center gap-2">
      <div className="flex-grow bg-white rounded-xl h-[38px] px-3 flex items-center shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-slate-100 transition-all focus-within:ring-2 focus-within:ring-orange-500/20">
        
        {/* Search Magnifying Glass Icon */}
        <Search size={18} className="text-[#656974] stroke-[2.2] mr-2 shrink-0" />

        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholders[placeholderIndex]}
          className="w-full bg-transparent text-[13.5px] text-[#2c3038] placeholder-[#5d6370] font-medium outline-none truncate"
        />

        {/* Vertical Divider */}
        <div className="w-[1px] h-4 bg-[#e2e4e9] mx-2 shrink-0"></div>

        {/* Orange Microphone Icon */}
        <button 
          type="button" 
          onClick={() => alert("Voice search: Speak now...")}
          className="text-[#ff5200] hover:opacity-85 active:scale-95 transition-transform shrink-0 p-1 cursor-pointer"
          aria-label="Voice search"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" fill="#ff5200" fillOpacity="0.15" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </button>
      </div>

      {/* Cart Button */}
      <button 
        onClick={() => onCartClick && onCartClick()}
        className="w-[38px] h-[38px] shrink-0 bg-white rounded-xl flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-slate-100 hover:scale-105 active:scale-95 transition-all relative cursor-pointer"
        aria-label="Cart"
      >
        <ShoppingBag size={19} className="text-[#2c3038] stroke-[2.2]" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#ff5200] text-white text-[9px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 border-white">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
};
