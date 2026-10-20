import React, { useRef, useEffect } from 'react';
import { 
  TabCityOSIcon,
  TabShopIcon,
  TabInstamartBasketIcon,
  TabBurgerIcon, 
  TabServiceIcon,
  TabRideIcon,
  TabTravelIcon,
  TabRentIcon
} from './CustomIcons';

export const CategoryTabs = ({ 
  activeTab = 'food', 
  onTabChange, 
  theme = 'dark' // 'dark', 'white', 'cream', 'black'
}) => {
  const scrollRef = useRef(null);
  const tabRefs = useRef({});

  // 8 Renamed Header Tabs: cityOS, shop, grocery, food, service, ride, travel, rent
  const tabs = [
    { id: 'cityos', label: 'cityOS', icon: TabCityOSIcon },
    { id: 'shop', label: 'shop', icon: TabShopIcon, badge: 'Sale' },
    { id: 'grocery', label: 'grocery', icon: TabInstamartBasketIcon, badge: '10 mins' },
    { id: 'food', label: 'food', icon: TabBurgerIcon },
    { id: 'service', label: 'service', icon: TabServiceIcon },
    { id: 'ride', label: 'ride', icon: TabRideIcon, badge: '2 mins' },
    { id: 'travel', label: 'travel', icon: TabTravelIcon },
    { id: 'rent', label: 'rent', icon: TabRentIcon }
  ];

  // Specific single uniform border color, fills, and glow for each theme/tab
  const getHeaderStyles = () => {
    if (theme === 'white') {
      return {
        activeFill: '#ffffff',
        activeBorder: '#475569',
        activeGlow: 'none',
        activeText: 'text-slate-900 font-extrabold',
        inactiveFill: '#f8fafc',
        inactiveBorder: '#cbd5e1',
        inactiveText: 'text-slate-500 font-medium'
      };
    }

    if (theme === 'cream') {
      return {
        activeFill: '#faf7ee',
        activeBorder: '#2d5122',
        activeGlow: 'none',
        activeText: 'text-[#23421b] font-extrabold',
        inactiveFill: '#e5dfd2',
        inactiveBorder: '#d4ccbd',
        inactiveText: 'text-[#667060] font-medium'
      };
    }

    switch (activeTab) {
      case 'cityos':
        return {
          activeFill: '#0d051f',
          activeBorder: '#60a5fa',
          activeGlow: 'drop-shadow(0 0 3px rgba(96, 165, 250, 0.45))',
          activeText: 'text-white font-extrabold',
          inactiveFill: 'rgba(255, 255, 255, 0.05)',
          inactiveBorder: 'rgba(255, 255, 255, 0.1)',
          inactiveText: 'text-[#9d93b1] font-medium'
        };
      case 'shop':
        return {
          activeFill: '#0d051f',
          activeBorder: '#fb7185',
          activeGlow: 'drop-shadow(0 0 3px rgba(251, 113, 133, 0.45))',
          activeText: 'text-white font-extrabold',
          inactiveFill: 'rgba(255, 255, 255, 0.05)',
          inactiveBorder: 'rgba(255, 255, 255, 0.1)',
          inactiveText: 'text-[#9d93b1] font-medium'
        };
      case 'grocery':
        return {
          activeFill: '#0d051f',
          activeBorder: '#34d399',
          activeGlow: 'drop-shadow(0 0 3px rgba(52, 211, 153, 0.45))',
          activeText: 'text-white font-extrabold',
          inactiveFill: 'rgba(255, 255, 255, 0.05)',
          inactiveBorder: 'rgba(255, 255, 255, 0.1)',
          inactiveText: 'text-[#9d93b1] font-medium'
        };
      case 'service':
        return {
          activeFill: '#0d051f',
          activeBorder: '#38bdf8',
          activeGlow: 'drop-shadow(0 0 3px rgba(56, 189, 248, 0.45))',
          activeText: 'text-white font-extrabold',
          inactiveFill: 'rgba(255, 255, 255, 0.05)',
          inactiveBorder: 'rgba(255, 255, 255, 0.1)',
          inactiveText: 'text-[#9d93b1] font-medium'
        };
      case 'ride':
        return {
          activeFill: '#0d051f',
          activeBorder: '#facc15',
          activeGlow: 'drop-shadow(0 0 3px rgba(250, 204, 21, 0.45))',
          activeText: 'text-white font-extrabold',
          inactiveFill: 'rgba(255, 255, 255, 0.05)',
          inactiveBorder: 'rgba(255, 255, 255, 0.1)',
          inactiveText: 'text-[#9d93b1] font-medium'
        };
      case 'travel':
        return {
          activeFill: '#0d051f',
          activeBorder: '#22d3ee',
          activeGlow: 'drop-shadow(0 0 3px rgba(34, 211, 238, 0.45))',
          activeText: 'text-white font-extrabold',
          inactiveFill: 'rgba(255, 255, 255, 0.05)',
          inactiveBorder: 'rgba(255, 255, 255, 0.1)',
          inactiveText: 'text-[#9d93b1] font-medium'
        };
      case 'rent':
        return {
          activeFill: '#0d051f',
          activeBorder: '#4ade80',
          activeGlow: 'drop-shadow(0 0 3px rgba(74, 222, 128, 0.45))',
          activeText: 'text-white font-extrabold',
          inactiveFill: 'rgba(255, 255, 255, 0.05)',
          inactiveBorder: 'rgba(255, 255, 255, 0.1)',
          inactiveText: 'text-[#9d93b1] font-medium'
        };
      case 'food':
      default:
        return {
          activeFill: '#0d051f',
          activeBorder: '#a782fc',
          activeGlow: 'drop-shadow(0 0 3px rgba(167, 130, 252, 0.45))',
          activeText: 'text-white font-extrabold',
          inactiveFill: 'rgba(255, 255, 255, 0.05)',
          inactiveBorder: 'rgba(255, 255, 255, 0.1)',
          inactiveText: 'text-[#9d93b1] font-medium'
        };
    }
  };

  const styles = getHeaderStyles();

  // 5-Button Layout: slotWidth = 70px to fit exactly 5 on standard screens (375px).
  // Overlap is significant (svgButtonWidth 94 - slotWidth 70 = 24px).
  const slotWidth = 70; 
  const svgButtonWidth = 94; 
  const totalWidth = (tabs.length - 1) * slotWidth + svgButtonWidth;
  
  const activeIdx = Math.max(0, tabs.findIndex(t => t.id === activeTab));
  const activeStartX = activeIdx * slotWidth;
  const activeCx = activeStartX + svgButtonWidth / 2;
  const activeEndX = activeStartX + svgButtonWidth;

  // Inactive button path generator
  const getInactiveButtonPath = (idx) => {
    const sX = idx * slotWidth;
    const cx = sX + svgButtonWidth / 2;
    return `
      M ${cx - 46},70
      C ${cx - 44},70 ${cx - 40},68 ${cx - 38},60
      C ${cx - 32},38 ${cx - 28},10 ${cx - 20},6
      C ${cx - 14},2 ${cx - 8},4 ${cx},4
      C ${cx + 8},4 ${cx + 14},2 ${cx + 20},6
      C ${cx + 28},10 ${cx + 32},38 ${cx + 38},60
      C ${cx + 40},68 ${cx + 44},70 ${cx + 46},70
      Z
    `;
  };

  // Active button upper arch contour
  const archContour = `
    C ${activeStartX + 2},70 ${activeStartX + 4},68 ${activeStartX + 8},60
    C ${activeStartX + 14},38 ${activeStartX + 20},10 ${activeStartX + 28},6
    C ${activeStartX + 34},2 ${activeStartX + 40},4 ${activeCx},4
    C ${activeEndX - 40},4 ${activeEndX - 34},2 ${activeEndX - 28},6
    C ${activeEndX - 20},10 ${activeEndX - 14},38 ${activeEndX - 8},60
    C ${activeEndX - 6},68 ${activeEndX - 2},70 ${activeEndX},70
  `;

  // 1. Continuous single-color border line spanning all tabs
  const leftBaseline = activeStartX > 0 ? `M 0,70 L ${activeStartX},70` : `M 0,70`;
  const rightBaseline = activeEndX < totalWidth ? `L ${totalWidth},70` : ``;
  const continuousBorderLine = `${leftBaseline} ${archContour} ${rightBaseline}`;

  // 2. Active button fill region
  const activeFillPath = `
    M ${activeStartX},70 
    ${archContour}
    L ${activeEndX},74 
    L ${activeStartX},74 
    Z
  `;

  // Smooth auto-scroll active button into view and center it
  useEffect(() => {
    const activeEl = tabRefs.current[activeTab];
    if (activeEl && scrollRef.current) {
      const timeoutId = setTimeout(() => {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [activeTab]);

  const handleTabClick = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    }
  };

  return (
    <div className="w-full select-none">
      <div 
        ref={scrollRef}
        className="w-full overflow-x-auto no-scrollbar scroll-smooth"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div 
          className="relative h-[74px]"
          style={{ width: `${totalWidth}px`, minWidth: `${totalWidth}px` }}
        >
          
          {/* LAYER 1: Inactive Buttons Base Cards
              - Stacking: idx 'i' is drawn AFTER 'i+1' (reversed map) to create the "left-on-top-of-right" look
              - Active tab is skipped as it has its own layer
          */}
          <svg
            viewBox={`0 0 ${totalWidth} 74`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          >
            {[...tabs].reverse().map((tab) => {
              const idx = tabs.findIndex(t => t.id === tab.id);
              if (tab.id === activeTab) return null;
              return (
                <path
                  key={tab.id}
                  d={getInactiveButtonPath(idx)}
                  fill={styles.inactiveFill}
                  stroke={styles.inactiveBorder}
                  strokeWidth="2"
                />
              );
            })}
          </svg>

          {/* LAYER 2: Active Button Fill Layer (z-20) */}
          <svg
            viewBox={`0 0 ${totalWidth} 74`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
          >
            <path
              d={activeFillPath}
              fill={styles.activeFill}
            />

            {/* Ambient sheen glow for active tab */}
            <ellipse 
              cx={activeCx} 
              cy="24" 
              rx="24" 
              ry="12" 
              fill={styles.activeBorder} 
              fillOpacity="0.2" 
            />
          </svg>

          {/* LAYER 3: FOREGROUND THE FORWARD ACTIVE BORDER LINE (z-30) */}
          <svg
            viewBox={`0 0 ${totalWidth} 74`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-30"
            style={{ filter: styles.activeGlow }}
          >
            <path
              d={continuousBorderLine}
              fill="none"
              stroke={styles.activeBorder}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* LAYER 4: Interactive Controls Layer (z-40) */}
          <div className="flex relative z-40 w-full h-full">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[tab.id] = el; }}
                  type="button"
                  onClick={() => handleTabClick(tab.id)}
                  style={{ 
                    width: `${svgButtonWidth}px`,
                    marginLeft: idx === 0 ? '0px' : `-${svgButtonWidth - slotWidth}px`,
                    zIndex: isActive ? 100 : 50 - idx
                  }}
                  className="shrink-0 relative flex flex-col items-center justify-end pb-2 cursor-pointer group h-full p-0 bg-transparent border-none outline-none select-none transition-transform active:scale-[0.98]"
                  aria-label={`Switch to ${tab.label}`}
                >
                  <div className="flex flex-col items-center pointer-events-none">
                    <div className="h-9 flex items-center justify-center relative mb-0.5">
                      <Icon 
                        size={tab.id === 'food' ? 35 : 33} 
                        className={isActive ? 'scale-105 transition-transform' : 'opacity-90 group-hover:opacity-100 transition-opacity'} 
                      />

                      {tab.badge && (
                        <span className="absolute -bottom-1.5 px-1.5 py-[0.5px] bg-[#1668e3] text-white text-[9px] font-black rounded-md shadow-md tracking-tight whitespace-nowrap">
                          {tab.badge}
                        </span>
                      )}
                    </div>

                    <span className={`text-[12px] tracking-tight leading-none transition-colors ${isActive ? styles.activeText : styles.inactiveText}`}>
                      {tab.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
