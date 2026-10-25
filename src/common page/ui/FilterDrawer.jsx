import React from 'react';
import { X, SlidersHorizontal, ChevronDown, Star, Zap, ShoppingBag } from 'lucide-react';
import { BoltIcon } from '../icons/CustomIcons';

export const FilterDrawer = ({ isOpen, onClose, selectedFilters = {}, onToggleFilter }) => {
  if (!isOpen) return null;

  const filters = [
    { id: 'sortBy', label: 'Sort By', icon: ChevronDown, desc: 'Relevance, Rating, Cost' },
    { id: 'rating4', label: 'Rating 4.0+', icon: Star, desc: 'Top rated restaurants' },
    { id: 'bolt15', label: 'Bolt 15 min', icon: Zap, desc: 'Ultra-fast delivery' },
    { id: 'store99', label: '99 Store', icon: ShoppingBag, desc: 'Deals under ₹99' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-full max-w-[420px] bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden animate-slide-up sm:animate-zoom-in">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-orange-500 stroke-[2.5]" />
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Filters & Sorting</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto no-scrollbar">
          {filters.map((f) => {
            const Icon = f.icon;
            const isActive = selectedFilters[f.id];
            
            return (
              <button
                key={f.id}
                onClick={() => onToggleFilter(f.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-200 ${
                  isActive 
                    ? 'bg-orange-50 border-orange-500 shadow-md ring-4 ring-orange-500/10' 
                    : 'bg-white border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  isActive ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-50 text-slate-400'
                }`}>
                  {f.id === 'bolt15' ? <BoltIcon size={20} className={isActive ? "fill-white" : "fill-slate-400"} /> : <Icon size={20} className="stroke-[2.5]" />}
                </div>
                <div className="text-left">
                  <div className={`text-[15px] font-black tracking-tight ${isActive ? 'text-orange-600' : 'text-slate-900'}`}>
                    {f.label}
                  </div>
                  <div className="text-[12px] font-bold text-slate-400 leading-tight">
                    {f.desc}
                  </div>
                </div>
                {isActive && (
                  <div className="ml-auto w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
          <button 
            onClick={() => {
              // Clear all logic would go here
              onClose();
            }}
            className="flex-1 py-4 text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Clear All
          </button>
          <button 
            onClick={onClose}
            className="flex-[2] py-4 rounded-2xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 active:scale-95 transition-all"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
