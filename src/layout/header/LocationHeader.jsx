import React from 'react';
import { ChevronRight } from 'lucide-react';

export const LocationHeader = ({ onClick, titleColor, subColor }) => {
  return (
    <div 
      onClick={onClick}
      className="flex flex-col cursor-pointer active:opacity-85 transition-opacity flex-grow min-w-0"
    >
      <div className={`flex items-center gap-1 text-[16px] font-bold tracking-tight leading-none ${titleColor}`}>
        <span className="truncate">Rayagada Town</span>
        <ChevronRight size={16} className="stroke-[3] mt-[1px] shrink-0" />
      </div>
      <p className={`text-[11px] font-medium tracking-tight truncate mt-0.5 leading-none ${subColor}`}>
        Rama Krishna Nagar, Rayagada, Odisha 765001
      </p>
    </div>
  );
};
