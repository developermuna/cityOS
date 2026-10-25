import React, { useState } from 'react';
import { ChevronRight, Edit3, CheckCircle2, ChevronDown, Star } from 'lucide-react';

export const OrderItemCard = ({ item, onSelect, showToast }) => {
  const [selectedRating, setSelectedRating] = useState(item.ratingStars || 0);

  const getStatusColor = () => {
    switch (item.statusType) {
      case 'delivered':
        return 'text-[#0f8a65]';
      case 'refund':
        return item.status.toLowerCase().includes('completed') ? 'text-slate-900' : 'text-[#0f8a65]';
      case 'cancelled':
        return 'text-slate-800';
      case 'expected':
      default:
        return 'text-slate-900';
    }
  };

  const handleStarClick = (e, starIndex) => {
    e.stopPropagation();
    setSelectedRating(starIndex);
    if (showToast) showToast(`Rated ${starIndex} star${starIndex > 1 ? 's' : ''}`);
  };

  return (
    <article 
      onClick={() => onSelect && onSelect(item)}
      className="w-full bg-white px-4 py-3.5 border-b border-slate-100 select-none cursor-pointer hover:bg-slate-50/50 transition-colors"
      aria-label={`Order item: ${item.title}`}
    >
      {/* Top Main Section */}
      <div className="flex items-start gap-3.5">
        {/* Left Product Image */}
        <div className="w-[68px] h-[68px] rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0 p-1 flex items-center justify-center shadow-2xs">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        </div>

        {/* Right Info Details */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className={`text-[13.5px] font-black tracking-tight leading-snug truncate ${getStatusColor()}`}>
              {item.status}
            </h4>
            <ChevronRight size={16} className="text-slate-400 shrink-0" />
          </div>

          <p className="text-[12px] text-slate-500 font-medium line-clamp-1 mt-0.5">
            {item.detail || item.title}
          </p>
        </div>
      </div>

      {/* Action / Sub-Row */}
      {item.actionType === 'pay_cod' && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="text-[11.5px] font-medium text-slate-600 truncate">
            {item.codPrompt}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (showToast) showToast(`Initiating instant payment of ${item.payAmount}`);
            }}
            className="px-4 py-1.5 rounded-lg border border-[#800020] text-[#800020] font-black text-[12px] hover:bg-[#800020]/5 active:scale-95 transition-all shadow-2xs cursor-pointer shrink-0"
          >
            Pay {item.payAmount}
          </button>
        </div>
      )}

      {(item.actionType === 'review' || item.actionType === 'refund_review') && (
        <div className="mt-3 pt-2.5 flex items-center justify-between gap-2">
          {/* Star Rating Prompt */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11.5px] font-bold text-slate-700">
              {item.ratingLabel || 'Rate'}
            </span>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={(e) => handleStarClick(e, star)}
                  className="p-0.5 focus:outline-none cursor-pointer"
                >
                  <Star 
                    size={14} 
                    className={
                      star <= selectedRating 
                        ? 'fill-[#0f8a65] text-[#0f8a65]' 
                        : 'fill-slate-200 text-slate-200'
                    } 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Write Review Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (showToast) showToast(`Review form opened for ${item.title}`);
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#800020]/30 text-[#800020] font-bold text-[12px] hover:bg-[#800020]/5 active:scale-95 transition-all shadow-2xs cursor-pointer shrink-0"
          >
            <Edit3 size={13} className="stroke-[2.5]" />
            <span>Write review</span>
          </button>
        </div>
      )}

      {/* Refund Completed Pill */}
      {(item.actionType === 'refund_review' || item.actionType === 'refund_only') && (
        <div className="mt-2.5 bg-slate-50/80 border border-slate-100 rounded-xl px-3 py-2 flex items-center justify-between text-slate-700">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={15} className="text-[#0f8a65] stroke-[2.5]" />
            <span className="text-[12px] font-bold text-slate-800">
              {item.refundAmount}
            </span>
            {item.actionType === 'refund_only' && (
              <ChevronDown size={14} className="text-slate-400 ml-0.5" />
            )}
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[9.5px] font-black uppercase text-slate-500 bg-white border border-slate-200 px-1.5 py-0.5 rounded shadow-2xs">
              {item.refundMethod || 'UPI'}
            </span>
          </div>
        </div>
      )}
    </article>
  );
};
