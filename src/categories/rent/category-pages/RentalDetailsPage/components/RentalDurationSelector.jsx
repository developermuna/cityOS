import React from 'react';
import { Clock } from 'lucide-react';

export const RentalDurationSelector = ({
  duration = 1,
  unit = 'day',
  onChange
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-[#FF5200]" />
        <div>
          <h4 className="text-xs font-bold text-slate-900">Rental Duration</h4>
          <p className="text-[10px] text-slate-500">Tenure for pricing calculation</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange && onChange(Math.max(1, duration - 1), unit)}
          disabled={duration <= 1}
          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700 disabled:opacity-40"
        >
          -
        </button>
        <span className="text-xs font-bold text-slate-900 min-w-[65px] text-center capitalize">
          {duration} {unit}{duration > 1 ? 's' : ''}
        </span>
        <button
          type="button"
          onClick={() => onChange && onChange(duration + 1, unit)}
          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-700"
        >
          +
        </button>
      </div>
    </div>
  );
};
