import React from 'react';

export const GroceryCategories = ({ categories }) => {
  return (
    <section className="px-4" aria-label="Categories">
      <h3 className="text-base font-black text-slate-900 mb-3">Explore Categories</h3>
      <div className="grid grid-cols-4 gap-2.5">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-sm transition-all p-2 rounded-2xl border border-slate-100 text-center cursor-pointer hover:bg-emerald-50/50" aria-label={`Category: ${cat.name}`}>
            <span className="text-2xl mb-1">{cat.icon}</span>
            <span className="text-[10px] font-bold text-slate-700 leading-tight">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
