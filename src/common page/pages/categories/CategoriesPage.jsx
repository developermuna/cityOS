import React, { useState } from 'react';
import { categoriesDataByHub } from './categoriesData';
import { CategoriesPageHeader } from './CategoriesPageHeader';
import { CategorySidebar } from './CategorySidebar';
import { PopularStoresSection } from './PopularStoresSection';
import { UpcomingLaunchesSection } from './UpcomingLaunchesSection';
import { RecentlyViewedSection } from './RecentlyViewedSection';
import { TryThisSection } from './TryThisSection';
import { MoreOnCityOSSection } from './MoreOnCityOSSection';

export const CategoriesPage = ({ 
  activeHub = 'shop', 
  onBack,
  onOpenCart,
  cartCount = 0,
  onSelectCategoryItem, 
  showToast 
}) => {
  // Retrieve hub specific category data or fallback to cityos / shop
  const hubKey = categoriesDataByHub[activeHub] ? activeHub : 'cityos';
  const hubData = categoriesDataByHub[hubKey];

  const [selectedSidebarId, setSelectedSidebarId] = useState(hubData.sidebar[0]?.id || 'all');

  const handleSelectItem = (item) => {
    const name = item.name || item.label || 'Item';
    if (onSelectCategoryItem) {
      onSelectCategoryItem(item);
    } else if (showToast) {
      showToast(`Selected ${name} in ${hubData.hubName}`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white text-slate-900 font-sans select-none overflow-hidden pb-14">
      {/* 1. Category Page Header: Back Arrow Button, Category Text Title, Search Button & Cart Badge */}
      <CategoriesPageHeader 
        title={activeHub === 'cityos' ? 'All Categories' : hubData.hubName}
        onBack={onBack}
        onSearch={(query) => handleSelectItem({ name: query })}
        onOpenCart={onOpenCart}
        cartCount={cartCount}
      />

      {/* 2. Main Content Split: Left Sticky Sidebar + Right Scrollable Sections */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sticky Vertical Sidebar */}
        <CategorySidebar 
          categories={hubData.sidebar}
          activeCategoryId={selectedSidebarId}
          themeColor={hubData.themeColor}
          onCategoryClick={(cat) => {
            setSelectedSidebarId(cat.id);
            if (showToast) showToast(`Filter: ${cat.name}`);
          }}
        />

        {/* Right Scrollable Category Grids & Sections */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-6 no-scrollbar bg-white">
          {/* Section 1: Popular Store / Categories Grid */}
          <PopularStoresSection 
            stores={hubData.popularStores} 
            title={activeHub === 'shop' ? 'Popular Store' : `${hubData.hubName.split(' ')[0]} Popular Stores`}
            onSelectStore={handleSelectItem}
          />

          {/* Section 2: New & Upcoming Launches */}
          <UpcomingLaunchesSection 
            launches={hubData.launches}
            themeColor={hubData.themeColor}
            onSelectLaunch={handleSelectItem}
          />

          {/* Section 3: Recently Viewed Stores */}
          <RecentlyViewedSection 
            items={hubData.recentlyViewed}
            onSelectItem={handleSelectItem}
          />

          {/* Section 4: Have you tried? */}
          <TryThisSection 
            items={hubData.haveYouTried}
            onSelectFeature={handleSelectItem}
          />

          {/* Section 5: More on cityOS / Hub */}
          <MoreOnCityOSSection 
            items={hubData.moreOnCityOS}
            title={activeHub === 'cityos' ? 'More on cityOS' : `More on ${hubData.hubName.split(' ')[0]}`}
            onSelectMore={handleSelectItem}
          />
        </div>
      </div>
    </div>
  );
};
