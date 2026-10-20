import React from 'react';
import { 
  TabBurgerIcon, 
  TabInstamartBasketIcon, 
  TabDineoutClocheIcon, 
  TabScenesDiscoBallIcon 
} from './CustomIcons';

export const CategoryTabs = ({ 
  activeTab = 'food', 
  onTabChange, 
  theme = 'dark' // 'dark' (Food), 'white' (Instamart), 'cream' (Dineout), 'black' (Scenes)
}) => {
  // Badge text for Instamart according to reference images:
  // In Food: Instamart has "12 mins"
  // In Dineout & Scenes: Instamart has "5 Mins"
  // In Instamart: no badge
  const getInstamartBadge = () => {
    if (activeTab === 'instamart') return null;
    if (activeTab === 'food') return '12 mins';
    return '5 Mins';
  };

  const tabs = [
    { id: 'food', label: 'Food', icon: TabBurgerIcon },
    { id: 'instamart', label: 'Instamart', icon: TabInstamartBasketIcon, badge: getInstamartBadge() },
    { id: 'dineout', label: 'Dineout', icon: TabDineoutClocheIcon },
    { id: 'scenes', label: 'Scenes', icon: TabScenesDiscoBallIcon, hasMusicNotes: true }
  ];

  // Specific single uniform border color and fills for each header mode
  const getHeaderStyles = () => {
    switch (activeTab) {
      case 'instamart':
        return {
          activeFill: '#ffffff',
          activeBorder: '#475569', // Slate grey continuous border line
          activeText: 'text-slate-900 font-black',
          inactiveFill: '#f8fafc',
          inactiveBorder: '#e2e8f0',
          inactiveText: 'text-slate-500 font-semibold'
        };
      case 'dineout':
        return {
          activeFill: '#faf7ee',
          activeBorder: '#315424', // Forest green continuous border line
          activeText: 'text-[#23421b] font-black',
          inactiveFill: '#eeeae0',
          inactiveBorder: '#ded8cb',
          inactiveText: 'text-[#6b7367] font-semibold'
        };
      case 'scenes':
        return {
          activeFill: '#09090b',
          activeBorder: '#ffffff', // White continuous border line
          activeText: 'text-white font-black',
          inactiveFill: '#18181b',
          inactiveBorder: 'rgba(255, 255, 255, 0.12)',
          inactiveText: 'text-[#9ca3af] font-semibold'
        };
      case 'food':
      default:
        return {
          activeFill: '#0d051f',
          activeBorder: '#a782fc', // Lavender purple continuous border line
          activeText: 'text-white font-black',
          inactiveFill: '#170b2e',
          inactiveBorder: 'rgba(255, 255, 255, 0.08)',
          inactiveText: 'text-[#9d93b1] font-semibold'
        };
    }
  };

  const styles = getHeaderStyles();

  // Coordinates for the 4 slots in a 400x82 space
  const slotWidth = 100;
  const tabIndexMap = { food: 0, instamart: 1, dineout: 2, scenes: 3 };
  const activeIdx = tabIndexMap[activeTab] ?? 0;
  const startX = activeIdx * slotWidth;
  const endX = startX + slotWidth;

  // Single continuous border line from far-left edge (0,80) to far-right edge (400,80)
  // Wherever active tab is, it smoothly arches up around the button and continues to 400!
  const leftBaseline = startX > 0 ? `M 0,80 L ${startX},80` : `M 0,80`;
  const archSection = `
    C ${startX + 6},80 ${startX + 10},72 ${startX + 13},60 
    L ${startX + 22},16 
    C ${startX + 25},6 ${startX + 33},3 ${startX + 42},3 
    L ${endX - 42},3 
    C ${endX - 33},3 ${endX - 25},6 ${endX - 22},16 
    L ${endX - 13},60 
    C ${endX - 10},72 ${endX - 6},80 ${endX},80
  `;
  const rightBaseline = endX < 400 ? `L 400,80` : ``;

  // The continuous single-color border line path from left edge to right edge
  const continuousBorderLine = `${leftBaseline} ${archSection} ${rightBaseline}`;

  // Fill region for the active button seamlessly connecting into the section below
  const activeFillPath = `
    M ${startX},80 
    ${archSection}
    L ${startX},80 Z
  `;

  const handleTabClick = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="w-full select-none pt-1">
      {/* 4 Tabs Container with Same Size and Continuous Border Line */}
      <div className="relative w-full h-[82px]">
        
        {/* SVG LAYER: Draws the continuous single-color border line from left edge (0) to right edge (400) */}
        <svg
          viewBox="0 0 400 82"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          {/* Active Button Background Fill seamlessly merging into below section */}
          <path
            d={activeFillPath}
            fill={styles.activeFill}
          />

          {/* THE SINGLE UNIFORM COLOR BORDER LINE STARTING FROM LEFT EDGE (0) AND ENDING AT RIGHT EDGE (400) */}
          <path
            d={continuousBorderLine}
            fill="none"
            stroke={styles.activeBorder}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Ambient sheen glow for Food & Scenes active tabs */}
          {activeTab === 'food' && (
            <ellipse cx="50" cy="30" rx="26" ry="14" fill="#8e65e6" fillOpacity="0.25" />
          )}
          {activeTab === 'scenes' && (
            <ellipse cx="350" cy="30" rx="26" ry="14" fill="#ffffff" fillOpacity="0.18" />
          )}
        </svg>

        {/* INTERACTIVE BUTTONS LAYER: Identical size and design for all 4 buttons */}
        <div className="grid grid-cols-4 items-end relative z-20 w-full h-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className="relative flex flex-col items-center justify-end cursor-pointer group h-full w-full p-0 bg-transparent border-none outline-none"
                aria-label={`Switch to ${tab.label}`}
              >
                {/* BUTTON CONTAINER: Same exact size across all 4 buttons */}
                <div className="relative w-full h-[76px] flex flex-col items-center justify-end">
                  
                  {/* For inactive tabs: Same trapezoid shape (top narrow, bottom wider) */}
                  {!isActive && (
                    <svg
                      viewBox="0 0 100 80"
                      preserveAspectRatio="none"
                      className="absolute inset-0 w-full h-full pointer-events-none"
                    >
                      <path
                        d="M 6,75 
                           C 6,78 10,80 15,80 
                           L 85,80 
                           C 90,80 94,78 94,75 
                           L 85,16 
                           C 83,8 77,4 69,4 
                           L 31,4 
                           C 23,4 17,8 15,16 
                           Z"
                        fill={styles.inactiveFill}
                        stroke={styles.inactiveBorder}
                        strokeWidth="1.2"
                      />
                    </svg>
                  )}

                  {/* Icon & Label */}
                  <div className="relative z-10 flex flex-col items-center pb-2 pointer-events-none">
                    <div className="h-9 flex items-center justify-center relative">
                      {/* Musical notes for Scenes */}
                      {tab.hasMusicNotes && (
                        <>
                          <span className="absolute -left-3 top-0 text-[#ec4899] text-xs font-bold animate-pulse">♪</span>
                          <span className="absolute -right-3 top-1 text-[#f472b6] text-xs font-bold animate-pulse">♫</span>
                        </>
                      )}

                      <Icon size={isActive ? 36 : 31} className={isActive ? '' : 'opacity-95'} />

                      {tab.badge && (
                        <span className="absolute -bottom-1.5 px-1.5 py-[0.5px] bg-[#1668e3] text-white text-[9px] font-black rounded-md shadow-md tracking-tight whitespace-nowrap">
                          {tab.badge}
                        </span>
                      )}
                    </div>

                    <span className={`text-[12.5px] tracking-tight mt-1 ${isActive ? styles.activeText : styles.inactiveText}`}>
                      {tab.label}
                    </span>
                  </div>

                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
