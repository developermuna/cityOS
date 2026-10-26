import React, { useState } from 'react';
import { X, RotateCcw, CheckCircle2 } from 'lucide-react';
import { rentalMarketplaceService } from '../../services/rentalMarketplaceService';

export const RentalExtensionModal = ({ booking, onClose, showToast }) => {
  const [extensionUnits, setExtensionUnits] = useState(1);
  const [unit, setUnit] = useState('day');
  const [extended, setExtended] = useState(false);

  if (!booking) return null;

  const handleExtend = (e) => {
    e.preventDefault();
    rentalMarketplaceService.extendBooking(booking.id, extensionUnits, unit);
    setExtended(true);
    if (showToast) showToast(`Rental extended by ${extensionUnits} ${unit}!`);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-[#FF5200]" />
            <h3 className="text-base font-bold text-slate-900">Extend Rental Tenure</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {extended ? (
          <div className="py-8 text-center flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-2" />
            <h4 className="text-base font-bold text-slate-900">Extension Approved!</h4>
            <p className="text-xs text-slate-500 mt-1">Updated end date has been sent to your host.</p>
          </div>
        ) : (
          <form onSubmit={handleExtend} className="py-4 space-y-4">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
              <span className="text-slate-500 block mb-0.5">Current End Date:</span>
              <span className="font-bold text-slate-900">{booking.endDate}</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-900 block mb-2">
                Additional Tenure
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setExtensionUnits(Math.max(1, extensionUnits - 1))}
                  className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-800"
                >
                  -
                </button>
                <span className="flex-1 text-center font-bold text-sm text-slate-900">
                  {extensionUnits} {unit}{extensionUnits > 1 ? 's' : ''}
                </span>
                <button
                  type="button"
                  onClick={() => setExtensionUnits(extensionUnits + 1)}
                  className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-800"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              {['day', 'week', 'month'].map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold capitalize border ${
                    unit === u
                      ? 'bg-[#FF5200] border-[#FF5200] text-white'
                      : 'border-slate-200 text-slate-700'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF5200] hover:bg-[#E64A00] text-white text-xs font-bold py-3.5 rounded-2xl shadow-sm transition-all active:scale-95"
            >
              Confirm Extension
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
