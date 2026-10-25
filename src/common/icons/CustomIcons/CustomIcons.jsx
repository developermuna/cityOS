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



// 3D CityOS Hex Shield & Skyline Icon - Bolder & Cleaner
export const TabCityOSIcon = ({ size = 36, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    <defs>
      <linearGradient id="cityShieldNew" x1="27" y1="8" x2="27" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#4F46E5" />
        <stop offset="1" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    {/* Hexagon Shield */}
    <path d="M27 6L44 15V35L27 45L10 35V15L27 6Z" fill="url(#cityShieldNew)" />
    {/* White Building Silhouette - Very Clear */}
    <path d="M23 18H27V38H23V18Z" fill="white" />
    <path d="M27 15H31V38H27V15Z" fill="white" fillOpacity="0.8" />
    <path d="M19 23H23V38H19V23Z" fill="white" fillOpacity="0.6" />
    <circle cx="27" cy="12" r="1.5" fill="#FBBF24" />
  </svg>
);

// 3D Shop Bag - Bolder Red
export const TabShopIcon = ({ size = 36, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    <defs>
      <linearGradient id="shopBagNew" x1="27" y1="14" x2="27" y2="46" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F43F5E" />
        <stop offset="1" stopColor="#BE123C" />
      </linearGradient>
    </defs>
    {/* Handles */}
    <path d="M20 20V14C20 10.1 23.1 7 27 7C30.9 7 34 10.1 34 14V20" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
    {/* Bag Body */}
    <path d="M14 18L18 45H36L40 18H14Z" fill="url(#shopBagNew)" />
    {/* Sparkle */}
    <path d="M27 26L28.5 30L32.5 31.5L28.5 33L27 37L25.5 33L21.5 31.5L25.5 30L27 26Z" fill="#FEF08A" />
  </svg>
);

// 3D Grocery Basket - Bold Green
export const TabInstamartBasketIcon = ({ size = 38, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    {/* Fresh Produce silhouettes */}
    <rect x="20" y="12" width="6" height="14" rx="3" fill="#F97316" />
    <rect x="28" y="10" width="6" height="16" rx="3" fill="#22C55E" />
    <circle cx="18" cy="20" r="5" fill="#EF4444" />
    {/* Basket */}
    <rect x="10" y="22" width="34" height="18" rx="4" fill="#2E7D32" />
    <rect x="8" y="22" width="38" height="5" rx="2" fill="#1B5E20" />
    {/* Slats */}
    <rect x="14" y="30" width="6" height="6" rx="1" fill="#1B5E20" opacity="0.4" />
    <rect x="24" y="30" width="6" height="6" rx="1" fill="#1B5E20" opacity="0.4" />
    <rect x="34" y="30" width="6" height="6" rx="1" fill="#1B5E20" opacity="0.4" />
  </svg>
);

// Bolder Burger Icon
export const TabBurgerIcon = ({ size = 38, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    <path d="M10 24C10 16 17 10 27 10C37 10 44 16 44 24H10Z" fill="#F59E0B" />
    <rect x="8" y="26" width="38" height="4" rx="2" fill="#22C55E" />
    <rect x="8" y="30" width="38" height="6" rx="3" fill="#78350F" />
    <path d="M10 36C10 40 17 44 27 44C37 44 44 40 44 36V34H10V36Z" fill="#D97706" />
    {/* Cheese */}
    <path d="M10 30L44 34V30H10Z" fill="#FBBF24" />
  </svg>
);

// Bolder Ride / Taxi Icon
export const TabRideIcon = ({ size = 36, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    {/* Taxi Body */}
    <rect x="10" y="22" width="34" height="14" rx="4" fill="#FBBF24" />
    <path d="M16 22L20 14H34L38 22H16Z" fill="#1E293B" />
    {/* Windshield */}
    <path d="M21 15H33L35 21H19L21 15Z" fill="#7DD3FC" />
    {/* Taxi Sign */}
    <rect x="23" y="11" width="8" height="3" rx="1" fill="white" stroke="black" strokeWidth="1" />
    {/* Wheels */}
    <circle cx="16" cy="38" r="4" fill="#1E293B" />
    <circle cx="38" cy="38" r="4" fill="#1E293B" />
    {/* Lights */}
    <circle cx="14" cy="27" r="2" fill="white" />
    <circle cx="40" cy="27" r="2" fill="white" />
  </svg>
);

// Bolder Service / Tools Icon
export const TabServiceIcon = ({ size = 36, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    <defs>
      <linearGradient id="toolGrad" x1="16" y1="12" x2="38" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38BDF8" />
        <stop offset="1" stopColor="#0284C7" />
      </linearGradient>
    </defs>
    {/* Crossed Tools (Simplified) */}
    <rect x="14" y="24" width="28" height="6" rx="3" transform="rotate(-45 28 27)" fill="url(#toolGrad)" />
    <rect x="14" y="24" width="28" height="6" rx="3" transform="rotate(45 28 27)" fill="url(#toolGrad)" />
    <circle cx="28" cy="27" r="6" fill="#0C4A6E" />
    <path d="M28 23V31M24 27H32" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Bolder Travel / Airplane Icon
export const TabTravelIcon = ({ size = 36, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    <path d="M12 30L22 28L27 10L32 28L42 30L32 32L27 44L22 32L12 30Z" fill="#0EA5E9" />
    <path d="M27 10L30 20H24L27 10Z" fill="#7DD3FC" />
    <circle cx="27" cy="18" r="1.5" fill="white" />
  </svg>
);

// Bolder Rent / House Icon
export const TabRentIcon = ({ size = 36, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 54 54" fill="none" className={className}>
    {/* House */}
    <path d="M10 24L27 10L44 24V44H10V24Z" fill="#F97316" />
    <path d="M27 10L44 24H10L27 10Z" fill="#FB923C" />
    <rect x="23" y="32" width="8" height="12" fill="#7C2D12" />
    {/* Key silhouette */}
    <circle cx="38" cy="18" r="4" fill="white" fillOpacity="0.8" />
    <rect x="37" y="22" width="2" height="8" fill="white" fillOpacity="0.8" />
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

// Free ₹20 Gold Coin Medallion
export const GoldCoinMedallion = ({ className = "" }) => (
  <div className={`relative flex items-center justify-center rounded-full bg-[#FBBF24] p-[3px] shadow-[0_0_20px_rgba(251,191,36,0.6)] ${className}`}>
    <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#B45309]/50 flex flex-col items-center justify-center bg-[#F59E0B] text-white shadow-inner">
      <span className="text-[10px] font-extrabold tracking-wider text-amber-100 uppercase">FREE</span>
      <span className="text-xl font-black leading-tight text-white drop-shadow-md">₹20</span>
    </div>
  </div>
);
