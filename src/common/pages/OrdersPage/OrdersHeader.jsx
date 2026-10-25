import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const OrdersHeader = ({ title = 'My Orders', onBack }) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-100 px-4 h-14 flex items-center gap-4 select-none">
      <button 
        type="button"
        onClick={onBack}
        className="p-1 -ml-1 text-slate-800 hover:text-[#800020] active:scale-95 transition-all"
        aria-label="Back"
      >
        <ArrowLeft size={22} className="stroke-[2.5]" />
      </button>
      <h1 className="text-[19px] font-black text-slate-900 tracking-tight leading-none">
        {title}
      </h1>
    </header>
  );
};
