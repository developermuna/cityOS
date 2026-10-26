import React from 'react';
import { ShieldCheck, AlertTriangle, FileText, RotateCcw } from 'lucide-react';
import { RentalRuleItem } from '../components/RentalRuleItem';

export const RentalRulesSection = ({ item }) => {
  if (!item) return null;

  return (
    <section className="px-4 py-2 space-y-3" aria-label="Policies and Rules">
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
        <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-[#FF5200]" /> Rental Rules & Policies
        </h3>

        {/* Rules */}
        {item.rules && item.rules.length > 0 && (
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Guidelines
            </span>
            <div className="space-y-1">
              {item.rules.map((rule, idx) => (
                <RentalRuleItem key={idx} rule={rule} type="rule" />
              ))}
            </div>
          </div>
        )}

        {/* Cancellation */}
        <div className="pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1 text-slate-900 font-bold mb-0.5">
            <RotateCcw className="w-3.5 h-3.5 text-blue-600" /> Cancellation Policy
          </div>
          <p className="text-slate-600 leading-snug">
            {item.cancellationPolicy || 'Free cancellation up to 6 hours before rental start date.'}
          </p>
        </div>

        {/* Damage Policy */}
        <div className="pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1 text-slate-900 font-bold mb-0.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Damage & Repair Policy
          </div>
          <p className="text-slate-600 leading-snug">
            {item.damagePolicy || 'Normal wear-and-tear accepted. Structural damage adjusted via deposit.'}
          </p>
        </div>

        {/* Deposit Policy */}
        <div className="pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1 text-slate-900 font-bold mb-0.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Security Deposit Refund
          </div>
          <p className="text-slate-600 leading-snug">
            {item.depositPolicy || '100% refundable upon safe return and condition inspection.'}
          </p>
        </div>
      </div>
    </section>
  );
};
