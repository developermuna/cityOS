import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export const SearchBar = ({ _onSearch, value = '', onChange }) => {
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
    <div className="w-full px-4 mt-3 mb-4 select-none">
      <div className="w-full bg-white rounded-2xl h-[52px] px-4 flex items-center shadow-[0_2px_12px_rgba(0,0,0,0.1)] border border-slate-100 transition-all focus-within:ring-2 focus-within:ring-orange-500/20">
        
        {/* Search Magnifying Glass Icon */}
        <Search size={21} className="text-[#656974] stroke-[2.2] mr-3 shrink-0" />

        {/* Input Field */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholders[placeholderIndex]}
          className="w-full bg-transparent text-[15px] text-[#2c3038] placeholder-[#5d6370] font-normal outline-none truncate"
        />

        {/* Vertical Divider */}
        <div className="w-[1px] h-6 bg-[#e2e4e9] mx-3 shrink-0"></div>

        {/* Orange Microphone Icon */}
        <button 
          type="button" 
          onClick={() => alert("Voice search: Speak now...")}
          className="text-[#ff5200] hover:opacity-85 active:scale-95 transition-transform shrink-0 p-1 cursor-pointer"
          aria-label="Voice search"
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" fill="#ff5200" fillOpacity="0.15" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </button>

      </div>
    </div>
  );
};
