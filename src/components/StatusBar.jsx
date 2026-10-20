import React, { useState, useEffect } from 'react';
import { Wifi } from 'lucide-react';

export const StatusBar = () => {
  const [time, setTime] = useState('7:30 pm');

  useEffect(() => {
    // Keep 7:30 pm or show real time if needed, default to 7:30 pm to match screenshot
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12 || 12;
      // We can also allow dynamic or fixed 7:30 pm
      setTime('7:30 pm');
    };
    updateTime();
  }, []);

  return (
    <div className="w-full px-5 pt-3 pb-1 flex items-center justify-between text-white text-xs select-none bg-transparent z-50">
      {/* Left side: Time & Status */}
      <div className="flex items-center gap-1.5 font-semibold tracking-tight">
        <span className="text-[13px]">{time}</span>
        {/* Small vibrate/location indicator */}
        <div className="flex items-center gap-[2px] opacity-80">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M17 5v14M7 5v14" />
          </svg>
        </div>
      </div>

      {/* Right side: Network & Battery */}
      <div className="flex items-center gap-1.5 text-[11px] font-semibold opacity-95">
        {/* VoLTE */}
        <span className="text-[10px] tracking-tighter opacity-80 font-bold">VoLTE</span>
        
        {/* Signal Bars */}
        <div className="flex items-end gap-[1.5px] h-3">
          <div className="w-[2.5px] h-1.5 bg-white rounded-xs"></div>
          <div className="w-[2.5px] h-2 bg-white rounded-xs"></div>
          <div className="w-[2.5px] h-2.5 bg-white rounded-xs"></div>
          <div className="w-[2.5px] h-3 bg-white rounded-xs"></div>
        </div>

        {/* WiFi */}
        <Wifi size={13} className="stroke-[2.5]" />

        {/* Battery with "50" */}
        <div className="flex items-center">
          <div className="relative border border-white/90 rounded-[4px] px-1 py-[1px] h-[13px] flex items-center justify-center min-w-[24px]">
            <span className="text-[8.5px] font-bold leading-none">50</span>
            <div className="absolute -right-[3px] top-[3px] w-[2px] h-[5px] bg-white rounded-r-xs"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
