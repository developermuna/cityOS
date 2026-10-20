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
  children 
}) => {
  return (
    <div className="w-full min-h-screen bg-white text-slate-900 pb-12 select-none">
      {/* Top Dark Midnight Purple Section Header */}
      <div className="w-full bg-gradient-to-b from-[#0b041a] via-[#100726] to-[#150836] pb-3 text-white shadow-lg rounded-b-[28px]">
        {/* Header: Location & Tabs */}
        <Header
          activeTab={activeTab}
          onTabChange={onTabChange}
          onLocationClick={onLocationClick}
          onMenuClick={onMenuClick}
          theme="dark"
        />

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSearch={() => {}}
        />

        {/* Mega Promo Banner */}
        <MegaPromoBanner />
      </div>

      {/* Body Content with White Background and Smooth Transition */}
      <div className="w-full pt-3 bg-white page-transition">
        {children}
      </div>
    </div>
  );
};
