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
    const startTime = Date.now();
    const duration = parsed.duration;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= duration) {
        clearInterval(interval);
        handleClose();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [parsed.duration, handleClose]);

  // Config mapping for visual styles & icons
  const getToastConfig = () => {
    switch (parsed.type) {
      case 'success':
        return {
          icon: parsed.customIcon || CheckCircle2,
          iconBg: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.35)]',
          badgeText: 'SUCCESS',
          badgeBg: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
          border: 'border-emerald-500/30 shadow-[0_8px_30px_rgb(0,0,0,0.35),0_0_15px_rgba(16,185,129,0.15)]',
          barColor: 'bg-gradient-to-r from-emerald-400 to-teal-300',
          gradientBg: 'from-slate-900/95 via-slate-900/90 to-emerald-950/40',
        };

      case 'notification':
        return {
          icon: parsed.customIcon || BellRing,
          iconBg: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.35)]',
          badgeText: 'NOTIFICATION',
          badgeBg: 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20',
          border: 'border-indigo-500/30 shadow-[0_8px_30px_rgb(0,0,0,0.35),0_0_15px_rgba(99,102,241,0.15)]',
          barColor: 'bg-gradient-to-r from-indigo-400 to-violet-300',
          gradientBg: 'from-slate-900/95 via-slate-900/90 to-indigo-950/40',
        };

      case 'message':
        return {
          icon: parsed.customIcon || MessageSquare,
          iconBg: 'bg-sky-500/20 text-sky-300 border border-sky-500/30 shadow-[0_0_12px_rgba(14,165,233,0.35)]',
          badgeText: 'MESSAGE',
          badgeBg: 'bg-sky-500/15 text-sky-300 border border-sky-500/20',
          border: 'border-sky-500/30 shadow-[0_8px_30px_rgb(0,0,0,0.35),0_0_15px_rgba(14,165,233,0.15)]',
          barColor: 'bg-gradient-to-r from-sky-400 to-cyan-300',
          gradientBg: 'from-slate-900/95 via-slate-900/90 to-sky-950/40',
        };

      case 'express':
        return {
          icon: parsed.customIcon || Zap,
          iconBg: 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.35)]',
          badgeText: 'FAST DELIVERY',
          badgeBg: 'bg-amber-500/15 text-amber-300 border border-amber-500/20',
          border: 'border-amber-500/30 shadow-[0_8px_30px_rgb(0,0,0,0.35),0_0_15px_rgba(245,158,11,0.15)]',
          barColor: 'bg-gradient-to-r from-amber-400 to-yellow-300',
          gradientBg: 'from-slate-900/95 via-slate-900/90 to-amber-950/40',
        };

      case 'location':
        return {
          icon: parsed.customIcon || MapPin,
          iconBg: 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-[0_0_12px_rgba(244,63,94,0.35)]',
          badgeText: 'LOCATION',
          badgeBg: 'bg-rose-500/15 text-rose-300 border border-rose-500/20',
          border: 'border-rose-500/30 shadow-[0_8px_30px_rgb(0,0,0,0.35),0_0_15px_rgba(244,63,94,0.15)]',
          barColor: 'bg-gradient-to-r from-rose-400 to-pink-300',
          gradientBg: 'from-slate-900/95 via-slate-900/90 to-rose-950/40',
        };

      case 'warning':
        return {
          icon: parsed.customIcon || AlertTriangle,
          iconBg: 'bg-orange-500/20 text-orange-300 border border-orange-500/30 shadow-[0_0_12px_rgba(249,115,22,0.35)]',
          badgeText: 'ATTENTION',
          badgeBg: 'bg-orange-500/15 text-orange-300 border border-orange-500/20',
          border: 'border-orange-500/30 shadow-[0_8px_30px_rgb(0,0,0,0.35),0_0_15px_rgba(249,115,22,0.15)]',
          barColor: 'bg-gradient-to-r from-orange-400 to-amber-300',
          gradientBg: 'from-slate-900/95 via-slate-900/90 to-orange-950/40',
        };

      default:
        return {
          icon: parsed.customIcon || Sparkles,
          iconBg: 'bg-slate-700/50 text-slate-200 border border-slate-600/30',
          badgeText: 'UPDATE',
          badgeBg: 'bg-slate-800/60 text-slate-300 border border-slate-700/40',
          border: 'border-slate-700/60 shadow-2xl',
          barColor: 'bg-gradient-to-r from-slate-400 to-slate-200',
          gradientBg: 'from-slate-900/95 via-slate-900/90 to-slate-900/95',
        };
    }
  };

  const config = getToastConfig();
  const IconComponent = config.icon;

  return (
    <div 
      className={`
        relative w-full max-w-[320px] overflow-hidden rounded-2xl border bg-gradient-to-r ${config.gradientBg} ${config.border} backdrop-blur-xl transition-all duration-300 shadow-xl
        ${isExiting ? 'opacity-0 -translate-y-3 scale-95' : 'opacity-100 translate-y-0 scale-100 animate-in fade-in slide-in-from-top-3 duration-300'}
      `}
    >
      <div className="p-3.5 flex items-start gap-3">
        {/* Icon Container with glowing aura */}
        <div className={`p-2.5 rounded-xl shrink-0 flex items-center justify-center ${config.iconBg}`}>
          <IconComponent size={20} className="stroke-[2.2]" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-md uppercase ${config.badgeBg}`}>
              {config.badgeText}
            </span>
            {parsed.title && (
              <span className="text-xs font-bold text-white/90 truncate">
                {parsed.title}
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-slate-200 leading-snug break-words">
            {parsed.message}
          </p>

          {/* Action button if provided */}
          {parsed.actionText && (
            <button
              onClick={() => {
                if (parsed.onAction) parsed.onAction();
                handleClose();
              }}
              className="mt-2 text-xs font-bold text-white hover:underline flex items-center gap-1"
            >
              {parsed.actionText} →
            </button>
          )}
        </div>

        {/* Dismiss Button */}
        <button
          onClick={handleClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0 -mr-1 -mt-1"
          aria-label="Dismiss toast"
        >
          <X size={16} />
        </button>
      </div>


    </div>
  );
};

export const ToastContainer = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[2000] flex flex-col items-center gap-2.5 px-4 w-full max-w-[380px] pointer-events-none">
      {toasts.map((t) => (
        <div key={typeof t === 'object' ? t.id : t} className="w-full pointer-events-auto flex justify-center">
          <ToastItem toast={t} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
};
