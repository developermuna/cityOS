import React, { useState } from 'react';
import { 
  ArrowLeft, ShieldCheck, MapPin, Calendar, Clock, Phone, MessageSquare, 
  AlertTriangle, RotateCcw, FileText, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { rentalMarketplaceService } from '../../services/rentalMarketplaceService';

export const RentalTrackingPage = ({
  booking,
  onBack,
  onContactOwner,
  onOpenExtensionModal,
  onOpenIssueModal,
  onOpenInvoiceModal,
  onCompleteReturn,
  showToast
}) => {
  const [returnConfirmed, setReturnConfirmed] = useState(booking?.status === 'COMPLETED');

  if (!booking) return null;

  const handleReturn = () => {
    rentalMarketplaceService.completeReturn(booking.id);
    setReturnConfirmed(true);
    if (showToast) showToast('Handover return initiated! Security deposit refund dispatched to your bank.');
    if (onCompleteReturn) onCompleteReturn(booking.id);
  };

  const steps = [
    { title: 'Booking Confirmed', desc: 'Host accepted & prepared item', done: true },
    { title: 'Item Handover & Active', desc: 'Verified with security OTP', done: true },
    { title: 'Usage Period', desc: `${booking.duration} active tenure`, done: true },
    { title: 'Return & Deposit Refund', desc: returnConfirmed ? 'Return completed & deposit refunded' : 'Pending physical return inspection', done: returnConfirmed }
  ];

  return (
    <div className="w-full pb-20 font-sans bg-[#fff8f5] min-h-screen">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-xs">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors active:scale-95"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h2 className="text-sm font-black text-slate-900 leading-tight">Live Rental Tracking</h2>
          <span className="text-[10px] text-slate-500 font-mono">#{booking.id}</span>
        </div>
        <button
          type="button"
          onClick={() => onOpenInvoiceModal && onOpenInvoiceModal(booking)}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors"
          aria-label="View Invoice"
        >
          <FileText className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Hero Card */}
        <div className="w-full rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
              returnConfirmed
                ? 'bg-emerald-500 text-white'
                : 'bg-[#FF5200] text-white animate-pulse'
            }`}>
              {returnConfirmed ? 'COMPLETED' : 'ACTIVE IN POSSESSION'}
            </span>
            <div className="text-xs font-mono font-bold text-slate-300">
              OTP: <strong className="text-white text-sm">{booking.otp}</strong>
            </div>
          </div>

          <h3 className="text-base font-black text-white leading-snug">
            {booking.itemTitle}
          </h3>
          <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-[#FF5200]" />
            Valid until {booking.endDate} ({booking.duration})
          </p>

          {/* Refund Status */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Deposit Status:
            </span>
            <span className={`font-bold ${returnConfirmed ? 'text-emerald-400' : 'text-amber-300'}`}>
              {returnConfirmed ? 'Refund Processed (₹' + (booking.securityDeposit?.toLocaleString('en-IN') || 0) + ')' : 'Held in Safe Escrow'}
            </span>
          </div>
        </div>

        {/* Action Shortcuts Grid */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onOpenExtensionModal && onOpenExtensionModal(booking)}
            className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center justify-center text-center hover:border-orange-200 transition-all active:scale-95"
          >
            <RotateCcw className="w-5 h-5 text-[#FF5200] mb-1" />
            <span className="text-[11px] font-bold text-slate-800 leading-tight">Extend Rental</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenIssueModal && onOpenIssueModal(booking)}
            className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center justify-center text-center hover:border-orange-200 transition-all active:scale-95"
          >
            <AlertTriangle className="w-5 h-5 text-amber-600 mb-1" />
            <span className="text-[11px] font-bold text-slate-800 leading-tight">Report Issue</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenInvoiceModal && onOpenInvoiceModal(booking)}
            className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center justify-center text-center hover:border-orange-200 transition-all active:scale-95"
          >
            <FileText className="w-5 h-5 text-blue-600 mb-1" />
            <span className="text-[11px] font-bold text-slate-800 leading-tight">View Invoice</span>
          </button>
        </div>

        {/* Status Timeline */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-3">
          <h4 className="text-xs font-bold text-slate-900">Rental Status Progress</h4>
          <div className="space-y-3 relative pl-4 border-l-2 border-orange-200 ml-2">
            {steps.map((st, i) => (
              <div key={i} className="relative">
                <div className={`w-3.5 h-3.5 rounded-full absolute -left-[23px] top-0.5 border-2 border-white ${
                  st.done ? 'bg-[#FF5200]' : 'bg-slate-300'
                }`} />
                <h5 className="text-xs font-bold text-slate-900 leading-snug">{st.title}</h5>
                <p className="text-[10px] text-slate-500">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Owner Contact */}
        {booking.owner && (
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={booking.owner.image}
                alt={booking.owner.name}
                className="w-11 h-11 rounded-full object-cover border border-slate-200"
              />
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Host / Provider</span>
                <h4 className="text-xs font-bold text-slate-900">{booking.owner.name}</h4>
                <p className="text-[10px] text-slate-500">Resp: {booking.owner.responseTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onContactOwner && onContactOwner(booking.owner, 'chat')}
                className="w-9 h-9 rounded-xl bg-orange-50 text-[#FF5200] hover:bg-orange-100 flex items-center justify-center transition-colors"
                aria-label="Chat"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onContactOwner && onContactOwner(booking.owner, 'call')}
                className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                aria-label="Call"
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Return Handover Confirmation CTA */}
        {!returnConfirmed ? (
          <button
            type="button"
            onClick={handleReturn}
            className="w-full py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Confirm Return & Release Deposit</span>
          </button>
        ) : (
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-center text-xs font-bold text-emerald-800">
            ✓ Rental completed and deposit refund initiated.
          </div>
        )}
      </div>
    </div>
  );
};
