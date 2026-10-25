import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const NotificationItem = ({ notification, _onAction }) => {
  const Icon = notification.icon;

  const getTypeStyle = () => {
    switch (notification.type) {
      case 'order':
        return {
          bg: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
          badge: 'ORDER UPDATE',
          badgeBg: 'bg-emerald-50 text-emerald-700',
          action: 'Track Order'
        };
      case 'promo':
        return {
          bg: 'bg-amber-500/10 text-amber-600 border border-amber-500/20',
          badge: 'EXCLUSIVE OFFER',
          badgeBg: 'bg-amber-50 text-amber-700',
          action: 'Claim Voucher'
        };
      case 'info':
        return {
          bg: 'bg-sky-500/10 text-sky-600 border border-sky-500/20',
          badge: 'SERVICE NOTICE',
          badgeBg: 'bg-sky-50 text-sky-700',
          action: 'View Notice'
        };
      default:
        return {
          bg: 'bg-indigo-500/10 text-indigo-600 border border-indigo-500/20',
          badge: 'NOTIFICATION',
          badgeBg: 'bg-indigo-50 text-indigo-700',
          action: 'View'
        };
    }
  };

  const style = getTypeStyle();

  return (
    <div className="group mx-3 my-2 p-3.5 rounded-2xl bg-white border border-slate-100 hover:border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex gap-3.5 items-start">
      {/* Icon with refined background */}
      <div className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center ${style.bg} transition-transform group-hover:scale-105`}>
        {Icon ? <Icon size={20} className="stroke-[2.2]" /> : <CheckCircle2 size={20} />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className={`text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-md uppercase ${style.badgeBg}`}>
            {style.badge}
          </span>
          <span className="text-[11px] font-bold text-slate-400 shrink-0">
            {notification.time}
          </span>
        </div>

        <h3 className="font-bold text-sm text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
          {notification.title}
        </h3>

        <p className="text-xs text-slate-500 font-medium leading-relaxed mt-0.5 line-clamp-2">
          {notification.desc}
        </p>

        {style.action && (
          <div className="mt-2.5 flex items-center gap-1 text-xs font-bold text-orange-600 group-hover:translate-x-0.5 transition-transform">
            <span>{style.action}</span>
            <ArrowRight size={13} />
          </div>
        )}
      </div>
    </div>
  );
};
