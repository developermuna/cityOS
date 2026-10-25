import React from 'react';

export const MobileFrame = ({ children }) => {
  return (
    <div className="flex justify-center min-h-screen bg-slate-50 font-sans antialiased text-slate-900 overflow-x-clip">
      <div className="w-full max-w-[480px] bg-[#f9fafb] min-h-screen border-x border-slate-200/80 shadow-sm relative flex flex-col">
        {children}
      </div>
    </div>
  );
};
