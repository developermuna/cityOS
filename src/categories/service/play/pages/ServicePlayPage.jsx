import React from 'react';

const DIY_TIPS = [
  {
    id: 'tip-1',
    title: 'How to safely reset a tripping MCB at home',
    category: 'Electrician',
    icon: '⚡',
    readTime: '2 min read',
    summary: 'Identify the overloaded circuit, unplug heavy appliances, and flip the trip lever up.',
  },
  {
    id: 'tip-2',
    title: 'Fix a dripping faucet in 3 quick steps',
    category: 'Plumber',
    icon: '🚰',
    readTime: '3 min read',
    summary: 'Turn off the angle valve, replace the worn rubber O-ring or washer, and tighten with Teflon tape.',
  },
  {
    id: 'tip-3',
    title: 'AC filter maintenance to cut 20% power bill',
    category: 'AC Repair',
    icon: '❄️',
    readTime: '4 min read',
    summary: 'Rinse dust filters every 15 days with running tap water to prevent ice formation and compressor strain.',
  },
  {
    id: 'tip-4',
    title: 'RO Water Purifier membrane flush guide',
    category: 'RO Service',
    icon: '💧',
    readTime: '3 min read',
    summary: 'Flush pre-sediment filters every 3 months to avoid TDS spikes and maintain mineral balance.',
  },
];

export const ServicePlayPage = ({ onSelectCategory, onBack }) => {
  return (
    <div className="space-y-5 px-4 pb-16 animate-in fade-in duration-300">
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
            CityOS Learning Hub
          </span>
          <h2 className="text-base font-black text-slate-900 truncate">
            DIY Repair Guides & Tips
          </h2>
        </div>
      </div>

      <div className="p-4 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md">
        <span className="text-2xl block mb-1">💡</span>
        <h3 className="text-base font-black leading-snug">Home Care Masterclass</h3>
        <p className="text-xs text-white/90 font-medium mt-1">
          Simple preventive maintenance tips from certified Rayagada technicians.
        </p>
      </div>

      <div className="space-y-3">
        {DIY_TIPS.map((tip) => (
          <div
            key={tip.id}
            className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#606C38] bg-[#606C38]/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                <span>{tip.icon}</span> {tip.category}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">{tip.readTime}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900">{tip.title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{tip.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
