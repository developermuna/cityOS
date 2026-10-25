import React from 'react';
import { X, Bell, CheckCheck } from 'lucide-react';

export const NotificationHeader = ({ onClose, unreadCount }) => {
  return (
    <div className="px-5 pt-6 pb-4 border-b border-slate-100 bg-slate-50/50 backdrop-blur-md">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
            <Bell size={18} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Notifications</h2>
              {unreadCount > 0 && (
                <span className="bg-orange-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-xs">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          aria-label="Close notifications"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex items-center justify-between pt-1">
        <p className="text-xs font-semibold text-slate-500">
          Stay updated with your active orders & alerts
        </p>
        <button className="text-[11px] font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1">
          <CheckCheck size={14} />
          <span>Mark all read</span>
        </button>
      </div>
    </div>
  );
};
