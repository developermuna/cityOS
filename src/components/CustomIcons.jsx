import React from 'react';

// Veg Icon
export const VegIcon = ({ size = 16, className = "" }) => (
  <div 
    className={`inline-flex items-center justify-center border border-[#0f8a65] rounded-[3px] p-[2px] bg-white ${className}`} 
    style={{ width: size, height: size }}
  >
    <div className="w-full h-full bg-[#0f8a65] rounded-full" />
  </div>
);

// Non-Veg Icon
export const NonVegIcon = ({ size = 16, className = "" }) => (
  <div 
    className={`inline-flex items-center justify-center border border-[#e43b4f] rounded-[3px] p-[2px] bg-white ${className}`} 
    style={{ width: size, height: size }}
  >
    <div className="w-full h-full bg-[#e43b4f] rounded-full" />
  </div>
);

// Chef Hat Icon
export const ChefHatIcon = ({ size = 14, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 2C9.24 2 7 4.24 7 7c0 .35.04.69.11 1.02C5.3 8.5 4 10.1 4 12c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4 0-1.9-1.3-3.5-3.11-3.98.07-.33.11-.67.11-1.02 0-2.76-2.24-5-5-5zM6 18h12v2H6v-2zm2 3h8v1H8v-1z"/>
  </svg>
);

// Lightning Bolt Icon
export const BoltIcon = ({ size = 14, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M13 2L3 14h7v8l10-12h-7l1-8z" />
  </svg>
);

// EXACT 3D Glossy Burger for the "Food" Tab
export const TabBurgerIcon = ({ size = 38, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    {/* Soft glow shadow */}
    <ellipse cx="27" cy="46" rx="16" ry="3" fill="#000000" fillOpacity="0.4" />
    
    {/* Bottom Bun */}
    <path d="M12 37C12 41 18 44 27 44C36 44 42 41 42 37V34H12V37Z" fill="#E28935" />
    <path d="M12 35C14 36 20 37.5 27 37.5C34 37.5 40 36 42 35V34H12V35Z" fill="#C87023" />

    {/* Melted Cheese Corner */}
    <path d="M10 32L17 38L24 32L31 38L38 31L44 35V31H10V32Z" fill="#FBBF24" />
    <path d="M12 32L17 36.5L24 31.5L31 36.5L37 31H12V32Z" fill="#FDE047" />

    {/* Patty */}
    <rect x="9" y="27" width="36" height="5" rx="2.5" fill="#5A260C" />
    <path d="M12 28H42" stroke="#431C07" strokeWidth="1" strokeLinecap="round" />

    {/* Tomato Slices */}
    <rect x="11" y="24" width="15" height="4" rx="2" fill="#DC2626" />
    <rect x="28" y="24" width="15" height="4" rx="2" fill="#DC2626" />

    {/* Fresh Wavy Lettuce */}
    <path 
      d="M8 25C10 23 12 26 15 24C18 22 20 25 23 23C26 21 28 24 31 22C34 20 36 23 39 21C42 19 44 23 46 22" 
      stroke="#22C55E" 
      strokeWidth="3.5" 
      strokeLinecap="round" 
    />

    {/* Top Bun with Golden Glaze and Indentations */}
    <path 
      d="M9 22C9 14 17 9 27 9C37 9 45 14 45 22H9Z" 
      fill="url(#topBunGrad)" 
    />
    
    {/* Bun 3D Highlight & Sheen */}
    <ellipse cx="27" cy="14" rx="14" ry="4" fill="url(#bunSheen)" />
    <ellipse cx="27" cy="12" rx="11" ry="2.5" fill="#FFF2C6" fillOpacity="0.4" />

    {/* Vertical bun contours */}
    <path d="M19 12C18 15 18 19 18 21" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
    <path d="M27 10C27 14 27 18 27 21" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
    <path d="M35 12C36 15 36 19 36 21" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />

    <defs>
      <linearGradient id="topBunGrad" x1="27" y1="9" x2="27" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FBBF24" />
        <stop offset="0.6" stopColor="#E28935" />
        <stop offset="1" stopColor="#C87023" />
      </linearGradient>
      <linearGradient id="bunSheen" x1="27" y1="10" x2="27" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FEF08A" stopOpacity="0.8" />
        <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

// EXACT 3D Grocery Basket with Baguette, Celery, Carrot for "Instamart" Tab
export const TabInstamartBasketIcon = ({ size = 38, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    {/* Bread Baguette */}
    <path d="M30 20L37 11C38 9.5 40 9.5 41 10.5C42 11.5 42 13.5 40.5 15L34 23" fill="#D97706" />
    <path d="M32 18L35 14M35 20L38 16" stroke="#FEF3C7" strokeWidth="1" strokeLinecap="round" />

    {/* Celery / Greens */}
    <path d="M16 23C15 17 18 12 21 11C22 13 22 17 21 23" fill="#16A34A" />
    <path d="M19 13C21 11 25 12 24 16L22 23" fill="#22C55E" />
    <path d="M17 17C14 15 14 13 15 12" stroke="#86EFAC" strokeWidth="1.5" strokeLinecap="round" />

    {/* Carrot */}
    <path d="M26 13L29 22L24 21Z" fill="#F97316" />
    <path d="M26 13L27 9" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" />

    {/* Milk / Juice carton */}
    <rect x="23" y="16" width="7" height="9" rx="1" fill="#FFFFFF" />
    <path d="M23 18H30" stroke="#0284C7" strokeWidth="1" />

    {/* Light Blue Crate / Basket */}
    <path d="M12 22H42V35C42 37 40 38 38 38H16C14 38 12 37 12 35V22Z" fill="#38BDF8" />
    <path d="M11 22H43V25H11V22Z" fill="#0284C7" />
    
    {/* Basket slats / lattice slots */}
    <rect x="15" y="27" width="5" height="4" rx="1" fill="#0369A1" />
    <rect x="24" y="27" width="5" height="4" rx="1" fill="#0369A1" />
    <rect x="33" y="27" width="5" height="4" rx="1" fill="#0369A1" />
  </svg>
);

// EXACT Cloche Dome with Plate for "Dineout" Tab
export const TabDineoutClocheIcon = ({ size = 38, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    {/* Cloche Handle Knob */}
    <circle cx="27" cy="14" r="2.5" fill="#86EFAC" />
    <ellipse cx="27" cy="14" rx="1.5" ry="1" fill="#DCFCE7" />

    {/* Cloche Dome in Light Sage Green */}
    <path 
      d="M13 32C13 22 19 16 27 16C35 16 41 22 41 32H13Z" 
      fill="url(#clocheGrad)" 
    />
    
    {/* Dome Sheen / Reflection */}
    <path 
      d="M17 31C17 24 21 19 27 18C28 18 26 21 24 24C21 28 19 31 17 31Z" 
      fill="#FFFFFF" 
      fillOpacity="0.4" 
    />

    {/* Food under plate edge (curry/garnish) */}
    <ellipse cx="27" cy="33" rx="13" ry="2" fill="#D97706" />
    <circle cx="23" cy="33" r="1.5" fill="#DC2626" />
    <circle cx="31" cy="33" r="1.5" fill="#15803D" />

    {/* White Serving Plate */}
    <ellipse cx="27" cy="35" rx="16" ry="3.5" fill="#E2E8F0" />
    <ellipse cx="27" cy="34" rx="14" ry="2.5" fill="#FFFFFF" />

    <defs>
      <linearGradient id="clocheGrad" x1="27" y1="16" x2="27" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A7F3D0" />
        <stop offset="0.5" stopColor="#6EE7B7" />
        <stop offset="1" stopColor="#34D399" />
      </linearGradient>
    </defs>
  </svg>
);

// EXACT Pink Disco Ball for "Scenes" Tab
export const TabScenesDiscoBallIcon = ({ size = 38, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    {/* Sphere Base with Pink Gradient */}
    <circle cx="27" cy="27" r="14" fill="url(#discoPinkGrad)" />
    
    {/* Mirrored Facets Grid */}
    {/* Horizontal lines */}
    <path d="M15 20C18 21.5 36 21.5 39 20" stroke="#FCE7F3" strokeWidth="1" strokeOpacity="0.8" />
    <path d="M13 27C17 28.5 37 28.5 41 27" stroke="#FCE7F3" strokeWidth="1" strokeOpacity="0.9" />
    <path d="M15 34C18 32.5 36 32.5 39 34" stroke="#FCE7F3" strokeWidth="1" strokeOpacity="0.8" />

    {/* Vertical lines */}
    <path d="M21 14C19 22 19 32 21 40" stroke="#FCE7F3" strokeWidth="1" strokeOpacity="0.8" />
    <path d="M27 13V41" stroke="#FCE7F3" strokeWidth="1" strokeOpacity="0.9" />
    <path d="M33 14C35 22 35 32 33 40" stroke="#FCE7F3" strokeWidth="1" strokeOpacity="0.8" />

    {/* Individual shiny tile highlights */}
    <rect x="23" y="22" width="3" height="3" fill="#FFFFFF" fillOpacity="0.8" />
    <rect x="28" y="23" width="3" height="3" fill="#FFF1F2" fillOpacity="0.9" />
    <rect x="23" y="28" width="3" height="3" fill="#FFF1F2" fillOpacity="0.7" />
    <rect x="28" y="29" width="3" height="3" fill="#FFFFFF" fillOpacity="0.9" />
    <rect x="33" y="23" width="3" height="3" fill="#F472B6" fillOpacity="0.6" />

    {/* Sparkle star */}
    <path d="M34 16L35.5 19L38.5 20.5L35.5 22L34 25L32.5 22L29.5 20.5L32.5 19Z" fill="#FFFFFF" />

    <defs>
      <linearGradient id="discoPinkGrad" x1="20" y1="15" x2="35" y2="39" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F472B6" />
        <stop offset="0.5" stopColor="#EC4899" />
        <stop offset="1" stopColor="#BE185D" />
      </linearGradient>
    </defs>
  </svg>
);

// 3D CityOS Hex Shield & Skyline Icon
export const TabCityOSIcon = ({ size = 36, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    <defs>
      <linearGradient id="cityShield" x1="27" y1="8" x2="27" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="0.5" stopColor="#6366F1" />
        <stop offset="1" stopColor="#8B5CF6" />
      </linearGradient>
      <linearGradient id="cityTowerGrad" x1="27" y1="18" x2="27" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#E0E7FF" />
      </linearGradient>
    </defs>
    <ellipse cx="27" cy="45" rx="15" ry="3" fill="#000000" fillOpacity="0.35" />
    {/* Hexagon Shield */}
    <path d="M27 8L42 16V34L27 43L12 34V16L27 8Z" fill="url(#cityShield)" />
    <path d="M27 10L40 17V33L27 41L14 33V17L27 10Z" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1" />
    {/* Stylized Modern Towers inside */}
    <rect x="23" y="17" width="8" height="20" rx="1.5" fill="url(#cityTowerGrad)" />
    <rect x="17" y="23" width="5" height="14" rx="1" fill="#C7D2FE" />
    <rect x="32" y="21" width="5" height="16" rx="1" fill="#C7D2FE" />
    {/* Windows and Antenna */}
    <line x1="27" y1="13" x2="27" y2="17" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
    <circle cx="27" cy="13" r="1.5" fill="#FBBF24" />
    <rect x="25" y="20" width="1.5" height="2" fill="#6366F1" />
    <rect x="27.5" y="20" width="1.5" height="2" fill="#6366F1" />
    <rect x="25" y="24" width="1.5" height="2" fill="#6366F1" />
    <rect x="27.5" y="24" width="1.5" height="2" fill="#6366F1" />
  </svg>
);

// 3D Shop Bag with Sparkles
export const TabShopIcon = ({ size = 36, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    <defs>
      <linearGradient id="shopBagGrad" x1="27" y1="18" x2="27" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FB7185" />
        <stop offset="0.5" stopColor="#E11D48" />
        <stop offset="1" stopColor="#9F1239" />
      </linearGradient>
    </defs>
    <ellipse cx="27" cy="45" rx="14" ry="3" fill="#000000" fillOpacity="0.35" />
    {/* Bag Handles */}
    <path d="M21 21V15C21 11.6863 23.6863 9 27 9C30.3137 9 33 11.6863 33 15V21" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bag Body */}
    <path d="M14 20L17 43C17.2 44.2 18.2 45 19.4 45H34.6C35.8 45 36.8 44.2 37 43L40 20H14Z" fill="url(#shopBagGrad)" />
    {/* Glossy Reflection */}
    <path d="M17 22L19 41C19.1 41.8 19.8 42.4 20.6 42.4H22.5L20 22H17Z" fill="#FFFFFF" fillOpacity="0.3" />
    {/* Starburst badge */}
    <circle cx="27" cy="30" r="5" fill="#FEF08A" />
    <path d="M27 27L28 29.5L30.5 30L28 30.5L27 33L26 30.5L23.5 30L26 29.5L27 27Z" fill="#B45309" />
  </svg>
);

// 3D Service / Tools Icon
export const TabServiceIcon = ({ size = 36, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    <defs>
      <linearGradient id="wrenchGrad" x1="16" y1="12" x2="38" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#94A3B8" />
        <stop offset="0.5" stopColor="#475569" />
        <stop offset="1" stopColor="#1E293B" />
      </linearGradient>
      <linearGradient id="gearGrad" x1="27" y1="14" x2="27" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#0284C7" />
      </linearGradient>
    </defs>
    <ellipse cx="27" cy="45" rx="14" ry="3" fill="#000000" fillOpacity="0.35" />
    {/* Gear Base */}
    <circle cx="27" cy="27" r="14" fill="url(#gearGrad)" />
    <circle cx="27" cy="27" r="5.5" fill="#0B132B" />
    {/* Chrome Wrench crossed */}
    <path d="M19 15L23 19L36 32C37.5 33.5 37.5 35.5 36 37C34.5 38.5 32.5 38.5 31 37L18 24L14 20C13 18.5 13 16.5 14.5 15C16 13.5 17.5 13.5 19 15Z" fill="url(#wrenchGrad)" />
    <circle cx="16" cy="17" r="2" fill="#E2E8F0" />
    {/* Golden Sparkles */}
    <path d="M37 13L38 15.5L40.5 16.5L38 17.5L37 20L36 17.5L33.5 16.5L36 15.5L37 13Z" fill="#FBBF24" />
  </svg>
);

// 3D Ride / City Cab Icon
export const TabRideIcon = ({ size = 36, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    <defs>
      <linearGradient id="cabBody" x1="27" y1="18" x2="27" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE047" />
        <stop offset="0.6" stopColor="#F59E0B" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
    {/* Shadow */}
    <ellipse cx="27" cy="44" rx="17" ry="3.5" fill="#000000" fillOpacity="0.4" />
    {/* Taxi Sign on top */}
    <rect x="23" y="15" width="8" height="4" rx="1" fill="#FFFFFF" stroke="#000000" strokeWidth="0.8" />
    <rect x="24.5" y="16" width="5" height="2" fill="#F59E0B" />
    {/* Car Roof & Cabin */}
    <path d="M18 24L21 19H33L36 24H18Z" fill="#0F172A" />
    {/* Windshield Sheen */}
    <path d="M22 20H32L34.5 24H19.5L22 20Z" fill="#38BDF8" fillOpacity="0.75" />
    {/* Car Main Body */}
    <rect x="11" y="24" width="32" height="12" rx="4" fill="url(#cabBody)" />
    {/* Checkered side strip */}
    <rect x="11" y="29" width="32" height="2.5" fill="#000000" fillOpacity="0.2" />
    {/* Headlights */}
    <circle cx="14" cy="30" r="2" fill="#FEF08A" />
    <circle cx="40" cy="30" r="2" fill="#FEF08A" />
    {/* Wheels */}
    <circle cx="17" cy="39" r="4.5" fill="#1E293B" />
    <circle cx="17" cy="39" r="2" fill="#94A3B8" />
    <circle cx="37" cy="39" r="4.5" fill="#1E293B" />
    <circle cx="37" cy="39" r="2" fill="#94A3B8" />
  </svg>
);

// 3D Travel / Airplane & Suitcase Icon
export const TabTravelIcon = ({ size = 36, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    <defs>
      <linearGradient id="planeGrad" x1="16" y1="12" x2="38" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#67E8F9" />
        <stop offset="0.6" stopColor="#06B6D4" />
        <stop offset="1" stopColor="#0E7490" />
      </linearGradient>
    </defs>
    <ellipse cx="27" cy="45" rx="14" ry="3" fill="#000000" fillOpacity="0.35" />
    {/* Jet Airplane Climbing */}
    <path d="M27 10L31 20L41 24L39 27L31 25L29 36L33 39V41L27 40L21 41V39L25 36L23 25L15 27L13 24L23 20L27 10Z" fill="url(#planeGrad)" />
    {/* Cockpit Glass */}
    <ellipse cx="27" cy="15" rx="1.5" ry="2.5" fill="#FFFFFF" fillOpacity="0.9" />
    {/* Wing Contrail / Swoosh */}
    <path d="M12 36C18 34 36 34 42 36" stroke="#E0F2FE" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" />
  </svg>
);

// 3D Rent / Modern Apartment & Key Icon
export const TabRentIcon = ({ size = 36, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    <defs>
      <linearGradient id="buildingGrad" x1="22" y1="14" x2="22" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="0.7" stopColor="#059669" />
        <stop offset="1" stopColor="#065F46" />
      </linearGradient>
      <linearGradient id="keyGrad" x1="34" y1="20" x2="42" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FDE047" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
    <ellipse cx="27" cy="45" rx="15" ry="3" fill="#000000" fillOpacity="0.35" />
    {/* Apartment Building */}
    <rect x="13" y="16" width="18" height="26" rx="2" fill="url(#buildingGrad)" />
    {/* Windows */}
    <rect x="16" y="20" width="3" height="3" rx="0.5" fill="#FEF3C7" />
    <rect x="21" y="20" width="3" height="3" rx="0.5" fill="#FEF3C7" />
    <rect x="26" y="20" width="3" height="3" rx="0.5" fill="#FEF3C7" />
    <rect x="16" y="26" width="3" height="3" rx="0.5" fill="#FEF3C7" />
    <rect x="21" y="26" width="3" height="3" rx="0.5" fill="#FEF3C7" />
    <rect x="26" y="26" width="3" height="3" rx="0.5" fill="#FEF3C7" />
    <rect x="16" y="32" width="3" height="3" rx="0.5" fill="#FEF3C7" />
    <rect x="21" y="32" width="3" height="3" rx="0.5" fill="#FEF3C7" />
    <rect x="26" y="32" width="3" height="3" rx="0.5" fill="#FEF3C7" />
    {/* Entrance Door */}
    <rect x="20" y="37" width="4" height="5" rx="0.5" fill="#064E3B" />
    {/* Golden Key floating right */}
    <circle cx="38" cy="24" r="5" fill="none" stroke="url(#keyGrad)" strokeWidth="2.5" />
    <path d="M38 29V39L41 39M38 35L40 35" stroke="url(#keyGrad)" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 3D BURGER WITH STARBURST SPLASH FOR 80% OFF BANNER
export const BannerBurgerWithBurst = ({ size = 88, className = "" }) => (
  <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    {/* Dark Purple Starburst Silhouette behind Burger */}
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#1b0945]" fill="currentColor">
      <polygon points="50,2 62,22 84,11 80,35 100,43 85,60 97,78 74,80 72,100 50,88 28,100 26,80 3,78 15,60 0,43 20,35 16,11 38,22" />
    </svg>

    {/* 3D Tilted Burger */}
    <div className="relative z-10 transform -rotate-12 scale-110">
      <svg width={size * 0.78} height={size * 0.78} viewBox="0 0 64 64" fill="none">
        {/* Shadow */}
        <ellipse cx="32" cy="54" rx="20" ry="4" fill="#000000" fillOpacity="0.5" />

        {/* Bottom Bun */}
        <path d="M14 43C14 49 22 53 32 53C42 53 50 49 50 43V38H14V43Z" fill="#E28935" />

        {/* Melted Cheese with dripping corner */}
        <path d="M12 36L20 44L28 36L36 45L44 36L52 41V35H12V36Z" fill="#FBBF24" />
        <path d="M14 36L20 42L28 35L36 43L44 35H14V36Z" fill="#FDE047" />

        {/* Thick Beef/Patty */}
        <rect x="11" y="30" width="42" height="7" rx="3.5" fill="#54210B" />
        <path d="M14 32H50" stroke="#381506" strokeWidth="1.5" strokeLinecap="round" />

        {/* Tomato Slices */}
        <rect x="13" y="26" width="18" height="5" rx="2.5" fill="#DC2626" />
        <rect x="33" y="26" width="18" height="5" rx="2.5" fill="#DC2626" />

        {/* Wavy Crisp Lettuce */}
        <path 
          d="M9 28C12 25 15 29 19 26C23 23 26 28 30 25C34 22 37 27 41 24C45 21 48 26 52 23C54 21 56 25 57 24" 
          stroke="#22C55E" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />

        {/* Plump Top Bun with Sesame Seeds */}
        <path d="M11 24C11 13 20 8 32 8C44 8 53 13 53 24H11Z" fill="url(#bannerBunGrad)" />
        
        {/* Top Bun Highlight */}
        <ellipse cx="32" cy="14" rx="16" ry="4.5" fill="#FEF08A" fillOpacity="0.6" />

        {/* Scattered Sesame Seeds */}
        <ellipse cx="22" cy="14" rx="1.5" ry="1" fill="#FFFBEB" transform="rotate(-15 22 14)" />
        <ellipse cx="32" cy="11" rx="1.5" ry="1" fill="#FFFBEB" />
        <ellipse cx="42" cy="14" rx="1.5" ry="1" fill="#FFFBEB" transform="rotate(15 42 14)" />
        <ellipse cx="27" cy="18" rx="1.5" ry="1" fill="#FFFBEB" transform="rotate(10 27 18)" />
        <ellipse cx="37" cy="18" rx="1.5" ry="1" fill="#FFFBEB" transform="rotate(-10 37 18)" />
        <ellipse cx="18" cy="20" rx="1.5" ry="1" fill="#FFFBEB" transform="rotate(-20 18 20)" />
        <ellipse cx="46" cy="20" rx="1.5" ry="1" fill="#FFFBEB" transform="rotate(20 46 20)" />

        <defs>
          <linearGradient id="bannerBunGrad" x1="32" y1="8" x2="32" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FBBF24" />
            <stop offset="0.6" stopColor="#E28935" />
            <stop offset="1" stopColor="#B45309" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
);

// 3D PIZZA SLICE WITH STARBURST SPLASH FOR 80% OFF BANNER
export const BannerPizzaWithBurst = ({ size = 88, className = "" }) => (
  <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
    {/* Dark Purple Starburst Silhouette behind Pizza */}
    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#1b0945]" fill="currentColor">
      <polygon points="50,2 62,22 84,11 80,35 100,43 85,60 97,78 74,80 72,100 50,88 28,100 26,80 3,78 15,60 0,43 20,35 16,11 38,22" />
    </svg>

    {/* 3D Tilted Pizza Slice */}
    <div className="relative z-10 transform rotate-12 scale-110">
      <svg width={size * 0.78} height={size * 0.78} viewBox="0 0 64 64" fill="none">
        {/* Crust Shadow */}
        <path d="M12 17C24 10 44 10 56 16L34 58L12 17Z" fill="#000000" fillOpacity="0.4" />

        {/* Cheese Body */}
        <path d="M14 17C25 11 43 11 54 16L34 56L14 17Z" fill="url(#pizzaCheeseGrad)" />

        {/* Melted dripping tip */}
        <path d="M34 56C33 58 31 59 30 58C29 57 31 54 34 56Z" fill="#FBBF24" />

        {/* Golden Puffy Crust Top Rim */}
        <ellipse cx="34" cy="14" rx="22" ry="5.5" fill="#D97706" />
        <ellipse cx="34" cy="13" rx="21" ry="4.5" fill="#F59E0B" />
        <ellipse cx="34" cy="12" rx="19" ry="3" fill="#FDE68A" fillOpacity="0.7" />

        {/* Crust blister spots */}
        <circle cx="24" cy="13" r="1.5" fill="#92400E" />
        <circle cx="36" cy="12" r="1.2" fill="#92400E" />
        <circle cx="44" cy="14" r="1.5" fill="#92400E" />

        {/* Pepperoni Slices with darker red borders */}
        <circle cx="28" cy="24" r="4.5" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
        <circle cx="40" cy="28" r="4.2" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
        <circle cx="31" cy="38" r="3.8" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
        
        {/* Pepperoni seasoning dots */}
        <circle cx="27" cy="23" r="0.8" fill="#7F1D1D" />
        <circle cx="29" cy="25" r="0.8" fill="#FEE2E2" />
        <circle cx="39" cy="27" r="0.8" fill="#7F1D1D" />
        <circle cx="30" cy="37" r="0.8" fill="#7F1D1D" />

        {/* Green Herb flakes */}
        <circle cx="20" cy="30" r="1.2" fill="#15803D" />
        <circle cx="38" cy="38" r="1.2" fill="#15803D" />
        <circle cx="45" cy="22" r="1" fill="#15803D" />
        <circle cx="24" cy="42" r="1" fill="#15803D" />

        <defs>
          <linearGradient id="pizzaCheeseGrad" x1="34" y1="13" x2="34" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE047" />
            <stop offset="0.7" stopColor="#FBBF24" />
            <stop offset="1" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
);

// Aliases for compatibility
export const BurgerIcon = TabBurgerIcon;
export const GroceryBagIcon = TabInstamartBasketIcon;
export const ClocheIcon = TabDineoutClocheIcon;
export const DiscoBallIcon = TabScenesDiscoBallIcon;

// Free ₹20 Gold Coin Medallion
export const GoldCoinMedallion = ({ className = "" }) => (
  <div className={`relative flex items-center justify-center rounded-full bg-gradient-to-tr from-[#D97706] via-[#FBBF24] to-[#FEF3C7] p-[3px] shadow-[0_0_20px_rgba(251,191,36,0.6)] ${className}`}>
    <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#B45309]/50 flex flex-col items-center justify-center bg-gradient-to-b from-[#F59E0B] to-[#D97706] text-white shadow-inner">
      <span className="text-[10px] font-extrabold tracking-wider text-amber-100 uppercase">FREE</span>
      <span className="text-xl font-black leading-tight text-white drop-shadow-md">₹20</span>
    </div>
  </div>
);
