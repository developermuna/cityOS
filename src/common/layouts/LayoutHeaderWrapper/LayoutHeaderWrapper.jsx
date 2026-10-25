import React, { useState, useEffect } from 'react';
import { Header } from '@/common/navigation/Header/Header';
import { SearchBar } from '@/common/navigation/SearchBar/SearchBar';
import { BoltBanner } from '@/common/components/BoltBanner/BoltBanner';
import { MindCategories } from '@/common/components/MindCategories/MindCategories';
import { MapPin, Search, X } from 'lucide-react';
import { reverseGeocode } from '@/services/olaMapsService';

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
  onSelectCategory,
  ridePickup,
  setRidePickup,
  rideDestination,
  setRideDestination
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

      {/* 2. STICKY SEARCH BAR / RIDE ROUTE INPUTS (70% opacity, locks firmly to top: 0) */}
      <div 
        className="sticky top-0 z-50 w-full select-none backdrop-blur-md"
        style={{
          ...hubBackgroundStyle,
          position: 'sticky',
          top: 0
        }}
      >
        {activeTab === 'ride' ? (
          <div className="w-full px-4 py-2">
            <div className="bg-white rounded-xl border border-slate-200 p-1.5 space-y-1 shadow-md">
              {/* Pickup Input */}
              <div className="flex items-center gap-2 px-2 py-0.5">
                <button 
                  onClick={async () => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(async (pos) => {
                        const { latitude, longitude } = pos.coords;
                        const info = await reverseGeocode(latitude, longitude);
                        setRidePickup(info.name || info.formattedAddress || 'Current Location');
                      });
                    }
                  }}
                  className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 active:scale-90 transition-transform cursor-pointer"
                  title="Set Current Location"
                >
                  <MapPin size={12} className="stroke-[3]" />
                </button>
                <div className="flex-1 min-w-0">
                  <span className="block text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">FROM</span>
                  <input 
                    type="text" 
                    value={ridePickup}
                    onChange={(e) => setRidePickup(e.target.value)}
                    placeholder="Pickup Location" 
                    className="bg-transparent text-slate-950 text-[11px] font-black outline-none w-full placeholder:text-slate-400 truncate pr-1"
                  />
                </div>
                {ridePickup && (
                  <button 
                    onClick={() => setRidePickup('')}
                    className="p-1 rounded-full text-slate-300 hover:text-slate-500 active:text-slate-900 transition-colors"
                  >
                    <X size={10} strokeWidth={3} />
                  </button>
                )}
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-100 mx-2 ml-8" />

              {/* Destination Input */}
              <div className="flex items-center gap-2 px-2 py-0.5">
                <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                  <Search size={12} className="stroke-[3]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">TO</span>
                  <input 
                    type="text" 
                    value={rideDestination}
                    onChange={(e) => setRideDestination(e.target.value)}
                    placeholder="Where to?" 
                    className="bg-transparent text-slate-950 text-[11px] font-black outline-none w-full placeholder:text-slate-400 truncate pr-1"
                  />
                </div>
                {rideDestination && (
                  <button 
                    onClick={() => setRideDestination('')}
                    className="p-1 rounded-full text-slate-300 hover:text-slate-500 active:text-slate-900 transition-colors"
                  >
                    <X size={10} strokeWidth={3} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            _onSearch={(q) => setSearchQuery(q)}
            themeConfig={currentTheme}
            onLikeClick={onLikeClick}
          />
        )}
      </div>

      {/* 3. PROMOTIONAL AD BANNER (70% opacity, hidden on Ride page) */}
      {activeTab !== 'ride' && (
        <section 
          className="w-full select-none overflow-hidden backdrop-blur-md"
          style={hubBackgroundStyle}
          aria-label="Promotion Banner"
        >
          <BoltBanner onOrderNow={onBoltOrderNow} _themeConfig={currentTheme} />
        </section>
      )}

      {/* 4. STICKY QUICK CATEGORY CIRCLE BUTTONS (70% opacity, sticks below search bar) */}
      {/* Hide category circle section on scroll only for ride page */}
      {!(activeTab === 'ride' && isScrolled) && (
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
      )}
    </>
  );
};
