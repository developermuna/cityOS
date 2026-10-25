import React from 'react';
import { Heart } from 'lucide-react';

export const LikeEmpty = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] bg-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-48 h-48 bg-slate-50 rounded-full flex items-center justify-center mb-6">
        <Heart size={64} className="text-slate-200 fill-slate-50" />
      </div>
      <h2 className="text-xl font-black text-slate-900">Your wishlist is empty!</h2>
      <p className="text-sm text-slate-500 mt-2 max-w-[240px]">
        Tap on the heart icon on any product to save it here for later.
      </p>
      <button 
        onClick={onClose}
        className="mt-8 px-10 py-3 bg-[#800020] text-white font-black rounded-xl shadow-lg active:scale-95 transition-transform"
      >
        START EXPLORING
      </button>
    </div>
  );
};
