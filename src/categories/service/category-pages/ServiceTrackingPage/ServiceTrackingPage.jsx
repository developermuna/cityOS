import React, { useState, useEffect } from 'react';
import { BOOKING_STATUS } from '../../constants/service.constants';

export const ServiceTrackingPage = ({
  booking,
  onCancelBooking,
  onGoHome,
  showToast,
}) => {
  const [currentStatus, setCurrentStatus] = useState(booking.status || BOOKING_STATUS.ARRIVING);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('Change of plan');
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState('02:00 PM - 04:00 PM');
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'provider', text: `Hi, I am on my way to ${booking.address.split(',')[0]}. Estimated arrival in 12 mins.`, time: '10:02 AM' },
  ]);

  // Review states
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Status progression simulation for interactive demo
  const advanceStatus = (next) => {
    setCurrentStatus(next);
    if (showToast) showToast(`Booking status updated to ${String(next).replace(/_/g, ' ').toUpperCase()}`);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatMessages((prev) => [...prev, { sender: 'user', text: chatMessage.trim(), time: 'Just now' }]);
    setChatMessage('');
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { sender: 'provider', text: 'Noted! See you shortly.', time: 'Just now' },
      ]);
    }, 1000);
  };

  const steps = [
    { key: BOOKING_STATUS.CONFIRMED, label: 'Booking Placed', desc: 'Order received & technician assigned' },
    { key: BOOKING_STATUS.ASSIGNED, label: 'Partner Confirmed', desc: `${booking.provider?.name} accepted job` },
    { key: BOOKING_STATUS.ARRIVING, label: 'En Route', desc: 'Technician heading to your address' },
    { key: BOOKING_STATUS.STARTED, label: 'Service In Progress', desc: 'Verified with Start OTP' },
    { key: BOOKING_STATUS.COMPLETED, label: 'Service Completed', desc: 'Job finished & verified' },
  ];

  const getStepIndex = (status) => {
    const idx = steps.findIndex((s) => s.key === status);
    return idx === -1 ? 2 : idx;
  };

  const currentStepIdx = getStepIndex(currentStatus);

  return (
    <div className="space-y-5 px-4 pb-20 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onGoHome}
          className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          ←
        </button>
        <div className="text-center">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Booking ID: #{booking.id.slice(-6).toUpperCase()}
          </span>
          <h2 className="text-base font-black text-slate-900">Live Service Tracking</h2>
        </div>
        <button
          type="button"
          onClick={onGoHome}
          className="text-xs font-bold text-[#606C38] px-2 py-1 rounded-lg hover:bg-slate-100"
        >
          Home
        </button>
      </div>

      {/* Map Simulation Card */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 h-52">
        {/* Map Background Illustration */}
        <div className="absolute inset-0 bg-[#e5e9ec] flex items-center justify-center overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Road Network Graphic */}
          <svg className="w-full h-full absolute inset-0 opacity-40" xmlns="http://www.w3.org/2000/svg">
            <path d="M -20,120 Q 140,80 200,110 T 420,70" fill="none" stroke="#94a3b8" strokeWidth="18" />
            <path d="M 60,-20 Q 120,90 190,120 T 260,250" fill="none" stroke="#cbd5e1" strokeWidth="12" />
            <path d="M 60,105 Q 130,85 190,115" fill="none" stroke="#606C38" strokeWidth="4" strokeDasharray="6,4" />
          </svg>

          {/* Provider Pin */}
          <div className="absolute left-[28%] top-[40%] flex flex-col items-center animate-bounce">
            <div className="px-2 py-0.5 rounded-full bg-slate-900 text-white text-[9px] font-bold shadow-md">
              {booking.provider?.name || 'Technician'}
            </div>
            <div className="w-8 h-8 rounded-full bg-[#606C38] text-white flex items-center justify-center text-sm shadow-lg ring-4 ring-[#606C38]/30">
              🛵
            </div>
          </div>

          {/* Destination Pin */}
          <div className="absolute left-[58%] top-[50%] flex flex-col items-center">
            <div className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[9px] font-bold shadow-md">
              Your Location
            </div>
            <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs shadow-lg ring-4 ring-rose-500/30">
              🏠
            </div>
          </div>
        </div>

        {/* Live Status Overlay Bar */}
        <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-lg border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Estimated Arrival</span>
              <span className="text-xs font-black text-slate-900">
                {currentStatus === BOOKING_STATUS.COMPLETED ? 'Job Finished' : '12 - 15 Mins'}
              </span>
            </div>
          </div>

          {/* Start OTP Display */}
          <div className="text-right">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">Security Start OTP</span>
            <span className="text-sm font-black font-mono text-[#606C38] tracking-widest bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {booking.otp || '4892'}
            </span>
          </div>
        </div>
      </div>

      {/* Provider Details Card with Direct Call & Chat */}
      {booking.provider && (
        <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={booking.provider.avatar}
                alt={booking.provider.name}
                className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-900">{booking.provider.name}</h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 rounded-sm font-bold">
                    ✓ Verified Pro
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{booking.serviceTitle}</p>
                <span className="text-[11px] text-amber-600 font-bold">★ {booking.provider.rating} ({booking.provider.completedJobs}+ jobs)</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <a
                href={`tel:${booking.provider.phone}`}
                className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center text-sm font-bold shadow-2xs hover:bg-emerald-100"
                title="Call Technician"
              >
                📞
              </a>
              <button
                type="button"
                onClick={() => setShowChatModal(true)}
                className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center text-sm font-bold shadow-2xs hover:bg-slate-200 cursor-pointer"
                title="Chat with Technician"
              >
                💬
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step by Step Timeline */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
          Status Timeline
        </h4>

        <div className="space-y-4">
          {steps.map((st, idx) => {
            const isDone = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;

            return (
              <div key={st.key} className="flex items-start gap-3 relative">
                {idx < steps.length - 1 && (
                  <div
                    className={`absolute left-3.5 top-6 bottom-0 w-0.5 -mb-4 ${
                      idx < currentStepIdx ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  />
                )}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10 ${
                    isDone
                      ? 'bg-emerald-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isDone ? '✓' : idx + 1}
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between">
                    <h5
                      className={`text-xs font-bold leading-tight ${
                        isCurrent ? 'text-slate-900 font-black' : isDone ? 'text-slate-800' : 'text-slate-400'
                      }`}
                    >
                      {st.label}
                    </h5>
                    {isCurrent && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full animate-pulse">
                        Current Step
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{st.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo Fast Forward Status Progression */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Demo Stage:</span>
          {currentStatus !== BOOKING_STATUS.STARTED && (
            <button
              onClick={() => advanceStatus(BOOKING_STATUS.STARTED)}
              className="text-[10px] font-bold px-2 py-1 bg-amber-100 text-amber-900 rounded-lg cursor-pointer"
            >
              Simulate: Started
            </button>
          )}
          {currentStatus !== BOOKING_STATUS.COMPLETED && (
            <button
              onClick={() => advanceStatus(BOOKING_STATUS.COMPLETED)}
              className="text-[10px] font-bold px-2 py-1 bg-emerald-100 text-emerald-900 rounded-lg cursor-pointer"
            >
              Simulate: Completed
            </button>
          )}
        </div>
      </div>

      {/* Post-Completion Rating Card */}
      {currentStatus === BOOKING_STATUS.COMPLETED && (
        <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 shadow-xs space-y-3">
          <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wide">
            Service Complete • How was your experience?
          </h4>

          {reviewSubmitted ? (
            <div className="p-3 bg-white rounded-xl text-center text-xs font-bold text-emerald-800">
              🎉 Thank you for your review! ₹20 CityOS Coins credited to your wallet.
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex gap-2 justify-center py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl cursor-pointer hover:scale-125 transition-transform"
                  >
                    {star <= rating ? '⭐' : '☆'}
                  </button>
                ))}
              </div>

              <textarea
                rows={2}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your feedback about the technician..."
                className="w-full p-2.5 rounded-xl border border-emerald-200 bg-white text-xs"
              />

              <button
                type="button"
                onClick={() => {
                  setReviewSubmitted(true);
                  if (showToast) showToast('Review submitted successfully!');
                }}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      )}

      {/* Service Details & Price Summary Card */}
      <div className="p-3.5 bg-white rounded-2xl border border-slate-200 text-xs space-y-2 shadow-xs">
        <h4 className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">
          Booking Information
        </h4>
        <div className="flex justify-between text-slate-600">
          <span>Scheduled Time:</span>
          <span className="font-semibold text-slate-800">{booking.scheduledTimeSlot}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Address:</span>
          <span className="font-semibold text-slate-800 truncate max-w-[200px]">{booking.address}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Payment:</span>
          <span className="font-semibold text-slate-800">{booking.paymentMethod} (₹{booking.totalAmount})</span>
        </div>
      </div>

      {/* Action Buttons: Reschedule & Cancel */}
      {currentStatus !== BOOKING_STATUS.COMPLETED && currentStatus !== BOOKING_STATUS.CANCELLED && (
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => setShowRescheduleModal(true)}
            className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
          >
            Reschedule
          </button>
          <button
            type="button"
            onClick={() => setShowCancelModal(true)}
            className="py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs transition-colors cursor-pointer"
          >
            Cancel Booking
          </button>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Reschedule Service Slot</h4>
            <p className="text-xs text-slate-500">Pick a new preferred slot for today or tomorrow</p>
            <select
              value={newTimeSlot}
              onChange={(e) => setNewTimeSlot(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold"
            >
              <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
              <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
              <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
              <option value="Tomorrow 10:00 AM">Tomorrow 10:00 AM</option>
            </select>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowRescheduleModal(false);
                  if (showToast) showToast(`Rescheduled to ${newTimeSlot}`);
                }}
                className="flex-1 py-2 rounded-xl bg-[#606C38] text-white text-xs font-bold"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowRescheduleModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Cancel Service Booking?</h4>
            <p className="text-xs text-slate-500">Free cancellation available before technician arrival.</p>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold"
            >
              <option value="Change of plan">Change of plan</option>
              <option value="Booked by mistake">Booked by mistake</option>
              <option value="Issue resolved on own">Issue resolved on own</option>
              <option value="Provider delayed">Provider delayed</option>
            </select>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onCancelBooking(booking.id, cancelReason);
                  setShowCancelModal(false);
                  onGoHome();
                }}
                className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold"
              >
                Yes, Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
              >
                Keep Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat with Provider Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <img src={booking.provider?.avatar} alt="Pro" className="w-8 h-8 rounded-xl object-cover" />
                <h4 className="text-xs font-bold text-slate-900">{booking.provider?.name}</h4>
              </div>
              <button onClick={() => setShowChatModal(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">
                ✕
              </button>
            </div>

            <div className="h-48 overflow-y-auto space-y-2 p-2 bg-slate-50 rounded-2xl text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`p-2.5 rounded-2xl max-w-[80%] ${
                      msg.sender === 'user'
                        ? 'bg-[#606C38] text-white rounded-br-none'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5">{msg.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-1.5">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type message to provider..."
                className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-hidden"
              />
              <button type="submit" className="px-3.5 py-2 rounded-xl bg-[#606C38] text-white text-xs font-bold">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
