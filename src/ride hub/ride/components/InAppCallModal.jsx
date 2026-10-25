import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

export const InAppCallModal = ({
  isOpen,
  onClose,
  driver,
}) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCallDuration(0);
      return;
    }
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen || !driver) return null;

  const formatCallTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-gray-900 text-white rounded-3xl w-full max-w-sm p-6 shadow-2xl flex flex-col items-center gap-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="text-center">
          <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
            Encrypted VoIP Call
          </span>
          <h3 className="font-extrabold text-xl mt-3">{driver.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{driver.vehicleName} • {driver.licensePlate}</p>
          <p className="text-sm font-mono font-bold text-gray-300 mt-2">
            {formatCallTime(callDuration)}
          </p>
        </div>

        <div className="relative">
          <img
            src={driver.photo}
            alt={driver.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-500/30 animate-pulse"
          />
        </div>

        <div className="flex items-center gap-6 pt-2">
          {/* Mute Toggle */}
          <button
            type="button"
            onClick={() => setIsMuted((prev) => !prev)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* End Call */}
          <button
            type="button"
            onClick={onClose}
            className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
            title="End Call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>

          {/* Speaker Toggle */}
          <button
            type="button"
            onClick={() => setIsSpeakerOn((prev) => !prev)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              isSpeakerOn ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
            title={isSpeakerOn ? 'Speaker Off' : 'Speaker On'}
          >
            {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
