import React from 'react';

export const SavedAddressItem = ({ address, onClick }) => {
  const Icon = address.icon;
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 active:bg-slate-100 transition-colors text-left group"
    >
      <div className="mt-0.5 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0 group-hover:bg-white group-hover:shadow-sm transition-all">
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="font-bold text-slate-900 text-[15px] leading-tight">{address.type}</p>
        <p className="text-[13px] text-slate-500 font-medium leading-relaxed truncate-2-lines mt-0.5">
          {address.address}
        </p>
      </div>
    </button>
  );
};
