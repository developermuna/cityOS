import React from 'react';
import { History, ShieldCheck, ArrowRight, RotateCcw } from 'lucide-react';

export const RecentlyRentedSection = ({
  bookings,
  onOpenTracking,
  onSeeAll,
  onReRent
}) => {
  if (!bookings || bookings.length === 0) return null;

  return (
    <section className="py-2.5 px-4" aria-label="Recently Rented">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <History className="w-4 h-4 text-orange-600" />
          <h3 className="text-sm font-black text-slate-900 tracking-tight">
            Your Recent Bookings
          </h3>
        </div>

        {onSeeAll && (
          <button
            type="button"
            onClick={onSeeAll}
            className="text-xs font-bold text-[#FF5200] hover:underline flex items-center gap-0.5"
          >
            All Bookings <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        {bookings.slice(0, 2).map((bk) => (
          <div
            key={bk.id}
            onClick={() => onOpenTracking && onOpenTracking(bk)}
            className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:border-orange-200 transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={bk.image}
                alt={bk.itemTitle}
                className="w-14 h-14 rounded-xl object-cover shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    bk.status === 'ACTIVE'
                      ? 'bg-emerald-100 text-emerald-800 animate-pulse'
                      : bk.status === 'CONFIRMED'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {bk.status}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    #{bk.id}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {bk.itemTitle}
                </h4>
                <p className="text-[10px] text-slate-500 font-medium">
                  {bk.duration} • ₹{bk.totalAmount?.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0 gap-1">
              <span className="text-[11px] font-bold text-[#FF5200] flex items-center gap-1">
                Manage <ArrowRight className="w-3 h-3" />
              </span>
              {bk.otp && (
                <span className="text-[9px] font-mono bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-bold">
                  OTP: {bk.otp}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
