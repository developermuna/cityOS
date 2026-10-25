import React from 'react';
import { FirstBannerCard } from './1st banner card';
import { Bestsellers } from './Bestsellers';
import { SuggestedProducts } from './SuggestedProducts';
import { SpotlightSection } from './SpotlightSection';

export const ShopHome = ({ _onTabChange, onAddToCart, onOpenProduct, showToast }) => {
  const techDeals = [
    { id: 1, name: 'Galaxy S25', price: 'From ₹54,299*', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400' },
    { id: 2, name: 'ASUS AI Max+', price: 'Starts ₹8,957/M*', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400' },
    { id: 3, name: 'Moto Pad 70', price: 'From ₹30,999*', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400' }
  ];

  const bestsellers = [
    { id: 1, name: 'Top 50 fridges', price: 'From ₹10,390*', image: 'https://images.unsplash.com/photo-1571175432230-01c24844c022?w=400' },
    { id: 2, name: "Lenovo RTX 50'", price: 'Starts ₹8,277/M*', image: 'https://images.unsplash.com/photo-1517336712603-d51ff17d7dad?w=400' },
    { id: 3, name: 'Safari, Aristo', price: 'Min. 85% Off', image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400' }
  ];

  const suggestedProducts = [
    { id: 1, name: 'Uratech 1000 cm...', price: '₹313', strike: '₹1,700', rating: '4.5', image: 'https://images.unsplash.com/photo-1581850518616-bcb8192ad24b?w=400' },
    { id: 2, name: 'FLIPZONE 300 c...', price: '₹130', strike: '₹449', rating: '4.1', image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5db?w=400' },
    { id: 3, name: 'NINTY 1000 cm ...', price: '₹364', strike: '₹1,999', rating: '4', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400' },
    { id: 4, name: 'KAAF 1000 cm x ..', price: '₹256', strike: '₹799', rating: '4.2', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400' },
    { id: 5, name: 'doodad 1000 cm ..', price: '₹392', strike: '₹1,700', rating: '4.3', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400' },
    { id: 6, name: 'WolTop 1000 cm ..', price: '₹323', strike: '₹1,999', rating: '4.4', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400' }
  ];

  return (
    <div className="space-y-0 pb-20 bg-white">
      <FirstBannerCard 
        deals={techDeals} 
        onSelectDeal={(deal) => onOpenProduct && onOpenProduct(deal)} 
      />
      <Bestsellers 
        deals={bestsellers} 
        onAddToCart={onAddToCart} 
        onSelectProduct={(p) => onOpenProduct && onOpenProduct(p)}
        showToast={showToast} 
      />
      <SuggestedProducts 
        products={suggestedProducts} 
        onAddToCart={onAddToCart} 
        onSelectProduct={(p) => onOpenProduct && onOpenProduct(p)}
        showToast={showToast} 
      />
      <SpotlightSection />
    </div>
  );
};
