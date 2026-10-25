import React from 'react';
import { Plus } from 'lucide-react';

export const ProductCard = ({ product, onAddToCart, onSelectProduct, showToast }) => {
  const numericPrice = parseInt(String(product.price).replace(/[^0-9]/g, ''), 10) || 299;
  const numericOriginal = parseInt(String(product.strike || '').replace(/[^0-9]/g, ''), 10) || (numericPrice + 200);

  const handleAdd = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({
        id: `shop-sug-${product.id}`,
        name: product.name,
        fullName: product.name,
        dealPrice: numericPrice,
        originalPrice: numericOriginal,
        image: product.image
      });
    } else if (showToast) {
      showToast(`Added ${product.name} to cart`);
    }
  };

  return (
    <article 
      onClick={(e) => {
        if (onSelectProduct) onSelectProduct(product);
        else handleAdd(e);
      }}
      className="flex flex-col group cursor-pointer relative" 
      aria-label={`Suggested: ${product.name}`}
    >
      <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-xs border border-slate-100 mb-2 relative group-hover:shadow-md transition-all duration-300">
        <img 
          src={product.image} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          alt={product.name} 
        />
        
        {/* Rating badge */}
        <div className="absolute bottom-1.5 left-1.5 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-md flex items-center gap-0.5 border border-slate-100 shadow-2xs">
          <span className="text-[10px] font-black text-slate-900">{product.rating}</span>
          <span className="text-[9px] text-amber-500 font-bold">★</span>
        </div>

        {/* Add to cart plus button */}
        <button
          type="button"
          onClick={handleAdd}
          className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-lg bg-white shadow-md border border-slate-200 flex items-center justify-center text-[#800020] hover:bg-[#800020] hover:text-white active:scale-90 transition-all cursor-pointer"
          aria-label="Add to cart"
        >
          <Plus size={15} className="stroke-[3]" />
        </button>
      </div>

      <h5 className="text-[12px] font-bold text-slate-800 truncate px-0.5 group-hover:text-[#800020] transition-colors leading-tight">
        {product.name}
      </h5>
      <div className="flex items-center gap-1.5 mt-1 px-0.5">
        <span className="text-[12.5px] font-black text-slate-950">{product.price}</span>
        {product.strike && (
          <span className="text-[10px] text-slate-400 line-through font-medium">{product.strike}</span>
        )}
      </div>
    </article>
  );
};
