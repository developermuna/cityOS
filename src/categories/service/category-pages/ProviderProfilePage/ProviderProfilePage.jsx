import React, { useState } from 'react';

export const ProviderProfilePage = ({
  provider,
  allServices,
  onBookService,
  onBack,
  showToast,
}) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMode, setContactMode] = useState('call'); // 'call' | 'chat'
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'provider', text: `Hello! I am ${provider.name}. How can I assist you with your home service today?`, time: 'Just now' },
  ]);

  const providerServices = allServices.filter(
    (s) => s.providerId === provider.id || provider.skills.some((sk) => s.title.toLowerCase().includes(sk.toLowerCase()))
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMsg = { sender: 'user', text: chatMessage.trim(), time: 'Just now' };
    setChatHistory((prev) => [...prev, newMsg]);
    setChatMessage('');

    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'provider',
          text: `Got it! I am available in Rayagada. Please proceed with booking so I can arrive on your slot.`,
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-5 px-4 pb-20 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Go back"
        >
          ←
        </button>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Verified Partner Profile
          </span>
          <h2 className="text-base font-black text-slate-900 truncate">
            {provider.name}
          </h2>
        </div>
      </div>

      {/* Hero Profile Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md relative overflow-hidden space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-18 h-18 rounded-2xl object-cover border-2 border-white/20 shadow-md"
            />
            {provider.verified && (
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-[10px] rounded-full flex items-center justify-center ring-2 ring-slate-900 font-bold">
                ✓
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black truncate">{provider.name}</h1>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              {provider.experience} in Rayagada
            </p>
            <div className="flex items-center gap-2 mt-1.5 text-xs">
              <span className="text-amber-400 font-bold">★ {provider.rating}</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-semibold">{provider.completedJobs}+ jobs</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">{provider.availability}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
          <div className="p-2 rounded-xl bg-white/5 backdrop-blur-xs">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Rate</span>
            <span className="text-xs font-black text-white">{provider.pricePerHour}/hr</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 backdrop-blur-xs">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Area</span>
            <span className="text-xs font-black text-white truncate block">{provider.serviceArea}</span>
          </div>
          <div className="p-2 rounded-xl bg-white/5 backdrop-blur-xs">
            <span className="text-[10px] text-slate-400 block uppercase font-bold">Reviews</span>
            <span className="text-xs font-black text-white">{provider.reviewsCount} verified</span>
          </div>
        </div>

        {/* Action Buttons: Call & Chat */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              setContactMode('call');
              setShowContactModal(true);
            }}
            className="py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <span>📞</span> Call Direct
          </button>
          <button
            type="button"
            onClick={() => {
              setContactMode('chat');
              setShowContactModal(true);
            }}
            className="py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/20"
          >
            <span>💬</span> In-App Chat
          </button>
        </div>
      </div>

      {/* Skills & Badges */}
      <div className="space-y-2">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">
          Verified Skills & Certifications
        </h3>
        <div className="flex flex-wrap gap-2">
          {provider.skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs font-bold bg-[#606C38]/10 text-[#606C38] px-3 py-1.5 rounded-xl border border-[#606C38]/20"
            >
              🛠️ {skill}
            </span>
          ))}
          <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
            🛡️ Background Checked
          </span>
          <span className="text-xs font-bold bg-amber-50 text-amber-800 px-3 py-1.5 rounded-xl border border-amber-200">
            ⚡ CityOS Certified
          </span>
        </div>
      </div>

      {/* Services offered by this provider */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">
          Services Offered by {provider.name}
        </h3>
        <div className="space-y-2.5">
          {providerServices.map((srv) => (
            <div
              key={srv.id}
              className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3"
            >
              <img
                src={srv.image}
                alt={srv.title}
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-900 truncate">{srv.title}</h4>
                <p className="text-[11px] text-slate-500 truncate">{srv.description}</p>
                <span className="text-xs font-black text-slate-900 mt-0.5 block">₹{srv.price}</span>
              </div>
              <button
                type="button"
                onClick={() => onBookService(srv)}
                className="px-3.5 py-1.5 rounded-xl bg-[#606C38] text-white text-xs font-black shadow-xs active:scale-95 cursor-pointer"
              >
                Book
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Feedback */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">
          Recent Customer Testimonials
        </h3>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Debashish Patnaik (Raniguda)</span>
            <span className="text-amber-500 text-xs font-bold">★★★★★</span>
          </div>
          <p className="text-xs text-slate-600">
            "Very punctual and solved the short circuit issue within 20 minutes without overcharging. Highly recommended!"
          </p>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Sneha Mishra (JKPur)</span>
            <span className="text-amber-500 text-xs font-bold">★★★★★</span>
          </div>
          <p className="text-xs text-slate-600">
            "Great work, clean tools and gave 30-day warranty card. CityOS customer support was also responsive."
          </p>
        </div>
      </div>

      {/* Contact / Chat Interactive Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <img src={provider.avatar} alt={provider.name} className="w-9 h-9 rounded-xl object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{provider.name}</h4>
                  <span className="text-[10px] text-emerald-600 font-bold">Online • {provider.phone}</span>
                </div>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {contactMode === 'call' ? (
              <div className="p-4 text-center space-y-3">
                <span className="text-4xl block">📞</span>
                <h4 className="text-sm font-bold text-slate-900">Direct Call to Provider</h4>
                <p className="text-xs text-slate-500">
                  Dialing verified partner helpline for {provider.name}
                </p>
                <div className="p-3 bg-slate-100 rounded-2xl font-mono text-sm font-black text-slate-800">
                  {provider.phone}
                </div>
                <div className="flex gap-2">
                  <a
                    href={`tel:${provider.phone}`}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs text-center block"
                  >
                    Open Phone App
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setShowContactModal(false);
                      if (showToast) showToast(`Call initiated to ${provider.phone}`);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="h-48 overflow-y-auto space-y-2 p-2 bg-slate-50 rounded-2xl text-xs">
                  {chatHistory.map((msg, i) => (
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
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-[#606C38] text-white text-xs font-bold cursor-pointer"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
