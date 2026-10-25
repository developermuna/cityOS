import React from 'react';
import { ProfileHeader } from './ProfileHeader';
import { AccountMenuList } from './AccountMenuList';
import { AccountLogoutButton } from './AccountLogoutButton';

export const AccountOverlay = ({ isOpen, onClose, showToast, onOpenOrders, onOpenWishlist }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-end sm:p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-[400px] h-full sm:h-[calc(100vh-32px)] bg-[#f9fafb] sm:rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        <ProfileHeader onClose={onClose} />
        <AccountMenuList 
          showToast={showToast} 
          onOpenOrders={() => { onClose(); if (onOpenOrders) onOpenOrders(); }}
          onOpenWishlist={() => { onClose(); if (onOpenWishlist) onOpenWishlist(); }}
        />
        <AccountLogoutButton onLogout={() => { onClose(); if (showToast) showToast('Logged out successfully'); }} />
      </div>
    </div>
  );
};
