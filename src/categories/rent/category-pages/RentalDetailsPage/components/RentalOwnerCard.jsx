import React from 'react';
import { ShieldCheck, Star, MessageSquare, Phone } from 'lucide-react';

export const RentalOwnerCard = ({ owner, onContact }) => {
  if (!owner) return null;

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Listed By Owner / Host
        </span>
        {owner.isVerified && (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
            <ShieldCheck className="w-2.5 h-2.5" /> ID Verified
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 shrink-0">
          <img src={owner.image} alt={owner.name} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-sm font-bold text-slate-900 truncate">{owner.name}</h4>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
            <span className="flex items-center gap-0.5 font-bold text-slate-800">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {owner.rating}
            </span>
            <span>•</span>
            <span>{owner.completedRentals}+ Rentals Completed</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Avg. Response: {owner.responseTime} • Member since {owner.joinedDate}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          onClick={() => onContact && onContact(owner, 'chat')}
          className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#FF5200]" /> Chat with Owner
        </button>
        <button
          type="button"
          onClick={() => onContact && onContact(owner, 'call')}
          className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-600" /> Masked Call
        </button>
      </div>
    </div>
  );
};
