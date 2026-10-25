import React from 'react';
import { LikeHeader } from './LikeHeader';
import { LikeEmpty } from './LikeEmpty';
import { LikeItemCard } from './LikeItemCard';

export const LikePage = ({ 
  likedItems = [], 
  savedAddresses = [],
  onClose, 
  onAddToCart, 
  onRemoveFromWishlist,
  onRemoveAddress
}) => {
  if (likedItems.length === 0 && savedAddresses.length === 0) {
    return <LikeEmpty onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#f8f8f8] flex flex-col font-sans">
      <LikeHeader onClose={onClose} />

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 px-3 py-3 space-y-6">
        {likedItems.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Favorite Products</h3>
            <div className="grid grid-cols-2 gap-3">
              {likedItems.map((item) => (
                <LikeItemCard 
                  key={item.id} 
                  item={item} 
                  onAddToCart={onAddToCart} 
                  onRemoveFromWishlist={onRemoveFromWishlist} 
                />
              ))}
            </div>
          </div>
        )}

        {savedAddresses.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Saved Locations</h3>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
              {savedAddresses.map((addr) => (
                <div key={addr.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl shrink-0">
                      {addr.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-slate-900">{addr.title}</h4>
                        {addr.badge && (
                          <span className="text-[9px] font-black bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded border border-amber-200 uppercase">{addr.badge}</span>
                        )}
                      </div>
                      <p className="text-[11px] font-bold text-slate-500">{addr.subtitle}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onRemoveAddress(addr.id)}
                    className="p-2 text-rose-500 bg-rose-50 rounded-full hover:bg-rose-100 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
