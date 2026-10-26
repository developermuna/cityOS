import React from 'react';
import { Calendar, Clock } from 'lucide-react';

export const RentalDateRangePicker = ({
  rentalDates,
  onChange,
  className = ''
}) => {
  const { startDate, endDate, duration, unit } = rentalDates || {};

  const handleStartDateChange = (e) => {
    const newStart = e.target.value;
    onChange && onChange({
      ...rentalDates,
      startDate: newStart,
      endDate: rentalDates.endDate < newStart ? newStart : rentalDates.endDate
    });
  };

  const handleEndDateChange = (e) => {
    onChange && onChange({
      ...rentalDates,
      endDate: e.target.value
    });
  };

  const handleDurationChange = (delta) => {
    const newCount = Math.max(1, (duration || 1) + delta);
    onChange && onChange({
      ...rentalDates,
      duration: newCount
    });
  };

  const handleUnitChange = (newUnit) => {
    onChange && onChange({
      ...rentalDates,
      unit: newUnit
    });
  };

  return (
    <div className={`bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#FF5200]" /> Select Rental Dates & Duration
        </span>
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
          {['day', 'week', 'month'].map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => handleUnitChange(u)}
              className={`px-2 py-0.5 text-[10px] font-bold rounded-md capitalize transition-all ${
                unit === u
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            From Date
          </label>
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800">
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="bg-transparent w-full text-xs font-semibold focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
            To Date
          </label>
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800">
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={handleEndDateChange}
              className="bg-transparent w-full text-xs font-semibold focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-xs">
        <span className="text-slate-600 font-medium flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-400" /> Tenure Duration:
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleDurationChange(-1)}
            disabled={duration <= 1}
            className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-700 disabled:opacity-40"
          >
            -
          </button>
          <span className="font-bold text-slate-900 min-w-[50px] text-center">
            {duration} {unit}{duration > 1 ? 's' : ''}
          </span>
          <button
            type="button"
            onClick={() => handleDurationChange(1)}
            className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-700"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
