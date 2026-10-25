import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CartFooter = ({ totalMRP, totalAmount, onProceed, showToast }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-3 flex items-center justify-between shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-[110]">
      <div className="flex flex-col">
        <span className="text-[11px] text-slate-400 font-bold line-through">₹{totalMRP}</span>
        <div className="flex items-center gap-1">
          <span className="text-xl font-black text-slate-900">₹{totalAmount + 176 - 175}</span>
          <span className="text-[11px] font-black text-[#800020] uppercase cursor-pointer">View Price</span>
        </div>
      </div>
      <button 
        onClick={() => {
          if (onProceed) onProceed();
          if (showToast) showToast('Order successfully placed! Delivering in 15 mins.');
        }}
        className="bg-[#800020] hover:bg-[#66001a] active:scale-95 transition-all text-white font-black px-10 py-3 rounded-lg text-sm shadow-md flex items-center gap-2 cursor-pointer"
      >
        Proceed to buy
        <ArrowRight size={18} />
      </button>
    </div>
  );
};
