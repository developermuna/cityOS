import React from 'react';
import { Check } from 'lucide-react';
import { ProgressiveImage } from '../ProgressiveImage/ProgressiveImage';

export const ProductVariants = ({ 
  colors = [], 
  selectedColor, 
  onSelectColor, 
  variants = [], 
  selectedVariant, 
  onSelectVariant,
  showToast 
}) => {
  return (
    <div className="bg-white px-4 py-3 border-t border-slate-100 select-none">
      {/* 1. Color Selector */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12.5px] font-bold text-slate-800">
            Selected Color: <span className="font-black text-slate-950">{selectedColor.name}</span>
          </span>
          <span className="text-[11px] font-bold text-slate-500">
            ({colors.length} colors)
          </span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {colors.map((c) => {
            const isSelected = selectedColor.id === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onSelectColor(c);
                  if (showToast) showToast(`Color: ${c.name}`);
                }}
                className={`flex flex-col items-center gap-1.5 p-1 rounded-xl border-2 transition-all cursor-pointer ${
                  isSelected 
                    ? 'border-[#800020] bg-[#800020]/5 shadow-xs ring-2 ring-[#800020]/20' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="w-12 h-14 rounded-lg overflow-hidden bg-slate-50 p-0.5 flex items-center justify-center">
                  <ProgressiveImage
                    src={c.image}
                    alt={c.name}
                    aspectRatio="aspect-[12/14]"
                    className="w-full h-full !bg-transparent"
                    imgClassName="mix-blend-multiply"
                    objectFit="object-contain"
                  />
                </div>
                <span className={`text-[10px] font-bold truncate max-w-[56px] text-center ${
                  isSelected ? 'text-[#800020] font-black' : 'text-slate-600'
                }`}>
                  {c.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Storage & RAM Variant Cards */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12.5px] font-bold text-slate-800">
            Storage & RAM: <span className="font-black text-slate-950">{selectedVariant.label}</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {variants.map((v) => {
            const isSelected = selectedVariant.id === v.id;
            return (
              <div
                key={v.id}
                onClick={() => {
                  onSelectVariant(v);
                  if (showToast) showToast(`Selected ${v.label}`);
                }}
                className={`p-3 rounded-2xl border-2 cursor-pointer transition-all relative ${
                  isSelected
                    ? 'border-[#800020] bg-[#800020]/5 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {/* Active check icon badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#800020] text-white flex items-center justify-center shadow-2xs">
                    <Check size={11} className="stroke-[3]" />
                  </div>
                )}

                <h4 className="text-[13.5px] font-black text-slate-900 leading-tight">
                  {v.label}
                </h4>
                <p className="text-[10px] font-bold text-slate-500 mt-0.5 truncate">
                  {v.tag}
                </p>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-[14px] font-black text-slate-950">
                    ₹{v.dealPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10.5px] font-medium text-slate-400 line-through">
                    ₹{v.originalPrice.toLocaleString('en-IN')}
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
