import React, { useEffect, useState, useCallback } from 'react';
import { 
  CheckCircle2, 
  BellRing, 
  MessageSquare, 
  Zap, 
  AlertTriangle, 
  X, 
  Sparkles,
  Heart,
  ShoppingBag,
  MapPin,
  Tag
} from 'lucide-react';

/**
 * Auto-detects toast type and details if a string is provided
 */
const parseToastData = (toast) => {
  if (typeof toast === 'object' && toast !== null) {
    return {
      id: toast.id || Date.now() + Math.random(),
      type: toast.type || 'info',
      title: toast.title || null,
      message: toast.message || '',
      duration: toast.duration || 2000, 
      actionText: toast.actionText,
      onAction: toast.onAction,
      icon: toast.icon
    };
  }

  const msg = String(toast || '');
  const lower = msg.toLowerCase();

  let type = 'info';
  let title = null;
  let customIcon = null;

  if (
    lower.includes('added') || 
    lower.includes('saved') || 
    lower.includes('claimed') || 
    lower.includes('reserved') || 
    lower.includes('success') || 
    lower.includes('applied') || 
    lower.includes('activated') ||
    lower.includes('❤️') ||
    lower.includes('🎉')
  ) {
    type = 'success';
    title = lower.includes('saved') || lower.includes('favorite') 
      ? 'Favorites Updated' 
      : lower.includes('cart') 
      ? 'Item Added to Cart' 
      : lower.includes('voucher') || lower.includes('coupon') || lower.includes('discount')
      ? 'Offer Claimed'
      : 'Success';
      
    if (lower.includes('favorite') || lower.includes('❤️')) customIcon = Heart;
    else if (lower.includes('cart')) customIcon = ShoppingBag;
    else if (lower.includes('voucher') || lower.includes('coupon')) customIcon = Tag;
  } else if (lower.includes('notification') || lower.includes('🔔') || lower.includes('unread')) {
    type = 'notification';
    title = 'New Notification';
    customIcon = BellRing;
  } else if (lower.includes('message') || lower.includes('chat') || lower.includes('reply') || lower.includes('support')) {
    type = 'message';
    title = 'New Message';
    customIcon = MessageSquare;
  } else if (lower.includes('⚡') || lower.includes('bolt') || lower.includes('15-min')) {
    type = 'express';
    title = 'Bolt Express';
    customIcon = Zap;
  } else if (lower.includes('location') || lower.includes('set to:')) {
    type = 'location';
    title = 'Location Updated';
    customIcon = MapPin;
  } else if (lower.includes('warning') || lower.includes('error') || lower.includes('failed')) {
    type = 'warning';
    title = 'Alert';
    customIcon = AlertTriangle;
  }

  return {
    id: Date.now() + Math.random(),
    type,
    title,
    message: msg,
    duration: 2000,
    customIcon
  };
};

export const ToastItem = ({ toast, onDismiss }) => {
  const parsed = parseToastData(toast);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(parsed.id);
    }, 200);
  }, [onDismiss, parsed.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, parsed.duration);

    return () => clearTimeout(timer);
  }, [parsed.duration, handleClose]);

  // Premium Light theme mapping
  const getToastConfig = () => {
    switch (parsed.type) {
      case 'success':
        return {
          icon: parsed.customIcon || CheckCircle2,
          iconBg: 'bg-emerald-50 text-emerald-600',
          badgeText: 'SUCCESS',
          badgeBg: 'bg-emerald-500 text-white',
          border: 'border-emerald-100',
        };
      case 'notification':
        return {
          icon: parsed.customIcon || BellRing,
          iconBg: 'bg-indigo-50 text-indigo-600',
          badgeText: 'NOTICE',
          badgeBg: 'bg-indigo-500 text-white',
          border: 'border-indigo-100',
        };
      case 'message':
        return {
          icon: parsed.customIcon || MessageSquare,
          iconBg: 'bg-sky-50 text-sky-600',
          badgeText: 'MESSAGE',
          badgeBg: 'bg-sky-500 text-white',
          border: 'border-sky-100',
        };
      case 'express':
        return {
          icon: parsed.customIcon || Zap,
          iconBg: 'bg-amber-50 text-amber-600',
          badgeText: 'BOLT',
          badgeBg: 'bg-amber-500 text-white',
          border: 'border-amber-100',
        };
      case 'location':
        return {
          icon: parsed.customIcon || MapPin,
          iconBg: 'bg-rose-50 text-rose-600',
          badgeText: 'LOCATION',
          badgeBg: 'bg-rose-500 text-white',
          border: 'border-rose-100',
        };
      case 'warning':
        return {
          icon: parsed.customIcon || AlertTriangle,
          iconBg: 'bg-orange-50 text-orange-600',
          badgeText: 'ALERT',
          badgeBg: 'bg-orange-500 text-white',
          border: 'border-orange-100',
        };
      default:
        return {
          icon: parsed.customIcon || Sparkles,
          iconBg: 'bg-slate-50 text-slate-600',
          badgeText: 'INFO',
          badgeBg: 'bg-slate-800 text-white',
          border: 'border-slate-100',
        };
    }
  };

  const config = getToastConfig();
  const IconComponent = config.icon;

  return (
    <div 
      className={`
        relative w-full max-w-[320px] overflow-hidden rounded-2xl border bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300
        ${config.border}
        ${isExiting ? 'opacity-0 translate-y-2 scale-95' : 'opacity-100 translate-y-0 scale-100 animate-in fade-in slide-in-from-bottom-2 duration-300'}
      `}
    >
      <div className="p-3 flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center ${config.iconBg}`}>
          <IconComponent size={18} className="stroke-[2.5]" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-[8px] font-black tracking-widest px-1.5 py-0.5 rounded-md uppercase ${config.badgeBg}`}>
              {config.badgeText}
            </span>
          </div>
          <p className="text-[11px] font-black text-slate-800 leading-tight">
            {parsed.message}
          </p>
        </div>

        <button
          onClick={handleClose}
          className="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors shrink-0 flex items-center justify-center"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export const ToastContainer = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[2000] flex flex-col items-center gap-2 px-4 w-full max-w-[380px] pointer-events-none">
      {toasts.map((t) => (
        <div key={typeof t === 'object' ? t.id : t} className="w-full pointer-events-auto flex justify-center">
          <ToastItem toast={t} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
};
