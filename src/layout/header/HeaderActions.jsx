import React from 'react';
import { Bell, User } from 'lucide-react';

export const HeaderActions = ({ onNotificationClick, onMenuClick, iconColor, iconBg }) => {
  return (
    <div className="flex items-center gap-0.5 shrink-0">
      <button 
        onClick={onNotificationClick}
        className="p-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        aria-label="Notifications"
      >
        <Bell size={21} className={iconColor} />
      </button>

      <button 
        onClick={onMenuClick}
        className={`w-9 h-9 rounded-full border flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer ${iconBg}`}
        aria-label="Account"
      >
        <User size={18} className={iconColor} />
      </button>
    </div>
  );
};
