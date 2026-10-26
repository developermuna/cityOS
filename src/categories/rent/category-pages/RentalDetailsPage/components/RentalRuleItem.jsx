import React from 'react';
import { Check, Info } from 'lucide-react';

export const RentalRuleItem = ({ rule, type = 'rule' }) => {
  return (
    <div className="flex items-start gap-2 text-xs text-slate-700 py-1">
      {type === 'rule' ? (
        <Info className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
      ) : (
        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
      )}
      <span className="leading-snug">{rule}</span>
    </div>
  );
};
