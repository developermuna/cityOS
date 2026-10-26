import React, { useState } from 'react';
import { BOOKING_STATUS } from '../../constants/service.constants';

export const ServiceHistoryPage = ({
  bookings,
  onTrackBooking,
  onRebook,
  onBack,
  showToast,
}) => {
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'active' | 'completed' | 'cancelled'
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const filteredBookings = bookings.filter((b) => {
    if (filterTab === 'active') {
      return b.status !== BOOKING_STATUS.COMPLETED && b.status !== BOOKING_STATUS.CANCELLED;
    }
    if (filterTab === 'completed') {
      return b.status === BOOKING_STATUS.COMPLETED;
    }
    if (filterTab === 'cancelled') {
      return b.status === BOOKING_STATUS.CANCELLED;
    }
    return true;
  });

  return (
    <div className="space-y-5 px-4 pb-20 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Order Activity
          </span>
          <h2 className="text-base font-black text-slate-900 truncate">
            My Service Bookings
          </h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1.5 p-1 bg-slate-100/90 rounded-2xl">
        {[
          { id: 'all', label: 'All' },
          { id: 'active', label: 'Active' },
          { id: 'completed', label: 'Completed' },
          { id: 'cancelled', label: 'Cancelled' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilterTab(tab.id)}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              filterTab === tab.id
                ? 'bg-[#606C38] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filteredBookings.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
            <span className="text-3xl block mb-2">📋</span>
            <p className="text-sm font-bold text-slate-800">No {filterTab} bookings found</p>
            <p className="text-xs text-slate-500 mt-1">Book professional home services with 1-click</p>
            <button
              onClick={onBack}
              className="mt-3 px-4 py-2 bg-[#606C38] text-white text-xs font-bold rounded-xl"
            >
              Explore Services
            </button>
          </div>
        ) : (
          filteredBookings.map((bk) => (
            <div
              key={bk.id}
              className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    ID: #{bk.id.slice(-6).toUpperCase()}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mt-0.5">{bk.serviceTitle}</h4>
                </div>
                <span
                  className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    (bk.status || bk.bookingStatus) === BOOKING_STATUS.COMPLETED
                      ? 'bg-emerald-100 text-emerald-800'
                      : (bk.status || bk.bookingStatus) === BOOKING_STATUS.CANCELLED
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-900 animate-pulse'
                  }`}
                >
                  {String(bk.status || bk.bookingStatus || 'CONFIRMED').replace(/_/g, ' ')}
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <p>📍 {bk.address}</p>
                <p>🗓️ {bk.scheduledDate} • {bk.scheduledTimeSlot}</p>
                {bk.provider && (
                  <p>👤 Pro: <span className="font-bold text-slate-800">{bk.provider.name}</span> ({bk.provider.phone})</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-sm font-black text-slate-900">₹{bk.totalAmount}</span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedInvoice(bk)}
                    className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Invoice
                  </button>

                  {bk.status !== BOOKING_STATUS.COMPLETED && bk.status !== BOOKING_STATUS.CANCELLED ? (
                    <button
                      type="button"
                      onClick={() => onTrackBooking(bk)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-xs cursor-pointer active:scale-95"
                    >
                      Track Live
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onRebook(bk)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#606C38] text-white text-xs font-black shadow-xs cursor-pointer active:scale-95"
                    >
                      Rebook
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-sm font-black text-slate-900">CityOS Tax Invoice</h4>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="text-xs space-y-2">
              <div className="flex justify-between text-slate-500">
                <span>Invoice ID:</span>
                <span className="font-mono text-slate-800">INV-{selectedInvoice.id.slice(-6).toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Service:</span>
                <span className="font-bold text-slate-800">{selectedInvoice.serviceTitle}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Base Charge:</span>
                <span>₹{selectedInvoice.basePrice}</span>
              </div>
              {selectedInvoice.emergencyFee > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>Emergency Surcharge:</span>
                  <span>+₹{selectedInvoice.emergencyFee}</span>
                </div>
              )}
              {selectedInvoice.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount:</span>
                  <span>-₹{selectedInvoice.discount}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-slate-900 pt-2 border-t border-slate-200 text-sm">
                <span>Total Amount:</span>
                <span className="text-[#606C38]">₹{selectedInvoice.totalAmount}</span>
              </div>
            </div>

            <button
              onClick={() => {
                window.print();
                if (showToast) showToast('Downloading invoice PDF...');
              }}
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold mt-2 cursor-pointer"
            >
              Download PDF / Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
