import React from 'react';
import { Play } from 'lucide-react';
import { ProgressiveImage } from '@/features/shop/components/ProgressiveImage/ProgressiveImage';

export const ProductInfluencerPicks = ({ picks = [], showToast }) => {
  return (
    <div className="bg-white px-4 py-3.5 border-t border-slate-100 select-none">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-black text-slate-900 tracking-tight">
          Top influencer picks
        </h3>
        <span className="text-[10px] font-bold text-slate-400">
          Verified Reviews
        </span>
      </div>

      <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
        {picks.map((pick) => (
          <div
            key={pick.id}
            onClick={() => showToast && showToast(`Playing ${pick.creator}'s review video`)}
            className="w-[125px] aspect-[9/15] rounded-2xl overflow-hidden bg-slate-900 shrink-0 relative cursor-pointer group active:scale-[0.98] transition-transform shadow-xs"
          >
            <ProgressiveImage
              src={pick.image}
              alt={pick.creator}
              aspectRatio="aspect-[9/15]"
              className="w-full h-full"
              imgClassName="group-hover:scale-105 transition-transform duration-300"
              objectFit="object-cover"
            />
            <div className="absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none" />

            {/* Play Badge */}
            <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white">
              <Play size={12} className="fill-white ml-0.5" />
            </div>

            {/* Tag */}
            <div className="absolute top-2.5 right-2 px-1.5 py-0.5 bg-black/60 rounded text-[8.5px] font-black text-white uppercase">
              {pick.tag}
            </div>

            {/* Creator & Views */}
            <div className="absolute bottom-2.5 left-2.5 right-2 text-white">
              <p className="text-[11px] font-bold truncate leading-tight drop-shadow-sm">
                {pick.creator}
              </p>
              <span className="text-[9.5px] text-white/80 font-medium">
                {pick.views}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
