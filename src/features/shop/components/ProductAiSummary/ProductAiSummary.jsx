import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const ProductAiSummary = ({ highlights = [] }) => {
  return (
    <div className="bg-white px-4 py-3 border-t border-slate-100 select-none">
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white p-3.5 shadow-xs">
        {/* Header */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              <Sparkles size={11} className="fill-white" />
            </div>
            <h3 className="text-[13px] font-black text-indigo-950 tracking-tight">
              Know before you buy
            </h3>
          </div>
          <span className="text-[9.5px] font-black text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full uppercase">
            AI Summary
          </span>
        </div>

        {/* Highlight Bullets */}
        <div className="space-y-2">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-[11.5px] text-slate-700 leading-snug">
              <CheckCircle2 size={14} className="text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 mr-1">{item.title}:</span>
                <span className="text-slate-600">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
