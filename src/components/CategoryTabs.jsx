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
  activeTab = 'cityos', 
  onTabChange, 
  theme = 'dark' // 'dark', 'white', 'cream', 'black'
}) => {
  const scrollRef = useRef(null);
  const tabRefs = useRef({});

  // 8 Renamed Header Tabs: cityOS, shop, grocery, food, service, ride, travel, rent
  const tabs = [
    { id: 'cityos', label: 'cityOS', icon: TabCityOSIcon },
    { id: 'shop', label: 'shop', icon: TabShopIcon },
    { id: 'grocery', label: 'grocery', icon: TabInstamartBasketIcon },
    { id: 'food', label: 'food', icon: TabBurgerIcon },
    { id: 'service', label: 'service', icon: TabServiceIcon },
    { id: 'ride', label: 'ride', icon: TabRideIcon },
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

  // Inactive button path generator - Adjusted for smoother curves and 64px baseline
  const getInactiveButtonPath = (idx) => {
    const sX = idx * slotWidth;
    const cx = sX + svgButtonWidth / 2;
    return `
      M ${cx - 46},64
      C ${cx - 42},64 ${cx - 40},62 ${cx - 38},54
      C ${cx - 32},34 ${cx - 28},10 ${cx - 20},6
      C ${cx - 12},2 ${cx - 8},4 ${cx},4
      C ${cx + 8},4 ${cx + 12},2 ${cx + 20},6
      C ${cx + 28},10 ${cx + 32},34 ${cx + 38},54
      C ${cx + 40},62 ${cx + 42},64 ${cx + 46},64
      Z
    `;
  };

  // Active button upper arch contour - Smoother and 64px baseline
  const archContour = `
    C ${activeStartX + 4},64 ${activeStartX + 6},62 ${activeStartX + 10},54
    C ${activeStartX + 16},34 ${activeStartX + 20},10 ${activeStartX + 28},6
    C ${activeStartX + 34},2 ${activeStartX + 40},4 ${activeCx},4
    C ${activeEndX - 40},4 ${activeEndX - 34},2 ${activeEndX - 28},6
    C ${activeEndX - 20},10 ${activeEndX - 16},34 ${activeEndX - 10},54
    C ${activeEndX - 6},62 ${activeEndX - 4},64 ${activeEndX},64
  `;

  // 1. Continuous single-color border line spanning all tabs
  const leftBaseline = activeStartX > 0 ? `M 0,64 L ${activeStartX},64` : `M 0,64`;
  const rightBaseline = activeEndX < totalWidth ? `L ${totalWidth},64` : ``;
  const continuousBorderLine = `${leftBaseline} ${archContour} ${rightBaseline}`;

  // 2. Active button fill region
  const activeFillPath = `
    M ${activeStartX},64 
    ${archContour}
    L ${activeEndX},68 
    L ${activeStartX},68 
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
          className="relative h-[68px]"
          style={{ width: `${totalWidth}px`, minWidth: `${totalWidth}px` }}
        >
          
          {/* LAYER 1: Inactive Buttons Base Cards
              - Stacking: idx 'i' is drawn AFTER 'i+1' (reversed map) to create the "left-on-top-of-right" look
              - Active tab is skipped as it has its own layer
          */}
          <svg
            viewBox={`0 0 ${totalWidth} 68`}
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
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          {/* LAYER 2: Active Button Fill Layer (z-20) */}
          <svg
            viewBox={`0 0 ${totalWidth} 68`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
          >
            <path
              d={activeFillPath}
              fill={styles.activeFill}
            />

            {/* Removed ambient sheen glow as requested */}
          </svg>

          {/* LAYER 3: FOREGROUND THE FORWARD ACTIVE BORDER LINE (z-30) */}
          <svg
            viewBox={`0 0 ${totalWidth} 68`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-30"
            style={{ filter: styles.activeGlow }}
          >
            <path
              d={continuousBorderLine}
              fill="none"
              stroke={styles.activeBorder}
              strokeWidth="1.5"
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
