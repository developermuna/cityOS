import React, { useState, useEffect } from 'react';
import { Home, Play, Shapes, ShoppingCart, ClipboardList, History } from 'lucide-react';
import { getCategoryTheme } from '@/theme/categoryColors';
import { NavItem } from '../NavItem/NavItem';

export const BottomNav = ({ activeTab, onTabChange, onAccountClick, onCartClick, onCategoriesClick, onHomeClick, isCategoriesView, isCartOpen, _isLikePageOpen, isOrdersOpen, cartCount = 0 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const cityosTheme = getCategoryTheme('cityos');
  
  // Always use CityOS Maroon as the primary brand color for navigation
  const activeTheme = cityosTheme;

  useEffect(() => {
    const handleScroll = (e) => {
      const target = e.target;
      const currentScrollTop = target === document || target === window
        ? (window.pageYOffset || document.documentElement.scrollTop)
        : target.scrollTop;
      
      if (Math.abs(currentScrollTop - lastScrollTop) < 10) return;

      if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    return () => window.removeEventListener('scroll', handleScroll, { capture: true });
  }, [lastScrollTop]);

  const getAccountInfo = (tab) => {
    switch (tab) {
      case 'ride': 
        return { label: 'My Ride', icon: ClipboardList };
      case 'service': 
        return { label: 'My Service', icon: ClipboardList };
      case 'travel': 
        return { label: 'My Trip', icon: ClipboardList };
      case 'cityos': 
        return { label: 'History', icon: History };
      case 'shop':
      case 'food':
      case 'grocery':
      case 'instamart':
      default: 
        return { label: 'My Order', icon: ClipboardList };
    }
  };

  const accountInfo = getAccountInfo(activeTab);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'play', label: 'Explore', icon: Play }, 
    { id: 'categories', label: 'Categories', icon: Shapes },
    { id: 'account', label: accountInfo.label, icon: accountInfo.icon },
    { id: 'cart', label: 'Cart', icon: ShoppingCart, badge: cartCount > 0 ? cartCount : null },
  ];

  // Fix activeItem: Home is active when in any hub home (shop, food, grocery, etc.)
  const activeItem = isCartOpen 
    ? 'cart' 
    : (isOrdersOpen 
        ? 'account' 
        : (isCategoriesView 
            ? 'categories' 
            : (activeTab === 'scenes' ? 'play' : 'home')));

  return (
    <nav 
      className={`fixed bottom-2 left-1/2 -translate-x-1/2 z-[200] w-[92%] max-w-[400px] transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
      }`}
      aria-label="Bottom Navigation"
    >
      <div className="bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-full px-2 py-2 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
        {navItems.map((item) => (
          <NavItem 
            key={item.id} 
            item={item} 
            isActive={activeItem === item.id} 
            activeTheme={activeTheme} 
            onClick={() => {
              if (item.id === 'account') {
                if (onAccountClick) onAccountClick();
              } else if (item.id === 'cart') {
                if (onCartClick) onCartClick();
              } else if (item.id === 'play') {
                if (onTabChange) onTabChange('scenes');
              } else if (item.id === 'categories') {
                if (onCategoriesClick) onCategoriesClick();
              } else if (item.id === 'home') {
                if (onHomeClick) {
                  onHomeClick();
                } else if (isCategoriesView) {
                  if (onCategoriesClick) onCategoriesClick(); 
                } else {
                  if (onTabChange) onTabChange(activeTab === 'scenes' ? 'shop' : activeTab);
                }
              } else {
                if (onTabChange) onTabChange(item.id);
              }
            }}
          />
        ))}
      </div>
    </nav>
  );
};
