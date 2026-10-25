import React from 'react';

export const LayoutBodyWrapper = ({ hideTopSection, currentTheme, children }) => {
  return (
    <main 
      className={`w-full ${hideTopSection ? '' : 'pt-3'} ${hideTopSection ? '' : (currentTheme?.bodyBg || 'bg-slate-50')} ${hideTopSection ? '' : 'page-transition'} min-h-[60vh]`}
      style={{ transform: 'none' }}
      aria-label="Main Content"
    >
      {children}
    </main>
  );
};
