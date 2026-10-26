import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const RentNowButton = ({ price, priceUnit, deposit, onRentNow }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 flex items-center justify-between gap-4 shadow-xl max-w-md mx-auto">
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-black text-slate-900">
            ₹{price?.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-slate-500 font-bold">
            /{priceUnit || 'mo'}
          </span>
        </div>
        <div className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          Dep: ₹{deposit?.toLocaleString('en-IN') || 0}
        </div>
      </div>

      <button
        type="button"
        onClick={onRentNow}
        className="bg-[#FF5200] hover:bg-[#E64A00] text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2"
      >
        <span>Rent Now</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
