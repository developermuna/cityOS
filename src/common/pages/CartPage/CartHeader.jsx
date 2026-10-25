import React from 'react';
import { ChevronLeft, Search, Heart } from 'lucide-react';

export const CartHeader = ({ onClose, onLikeClick, tabs, activeTab, onTabChange, totalItemsCount }) => {
  return (
    <div className="bg-[#800020] shadow-md shrink-0 rounded-b-[24px]">
      <div className="flex items-center justify-between px-4 py-4 z-[60]">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1 -ml-1 text-white">
            <ChevronLeft size={24} className="stroke-[3]" />
          </button>
          <h1 className="text-[18px] font-black text-white tracking-tight">Your Cart</h1>
        </div>
        <div className="flex items-center gap-5 text-white">
          <Search size={22} className="stroke-[2.5]" />
          <button onClick={onLikeClick} className="p-1 text-white">
            <Heart size={22} className="stroke-[2.5]" />
          </button>
        </div>
      </div>

      <div className="flex items-center px-4 pb-4 pt-1 gap-[6px] overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button 
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] font-black transition-all border shrink-0 uppercase tracking-tighter ${
              activeTab === tab.id 
                ? 'bg-white text-[#800020] border-white shadow-sm' 
                : 'bg-[#990026] text-white border-transparent'
            }`}
          >
            {tab.label} {tab.id === 'all' ? `(${totalItemsCount})` : ''}
          </button>
        ))}
      </div>
    </div>
  );
};
