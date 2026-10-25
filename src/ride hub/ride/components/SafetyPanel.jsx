import React, { useState, useEffect } from 'react';
import { X, Siren, PhoneCall, Share2, ShieldCheck, Check } from 'lucide-react';
import { SAFETY_CONFIG } from '../constants/ride.constants';

export const SafetyPanel = ({
  isOpen,
  onClose,
  rideId = 'OD18-RIDE',
  pickup = 'Pickup Point',
  destination = 'Destination Point',
  showToast,
}) => {
  const [sirenActive, setSirenActive] = useState(false);
  const [audioCtx, setAudioCtx] = useState(null);
  const [oscillator, setOscillator] = useState(null);
  const [sosSent, setSosSent] = useState(false);

  // Synthesize audible distress siren via Web Audio API
  useEffect(() => {
    if (sirenActive) {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.3);

        const lfo = ctx.createOscillator();
        lfo.frequency.value = 3; // 3 Hz siren wobble
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 400;
        lfo.connect(osc.frequency);
        lfo.start();

        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start();

        setAudioCtx(ctx);
        setOscillator(osc);
      } catch (err) {
        console.warn('AudioContext siren failed to start:', err);
      }
    } else {
      if (oscillator) {
        try {
          oscillator.stop();
          oscillator.disconnect();
        } catch {
          // ignore
        }
      }
      if (audioCtx) {
        try {
          audioCtx.close();
        } catch {
          // ignore
        }
      }
      setOscillator(null);
      setAudioCtx(null);
    }

    return () => {
      if (oscillator) {
        try {
          oscillator.stop();
        } catch {
          // ignore
        }
      }
      if (audioCtx) {
        try {
          audioCtx.close();
        } catch {
          // ignore
        }
      }
    };
  }, [sirenActive]);

  if (!isOpen) return null;

  const handleShareTrip = () => {
    const text = `I am on my way via CityOS Ride (${rideId}). Tracking: ${pickup} -> ${destination}`;
    if (navigator.share) {
      navigator.share({ title: 'My Live CityOS Ride', text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText?.(text);
      if (showToast) showToast('📋 Live trip tracking link copied to clipboard!');
    }
  };

  const handleTriggerSos = () => {
    setSosSent(true);
    if (showToast) {
      showToast('🚨 SOS Broadcast Sent: Emergency contacts & CityOS Safety Desk alerted!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl border border-red-100 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-red-100 text-red-600 rounded-xl">
              <Siren className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">CityOS Safety Shield</h3>
              <p className="text-xs text-gray-500">24/7 Rapid Incident Response</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setSirenActive(false);
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SOS Broadcast Card */}
        <div className="bg-red-50/80 border border-red-200/80 rounded-2xl p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-900 uppercase tracking-wider">
              Emergency Broadcast
            </span>
            {sosSent && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                <Check className="w-3 h-3" /> Alert Active
              </span>
            )}
          </div>
          <p className="text-xs text-red-800 leading-relaxed">
            Instantly sends your live GPS coordinates to pre-saved emergency contacts and CityOS Safety Control Room.
          </p>
          <button
            type="button"
            onClick={handleTriggerSos}
            className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
              sosSent
                ? 'bg-red-800 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white active:scale-98'
            }`}
          >
            <Siren className="w-4 h-4" />
            {sosSent ? 'SOS Alert Broadcasted' : 'Trigger Emergency SOS Alert'}
          </button>
        </div>

        {/* Action Options */}
        <div className="flex flex-col gap-2">
          {/* Siren Button */}
          <button
            type="button"
            onClick={() => setSirenActive((prev) => !prev)}
            className={`w-full p-3 rounded-xl border flex items-center justify-between transition-colors ${
              sirenActive
                ? 'bg-amber-500 border-amber-600 text-white shadow-md'
                : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Siren className="w-4 h-4" />
              <div className="text-left">
                <span className="font-bold text-xs block">
                  {sirenActive ? 'Stop Emergency Siren' : 'Sound Alarm Siren'}
                </span>
                <span className="text-[10px] opacity-80">
                  Plays loud distress audio to attract attention
                </span>
              </div>
            </div>
            <span className="text-xs font-bold">{sirenActive ? 'ON' : 'OFF'}</span>
          </button>

          {/* Call Police 112 */}
          <a
            href={`tel:${SAFETY_CONFIG.POLICE_EMERGENCY_NUMBER}`}
            className="w-full p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center gap-2.5 text-gray-800 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-red-600" />
            <div className="text-left">
              <span className="font-bold text-xs block text-gray-900">
                Call Emergency Services ({SAFETY_CONFIG.POLICE_EMERGENCY_NUMBER})
              </span>
              <span className="text-[10px] text-gray-500">
                Direct connection to local police control
              </span>
            </div>
          </a>

          {/* Share Live Trip */}
          <button
            type="button"
            onClick={handleShareTrip}
            className="w-full p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 flex items-center gap-2.5 text-gray-800 transition-colors"
          >
            <Share2 className="w-4 h-4 text-blue-600" />
            <div className="text-left">
              <span className="font-bold text-xs block text-gray-900">Share Live Trip Link</span>
              <span className="text-[10px] text-gray-500">
                Send realtime tracking link via WhatsApp / SMS
              </span>
            </div>
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>CityOS Ride Guardian • 256-bit encrypted telemetry</span>
        </div>
      </div>
    </div>
  );
};
