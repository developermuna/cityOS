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
  // Badges based on active page:
  // Food: Instamart shows "12 mins"
  // Dineout & Scenes: Instamart shows "5 Mins"
  // Instamart: no badge
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

  // Specific single uniform border color, fills and text styling for each theme
  const getHeaderStyles = () => {
    switch (activeTab) {
      case 'instamart':
        return {
          activeFill: '#ffffff',
          activeBorder: '#475569', // Crisp slate grey border line
          activeGlow: 'none',
          activeText: 'text-slate-900 font-extrabold',
          inactiveFill: '#f8fafc',
          inactiveBorder: '#cbd5e1',
          inactiveText: 'text-slate-500 font-medium'
        };
      case 'dineout':
        return {
          activeFill: '#faf7ee',
          activeBorder: '#2d5122', // Rich dark olive green border line
          activeGlow: 'none',
          activeText: 'text-[#23421b] font-extrabold',
          inactiveFill: '#e5dfd2',
          inactiveBorder: '#d4ccbd',
          inactiveText: 'text-[#667060] font-medium'
        };
      case 'scenes':
        return {
          activeFill: '#09090b',
          activeBorder: '#ffffff', // Crisp pure white border line
          activeGlow: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.45))',
          activeText: 'text-white font-extrabold',
          inactiveFill: '#18181b',
          inactiveBorder: 'rgba(255, 255, 255, 0.1)',
          inactiveText: 'text-[#9ca3af] font-medium'
        };
      case 'food':
      default:
        return {
          activeFill: '#0d051f',
          activeBorder: '#a782fc', // Crisp lavender purple border line
          activeGlow: 'drop-shadow(0 0 3px rgba(167, 130, 252, 0.45))',
          activeText: 'text-white font-extrabold',
          inactiveFill: 'rgba(255, 255, 255, 0.05)',
          inactiveBorder: 'rgba(255, 255, 255, 0.1)',
          inactiveText: 'text-[#9d93b1] font-medium'
        };
    }
  };

  const styles = getHeaderStyles();

  // Exactly matching slot parameters across 400px width (100px per tab)
  const tabIndexMap = { food: 0, instamart: 1, dineout: 2, scenes: 3 };
  const activeIdx = tabIndexMap[activeTab] ?? 0;
  const startX = activeIdx * 100;
  const endX = startX + 100;
  const activeCx = startX + 50;

  // BASELINE AT Y = 76 (seamless connection to the below section)
  // UPPER PROFILE (cx - 46, 66) -> (cx - 38, 18) -> (cx - 24, 6) -> (cx + 24, 6) -> (cx + 38, 18) -> (cx + 46, 66)
  // Perfectly identical across ALL 4 buttons!

  // Inactive button path generator for any tab index
  const getInactiveButtonPath = (idx) => {
    const cx = idx * 100 + 50;
    return `
      M ${cx - 43},76 
      L ${cx + 43},76 
      C ${cx + 45},76 ${cx + 46},72 ${cx + 46},66 
      L ${cx + 38},18 
      C ${cx + 34},10 ${cx + 30},6 ${cx + 24},6 
      L ${cx - 24},6 
      C ${cx - 30},6 ${cx - 34},10 ${cx - 38},18 
      L ${cx - 46},66 
      C ${cx - 46},72 ${cx - 45},76 ${cx - 43},76 
      Z
    `;
  };

  // Active button upper arch contour
  const archContour = `
    C ${startX + 1},76 ${startX + 3},71 ${startX + 4},66 
    L ${activeCx - 38},18 
    C ${activeCx - 34},10 ${activeCx - 30},6 ${activeCx - 24},6 
    L ${activeCx + 24},6 
    C ${activeCx + 30},6 ${activeCx + 34},10 ${activeCx + 38},18 
    L ${endX - 4},66 
    C ${endX - 3},71 ${endX - 1},76 ${endX},76
  `;

  // 1. Continuous single-color border line from far-left (0,76) to far-right (400,76)
  const leftBaseline = startX > 0 ? `M 0,76 L ${startX},76` : `M 0,76`;
  const rightBaseline = endX < 400 ? `L 400,76` : ``;
  const continuousBorderLine = `${leftBaseline} ${archContour} ${rightBaseline}`;

  // 2. Active button fill region seamlessly merging down into the below container
  const activeFillPath = `
    M ${startX},76 
    ${archContour}
    L ${endX},80 
    L ${startX},80 
    Z
  `;

  const handleTabClick = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="w-full select-none">
      {/* 4 Tabs Container with Same Size and Shape */}
      <div className="relative w-full h-[80px]">
        
        {/* LAYER 1: Inactive Buttons Base Cards (viewBox 0 0 400 80)
            - Renders inactive button cards with identical trapezoidal shape and size
        */}
        <svg
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          {tabs.map((tab, idx) => {
            if (tab.id === activeTab) return null;
            return (
              <path
                key={tab.id}
                d={getInactiveButtonPath(idx)}
                fill={styles.inactiveFill}
                stroke={styles.inactiveBorder}
                strokeWidth="1.2"
              />
            );
          })}
        </svg>

        {/* LAYER 2: Active Button Fill Layer (z-20)
            - Renders the active button background fill seamlessly merging into below container
        */}
        <svg
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        >
          <path
            d={activeFillPath}
            fill={styles.activeFill}
          />

          {/* Ambient sheen glow for Food & Scenes active tabs */}
          {activeTab === 'food' && (
            <ellipse cx="50" cy="24" rx="26" ry="12" fill="#8e65e6" fillOpacity="0.25" />
          )}
          {activeTab === 'scenes' && (
            <ellipse cx="350" cy="24" rx="26" ry="12" fill="#ffffff" fillOpacity="0.18" />
          )}
        </svg>

        {/* LAYER 3: FOREGROUND THE FORWARD ACTIVE BORDER LINE (z-30)
            - Traces from far-left (0,76) to far-right (400,76)
            - Exactly matches the active button contour with zero mismatch
            - Positioned FORWARD so it is crisp and never hidden below any button!
        */}
        <svg
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
          style={{ filter: styles.activeGlow }}
        >
          <path
            d={continuousBorderLine}
            fill="none"
            stroke={styles.activeBorder}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* LAYER 4: Interactive Controls Layer (z-40)
            - Exactly aligned across 4 equal columns
            - Clickable buttons with icons, labels, badges, and musical notes
        */}
        <div className="grid grid-cols-4 relative z-40 w-full h-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className="relative flex flex-col items-center justify-end pb-2 cursor-pointer group h-full w-full p-0 bg-transparent border-none outline-none select-none transition-transform active:scale-[0.98]"
                aria-label={`Switch to ${tab.label}`}
              >
                {/* Icon & Label */}
                <div className="flex flex-col items-center pointer-events-none">
                  <div className="h-9 flex items-center justify-center relative mb-0.5">
                    {/* Musical notes for Scenes */}
                    {tab.hasMusicNotes && (
                      <>
                        <span className="absolute -left-3 top-0 text-[#ec4899] text-xs font-bold animate-pulse">♪</span>
                        <span className="absolute -right-3 top-1 text-[#f472b6] text-xs font-bold animate-pulse">♫</span>
                      </>
                    )}

                    <Icon 
                      size={tab.id === 'food' ? 35 : tab.id === 'scenes' ? 33 : 34} 
                      className={isActive ? 'scale-105 transition-transform' : 'opacity-90 group-hover:opacity-100 transition-opacity'} 
                    />

                    {tab.badge && (
                      <span className="absolute -bottom-1.5 px-1.5 py-[0.5px] bg-[#1668e3] text-white text-[9px] font-black rounded-md shadow-md tracking-tight whitespace-nowrap">
                        {tab.badge}
                      </span>
                    )}
                  </div>

                  <span className={`text-[12.5px] tracking-tight leading-none transition-colors ${isActive ? styles.activeText : styles.inactiveText}`}>
                    {tab.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
