import React from 'react';
import { NotificationHeader } from './NotificationHeader';
import { NotificationList } from './NotificationList';

export const NotificationsOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-end sm:p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-[380px] h-full sm:h-[calc(100vh-32px)] bg-white sm:rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
        <NotificationHeader onClose={onClose} unreadCount={3} />
        <NotificationList />
      </div>
    </div>
  );
};
