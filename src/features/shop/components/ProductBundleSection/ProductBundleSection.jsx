import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { ProgressiveImage } from '@/features/shop/components/ProgressiveImage/ProgressiveImage';

export const ProductBundleSection = ({ 
  product, 
  bundleItems = [], 
  onAddBundleToCart, 
  showToast 
}) => {
  const [selectedItems, setSelectedItems] = useState(
    new Set(bundleItems.map(i => i.id))
  );

  const toggleItem = (id) => {
    const next = new Set(selectedItems);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedItems(next);
  };

  const totalBundlePrice = product.dealPrice + bundleItems
    .filter(i => selectedItems.has(i.id))
    .reduce((sum, i) => sum + i.price, 0);

  return (
    <div className="bg-white px-4 py-3.5 border-t border-slate-100 select-none">
      <h3 className="text-[13px] font-black text-slate-900 tracking-tight mb-2.5">
        Frequently bought together
      </h3>

      {/* Visual Bundle Strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
        {/* Main Product */}
        <div className="w-16 h-20 rounded-xl bg-slate-50 border-2 border-[#800020] p-1 flex items-center justify-center shrink-0 overflow-hidden">
          <ProgressiveImage
            src={product.images[0]}
            alt="Main product"
            aspectRatio="aspect-[16/20]"
            className="w-full h-full !bg-transparent"
            imgClassName="mix-blend-multiply"
            objectFit="object-contain"
          />
        </div>

        {bundleItems.map((item) => (
          <React.Fragment key={item.id}>
            <span className="text-slate-400 font-bold text-sm shrink-0">+</span>
            <div 
              onClick={() => toggleItem(item.id)}
              className={`w-16 h-20 rounded-xl bg-slate-50 border-2 p-1 flex items-center justify-center shrink-0 cursor-pointer transition-all overflow-hidden ${
                selectedItems.has(item.id) ? 'border-[#800020]' : 'border-slate-200 opacity-50'
              }`}
            >
              <ProgressiveImage
                src={item.image}
                alt={item.name}
                aspectRatio="aspect-[16/20]"
                className="w-full h-full !bg-transparent"
                imgClassName="mix-blend-multiply"
                objectFit="object-contain"
              />
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Items Breakdown */}
      <div className="space-y-1.5 mt-2">
        {bundleItems.map((item) => {
          const isChecked = selectedItems.has(item.id);
          return (
            <div 
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className="flex items-center justify-between text-[11.5px] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                  isChecked ? 'bg-[#800020] border-[#800020] text-white' : 'border-slate-300'
                }`}>
                  {isChecked && <Check size={10} className="stroke-[3]" />}
                </div>
                <span className="text-slate-800 font-medium truncate max-w-[220px]">
                  {item.name}
                </span>
              </div>
              <span className="text-slate-900 font-bold">₹{item.price}</span>
            </div>
          );
        })}
      </div>

      {/* Bundle Action Button */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Bundle Price</span>
          <span className="text-[15px] font-black text-slate-950">₹{totalBundlePrice.toLocaleString('en-IN')}</span>
        </div>

        <button
          type="button"
          onClick={() => {
            if (onAddBundleToCart) {
              onAddBundleToCart([product, ...bundleItems.filter(i => selectedItems.has(i.id))]);
            } else if (showToast) {
              showToast(`Added bundle (${selectedItems.size + 1} items) to cart! 🛍️`);
            }
          }}
          className="px-4 py-2 rounded-xl bg-[#800020] hover:bg-[#650019] text-white text-xs font-black shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          Add {selectedItems.size + 1} items to cart
        </button>
      </div>
    </div>
  );
};
