import React from 'react';
import { ChevronRight } from 'lucide-react';

export const CartSavingsZone = () => {
  return (
    <div className="bg-white mt-2 p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          <span className="text-xl font-black">!</span>
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-black text-slate-900">Savings Zone</p>
          <p className="text-[11px] text-slate-500 font-medium">Extra ₹175 savings available on your cart!</p>
        </div>
      </div>
      <button className="w-full flex items-center justify-between border border-slate-200 p-3 rounded-xl active:bg-slate-50 transition-colors">
        <span className="text-xs font-black text-slate-800 uppercase tracking-tight">View all coupons and offers</span>
        <ChevronRight size={18} className="text-slate-400" />
      </button>
    </div>
  );
};
