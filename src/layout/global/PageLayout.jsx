import React from 'react';
import { getCategoryTheme } from '../../theme/categoryColors';
import { LayoutHeaderWrapper } from './LayoutHeaderWrapper';
import { LayoutBodyWrapper } from './LayoutBodyWrapper';

export const PageLayout = ({ 
  activeTab, 
  onTabChange, 
  onMenuClick, 
  onLocationClick, 
  searchQuery, 
  setSearchQuery, 
  onSelectCategory,
  onNotificationClick, 
  onLikeClick,
  onBoltOrderNow,
  hideTopSection = false,
  children 
}) => {
  const currentTheme = getCategoryTheme(activeTab);

  return (
    <div 
      className={`w-full min-h-screen text-slate-900 select-none ${hideTopSection ? 'pb-0' : 'pb-12'}`}
      style={{ backgroundColor: currentTheme.pageBg || '#f9fafb' }}
    >
      {!hideTopSection && (
        <LayoutHeaderWrapper 
          activeTab={activeTab}
          onTabChange={onTabChange}
          onLocationClick={onLocationClick}
          onMenuClick={onMenuClick}
          onNotificationClick={onNotificationClick}
          currentTheme={currentTheme}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onLikeClick={onLikeClick}
          onBoltOrderNow={onBoltOrderNow}
          onSelectCategory={onSelectCategory}
        />
      )}

      <LayoutBodyWrapper 
        hideTopSection={hideTopSection} 
        currentTheme={currentTheme}
      >
        {children}
      </LayoutBodyWrapper>
    </div>
  );
};
