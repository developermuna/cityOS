import React, { useState } from 'react';
import { ArrowLeft, Clock, CheckCircle2, History, XCircle } from 'lucide-react';
import { rentalMarketplaceService } from '../../services/rentalMarketplaceService';
import { RentalHistoryCard } from '../components/RentalHistoryCard';

export const RentalHistoryPage = ({
  onBack,
  onTrackBooking,
  onExtendBooking,
  onInvoiceBooking,
  onRateBooking,
  onReRentBooking
}) => {
  const [activeTab, setActiveTab] = useState('active'); // 'upcoming' | 'active' | 'completed' | 'cancelled'
  const bookings = rentalMarketplaceService.getBookings();

  const filteredBookings = bookings.filter((b) => {
    switch (activeTab) {
      case 'upcoming':
        return b.status === 'CONFIRMED';
      case 'active':
        return b.status === 'ACTIVE' || b.status === 'RETURNING';
      case 'completed':
        return b.status === 'COMPLETED';
      case 'cancelled':
        return b.status === 'CANCELLED';
      default:
        return true;
    }
  });

  const tabs = [
    { id: 'active', label: 'Active', icon: Clock },
    { id: 'upcoming', label: 'Upcoming', icon: History },
    { id: 'completed', label: 'Completed', icon: CheckCircle2 },
    { id: 'cancelled', label: 'Cancelled', icon: XCircle }
  ];

  return (
    <div className="w-full pb-20 font-sans bg-[#fff8f5] min-h-screen">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition-colors active:scale-95"
              aria-label="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h2 className="text-base font-black text-slate-900 leading-tight">My Rentals</h2>
            <p className="text-[11px] text-slate-500 font-medium">Manage your active & past bookings</p>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="px-4 py-2 bg-white border-b border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 min-w-[85px] py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                activeTab === t.id
                  ? 'bg-[#FF5200] text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* List */}
      <div className="p-4 space-y-3">
        {filteredBookings.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm font-bold text-slate-700">No {activeTab} rentals found</p>
            <p className="text-xs text-slate-400 mt-1">
              Your booked properties, vehicles, and equipment will appear here.
            </p>
          </div>
        ) : (
          filteredBookings.map((bk) => (
            <RentalHistoryCard
              key={bk.id}
              booking={bk}
              onTrack={onTrackBooking}
              onExtend={onExtendBooking}
              onInvoice={onInvoiceBooking}
              onRate={onRateBooking}
              onReRent={onReRentBooking}
            />
          ))
        )}
      </div>
    </div>
  );
};
