import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { CartHeader } from './CartHeader';
import { CartEmpty } from './CartEmpty';
import { CartItem } from './CartItem';
import { CartAddressBar } from './CartAddressBar';
import { CartSavingsZone } from './CartSavingsZone';
import { CartPriceDetails } from './CartPriceDetails';
import { CartCrossSellSection } from './CartCrossSellSection';
import { CartFooter } from './CartFooter';

export const CartPage = ({ 
  cartItems = {}, 
  storeItems = [], 
  onClose, 
  onUpdateQuantity, 
  onRemoveItem,
  showToast,
  onLikeClick,
  activeHub = 'cityos'
}) => {
  // Map activeHub to internal activeTab
  const mapHubToTab = (hub) => {
    switch (hub) {
      case 'cityos': return 'all';
      case 'shop': return 'shop';
      case 'grocery':
      case 'instamart': return 'grocery';
      case 'food':
      case 'dineout': return 'food';
      case 'ride': return 'rides';
      case 'service': return 'services';
      case 'travel': return 'travel';
      case 'rent': return 'rent';
      default: return 'all';
    }
  };

  const [activeTab, setActiveTab] = useState(mapHubToTab(activeHub));

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'shop', label: 'Shop' },
    { id: 'grocery', label: 'Grocery' },
    { id: 'food', label: 'Food' },
    { id: 'rides', label: 'Rides' },
    { id: 'services', label: 'Services' },
    { id: 'travel', label: 'Travel' },
    { id: 'rent', label: 'Rent' }
  ];

  // Compute totals
  const itemsInCart = Object.entries(cartItems)
    .map(([id, val]) => {
      const count = typeof val === 'object' ? (val.count || 1) : val;
      if (!count || count <= 0) return null;
      const directItem = typeof val === 'object' ? val : null;
      const foundItem = storeItems.find(i => String(i.id) === String(id));
      const item = foundItem || directItem;
      return item ? { ...item, count } : null;
    })
    .filter(Boolean);

  const totalMRP = itemsInCart.reduce((sum, item) => sum + (item.originalPrice || item.dealPrice) * item.count, 0);
  const totalDiscount = itemsInCart.reduce((sum, item) => sum + ((item.originalPrice || item.dealPrice) - item.dealPrice) * item.count, 0);
  const totalAmount = totalMRP - totalDiscount;
  const savings = totalDiscount + 175; // Including some mock coupon savings
  const totalItemsCount = itemsInCart.reduce((sum, item) => sum + item.count, 0);

  if (itemsInCart.length === 0) {
    return <CartEmpty onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#f8f8f8] flex flex-col font-sans">
      <CartHeader 
        onClose={onClose} 
        onLikeClick={onLikeClick} 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        totalItemsCount={totalItemsCount} 
      />
      <CartAddressBar />

      <div className="flex-1 overflow-y-auto no-scrollbar pb-40">
        <div className="space-y-2 py-2">
          {itemsInCart.map((item) => (
            <CartItem 
              key={item.id} 
              item={item} 
              onUpdateQuantity={onUpdateQuantity} 
              onRemoveItem={onRemoveItem} 
            />
          ))}
        </div>

        <CartSavingsZone />
        
        <CartPriceDetails 
          totalMRP={totalMRP} 
          totalDiscount={totalDiscount} 
          totalAmount={totalAmount} 
          totalItemsCount={totalItemsCount} 
          savings={savings} 
        />

        <div className="p-6 flex items-center justify-center gap-3 opacity-50">
          <ShieldCheck size={24} className="text-slate-400" />
          <p className="text-[10px] font-bold text-slate-500 leading-tight">
            Safe and secure payments. Easy <br /> returns. 100% Authentic products.
          </p>
        </div>

        <CartCrossSellSection 
          title="Items you may have missed" 
          items={[
            { id: 'm1', name: 'Wired USB-C Earphones', price: '₹2,107', strike: '₹2,999', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' },
            { id: 'm2', name: 'USB-C Magnetic Adapter', price: '₹424', strike: '₹1,299', image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecb?w=200' },
            { id: 'm3', name: 'Mechanical Keyboard Skin', price: '₹269', strike: '₹899', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=200' }
          ]} 
        />

        <CartCrossSellSection 
          title="Recently Viewed" 
          items={[
            { id: 'rv1', name: 'A CONNECT Z VMB...', price: '₹915', strike: '₹1,999', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300' },
            { id: 'rv2', name: 'TRIGGR Punkheadz...', price: '₹899', strike: '₹3,999', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300' },
            { id: 'rv3', name: 'EuroQon Workstat...', price: '₹924', strike: '₹4,999', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300' }
          ]} 
        />

        <CartCrossSellSection 
          title="Your Wishlist ❤️" 
          showArrow={true}
          items={[
            { id: 'w1', name: 'ZEBRONICS SA127...', price: '₹7,999', strike: '₹28,999', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },
            { id: 'w2', name: 'Electrobot Mini Pan...', price: '₹133', strike: '₹350', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400' },
            { id: 'w3', name: 'NEXTOY 20 PC...', price: '₹140', strike: '₹599', image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=400' }
          ]} 
        />
      </div>

      <CartFooter 
        totalMRP={totalMRP} 
        totalAmount={totalAmount} 
        showToast={showToast} 
      />
    </div>
  );
};
