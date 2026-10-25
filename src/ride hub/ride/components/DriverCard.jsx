import React from 'react';
import { Star, Phone, MessageSquare, ShieldCheck } from 'lucide-react';

export const DriverCard = ({
  driver,
  otp = '4829',
  onCallClick,
  onChatClick,
  onViewProfile,
}) => {
  if (!driver) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col gap-3.5">
      {/* OTP Banner */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-xl px-3.5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-amber-700" />
          <span className="text-xs font-semibold text-amber-900">Start Ride PIN (OTP)</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono tracking-widest text-lg font-black text-amber-950 bg-white px-2.5 py-0.5 rounded-lg border border-amber-200">
          {otp}
        </div>
      </div>

      {/* Driver Info Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onViewProfile}
            className="relative focus:outline-none group"
          >
            <img
              src={driver.photo}
              alt={driver.name}
              className="w-13 h-13 rounded-full object-cover ring-2 ring-emerald-500/20 group-hover:ring-emerald-500 transition-all"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full ring-2 ring-white">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </button>

          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-gray-900 text-sm">{driver.name}</h4>
              <span className="flex items-center text-xs font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                {driver.rating}
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              {driver.vehicleName} • <span className="font-bold text-gray-800">{driver.licensePlate}</span>
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">{driver.trips}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCallClick}
            className="w-10 h-10 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition-colors"
            title="Call Captain"
          >
            <Phone className="w-4.5 h-4.5" />
          </button>
          <button
            type="button"
            onClick={onChatClick}
            className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center transition-colors relative"
            title="Chat with Captain"
          >
            <MessageSquare className="w-4.5 h-4.5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
          </button>
        </div>
      </div>
    </div>
  );
};
