import React from 'react';

export const RentalCategoryCard = ({ category, onClick }) => {
  if (!category) return null;

  return (
    <div
      onClick={() => onClick && onClick(category)}
      className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group active:scale-95"
    >
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-xs transition-transform group-hover:scale-110 ${category.iconBg || 'bg-orange-50 text-orange-600'}`}>
          {category.icon}
        </div>
        {category.badge && (
          <span className="text-[9px] font-bold text-orange-600 bg-orange-50 border border-orange-100 px-1.5 py-0.5 rounded-full">
            {category.badge}
          </span>
        )}
      </div>

      <div className="mt-2.5">
        <h4 className="text-xs font-black text-slate-900 group-hover:text-[#FF5200] transition-colors leading-tight">
          {category.shortName || category.name}
        </h4>
        <p className="text-[10px] text-slate-500 font-medium line-clamp-1 mt-0.5">
          {category.desc}
        </p>
        <span className="text-[10px] font-bold text-slate-700 mt-1 block">
          From {category.startingPrice}
        </span>
      </div>
    </div>
  );
};
