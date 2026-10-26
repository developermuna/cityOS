import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { getCategoryTheme } from '@/theme/categoryColors';
import { LocationHeader } from '../LocationHeader/LocationHeader';
import { HeaderActions } from '../HeaderActions/HeaderActions';
import { CategoryTabs } from '../CategoryTabs/CategoryTabs';

const getCategoryDisplayName = (tab) => {
  switch (tab) {
    case 'ride': return 'Rides & Cabs';
    case 'food': return 'Food Delivery';
    case 'grocery':
    case 'instamart': return 'Grocery & Mart';
    case 'shop': return 'Shopping Mall';
    case 'service': return 'Home Services';
    case 'travel': return 'Travel & Stays';
    case 'rent': return 'Rentals & Leases';
    case 'dineout': return 'Dineout Dining';
    case 'scenes': return 'Explore Scenes';
    default: return tab ? tab.charAt(0).toUpperCase() + tab.slice(1) : 'cityOS';
  }
};

const getCategorySubtitle = (tab) => {
  switch (tab) {
    case 'ride': return 'Instant cabs, autos & bikes';
    case 'food': return 'Top restaurants & 15m delivery';
    case 'grocery':
    case 'instamart': return 'Fresh groceries in 10 mins';
    case 'shop': return 'Curated brands & deals';
    case 'service': return '100% verified technicians';
    case 'travel': return 'Flights, buses & hotels';
    case 'rent': return 'Verified homes & equipment';
    case 'dineout': return 'Table bookings & deals';
    default: return 'Explore services';
  }
};

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

  const isHomePage = activeTab === 'cityos';

  return (
    <header className="w-full pt-[8px] pb-0 select-none transition-colors duration-300 bg-transparent">
      {isHomePage ? (
        /* Home Page Header: Location + Actions (No navigation/back button) */
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
      ) : (
        /* Every Page Except Home Page: Fixed Header with Navigation Button (Back to Home) */
        <div className="flex items-center justify-between h-10 mb-1.5 px-4 w-full gap-2.5">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Navigation Button to go back to Home */}
            <button
              type="button"
              onClick={() => onTabChange && onTabChange('cityos')}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 cursor-pointer shadow-xs border border-black/5 hover:opacity-90 shrink-0"
              style={{ 
                backgroundColor: iconBg || 'rgba(255,255,255,0.9)', 
                color: iconColor || '#0f172a' 
              }}
              aria-label="Back to CityOS Home"
              title="Back to Home"
            >
              <ArrowLeft size={18} className="stroke-[2.5]" />
            </button>

            {/* Page Title & Subtitle */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-[15px] font-black tracking-tight truncate leading-tight" style={{ color: titleColor }}>
                  {getCategoryDisplayName(activeTab)}
                </h2>
                <span 
                  className="text-[8px] font-black uppercase px-1.5 py-0.2 rounded-full border shrink-0"
                  style={{ 
                    backgroundColor: `${currentTheme.hex || '#800020'}18`, 
                    color: titleColor,
                    borderColor: `${currentTheme.hex || '#800020'}30`
                  }}
                >
                  cityOS
                </span>
              </div>
              <span className="text-[9.5px] font-semibold text-slate-600 truncate -mt-0.5 leading-tight">
                {getCategorySubtitle(activeTab)}
              </span>
            </div>
          </div>

          {/* Quick Location & Menu Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onLocationClick}
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer"
              style={{
                backgroundColor: iconBg || 'rgba(255,255,255,0.8)',
                color: titleColor,
                borderColor: `${currentTheme.hex || '#800020'}30`
              }}
              title="Change Delivery Location"
            >
              <span className="truncate max-w-[90px]">Rayagada</span>
            </button>

            <HeaderActions 
              onNotificationClick={onNotificationClick} 
              onMenuClick={onMenuClick} 
              iconColor={iconColor} 
              iconBg={iconBg} 
            />
          </div>
        </div>
      )}

      {/* Category switcher tabs */}
      <CategoryTabs 
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </header>
  );
};
