import React, { useState } from 'react';
import { ChevronDown, Shield, Check } from 'lucide-react';

export const ProductSpecsHighlights = ({ 
  specs = [], 
  protectionPlans = [], 
  selectedPlans = new Set(), 
  onTogglePlan,
  showToast 
}) => {
  const [showAllSpecs, setShowAllSpecs] = useState(false);

  return (
    <div className="bg-white px-4 py-3.5 border-t border-slate-100 select-none">
      {/* 1. Product Highlights */}
      <div className="mb-4">
        <h3 className="text-[13px] font-black text-slate-900 tracking-tight mb-2.5">
          Product highlights
        </h3>

        <ul className="space-y-1.5 pl-3 border-l-2 border-[#800020]/20">
          {specs.slice(0, showAllSpecs ? specs.length : 4).map((spec, idx) => (
            <li key={idx} className="text-[11.5px] text-slate-700 font-medium leading-relaxed">
              • {spec}
            </li>
          ))}
        </ul>

        {specs.length > 4 && (
          <button
            type="button"
            onClick={() => setShowAllSpecs(!showAllSpecs)}
            className="mt-2 text-[11.5px] font-bold text-[#800020] hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>{showAllSpecs ? 'Show less' : 'View all specifications'}</span>
            <ChevronDown size={14} className={showAllSpecs ? 'rotate-180' : ''} />
          </button>
        )}
      </div>

      {/* 2. Protection Plans (Add-on Care) */}
      <div className="pt-3 border-t border-slate-100">
        <div className="flex items-center gap-1.5 mb-2.5">
          <Shield size={15} className="text-[#800020]" />
          <h4 className="text-[13px] font-black text-slate-900 tracking-tight">
            Protection plans
          </h4>
        </div>

        <div className="space-y-2">
          {protectionPlans.map((plan) => {
            const isChecked = selectedPlans.has(plan.id);
            return (
              <div
                key={plan.id}
                onClick={() => {
                  onTogglePlan(plan.id);
                  if (showToast) {
                    showToast(isChecked ? `Removed ${plan.title}` : `Added ${plan.title} (₹${plan.price})`);
                  }
                }}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isChecked 
                    ? 'border-[#800020] bg-[#800020]/5 shadow-2xs' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center transition-all ${
                    isChecked ? 'bg-[#800020] border-[#800020] text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {isChecked && <Check size={11} className="stroke-[3]" />}
                  </div>
                  <div>
                    <h5 className="text-[12px] font-bold text-slate-900 leading-tight">
                      {plan.title}
                    </h5>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Covers accidental liquid & physical damage
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 ml-2">
                  <span className="text-[13px] font-black text-slate-950">
                    ₹{plan.price}
                  </span>
                  <span className="text-[10px] text-slate-400 line-through block">
                    ₹{plan.originalPrice}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
