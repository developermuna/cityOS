import React, { useState } from 'react';
import { MapPin, Truck, Box } from 'lucide-react';

export const ProductDeliveryAssurance = ({ 
  delivery, 
  assurances = [], 
  showToast 
}) => {
  const [pincode, setPincode] = useState(delivery.pincode || '110001');
  const [isChanging, setIsChanging] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const handleApplyPincode = (e) => {
    e.preventDefault();
    if (inputVal.trim().length === 6) {
      setPincode(inputVal.trim());
      setIsChanging(false);
      if (showToast) showToast(`Delivery updated for PIN ${inputVal}`);
    } else {
      if (showToast) showToast('Please enter a valid 6-digit PIN code');
    }
  };

  return (
    <div className="bg-white px-4 py-3.5 border-t border-slate-100 select-none">
      {/* 1. Delivery Details Box */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-black text-slate-900 tracking-tight">
            Delivery details
          </span>
          <button
            type="button"
            onClick={() => setIsChanging(!isChanging)}
            className="text-[12px] font-bold text-[#800020] hover:underline cursor-pointer"
          >
            {isChanging ? 'Cancel' : 'Change'}
          </button>
        </div>

        {isChanging ? (
          <form onSubmit={handleApplyPincode} className="flex items-center gap-2 mb-3">
            <input
              type="text"
              maxLength={6}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 6-digit Pincode"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-900 font-bold focus:outline-none focus:ring-1 focus:ring-[#800020]"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-[#800020] text-white text-xs font-bold rounded-xl active:scale-95 transition-all cursor-pointer"
            >
              Check
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2 text-[12px] text-slate-700 font-bold mb-2">
            <MapPin size={15} className="text-[#800020]" />
            <span>Deliver to <span className="text-slate-950 font-black">{pincode}</span> - {delivery.city}</span>
          </div>
        )}

        <div className="space-y-1.5 pl-6">
          <div className="flex items-center gap-2 text-[11.5px] text-slate-700">
            <Truck size={14} className="text-emerald-700 shrink-0" />
            <span className="font-bold text-emerald-800">{delivery.dateText}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <Box size={14} className="text-slate-400 shrink-0" />
            <span>Open Box Delivery available • Free setup at doorstep</span>
          </div>
        </div>
      </div>

      {/* 2. Shop with Peace of Mind (Assurances) */}
      <div className="pt-3 border-t border-slate-100">
        <h4 className="text-[13px] font-black text-slate-900 tracking-tight mb-3">
          Shop with peace of mind
        </h4>

        <div className="grid grid-cols-4 gap-2">
          {assurances.map((item, idx) => (
            <div 
              key={idx}
              className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50/80 border border-slate-100"
            >
              <span className="text-lg mb-1">{item.icon}</span>
              <span className="text-[10px] font-bold text-slate-800 leading-tight">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
