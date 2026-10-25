import React, { useState } from 'react';
import { ArrowLeft, Search, ShoppingCart, X } from 'lucide-react';

export const CategoriesPageHeader = ({ 
  title = 'All Categories', 
  onBack, 
  onSearch, 
  onOpenCart, 
  cartCount = 0 
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3.5 py-2.5 transition-all select-none shadow-2xs">
      {isSearchOpen ? (
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 h-9 animate-fade-in">
          <div className="flex-1 flex items-center bg-slate-100 rounded-full px-3 py-1.5 border border-slate-200">
            <Search size={16} className="text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in categories..."
              autoFocus
              className="w-full bg-transparent text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setIsSearchOpen(false);
              setSearchQuery('');
            }}
            className="text-xs font-bold text-[#800020] px-1 cursor-pointer"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between h-9">
          {/* Left: Back Arrow Button & Category Text Title */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 active:scale-90 transition-transform cursor-pointer shrink-0 shadow-2xs"
              aria-label="Back"
            >
              <ArrowLeft size={18} className="stroke-[2.5]" />
            </button>
            <h1 className="text-[16.5px] font-black text-slate-900 tracking-tight">
              {title}
            </h1>
          </div>

          {/* Right: Search Button & Cart Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-90 transition-transform cursor-pointer shadow-2xs"
              aria-label="Search categories"
            >
              <Search size={18} className="stroke-[2.2]" />
            </button>

            {onOpenCart && (
              <button
                type="button"
                onClick={onOpenCart}
                className="relative w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 active:scale-90 transition-transform cursor-pointer shadow-2xs"
                aria-label="Cart"
              >
                <ShoppingCart size={18} className="stroke-[2.2]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-[#800020] text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
