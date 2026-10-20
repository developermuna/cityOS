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
          activeBorder: '#475569', // Crisp slate grey border line
          activeText: 'text-slate-900 font-bold',
          inactiveFill: '#f8fafc',
          inactiveBorder: '#e2e8f0',
          inactiveText: 'text-slate-500 font-semibold'
        };
      case 'dineout':
        return {
          activeFill: '#faf7ee',
          activeBorder: '#315424', // Crisp dark olive green border line
          activeText: 'text-[#23421b] font-bold',
          inactiveFill: '#eeeae0',
          inactiveBorder: '#ded8cb',
          inactiveText: 'text-[#6b7367] font-semibold'
        };
      case 'scenes':
        return {
          activeFill: '#09090b',
          activeBorder: '#ffffff', // Crisp white border line
          activeText: 'text-white font-bold',
          inactiveFill: '#18181b',
          inactiveBorder: 'rgba(255, 255, 255, 0.1)',
          inactiveText: 'text-[#9ca3af] font-semibold'
        };
      case 'food':
      default:
        return {
          activeFill: '#0d051f',
          activeBorder: '#a782fc', // Crisp lavender purple border line
          activeText: 'text-white font-bold',
          inactiveFill: '#170b2e',
          inactiveBorder: 'rgba(255, 255, 255, 0.08)',
          inactiveText: 'text-[#9d93b1] font-semibold'
        };
    }
  };

  const styles = getHeaderStyles();

  // 4 Slot boundaries across 400px width
  const slotWidth = 100;
  const tabIndexMap = { food: 0, instamart: 1, dineout: 2, scenes: 3 };
  const activeIdx = tabIndexMap[activeTab] ?? 0;
  const startX = activeIdx * slotWidth;
  const endX = startX + slotWidth;

  // Single continuous border line path from far-left (0,78) to far-right (400,78)
  // Drawn FORWARD in the foreground layer so it is NEVER hidden below any button!
  const leftSegment = startX > 0 ? `M 0,78 L ${startX},78` : `M 0,78`;
  const archSegment = `
    C ${startX + 5},78 ${startX + 7},72 ${startX + 9},62 
    L ${startX + 18},16 
    C ${startX + 21},7 ${startX + 29},3 ${startX + 38},3 
    L ${endX - 38},3 
    C ${endX - 29},3 ${endX - 21},7 ${endX - 18},16 
    L ${endX - 9},62 
    C ${endX - 7},72 ${endX - 5},78 ${endX},78
  `;
  const rightSegment = endX < 400 ? `L 400,78` : ``;

  const continuousBorderLine = `${leftSegment} ${archSegment} ${rightSegment}`;

  const handleTabClick = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="w-full select-none pt-1">
      {/* Container with identical button size and design */}
      <div className="relative w-full h-[80px]">
        
        {/* BASE LAYER: Buttons with SAME design, size, and trapezoid shape */}
        <div className="grid grid-cols-4 items-end relative z-10 w-full h-full">
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
                {/* BUTTON CARD: Exactly the same design and size for all 4 buttons */}
                <div className="relative w-full h-[76px] flex flex-col items-center justify-end">
                  
                  {/* Trapezoid Card Background */}
                  <svg
                    viewBox="0 0 100 80"
                    preserveAspectRatio="none"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
                    <path
                      d="M 5,76 
                         C 5,79 9,80 14,80 
                         L 86,80 
                         C 91,80 95,79 95,76 
                         L 85,16 
                         C 83,8 77,4 69,4 
                         L 31,4 
                         C 23,4 17,8 15,16 
                         Z"
                      fill={isActive ? styles.activeFill : styles.inactiveFill}
                      stroke={isActive ? 'none' : styles.inactiveBorder}
                      strokeWidth="1.2"
                    />

                    {/* Subtle glow highlight on active button */}
                    {isActive && activeTab === 'food' && (
                      <ellipse cx="50" cy="30" rx="24" ry="14" fill="#8e65e6" fillOpacity="0.25" />
                    )}
                    {isActive && activeTab === 'scenes' && (
                      <ellipse cx="50" cy="30" rx="24" ry="14" fill="#ffffff" fillOpacity="0.18" />
                    )}
                  </svg>

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

                      <Icon size={33} className={isActive ? 'scale-105 transition-transform' : 'opacity-95'} />

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

        {/* FOREGROUND LAYER (z-30): THE FORWARD ACTIVE BORDER LINE
            - Starts at far-left edge (0,78)
            - Arches up and around the active button
            - Continues to far-right edge (400,78)
            - Placed FORWARD so it is NEVER hidden below any button!
        */}
        <svg
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
        >
          <path
            d={continuousBorderLine}
            fill="none"
            stroke={styles.activeBorder}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

      </div>
    </div>
  );
};
