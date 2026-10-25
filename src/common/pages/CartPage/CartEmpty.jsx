import React from 'react';

export const CartEmpty = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-48 h-48 bg-slate-50 rounded-full flex items-center justify-center mb-6">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png" 
          className="w-32 h-32 opacity-20" 
          alt="Empty Cart" 
        />
      </div>
      <h2 className="text-xl font-black text-slate-900">Your cart is empty!</h2>
      <p className="text-sm text-slate-500 mt-2 max-w-[240px]">
        Add items to it now to enjoy cityOS super-fast deliveries.
      </p>
      <button 
        onClick={onClose}
        className="mt-8 px-10 py-3 bg-[#800020] text-white font-black rounded-xl shadow-lg active:scale-95 transition-transform"
      >
        START SHOPPING
      </button>
    </div>
  );
};
