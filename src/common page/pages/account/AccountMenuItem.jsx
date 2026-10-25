import React from 'react';
import { ChevronRight } from 'lucide-react';

export const AccountMenuItem = ({ item }) => {
  const Icon = item.icon;
  return (
    <button 
      className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 active:bg-slate-100 transition-colors group text-left"
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
          <Icon size={20} />
        </div>
        <span className="font-bold text-slate-700 tracking-tight group-hover:text-slate-900 transition-colors">
          {item.label}
        </span>
      </div>
      <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
    </button>
  );
};
