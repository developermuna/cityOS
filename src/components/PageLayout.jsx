import React from 'react';
import { Header } from './Header';
import { SearchBar } from './SearchBar';
import { MegaPromoBanner } from './MegaPromoBanner';

export const PageLayout = ({ 
  activeTab, 
  onTabChange, 
  onMenuClick, 
  onLocationClick, 
  searchQuery, 
  setSearchQuery, 
  cartCount = 0,
  onCartClick,
  children 
}) => {
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 pb-12 select-none">
      {/* Top Dark Midnight Purple Section: Header (Address + Tabs) */}
      <div className="w-full bg-gradient-to-b from-[#0b041a] via-[#100726] to-[#12072e] text-white">
        <Header
          activeTab={activeTab}
          onTabChange={onTabChange}
          onLocationClick={onLocationClick}
          onMenuClick={onMenuClick}
          theme="dark"
        />
      </div>

      {/* Sticky Search Bar: Direct child of the scrollable page container */}
      <div className="sticky top-0 z-50 bg-[#12072e] py-0 shadow-md">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={() => {}}
          cartCount={cartCount}
          onCartClick={onCartClick}
        />
      </div>

      {/* Mega Promo Banner with smooth rounded bottom transition */}
      <div className="w-full bg-[#12072e] pb-3 text-white shadow-lg rounded-b-[28px]">
        <MegaPromoBanner />
      </div>

      {/* Body Content with White Background and Smooth Transition */}
      <div className="w-full pt-3 bg-white page-transition">
        {children}
      </div>
    </div>
  );
};
