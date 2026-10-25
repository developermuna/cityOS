import React, { useState } from 'react';
import { galaxyS25Product } from './productDetailsData';
import { ProductHeader } from './ProductHeader';
import { ProductImageCarousel } from './ProductImageCarousel';
import { ProductVariants } from './ProductVariants';
import { ProductPriceOffers } from './ProductPriceOffers';
import { ProductAiSummary } from './ProductAiSummary';
import { ProductDeliveryAssurance } from './ProductDeliveryAssurance';
import { ProductSpecsHighlights } from './ProductSpecsHighlights';
import { ProductInfluencerPicks } from './ProductInfluencerPicks';
import { ProductReviewsSection } from './ProductReviewsSection';
import { ProductBundleSection } from './ProductBundleSection';
import { ProductStickyBottomBar } from './ProductStickyBottomBar';

export const ProductDetailsPage = ({ 
  product = galaxyS25Product, 
  onClose, 
  onAddToCart, 
  onBuyNow, 
  isWishlisted = false, 
  onToggleWishlist, 
  cartCount = 0, 
  onOpenCart, 
  showToast 
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedPlans, setSelectedPlans] = useState(new Set());

  const handleTogglePlan = (planId) => {
    setSelectedPlans((prev) => {
      const next = new Set(prev);
      if (next.has(planId)) next.delete(planId);
      else next.add(planId);
      return next;
    });
  };

  const handleAddToCartClick = () => {
    const itemToAdd = {
      id: `${product.id}-${selectedVariant.id}-${selectedColor.id}`,
      name: `${product.shortTitle || product.title} (${selectedColor.name}, ${selectedVariant.label})`,
      fullName: product.title,
      dealPrice: selectedVariant.dealPrice || product.dealPrice,
      originalPrice: selectedVariant.originalPrice || product.originalPrice,
      image: selectedColor.image || product.images[0]
    };
    if (onAddToCart) onAddToCart(itemToAdd);
    if (showToast) showToast(`Added ${itemToAdd.name} to cart! 🛒`);
  };

  const handleBuyNowClick = () => {
    handleAddToCartClick();
    if (onBuyNow) {
      onBuyNow();
    } else if (onOpenCart) {
      onOpenCart();
    }
  };

  return (
    <div className="fixed inset-0 z-[220] bg-white flex flex-col font-sans select-none overflow-hidden animate-fade-in">
      {/* 1. Header Bar */}
      <ProductHeader 
        onBack={onClose}
        isWishlisted={isWishlisted}
        onToggleWishlist={() => onToggleWishlist && onToggleWishlist(product)}
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        showToast={showToast}
      />

      {/* 2. Scrollable Body Content */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 bg-white">
        {/* Hero Image Carousel */}
        <ProductImageCarousel 
          images={product.images}
          isWishlisted={isWishlisted}
          onToggleWishlist={() => onToggleWishlist && onToggleWishlist(product)}
          showToast={showToast}
        />

        {/* Color and Storage Variants */}
        <ProductVariants 
          colors={product.colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          variants={product.variants}
          selectedVariant={selectedVariant}
          onSelectVariant={setSelectedVariant}
          showToast={showToast}
        />

        {/* Brand, Title, Price, and Bank Offers */}
        <ProductPriceOffers 
          product={product}
          selectedVariant={selectedVariant}
          showToast={showToast}
        />

        {/* AI "Know before you buy" highlights */}
        <ProductAiSummary 
          highlights={product.aiSummary}
        />

        {/* Delivery Details and Assurance Badges */}
        <ProductDeliveryAssurance 
          delivery={product.delivery}
          assurances={product.assurances}
          showToast={showToast}
        />

        {/* Specs and Protection Plans */}
        <ProductSpecsHighlights 
          specs={product.specs}
          protectionPlans={product.protectionPlans}
          selectedPlans={selectedPlans}
          onTogglePlan={handleTogglePlan}
          showToast={showToast}
        />

        {/* Top Influencer Video Review Picks */}
        <ProductInfluencerPicks 
          picks={product.influencerPicks}
          showToast={showToast}
        />

        {/* Customer Ratings, Photos, and Reviews */}
        <ProductReviewsSection 
          rating={product.rating}
          ratingsCount={product.ratingsCount}
          reviewsCount={product.reviewsCount}
          photos={product.customerPhotos}
          reviews={product.reviews}
          showToast={showToast}
        />

        {/* Frequently Bought Together Bundle */}
        <ProductBundleSection 
          product={product}
          bundleItems={product.frequentlyBought}
          onAddBundleToCart={(items) => {
            items.forEach(item => {
              if (onAddToCart) onAddToCart(item);
            });
            if (showToast) showToast('Added bundle combo to cart! 🛍️');
          }}
          showToast={showToast}
        />
      </div>

      {/* 3. Sticky Bottom Action Bar */}
      <ProductStickyBottomBar 
        price={selectedVariant.dealPrice || product.dealPrice}
        originalPrice={selectedVariant.originalPrice || product.originalPrice}
        onAddToCart={handleAddToCartClick}
        onBuyNow={handleBuyNowClick}
      />
    </div>
  );
};
