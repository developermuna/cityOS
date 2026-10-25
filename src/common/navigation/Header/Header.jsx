import React from 'react';
import { getCategoryTheme } from '@/theme/categoryColors';
import { LocationHeader } from '../LocationHeader/LocationHeader';
import { HeaderActions } from '../HeaderActions/HeaderActions';
import { CategoryTabs } from '../CategoryTabs/CategoryTabs';

export const Header = ({ 
  activeTab = 'cityos', 
  onTabChange, 
  onMenuClick, 
  onLocationClick,
  onNotificationClick,
  themeConfig
}) => {
  const currentTheme = themeConfig || getCategoryTheme(activeTab);
  const titleColor = currentTheme.titleColor;
  const subColor = currentTheme.subTextColor;
  const iconColor = currentTheme.iconColor;
  const iconBg = currentTheme.iconBoxBg;

  return (
    <header className="w-full pt-[10px] pb-0 select-none transition-colors duration-500 bg-transparent">
      <div className="flex items-center justify-between h-10 mb-1.5 px-4 w-full gap-1">
        <LocationHeader 
          onClick={onLocationClick} 
          titleColor={titleColor} 
          subColor={subColor} 
        />
        <HeaderActions 
          onNotificationClick={onNotificationClick} 
          onMenuClick={onMenuClick} 
          iconColor={iconColor} 
          iconBg={iconBg} 
        />
      </div>

      <CategoryTabs 
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </header>
  );
};
