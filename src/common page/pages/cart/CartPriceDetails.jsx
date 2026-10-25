import React from 'react';
import { Info, ChevronRight } from 'lucide-react';

export const CartPriceDetails = ({ totalMRP, totalDiscount, totalAmount, totalItemsCount, savings }) => {
  return (
    <div className="bg-white mt-2 p-4">
      <h3 className="text-sm font-black text-slate-500 uppercase tracking-wider mb-4">Price Details</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <p className="text-slate-700 flex items-center gap-1">Price ({totalItemsCount} items) <Info size={14} className="text-slate-400" /></p>
          <p className="font-medium text-slate-900">₹{totalMRP}</p>
        </div>
        <div className="flex justify-between items-center text-sm">
          <p className="text-slate-700">Fees <ChevronRight size={14} className="inline rotate-90 text-slate-400" /></p>
          <p className="font-medium text-slate-900">₹176</p>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-4">
          <p className="text-slate-700">Discounts <ChevronRight size={14} className="inline -rotate-90 text-slate-400" /></p>
          <p className="font-medium text-emerald-600">-₹{totalDiscount + 175}</p>
        </div>
        <div className="flex justify-between items-center text-base font-black text-slate-900 pt-1">
          <p>Total Amount</p>
          <p>₹{totalAmount + 176 - 175}</p>
        </div>
        <div className="bg-emerald-50/50 p-2.5 rounded-lg flex items-center gap-2 border border-emerald-100">
           <span className="text-emerald-600 text-sm">✨</span>
           <p className="text-[12px] font-black text-emerald-700 tracking-tight">You'll save ₹{savings} on this order</p>
        </div>
      </div>
    </div>
  );
};
