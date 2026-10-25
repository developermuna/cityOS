import React from 'react';
import { ChevronLeft, Search, Heart } from 'lucide-react';

export const LikeHeader = ({ onClose }) => {
  return (
    <div className="bg-[#800020] shadow-md shrink-0 rounded-b-[24px] pb-2">
      <div className="flex items-center justify-between px-4 py-4 z-[60]">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1 -ml-1 text-white">
            <ChevronLeft size={24} className="stroke-[3]" />
          </button>
          <h1 className="text-[18px] font-black text-white tracking-tight">Liked Items</h1>
        </div>
        <div className="flex items-center gap-5 text-white">
          <Search size={22} className="stroke-[2.5]" />
          <Heart size={22} className="stroke-[2.5] fill-white" />
        </div>
      </div>
    </div>
  );
};
