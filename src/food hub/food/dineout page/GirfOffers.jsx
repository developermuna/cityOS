import React from 'react';

export const GirfOffers = ({ showToast }) => {
  return (
    <div className="w-full px-4">
      <h4 className="text-[14px] font-black text-slate-900 uppercase tracking-widest mb-4">
        Great Indian Restaurant Festival
      </h4>

      <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
        <div 
          onClick={() => showToast && showToast('Showing restaurants with up to 50% GIRF discount')}
          className="w-[140px] h-[140px] shrink-0 bg-slate-50 rounded-[32px] p-4 border border-slate-100 flex flex-col items-center justify-center text-center shadow-sm cursor-pointer hover:bg-slate-100 active:scale-95 transition-all"
        >
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">UP TO</span>
          <div className="text-[40px] font-black text-slate-900 leading-none my-1">
            50<span className="text-[20px]">%</span>
          </div>
          <span className="text-[12px] font-black text-slate-900 tracking-widest">OFF</span>
        </div>

        <div 
          onClick={() => showToast && showToast('Showing top Nightlife & Drinks venues')}
          className="w-[140px] h-[140px] shrink-0 bg-slate-50 rounded-[32px] p-4 border border-slate-100 flex flex-col justify-between shadow-sm cursor-pointer hover:bg-slate-100 active:scale-95 transition-all"
        >
          <h5 className="font-black text-[13px] text-slate-900 leading-tight">
            Nightlife<br />& Drinks
          </h5>
          <div className="flex justify-end">
            <span className="text-3xl">🍷</span>
          </div>
        </div>

        <div 
          onClick={() => showToast && showToast('Showing flash sale dining tables')}
          className="w-[140px] h-[140px] shrink-0 bg-slate-50 rounded-[32px] p-4 border border-slate-100 flex flex-col justify-between shadow-sm cursor-pointer hover:bg-slate-100 active:scale-95 transition-all"
        >
          <h5 className="font-black text-[13px] text-slate-900 leading-tight">
            Flash Sale<br />Up To 70%
          </h5>
          <div className="flex justify-end">
            <span className="text-3xl">🔥</span>
          </div>
        </div>
      </div>
    </div>
  );
};
