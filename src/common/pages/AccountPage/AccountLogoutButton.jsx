import React from 'react';

export const AccountLogoutButton = ({ onLogout }) => {
  return (
    <div className="px-4 pb-8 bg-white border-t border-slate-50 pt-6">
      <button 
        onClick={onLogout}
        className="w-full h-[52px] rounded-xl border border-[#800020]/20 text-[#800020] font-black text-[15px] uppercase tracking-wider hover:bg-[#800020]/5 active:scale-[0.98] transition-all shadow-sm"
      >
        Log out
      </button>
    </div>
  );
};
