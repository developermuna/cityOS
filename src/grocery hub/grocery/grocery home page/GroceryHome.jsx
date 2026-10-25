import React from 'react';
import { instamartData } from '../../../data/mockData';
import { FirstBannerCard } from './1st banner card';
import { ProductGrid } from './ProductGrid';
import { GroceryCategories } from './GroceryCategories';

export const GroceryHome = ({ _onTabChange, onAddToCart, _cartItems = {}, _hideHeader = false, _showToast }) => {
  return (
    <div className="w-full bg-[#fcfdfd] min-h-screen text-slate-800 pb-16 select-none">
      <div className="page-transition">
        <FirstBannerCard />

        <ProductGrid 
          title="Fresh Store" 
          items={instamartData.freshStore} 
          onAddToCart={onAddToCart} 
          showSeeAll={false}
        />

        <ProductGrid 
          title="Farm to Door" 
          items={instamartData.farmToDoor} 
          onAddToCart={onAddToCart} 
        />

        <GroceryCategories categories={instamartData.categories} />
      </div>
    </div>
  );
};
