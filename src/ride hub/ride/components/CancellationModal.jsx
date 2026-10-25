import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { CANCELLATION_REASONS } from '../constants/ride.constants';

export const CancellationModal = ({
  isOpen,
  onClose,
  onConfirmCancel,
  showToast,
}) => {
  const [selectedReason, setSelectedReason] = useState(CANCELLATION_REASONS[0].id);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const reasonObj = CANCELLATION_REASONS.find((r) => r.id === selectedReason);
    if (onConfirmCancel) {
      onConfirmCancel(reasonObj?.label || 'User requested cancellation');
    }
    if (showToast) {
      showToast('Ride cancelled. We hope to serve you again soon!');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl border border-gray-100 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <AlertCircle className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">Cancel Ride?</h3>
              <p className="text-xs text-gray-500">Please let us know the reason</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
          {CANCELLATION_REASONS.map((reason) => {
            const isSelected = selectedReason === reason.id;
            return (
              <label
                key={reason.id}
                className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-colors text-xs font-medium ${
                  isSelected
                    ? 'border-black bg-gray-50 text-gray-900 font-bold'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50/50'
                }`}
              >
                <input
                  type="radio"
                  name="cancellationReason"
                  checked={isSelected}
                  onChange={() => setSelectedReason(reason.id)}
                  className="w-4 h-4 text-black focus:ring-black"
                />
                <span>{reason.label}</span>
              </label>
            );
          })}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-bold text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
          >
            Keep Ride
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-xl font-bold text-xs bg-red-600 hover:bg-red-700 text-white transition-colors"
          >
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
