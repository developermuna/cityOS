import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const RentalPrice = ({ item }) => {
  if (!item) return null;

  return (
    <div className="bg-orange-50/70 border border-orange-100 rounded-2xl p-3.5 space-y-2">
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-2xl font-black text-slate-900">
            ₹{item.price.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-slate-600 font-bold ml-1">
            /{item.priceUnit}
          </span>
        </div>
        <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
          Instant Booking Available
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-orange-200/50">
        <span className="flex items-center gap-1 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Refundable Security Deposit:
        </span>
        <span className="font-bold text-slate-900">
          ₹{item.securityDeposit?.toLocaleString('en-IN') || 0}
        </span>
      </div>
    </div>
  );
};
