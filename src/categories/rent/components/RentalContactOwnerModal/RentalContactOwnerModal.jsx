import React, { useState } from 'react';
import { X, ShieldCheck, Star, Phone, MessageSquare, Send, CheckCheck } from 'lucide-react';

export const RentalContactOwnerModal = ({ owner, item, onClose, showToast }) => {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'call'
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'owner',
      text: `Hello! Thanks for your interest in "${item?.title || 'this listing'}". How can I help you today?`,
      time: 'Just now'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [calling, setCalling] = useState(false);

  if (!owner) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputMessage.trim(),
      time: 'Just now'
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputMessage('');

    // Automated polite simulated owner reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'owner',
          text: 'Got your message! The dates you requested are open for pickup. Feel free to confirm on cityOS.',
          time: 'Just now'
        }
      ]);
    }, 1200);
  };

  const handleMaskedCall = () => {
    setCalling(true);
    if (showToast) showToast('Connecting via cityOS Private Number Masking...');
    setTimeout(() => {
      setCalling(false);
      if (showToast) showToast(`Call connected to ${owner.name} (Secured)`);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-orange-600 to-[#FF5200] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border-2 border-white/40 overflow-hidden relative">
              <img src={owner.image} alt={owner.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm leading-none">{owner.name}</h3>
                {owner.isVerified && (
                  <span className="bg-white/20 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <ShieldCheck className="w-2.5 h-2.5 text-white" /> Verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/90 mt-1">
                <span className="flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-300 text-amber-300" /> {owner.rating}
                </span>
                <span>•</span>
                <span>{owner.completedRentals}+ Rentals</span>
                <span>•</span>
                <span>Resp: {owner.responseTime}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher: Chat vs Masked Call */}
        <div className="flex border-b border-slate-100 bg-slate-50">
          <button
            type="button"
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'chat'
                ? 'border-[#FF5200] text-[#FF5200] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> Instant Chat
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('call')}
            className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'call'
                ? 'border-[#FF5200] text-[#FF5200] bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Phone className="w-3.5 h-3.5" /> Masked Call
          </button>
        </div>

        {/* Content Body */}
        {activeTab === 'chat' ? (
          <div className="flex-1 flex flex-col min-h-[300px] max-h-[400px]">
            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 no-scrollbar bg-slate-50/50">
              <div className="text-center">
                <span className="text-[10px] bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                  End-to-end encrypted cityOS chat
                </span>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#FF5200] text-white rounded-tr-xs'
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-xs shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-0.5 px-1 flex items-center gap-1">
                    {msg.time}
                    {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about availability, pickup, specs..."
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF5200]"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-[#FF5200] hover:bg-[#E64A00] text-white flex items-center justify-center shrink-0 transition-colors shadow-xs active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center mx-auto text-[#FF5200]">
              <Phone className="w-8 h-8 animate-pulse" />
            </div>

            <div>
              <h4 className="text-base font-bold text-slate-900">100% Private Masked Call</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Your phone number is completely masked and protected. The owner will see a temporary cityOS relay number.
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-left text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Owner Service Area:</span>
                <span className="font-semibold text-slate-800">{owner.serviceArea}</span>
              </div>
              <div className="flex justify-between">
                <span>Response Rate:</span>
                <span className="font-semibold text-emerald-600">{owner.responseRate}</span>
              </div>
              <div className="flex justify-between">
                <span>Member Since:</span>
                <span className="font-semibold text-slate-800">{owner.joinedDate}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleMaskedCall}
              disabled={calling}
              className="w-full bg-[#FF5200] hover:bg-[#E64A00] text-white text-sm font-bold py-3.5 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              <Phone className="w-4 h-4" />
              {calling ? 'Connecting Relay...' : `Call ${owner.name}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
