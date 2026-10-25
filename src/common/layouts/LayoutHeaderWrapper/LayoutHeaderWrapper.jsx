import React, { useState, useEffect } from 'react';
import { Header } from '@/common/navigation/Header/Header';
import { SearchBar } from '@/common/navigation/SearchBar/SearchBar';
import { BoltBanner } from '@/common/components/BoltBanner/BoltBanner';
import { MindCategories } from '@/common/components/MindCategories/MindCategories';

export const LayoutHeaderWrapper = ({ 
  activeTab, 
  onTabChange, 
  onLocationClick, 
  onMenuClick, 
  onNotificationClick, 
  currentTheme, 
  searchQuery, 
  setSearchQuery, 
  onLikeClick, 
  onBoltOrderNow, 
  onSelectCategory 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      setIsScrolled(scrollPos > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const hubBackgroundStyle = {
    backgroundColor: currentTheme.rgba80 || `rgba(128, 0, 32, 0.8)`,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)'
  };

  return (
    <>
      {/* 1. TOP NAVIGATION HEADER & LOCATION BAR */}
      <div 
        className="w-full transition-colors duration-500 select-none backdrop-blur-md"
        style={hubBackgroundStyle}
      >
        <Header
          activeTab={activeTab}
          onTabChange={onTabChange}
          onLocationClick={onLocationClick}
          onMenuClick={onMenuClick}
          onNotificationClick={onNotificationClick}
          themeConfig={currentTheme}
        />
      </div>

      {/* 2. STICKY SEARCH BAR (70% opacity, locks firmly to top: 0) */}
      <div 
        className="sticky top-0 z-50 w-full select-none backdrop-blur-md"
        style={{
          ...hubBackgroundStyle,
          position: 'sticky',
          top: 0
        }}
      >
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          _onSearch={(q) => setSearchQuery(q)}
          themeConfig={currentTheme}
          onLikeClick={onLikeClick}
        />
      </div>

      {/* 3. PROMOTIONAL AD BANNER (70% opacity) */}
      <section 
        className="w-full select-none overflow-hidden backdrop-blur-md"
        style={hubBackgroundStyle}
        aria-label="Promotion Banner"
      >
        <BoltBanner onOrderNow={onBoltOrderNow} _themeConfig={currentTheme} />
      </section>

      {/* 4. STICKY QUICK CATEGORY CIRCLE BUTTONS (70% opacity, sticks below search bar) */}
      <div 
        className={`sticky top-[54px] z-40 w-full select-none transition-all duration-300 rounded-b-[24px] overflow-hidden backdrop-blur-md ${
          isScrolled ? 'shadow-md shadow-black/20' : 'shadow-none'
        }`}
        style={{
          ...hubBackgroundStyle,
          position: 'sticky',
          top: '54px'
        }}
      >
        <nav className="w-full py-1.5 bg-transparent" aria-label="Category Filters">
          <MindCategories 
            activeTab={activeTab}
            onSelectCategory={onSelectCategory} 
            themeConfig={currentTheme}
          />
        </nav>
      </div>
    </>
  );
};
