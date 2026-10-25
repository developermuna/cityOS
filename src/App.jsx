import React, { useState } from 'react';
import { MobileFrame } from './layout/global/MobileFrame';
import { PageLayout } from './layout/global/PageLayout';
import { GroceryHome } from './grocery hub/grocery/grocery home page/GroceryHome';
import { CityOSHome } from './cityOS hub/cityOS/cityOS home page/CityOSHome';
import { ShopHome } from './shop hub/shop/shop home page/ShopHome';
import { ServiceHome } from './service hub/service/service home page/ServiceHome';
import { RideHome } from './ride hub/ride/ride home page/RideHome';
import { TravelHome } from './travel hub/travel/travel home page/TravelHome';
import { RentHome } from './rent hub/rent/rent home page/RentHome';
import { FoodHome } from './food hub/food/food home page/FoodHome';
import { DineoutHome } from './food hub/food/dineout page/DineoutHome';
import { ScenesHome } from './scenes hub/scenes/scenes home page/ScenesHome';
import { CategoriesPage } from './common page/pages/categories/CategoriesPage';
import { BottomNav } from './layout/navigation/BottomNav';
import { FilterDrawer } from './common page/ui/FilterDrawer';
import { AddressSelector } from './common page/pages/location/AddressSelector';
import { NotificationsOverlay } from './common page/pages/notifications/NotificationsOverlay';
import { AccountOverlay } from './common page/pages/account/AccountOverlay';
import { CartPage } from './common page/pages/cart/CartPage';
import { LikePage } from './common page/pages/like/LikePage';
import { OrdersPage } from './common page/pages/orders/OrdersPage';
import { ProductDetailsPage } from './shop hub/shop/product page/ProductDetailsPage';
import { galaxyS25Product } from './shop hub/shop/product page/productDetailsData';
import { ToastContainer } from './common page/ui/ToastNotification';
import { featuredRestaurants, store99Items, instamartData } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('ride');
  const [isCategoriesView, setIsCategoriesView] = useState(false);
  const [lastHub, setLastHub] = useState('ride'); // Remembers which main hub we are in
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);
  const [cartItems, setCartItems] = useState({ 'store-1': 1, 'im-1': 2, 'm1': 1 });
  const [filterToggles, setFilterToggles] = useState({});
  const [activeTopFilter, setActiveTopFilter] = useState('none');
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAddressSelectorOpen, setIsAddressSelectorOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLikePageOpen, setIsLikePageOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isBookingMode, setIsBookingMode] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);

  // Demo Wishlist Data
  const [wishlistItems, setWishlistItems] = useState([
    { id: 'w1', name: 'ZEBRONICS SA127...', fullName: 'ZEBRONICS SA127 5.1 Multimedia Speaker', dealPrice: 7999, originalPrice: 28999, rating: '4.5', reviews: '1.2k', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },
    { id: 'w2', name: 'Electrobot Mini Pan...', fullName: 'Electrobot Mini Pancake Maker', dealPrice: 133, originalPrice: 350, rating: '4.2', reviews: '450', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400' },
    { id: 'w3', name: 'NEXTOY 20 PC...', fullName: 'NEXTOY 20 Piece Tool Set', dealPrice: 140, originalPrice: 599, rating: '4.0', reviews: '89', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400' },
    { id: 'm1', name: 'Wired Earphones', fullName: 'Premium Wired Earphones with Bass', dealPrice: 2107, originalPrice: 2999, rating: '4.6', reviews: '3.4k', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' }
  ]);

  // Show quick toast notification with auto-detection or object configuration
  const showToast = (toastInput) => {
    const id = Date.now() + Math.random();
    const newToast = typeof toastInput === 'string' ? { id, message: toastInput } : { id, ...toastInput };
    setToasts((prev) => [newToast, ...prev].slice(0, 3));
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => (typeof t === 'object' ? t.id : t) !== id));
  };

  // Cart operations with full metadata support
  const handleAddToCart = (item) => {
    if (!item || !item.id) return;
    const itemId = String(item.id);
    setCartItems(prev => {
      const current = prev[itemId];
      let newCount = 1;
      let existingData = {};
      if (typeof current === 'object' && current !== null) {
        newCount = (current.count || 1) + 1;
        existingData = current;
      } else if (typeof current === 'number') {
        newCount = current + 1;
      }
      return {
        ...prev,
        [itemId]: {
          ...existingData,
          ...item,
          id: itemId,
          count: newCount
        }
      };
    });
    const itemName = item.name || item.fullName || item.title || 'Item';
    showToast(`Added ${itemName} to cart`);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prev => {
      const current = prev[itemId];
      if (!current) return prev;
      const next = { ...prev };
      const currentCount = typeof current === 'object' ? current.count : current;
      if (currentCount > 1) {
        if (typeof current === 'object') {
          next[itemId] = { ...current, count: currentCount - 1 };
        } else {
          next[itemId] = currentCount - 1;
        }
      } else {
        delete next[itemId];
      }
      return next;
    });
  };

  const handleRemoveEntireItem = (itemId) => {
    setCartItems(prev => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    showToast("Item removed from cart");
  };

  const handleToggleWishlist = (item, isAddress = false) => {
    if (!item) return;
    const itemId = String(item.id);
    
    if (isAddress) {
      const exists = savedAddresses.some(a => String(a.id) === itemId);
      if (exists) {
        setSavedAddresses(prev => prev.filter(a => String(a.id) !== itemId));
        showToast(`Removed from saved locations`);
      } else {
        const newAddr = {
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          icon: item.icon || '📍',
          badge: item.badge,
          isAddress: true
        };
        setSavedAddresses(prev => [newAddr, ...prev]);
        showToast(`Saved ${newAddr.title} to favorites ❤️`);
      }
      return;
    }

    const exists = wishlistItems.some(w => String(w.id) === itemId);
    if (exists) {
      setWishlistItems(prev => prev.filter(w => String(w.id) !== itemId));
      showToast(`Removed from favorites`);
    } else {
      const newItem = {
        id: item.id,
        name: item.name || item.fullName || item.title || 'Item',
        fullName: item.fullName || item.name || item.title || 'Item',
        dealPrice: item.dealPrice || (item.price ? parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) : 299),
        originalPrice: item.originalPrice || (item.strike ? parseInt(String(item.strike).replace(/[^0-9]/g, ''), 10) : 499),
        rating: item.rating ? String(item.rating).replace(/[^0-9.]/g, '') : '4.5',
        reviews: item.reviews || '100+',
        image: item.image || (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400'
      };
      setWishlistItems(prev => [newItem, ...prev]);
      showToast(`Saved ${newItem.name} to favorites ❤️`);
    }
  };

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => String(item.id) !== String(itemId)));
    showToast("Removed from wishlist");
  };

  const totalCartCount = Object.values(cartItems).reduce((sum, val) => {
    const count = typeof val === 'object' && val !== null ? (val.count || 1) : val;
    return sum + (Number(count) || 0);
  }, 0);

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
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <PageLayout
        activeTab={
          (isCategoriesView || searchQuery.trim()) 
            ? 'cityos' 
            : activeTab
        }
        onTabChange={(tab) => {
          setActiveTab(tab);
          setIsCategoriesView(false);
          setSearchQuery(''); // Reset search when switching tabs
          if (['shop', 'food', 'grocery', 'service', 'ride', 'travel', 'rent', 'cityos'].includes(tab)) {
            setLastHub(tab);
          }
        }}
        onMenuClick={() => setIsAccountOpen(true)}
        onLocationClick={() => setIsAddressSelectorOpen(true)}
        onNotificationClick={() => setIsNotificationsOpen(true)}
        onLikeClick={() => setIsLikePageOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        hideTopSection={activeTab === 'scenes' || isCategoriesView || isBookingMode}
        onSelectCategory={(cat) => {
          setSearchQuery(cat.name === 'Corner' ? 'Sweets' : cat.name);
          showToast(`Browsing ${cat.name}`);
          setIsCategoriesView(false);
        }}
        onBoltOrderNow={(banner) => showToast(`⚡ ${banner?.title || 'Bolt'}: ${banner?.highlight || '15-min delivery ready!'}`)}
      >
        {isCategoriesView ? (
          <CategoriesPage 
            activeHub={['shop', 'food', 'grocery', 'service', 'ride', 'travel', 'rent', 'cityos'].includes(activeTab) ? activeTab : (lastHub || 'cityos')} 
            showToast={showToast} 
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={totalCartCount}
            onBack={() => setIsCategoriesView(false)}
            onSelectCategoryItem={(item) => {
              if (item.name === 'PS5 console' || item.name === 'iPhone 18 Pro' || item.name === 'Galaxy S25 5G') {
                setSelectedProduct(galaxyS25Product);
              } else {
                setSearchQuery(item.name || item.label || 'Deals');
              }
              setIsCategoriesView(false);
            }}
          />
        ) : activeTab === 'cityos' ? (
          <CityOSHome onTabChange={(tab) => { setActiveTab(tab); setLastHub(tab); }} showToast={showToast} />
        ) : activeTab === 'shop' ? (
          <ShopHome 
            onTabChange={setActiveTab} 
            onAddToCart={handleAddToCart} 
            onOpenProduct={(prod) => setSelectedProduct(prod ? { ...galaxyS25Product, ...prod } : galaxyS25Product)}
            showToast={showToast} 
          />
        ) : activeTab === 'service' ? (
          <ServiceHome onTabChange={setActiveTab} showToast={showToast} onAddToCart={handleAddToCart} />
        ) : activeTab === 'ride' ? (
          <RideHome 
            onTabChange={setActiveTab} 
            showToast={showToast} 
            onBookingModeChange={setIsBookingMode}
            savedAddresses={savedAddresses}
            onToggleFavorite={(addr) => handleToggleWishlist(addr, true)}
          />
        ) : activeTab === 'travel' ? (
          <TravelHome onTabChange={setActiveTab} showToast={showToast} />
        ) : activeTab === 'rent' ? (
          <RentHome onTabChange={setActiveTab} showToast={showToast} />
        ) : activeTab === 'dineout' ? (
          <DineoutHome onTabChange={setActiveTab} showToast={showToast} />
        ) : activeTab === 'scenes' ? (
          <ScenesHome 
            activeHub={lastHub || 'shop'}
            onTabChange={setActiveTab} 
            onBack={() => setActiveTab(lastHub || 'shop')} 
            showToast={showToast} 
          />
        ) : activeTab === 'instamart' || activeTab === 'grocery' ? (
          <GroceryHome 
            onTabChange={setActiveTab}
            onAddToCart={handleAddToCart}
            cartItems={cartItems}
            hideHeader={true}
            showToast={showToast}
          />
        ) : (
          <FoodHome 
            activeTopFilter={activeTopFilter}
            setActiveTopFilter={setActiveTopFilter}
            showToast={showToast}
            cartItems={cartItems}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            filteredRestaurants={filteredRestaurants}
            wishlistItems={wishlistItems}
            onToggleWishlist={handleToggleWishlist}
          />
        )}
      </PageLayout>
      {/* Full Screen Cart Page */}
      {isCartOpen && (
        <CartPage 
          cartItems={cartItems}
          storeItems={[
            ...store99Items,
            ...instamartData.freshStore.map(i => ({ ...i, dealPrice: i.price })),
            ...instamartData.farmToDoor.map(i => ({ ...i, dealPrice: i.price })),
            ...featuredRestaurants.map(r => ({ id: r.id, name: r.name, dealPrice: 250 })),
            { id: 'm1', name: 'Wired Earphones', dealPrice: 2107, originalPrice: 2999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' },
            { id: 'm2', name: 'USB-C Adapter', dealPrice: 424, originalPrice: 1299, image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?w=200' },
            { id: 'm3', name: 'Keyboard Skin', dealPrice: 269, originalPrice: 899, image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=200' },
            { id: 'shop-sug-1', name: 'Uratech 1000 cm...', dealPrice: 313, originalPrice: 1700, image: 'https://images.unsplash.com/photo-1581850518616-bcb8192ad24b?w=400' },
            { id: 'shop-sug-2', name: 'FLIPZONE 300 c...', dealPrice: 130, originalPrice: 449, image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?w=400' },
            { id: 'shop-sug-3', name: 'NINTY 1000 cm ...', dealPrice: 364, originalPrice: 1999, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400' },
            { id: 'shop-best-1', name: 'Top 50 fridges', dealPrice: 10390, originalPrice: 14999, image: 'https://images.unsplash.com/photo-1571175432230-01c24844c022?w=400' },
            { id: 'srv-1', name: 'AC Jet Cleaning & Service', dealPrice: 499, originalPrice: 799, image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?w=200' },
            { id: 'srv-2', name: 'Full Home Deep Cleaning', dealPrice: 1499, originalPrice: 2499, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?w=200' },
            { id: 'srv-3', name: 'Instant Electrician / Plumber', dealPrice: 199, originalPrice: 399, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200' },
            { id: 'galaxy-s25', name: 'Galaxy S25 5G', dealPrice: 59299, originalPrice: 74999, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400' },
            { id: 'galaxy-s25-128gb-mint', name: 'Galaxy S25 5G (Mint, 128 GB)', dealPrice: 59299, originalPrice: 74999, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400' },
            { id: 'galaxy-s25-256gb-mint', name: 'Galaxy S25 5G (Mint, 256 GB)', dealPrice: 64299, originalPrice: 79999, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400' },
            { id: 'acc-1', name: 'Samsung 25W Fast Charger', dealPrice: 1299, originalPrice: 1999, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200' },
            { id: 'acc-2', name: 'Spigen Ultra Hybrid Clear Case', dealPrice: 899, originalPrice: 1499, image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=200' }
          ]}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={(id, delta) => delta > 0 ? handleAddToCart(typeof cartItems[id] === 'object' ? cartItems[id] : { id }) : handleRemoveFromCart(id)}
          onRemoveItem={handleRemoveEntireItem}
          showToast={showToast}
          onLikeClick={() => setIsLikePageOpen(true)}
          activeHub={activeTab}
        />
      )}

      {/* Full Screen Like Page */}
      {isLikePageOpen && (
        <LikePage 
          likedItems={wishlistItems}
          savedAddresses={savedAddresses}
          onClose={() => setIsLikePageOpen(false)}
          onAddToCart={handleAddToCart}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onRemoveAddress={(id) => handleToggleWishlist({ id }, true)}
          showToast={showToast}
        />
      )}

      {/* Full Screen My Orders / My Rides / My Services Page */}
      {isOrdersOpen && (
        <OrdersPage 
          activeHub={activeTab}
          onClose={() => setIsOrdersOpen(false)}
          showToast={showToast}
        />
      )}

      {/* Full Screen Product Details Page */}
      {selectedProduct && (
        <ProductDetailsPage 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={() => {
            setIsCartOpen(true);
            setSelectedProduct(null);
          }}
          isWishlisted={wishlistItems.some(w => String(w.id) === String(selectedProduct.id) || String(w.id) === 'galaxy-s25')}
          onToggleWishlist={handleToggleWishlist}
          cartCount={totalCartCount}
          onOpenCart={() => {
            setIsCartOpen(true);
            setSelectedProduct(null);
          }}
          showToast={showToast}
        />
      )}

      {!isBookingMode && (
        <BottomNav 
          activeTab={activeTab}
          isCategoriesView={isCategoriesView}
          isCartOpen={isCartOpen}
          isLikePageOpen={isLikePageOpen}
          isOrdersOpen={isOrdersOpen}
          cartCount={totalCartCount}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setIsCategoriesView(false);
            setIsCartOpen(false);
            setIsLikePageOpen(false);
            setIsOrdersOpen(false);
            setSelectedProduct(null);
          }}
          onCategoriesClick={() => {
            setIsCategoriesView(prev => !prev);
            setSearchQuery('');
            setIsCartOpen(false);
            setIsLikePageOpen(false);
            setIsOrdersOpen(false);
            setSelectedProduct(null);
          }}
          onAccountClick={() => {
            setIsOrdersOpen(prev => !prev);
            setSelectedProduct(null);
          }}
          onCartClick={() => {
            setIsCartOpen(prev => !prev);
            setIsOrdersOpen(false);
            setSelectedProduct(null);
          }}
          onHomeClick={() => {
            setIsCategoriesView(false);
            setIsCartOpen(false);
            setIsLikePageOpen(false);
            setIsOrdersOpen(false);
            setSelectedProduct(null);
            if (activeTab === 'scenes') {
              setActiveTab(lastHub || 'shop');
            }
          }}
        />
      )}

      <FilterDrawer 
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        selectedFilters={filterToggles}
        onToggleFilter={handleToggleFilter}
      />

      <AddressSelector 
        isOpen={isAddressSelectorOpen}
        onClose={() => setIsAddressSelectorOpen(false)}
        onSelect={(addr) => showToast(`Location set to: ${addr}`)}
      />

      <NotificationsOverlay 
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <AccountOverlay 
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        showToast={showToast}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenWishlist={() => setIsLikePageOpen(true)}
      />
    </MobileFrame>
  );
}
