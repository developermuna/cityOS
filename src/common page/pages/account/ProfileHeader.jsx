import React from 'react';
import { HelpCircle, X } from 'lucide-react';

export const ProfileHeader = ({ onClose, userName = 'Black-D-Evil' }) => {
  return (
    <div className="w-full bg-white px-5 pt-12 pb-4 flex items-center justify-between">
      <div className="flex flex-col">
        <h2 className="text-[22px] font-black text-slate-900 tracking-tight leading-none">
          Hey, {userName}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <button 
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          aria-label="Help"
        >
          <HelpCircle size={16} className="text-[#800020]" />
          <span className="text-[12px] font-black uppercase tracking-tight">Help</span>
        </button>
        <button 
          onClick={onClose}
          className="p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors sm:hidden"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
};
