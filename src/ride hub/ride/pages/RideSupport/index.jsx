import React from 'react';
import { HelpCircle, PhoneCall, MessageSquare, ShieldCheck, FileText } from 'lucide-react';
import { SAFETY_CONFIG } from '../../constants/ride.constants';

export const RideSupportPage = ({ showToast }) => {
  const supportCategories = [
    { title: 'Lost & Found Items', desc: 'Left something behind in your Captain vehicle?', icon: HelpCircle },
    { title: 'Fare & Payment Dispute', desc: 'Charged incorrectly or coupon not applied?', icon: FileText },
    { title: 'Captain Feedback & Safety', desc: 'Report rash driving or inappropriate behavior', icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="pb-2 border-b border-gray-100">
        <h3 className="font-extrabold text-gray-900 text-base">CityOS Ride Support</h3>
        <p className="text-xs text-gray-500">24/7 dedicated customer assistance</p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-xs">
            <PhoneCall className="w-5 h-5" />
          </span>
          <div>
            <h4 className="font-bold text-xs text-emerald-950">CityOS Ride Helpline</h4>
            <p className="text-[11px] text-emerald-800">{SAFETY_CONFIG.CITYOS_SAFETY_DESK}</p>
          </div>
        </div>
        <a
          href={`tel:${SAFETY_CONFIG.POLICE_EMERGENCY_NUMBER}`}
          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors"
        >
          Call Now
        </a>
      </div>

      <div className="flex flex-col gap-2">
        {supportCategories.map((cat) => (
          <button
            key={cat.title}
            type="button"
            onClick={() => showToast && showToast(`Opening support ticket for: ${cat.title}`)}
            className="p-3.5 rounded-2xl border border-gray-200 bg-white hover:border-gray-300 text-left flex items-center gap-3 transition-colors shadow-xs"
          >
            <span className="p-2 rounded-xl bg-gray-100 text-gray-700">
              <cat.icon className="w-4 h-4" />
            </span>
            <div>
              <span className="font-bold text-xs text-gray-900 block">{cat.title}</span>
              <span className="text-[11px] text-gray-500">{cat.desc}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
