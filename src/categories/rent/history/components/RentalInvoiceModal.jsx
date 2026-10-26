import React from 'react';
import { X, FileText, Download, Printer, ShieldCheck } from 'lucide-react';

export const RentalInvoiceModal = ({ booking, onClose, showToast }) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
    if (showToast) showToast('Printing invoice...');
  };

  const handleDownload = () => {
    if (showToast) showToast(`Invoice #${booking.id} downloaded`);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#FF5200]" />
            <h3 className="text-base font-bold text-slate-900">Rental Tax Invoice</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-4 space-y-4 text-xs">
          {/* Company & Invoice meta */}
          <div className="flex justify-between items-start pb-3 border-b border-slate-100">
            <div>
              <span className="text-sm font-black text-[#FF5200]">cityOS Rentals</span>
              <p className="text-[10px] text-slate-500">GSTIN: 21AAACC9988Z1Z9</p>
              <p className="text-[10px] text-slate-500">Rayagada, Odisha 765001</p>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-slate-800">#{booking.id}</span>
              <p className="text-[10px] text-slate-400">{booking.bookingDate || '2026-10-25'}</p>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                PAID VIA {booking.paymentMethod || 'UPI'}
              </span>
            </div>
          </div>

          {/* Renter & Owner Info */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Rented By:</span>
              <span className="font-bold text-slate-800">You (Verified Resident)</span>
              <span className="text-[10px] text-slate-500 block">Odisha, India</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Owner / Host:</span>
              <span className="font-bold text-slate-800">{booking.owner?.name || 'Verified Partner'}</span>
              <span className="text-[10px] text-slate-500 block">{booking.owner?.serviceArea}</span>
            </div>
          </div>

          {/* Item Row */}
          <div className="border border-slate-100 rounded-2xl overflow-hidden">
            <div className="bg-slate-100 px-3 py-2 font-bold text-slate-700 flex justify-between">
              <span>Item Description</span>
              <span>Amount</span>
            </div>
            <div className="p-3 space-y-2">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{booking.itemTitle} ({booking.duration})</span>
                <span>₹{booking.price?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Refundable Deposit (Escrow)</span>
                <span>₹{booking.securityDeposit?.toLocaleString('en-IN') || 0}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Convenience & Platform Fee</span>
                <span>₹45</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST (18% on platform fee)</span>
                <span>₹8</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-100 font-black text-sm text-slate-900">
                <span>Total Amount Paid</span>
                <span className="text-[#FF5200]">₹{booking.totalAmount?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleDownload}
            className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#FF5200]" /> Download PDF
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" /> Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
