import React, { useRef, useEffect } from 'react';
import { 
  TabCityOSIcon,
  TabShopIcon,
  TabInstamartBasketIcon,
  TabBurgerIcon, 
  TabRideIcon,
  TabServiceIcon,
  TabTravelIcon,
  TabRentIcon
} from '../../common page/icons/CustomIcons';
import { getCategoryTheme } from '../../theme/categoryColors';

export const CategoryTabs = ({ 
  activeTab = 'cityos', 
  onTabChange
}) => {
  const scrollRef = useRef(null);
  const tabRefs = useRef({});

  const tabs = [
    { id: 'cityos', label: 'cityOS', icon: TabCityOSIcon },
    { id: 'shop', label: 'shop', icon: TabShopIcon },
    { id: 'grocery', label: 'grocery', icon: TabInstamartBasketIcon },
    { id: 'food', label: 'food', icon: TabBurgerIcon },
    { id: 'ride', label: 'ride', icon: TabRideIcon },
    { id: 'service', label: 'service', icon: TabServiceIcon },
    { id: 'travel', label: 'travel', icon: TabTravelIcon },
    { id: 'rent', label: 'rent', icon: TabRentIcon }
  ];

  const normalizedActiveTab = (() => {
    if (activeTab === 'instamart') return 'grocery';
    if (activeTab === 'dineout') return 'food';
    return activeTab;
  })();

  const currentTheme = getCategoryTheme(normalizedActiveTab);
  const styles = {
    activeFill: currentTheme.rgba80 || currentTheme.hex,
    activeText: currentTheme.activeText,
    inactiveFill: currentTheme.inactiveFill,
    inactiveBorder: currentTheme.inactiveBorder,
    inactiveText: currentTheme.inactiveText
  };

  const H = 50; // Slightly decreased height (was 58)
  const slotWidth = 75; // Standard 5-button visible layout with smooth horizontal scroll
  const svgButtonWidth = 99; 
  const totalWidth = (tabs.length - 1) * slotWidth + svgButtonWidth;
  
  const activeIdx = Math.max(0, tabs.findIndex(t => t.id === normalizedActiveTab));
  const activeStartX = activeIdx * slotWidth;
  const activeCx = activeStartX + svgButtonWidth / 2;

  // Active tab background fill with top part less wider than the bottom part
  const getActiveFillPath = (cx) => `
    M ${cx - 37},${H}
    L ${cx - 26},10
    A 9 9 0 0 1 ${cx - 18},2
    L ${cx + 18},2
    A 9 9 0 0 1 ${cx + 26},10
    L ${cx + 37},${H}
    Z
  `.trim();

  const inactiveGroups = [];
  let currentGroup = [];
  tabs.forEach((tab, idx) => {
    if (tab.id === activeTab) {
      if (currentGroup.length > 0) {
        inactiveGroups.push(currentGroup);
        currentGroup = [];
      }
    } else {
      currentGroup.push(idx);
    }
  });
  if (currentGroup.length > 0) {
    inactiveGroups.push(currentGroup);
  }

  const getGroupContour = (group) => {
    if (!group || group.length === 0) return { contourD: '', fillD: '' };

    let contourD = '';
    let fillD = '';

    group.forEach(idx => {
      const cx = idx * slotWidth + svgButtonWidth / 2;
      const startX = cx - 37;
      const endX = cx + 37;

      const arch = `
        M ${startX},${H}
        L ${cx - 26},10
        A 9 9 0 0 1 ${cx - 18},2
        L ${cx + 18},2
        A 9 9 0 0 1 ${cx + 26},10
        L ${endX},${H}
      `.trim();

      contourD += ` ${arch}`;
      fillD += ` ${arch} Z`;
    });

    return { contourD: contourD.trim(), fillD: fillD.trim() };
  };

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

  return (
    <div className="w-full select-none">
      <div 
        ref={scrollRef}
        className="w-full overflow-x-auto no-scrollbar scroll-smooth"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div 
          className="relative h-[50px]"
          style={{ width: `${totalWidth}px`, minWidth: `${totalWidth}px` }}
        >
          {/* Inactive Tab Group Backgrounds & Outlines */}
          <svg
            viewBox={`0 0 ${totalWidth} ${H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
          >
            {inactiveGroups.map((group, gIdx) => {
              const { contourD, fillD } = getGroupContour(group);
              return (
                <g key={`inactive-group-${gIdx}`}>
                  <path d={fillD} fill={styles.inactiveFill} />
                  <path d={contourD} fill="none" stroke={styles.inactiveBorder} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              );
            })}
          </svg>

          {/* Active Tab Button Background Fill */}
          <svg
            viewBox={`0 0 ${totalWidth} ${H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
          >
            <defs>
              <linearGradient id="activeUpperDarkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#000000" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={getActiveFillPath(activeCx)} fill={styles.activeFill} />
            <path d={getActiveFillPath(activeCx)} fill="url(#activeUpperDarkGrad)" />
          </svg>

          {/* Continuous White Border: Active Button + Full Screen Baseline */}
          <svg
            viewBox={`0 0 ${totalWidth} ${H}`}
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
          >
            <defs>
              <filter id="whiteLineGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="0.8" floodColor="#000000" floodOpacity="0.25" />
              </filter>
            </defs>
            {/* White border continuous from left edge, contouring active button, to right edge */}
            <path
              d={`M -500,${H} L ${activeCx - 37},${H} L ${activeCx - 26},10 A 9 9 0 0 1 ${activeCx - 18},2 L ${activeCx + 18},2 A 9 9 0 0 1 ${activeCx + 26},10 L ${activeCx + 37},${H} L ${totalWidth + 500},${H}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#whiteLineGlow)"
            />
          </svg>

          {/* Interactive Category Tab Buttons */}
          <div className="flex relative z-40 w-full h-full">
            {tabs.map((tab, idx) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[tab.id] = el; }}
                  type="button"
                  onClick={() => onTabChange && onTabChange(tab.id)}
                  style={{ 
                    width: `${svgButtonWidth}px`,
                    marginLeft: idx === 0 ? '0px' : `-${svgButtonWidth - slotWidth}px`,
                    zIndex: isActive ? 100 : 50 - idx
                  }}
                  className="shrink-0 relative flex flex-col items-center justify-end pb-1 cursor-pointer group h-full p-0 bg-transparent border-none outline-none select-none transition-transform active:scale-[0.98]"
                  aria-label={`Switch to ${tab.label}`}
                >
                  <div className="flex flex-col items-center pointer-events-none">
                    <div className="h-7.5 flex items-center justify-center relative mb-0.5">
                      <Icon 
                        size={30} 
                        className={isActive ? 'opacity-100 drop-shadow-xs' : 'opacity-90 group-hover:opacity-100 transition-opacity'} 
                      />
                    </div>
                    <span className={`text-[11.5px] font-bold tracking-tight leading-none transition-colors -translate-y-[1px] ${isActive ? styles.activeText : styles.inactiveText}`}>
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
