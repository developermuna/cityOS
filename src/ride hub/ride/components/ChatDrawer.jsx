import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';

export const ChatDrawer = ({
  isOpen,
  onClose,
  driver,
  pickup = 'Pickup Point',
}) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'driver', text: 'Namaste! I am on my way to your pickup location.', time: 'Just now' },
    { id: 2, sender: 'driver', text: 'Please keep the OTP ready for verification.', time: 'Just now' },
  ]);
  const [inputText, setInputText] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen || !driver) return null;

  const quickChips = [
    "I'm at the pickup point",
    'Please wait 2 minutes',
    'Which vehicle color?',
    'Call me once you arrive',
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Simulated driver auto-response
    setTimeout(() => {
      const replies = [
        `Got it! Approaching ${pickup.substring(0, 15)} now.`,
        'Understood sir! Traffic is clear, reaching in a minute.',
        'Standing right by the main gate as requested.',
        'Acknowledged! See you shortly.',
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, sender: 'driver', text: reply, time: 'Just now' },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-sm h-[480px] shadow-2xl flex flex-col animate-in slide-in-from-bottom sm:zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={driver.photo}
              alt={driver.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500/20"
            />
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{driver.name}</h3>
              <p className="text-[11px] text-emerald-600 font-semibold">● Online • Captain</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-2.5">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div
                key={m.id}
                className={`flex flex-col max-w-[80%] ${
                  isUser ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`px-3.5 py-2 rounded-2xl text-xs ${
                    isUser
                      ? 'bg-black text-white rounded-br-xs'
                      : 'bg-gray-100 text-gray-900 rounded-bl-xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 px-1">{m.time}</span>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        {/* Quick Chips */}
        <div className="px-4 py-2 flex gap-1.5 overflow-x-auto no-scrollbar border-t border-gray-50">
          {quickChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleSend(chip)}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] font-medium transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-gray-100 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type message to Captain..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-gray-100 text-xs focus:outline-none focus:ring-1 focus:ring-black"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="w-9 h-9 rounded-xl bg-black disabled:bg-gray-300 text-white flex items-center justify-center transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
