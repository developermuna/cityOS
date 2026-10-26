import React from 'react';
import { Calendar, MapPin, ArrowRight, RotateCcw, FileText, Star, ShieldCheck } from 'lucide-react';

export const RentalHistoryCard = ({
  booking,
  onTrack,
  onExtend,
  onInvoice,
  onRate,
  onReRent
}) => {
  if (!booking) return null;

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-bold text-slate-500">
          #{booking.id}
        </span>
        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
          booking.status === 'ACTIVE'
            ? 'bg-emerald-100 text-emerald-800 animate-pulse'
            : booking.status === 'CONFIRMED'
            ? 'bg-blue-100 text-blue-800'
            : booking.status === 'COMPLETED'
            ? 'bg-slate-100 text-slate-700'
            : 'bg-red-100 text-red-800'
        }`}>
          {booking.status}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <img
          src={booking.image}
          alt={booking.itemTitle}
          className="w-16 h-16 rounded-xl object-cover shrink-0"
        />
        <div className="min-w-0 flex-1">
          <span className="text-[9px] font-bold text-orange-600 uppercase tracking-wider block">
            {booking.subcategory || booking.category}
          </span>
          <h4 className="text-xs font-bold text-slate-900 truncate">
            {booking.itemTitle}
          </h4>
          <p className="text-xs font-black text-slate-900 mt-0.5">
            ₹{booking.totalAmount?.toLocaleString('en-IN')}{' '}
            <span className="text-[10px] text-slate-500 font-normal">
              ({booking.duration})
            </span>
          </p>
        </div>
      </div>

      <div className="text-[11px] text-slate-500 space-y-1 pt-1 border-t border-slate-50">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3 text-[#FF5200]" />
          <span>{booking.startDate} to {booking.endDate}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-emerald-600" />
          <span className="truncate">{booking.pickupAddress}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          {onExtend && booking.status === 'ACTIVE' && (
            <button
              type="button"
              onClick={() => onExtend(booking)}
              className="px-2.5 py-1 rounded-lg bg-orange-50 text-[11px] font-bold text-orange-700 hover:bg-orange-100 transition-colors"
            >
              Extend
            </button>
          )}
          {onInvoice && (
            <button
              type="button"
              onClick={() => onInvoice(booking)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-bold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Invoice
            </button>
          )}
          {onRate && booking.status === 'COMPLETED' && (
            <button
              type="button"
              onClick={() => onRate(booking)}
              className="px-2.5 py-1 rounded-lg bg-amber-50 text-[11px] font-bold text-amber-700 hover:bg-amber-100 transition-colors"
            >
              Rate
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => onTrack(booking)}
          className="text-xs font-bold text-[#FF5200] hover:underline flex items-center gap-1"
        >
          View Details <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
