import React from 'react';
import { CategorySidebarItem } from './CategorySidebarItem';

export const CategorySidebar = ({ categories = [], activeCategoryId, themeColor, onCategoryClick }) => {
  return (
    <aside className="w-[84px] shrink-0 border-r border-slate-200/80 overflow-y-auto no-scrollbar bg-[#f1f3f6] select-none h-full">
      {categories.map((cat) => (
        <CategorySidebarItem 
          key={cat.id} 
          category={cat} 
          isActive={activeCategoryId === cat.id} 
          themeColor={themeColor}
          onClick={() => onCategoryClick(cat)}
        />
      ))}
    </aside>
  );
};
