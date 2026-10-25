import React from 'react';
import { Plus, Map as MapIcon } from 'lucide-react';

export const AddressActionButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-slate-100 hover:border-red-200 hover:bg-red-50/30 transition-all group">
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-red-100 group-hover:text-[#800020] transition-colors">
          <Plus size={22} />
        </div>
        <span className="text-xs font-bold text-slate-700">Add Address</span>
      </button>
      <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border-2 border-slate-100 hover:border-red-200 hover:bg-red-50/30 transition-all group">
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 group-hover:bg-red-100 group-hover:text-[#800020] transition-colors">
          <MapIcon size={22} />
        </div>
        <span className="text-xs font-bold text-slate-700">Choose on Map</span>
      </button>
    </div>
  );
};
