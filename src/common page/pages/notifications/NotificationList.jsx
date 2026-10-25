import React from 'react';
import { ShoppingBag, Tag, Info, ChevronRight } from 'lucide-react';
import { NotificationItem } from './NotificationItem';

export const NotificationList = () => {
  const notifications = [
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered!',
      desc: 'Your order from Burger King has been delivered. Enjoy your meal!',
      time: '2 mins ago',
      icon: ShoppingBag,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 2,
      type: 'promo',
      title: '60% OFF Coupon Unlocked',
      desc: 'Use code PARTY60 for your next order. Valid for today only!',
      time: '1 hour ago',
      icon: Tag,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 3,
      type: 'info',
      title: 'Rainy Weather Update',
      desc: 'Delivery might take slightly longer due to heavy rain in Mumbai.',
      time: '3 hours ago',
      icon: Info,
      color: 'bg-blue-100 text-blue-600'
    }
  ];

  return (
    <div className="flex-grow overflow-y-auto py-4">
      <div className="space-y-1">
        {notifications.map((notif) => (
          <NotificationItem key={notif.id} notification={notif} />
        ))}
      </div>

      <div className="mt-8 px-6">
        <button className="w-full py-3 px-4 rounded-xl border-2 border-slate-100 text-slate-600 font-bold text-sm hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
          View All Notifications <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
