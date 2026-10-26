import React from 'react';
import { Calendar as CalendarIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { rentalMarketplaceService } from '../../../services/rentalMarketplaceService';

export const RentalAvailabilityCalendar = ({
  itemId,
  startDate,
  endDate,
  onDatesChange
}) => {
  const availability = rentalMarketplaceService.checkAvailability({
    itemId,
    startDate,
    endDate
  });

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <CalendarIcon className="w-3.5 h-3.5 text-[#FF5200]" /> Check Rental Availability
        </h4>
        {availability.available ? (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Available for Dates
          </span>
        ) : (
          <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-red-600" /> Booked for these Dates
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
            Start Date
          </span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => onDatesChange && onDatesChange({ startDate: e.target.value, endDate })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-semibold text-slate-800"
          />
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
            End Date
          </span>
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => onDatesChange && onDatesChange({ startDate, endDate: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 font-semibold text-slate-800"
          />
        </div>
      </div>

      {!availability.available && (
        <p className="text-[11px] text-red-600 font-medium">
          {availability.reason}
        </p>
      )}
    </div>
  );
};
