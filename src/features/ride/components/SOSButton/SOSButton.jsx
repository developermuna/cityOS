import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const SOSButton = ({ onClick, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-xs shadow-md transition-all active:scale-95 ${className}`}
      title="Emergency Safety & SOS"
    >
      <ShieldAlert className="w-4 h-4 animate-pulse" />
      <span>SOS</span>
    </button>
  );
};
