import React, { useState } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { PageLayout } from './components/PageLayout';
import { InstamartPage } from './components/InstamartPage';
import { 
  CityOSHubPageContent, 
  ShopHubPageContent, 
  ServiceHubPageContent, 
  RideHubPageContent, 
  TravelHubPageContent, 
  RentHubPageContent 
} from './components/CityHubPages';
import { DineoutPageContent } from './components/DineoutPage';
import { ScenesPageContent } from './components/ScenesPage';
import { BoltBanner } from './components/BoltBanner';
import { FilterPills } from './components/FilterPills';
import { OfferCardsScroll } from './components/OfferCardsScroll';
import { Store99Section } from './components/Store99Section';
import { CashbackBanner } from './components/CashbackBanner';
import { MindCategories } from './components/MindCategories';
import { FilterBar } from './components/FilterBar';
import { RestaurantCard } from './components/RestaurantCard';
import { CartFloatingBar } from './components/CartFloatingBar';
import { featuredRestaurants, store99Items, instamartData } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('cityos');
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
  const [isCartOpen, setIsCartOpen] = useState(false);
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

  const isGrocery = activeTab === 'grocery' || activeTab === 'instamart';

  const totalCartItems = Object.values(cartItems).reduce((sum, count) => sum + count, 0);

  return (
    <MobileFrame>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-white/20 backdrop-blur-md animate-fade-in">
          {toastMessage}
        </div>
      )}

      {isGrocery ? (
        <InstamartPage 
          onTabChange={setActiveTab}
          onAddToCart={handleAddToCart}
          cartItems={cartItems}
        />
      ) : (
        <PageLayout
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onMenuClick={() => showToast("Account & CityOS Settings")}
          onLocationClick={() => showToast("Location: Mumbai Central (Deliver here)")}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={totalCartItems}
          onCartClick={() => setIsCartOpen(true)}
        >
          {activeTab === 'cityos' ? (
            <CityOSHubPageContent onTabChange={setActiveTab} />
          ) : activeTab === 'shop' ? (
            <ShopHubPageContent />
          ) : activeTab === 'service' ? (
            <ServiceHubPageContent />
          ) : activeTab === 'ride' ? (
            <RideHubPageContent />
          ) : activeTab === 'travel' ? (
            <TravelHubPageContent />
          ) : activeTab === 'rent' ? (
            <RentHubPageContent />
          ) : activeTab === 'dineout' ? (
            <DineoutPageContent />
          ) : activeTab === 'scenes' ? (
            <ScenesPageContent />
          ) : (
            <>
              {/* Default Food Page Content */}
              <BoltBanner onOrderNow={() => showToast("Opening Bolt 15-min lightning kitchen")} />

              <FilterPills
                activeFilter={activeTopFilter}
                onFilterChange={(filter) => {
                  setActiveTopFilter(prev => prev === filter ? 'none' : filter);
                  showToast(`Filter applied: ${filter === 'discount100' ? 'MIN Rs. 100 OFF' : 'FAST DELIVERY'}`);
                }}
              />

              <OfferCardsScroll onCardClick={(card) => showToast(`Selected ${card.fullName}`)} />

              <Store99Section
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
              />

              <CashbackBanner onClaim={() => showToast("₹20 Free Cash activated for checkout!")} />

              <MindCategories
                onSelectCategory={(cat) => {
                  setSearchQuery(cat.name === 'Corner' ? 'Sweets' : cat.name);
                  showToast(`Browsing ${cat.name}`);
                }}
              />

              <FilterBar
                selectedFilters={filterToggles}
                onToggleFilter={handleToggleFilter}
              />

              <div className="w-full px-4 mb-3">
                <h2 className="text-[17px] font-black text-slate-900 tracking-tight leading-tight">
                  Top 2028 restaurants to explore
                </h2>
                <p className="text-[12px] text-slate-500 font-semibold tracking-tight mt-0.5">
                  Featured Restaurants
                </p>
              </div>

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
            </>
          )}
        </PageLayout>
      )}

      {/* Floating Bottom Cart Bar & Checkout Modal */}
      <CartFloatingBar
        cartItems={cartItems}
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        storeItems={[
          ...store99Items,
          ...instamartData.freshStore.map(i => ({ ...i, dealPrice: i.price })),
          ...instamartData.farmToDoor.map(i => ({ ...i, dealPrice: i.price }))
        ]}
        onClearCart={handleClearCart}
      />
    </MobileFrame>
  );
}
