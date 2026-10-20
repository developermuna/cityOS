import React, { useState } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { StatusBar } from './components/StatusBar';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { MegaPromoBanner } from './components/MegaPromoBanner';
import { BoltBanner } from './components/BoltBanner';
import { FilterPills } from './components/FilterPills';
import { OfferCardsScroll } from './components/OfferCardsScroll';
import { Store99Section } from './components/Store99Section';
import { CashbackBanner } from './components/CashbackBanner';
import { MindCategories } from './components/MindCategories';
import { FilterBar } from './components/FilterBar';
import { RestaurantCard } from './components/RestaurantCard';
import { CartFloatingBar } from './components/CartFloatingBar';
import { InstamartPage } from './components/InstamartPage';
import { DineoutPage } from './components/DineoutPage';
import { ScenesPage } from './components/ScenesPage';
import { featuredRestaurants, store99Items } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('food');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopFilter, setActiveTopFilter] = useState('none');
  const [filterToggles, setFilterToggles] = useState({
    filterModal: false,
    sortBy: false,
    store99: false,
    bolt15: false,
    rating4: false
  });
  const [cartItems, setCartItems] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  // Show quick toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart operations
  const handleAddToCart = (item) => {
    setCartItems(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
    showToast(`Added ${item.name} to cart`);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prev => {
      const next = { ...prev };
      if (next[itemId] > 1) {
        next[itemId] -= 1;
      } else {
        delete next[itemId];
      }
      return next;
    });
  };

  const handleClearCart = () => {
    setCartItems({});
  };

  const handleToggleFilter = (key) => {
    setFilterToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    if (key === 'store99') {
      showToast("Filtering 99 Store deals");
    } else if (key === 'bolt15') {
      showToast("Showing Bolt 15-min delivery restaurants");
    }
  };

  // Filter restaurants based on search & filters
  const filteredRestaurants = featuredRestaurants.filter(res => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = res.name.toLowerCase().includes(q);
      const matchCuisine = res.cuisines.toLowerCase().includes(q);
      const matchSpec = res.speciality && res.speciality.toLowerCase().includes(q);
      if (!matchName && !matchCuisine && !matchSpec) return false;
    }
    if (filterToggles.bolt15 && !res.hasBolt && !res.deliveryTime.includes('15')) return false;
    if (filterToggles.rating4 && parseFloat(res.rating) < 4.2) return false;
    return true;
  });

  return (
    <MobileFrame>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-white/20 backdrop-blur-md animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Main App Content - Conditioned on Active Tab */}
      {activeTab === 'instamart' ? (
        <InstamartPage 
          onTabChange={setActiveTab}
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
        />
      ) : activeTab === 'dineout' ? (
        <DineoutPage onTabChange={setActiveTab} />
      ) : activeTab === 'scenes' ? (
        <ScenesPage onTabChange={setActiveTab} />
      ) : (
        <div className="w-full min-h-screen bg-white text-slate-900 pb-12 select-none">
          
          {/* Top Dark Midnight Purple Section Header matching category header.jpeg */}
          <div className="w-full bg-gradient-to-b from-[#0b041a] via-[#100726] to-[#150836] pt-1 pb-3 text-white shadow-lg rounded-b-[28px]">
            {/* Header: Location & 4 Tabs (Food, Instamart, Dineout, Scenes) */}
            <Header
              activeTab={activeTab}
              onTabChange={setActiveTab}
              onLocationClick={() => showToast("Location: Mumbai Central (Deliver here)")}
              onMenuClick={() => showToast("Account & CityOS Settings")}
            />

            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={() => {}}
            />

            {/* Mega Promo Banner (80% OFF UP TO ₹160 with countdown timer) */}
            <MegaPromoBanner />
          </div>

          {/* Body Content with White Background and Smooth Transition */}
          <div className="w-full pt-3 bg-white page-transition">
            {/* 1. Bolt Food In 15 Mins Banner */}
            <BoltBanner onOrderNow={() => showToast("Opening Bolt 15-min lightning kitchen")} />

            {/* 3. Filter Toggle Pills (MIN Rs. 100 OFF | FAST DELIVERY) */}
            <FilterPills
              activeFilter={activeTopFilter}
              onFilterChange={(filter) => {
                setActiveTopFilter(prev => prev === filter ? 'none' : filter);
                showToast(`Filter applied: ${filter === 'discount100' ? 'MIN Rs. 100 OFF' : 'FAST DELIVERY'}`);
              }}
            />

            {/* 4. Horizontal Scroll Restaurant Offer Cards (Zulu's Pizza, Amar Veg, Nom Nom) */}
            <OfferCardsScroll 
              onCardClick={(card) => showToast(`Selected ${card.fullName}`)}
            />

            {/* 5. 99 Store Section */}
            <Store99Section
              cartItems={cartItems}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
            />

            {/* 6. ₹20 Free Cash Banner */}
            <CashbackBanner 
              onClaim={() => showToast("₹20 Free Cash activated for checkout!")}
            />

            {/* 7. What's on your mind? Circular Food Categories */}
            <MindCategories
              onSelectCategory={(cat) => {
                setSearchQuery(cat.name === 'Corner' ? 'Sweets' : cat.name);
                showToast(`Browsing ${cat.name}`);
              }}
            />

            {/* 8. Sticky Filter & Sorting Bar */}
            <FilterBar
              selectedFilters={filterToggles}
              onToggleFilter={handleToggleFilter}
            />

            {/* 9. Top 2028 restaurants to explore */}
            <div className="w-full px-4 mb-3">
              <h2 className="text-[17px] font-black text-slate-900 tracking-tight leading-tight">
                Top 2028 restaurants to explore
              </h2>
              <p className="text-[12px] text-slate-500 font-semibold tracking-tight mt-0.5">
                Featured Restaurants
              </p>
            </div>

            {/* Restaurant Cards List */}
            <div className="w-full px-4">
              {filteredRestaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onSelect={(res) => showToast(`Opened menu for ${res.name}`)}
                />
              ))}

              {filteredRestaurants.length === 0 && (
                <div className="py-12 text-center text-slate-400">
                  <p className="font-bold text-sm">No matching restaurants found</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setFilterToggles({}); }}
                    className="mt-2 text-xs font-bold text-orange-500 underline"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Floating Bottom Cart Bar & Checkout Modal */}
      <CartFloatingBar
        cartItems={cartItems}
        storeItems={store99Items}
        onClearCart={handleClearCart}
      />
    </MobileFrame>
  );
}
