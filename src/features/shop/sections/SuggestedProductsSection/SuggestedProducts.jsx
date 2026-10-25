import React from 'react';
import { ProductCard } from '@/features/shop/components/ProductCard/ProductCard';

export const SuggestedProducts = ({ products, onAddToCart, onSelectProduct, showToast }) => {
  return (
    <section className="px-4 py-6 bg-slate-50/40" aria-label="Suggested Products">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[17px] font-black text-slate-900 tracking-tight">Suggested For You</h3>
        <button 
          type="button"
          onClick={() => showToast && showToast('Viewing all suggested products')}
          className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-md active:scale-90 transition-transform cursor-pointer"
        >
          <span className="text-sm leading-none mt-0.5 font-bold">→</span>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-x-3.5 gap-y-6">
        {products.map(p => (
          <ProductCard 
            key={p.id} 
            product={p} 
            onAddToCart={onAddToCart}
            onSelectProduct={onSelectProduct}
            showToast={showToast}
          />
        ))}
      </div>
    </section>
  );
};
