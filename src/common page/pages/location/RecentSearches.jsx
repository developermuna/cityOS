import React from 'react';
import { Clock } from 'lucide-react';

export const RecentSearches = () => {
  return (
    <div className="mt-6">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
        <Clock size={14} /> Recent Searches
      </h3>
      <div className="space-y-1">
        {['Bandra Kurla Complex', 'Andheri West Station'].map((item, idx) => (
          <button 
            key={idx}
            className="w-full text-left py-2 px-1 text-sm font-semibold text-slate-600 hover:text-[#800020] transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};
