import React from 'react';
import { SceneCard } from './SceneCard';

export const TrendingScenesList = ({ showToast }) => {
  const scenes = [
    { name: "Sun-Downer at Soho House", loc: "Juhu", tag: "EXCLUSIVE", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&auto=format&fit=crop&q=80" },
    { name: "Rooftop Yoga session", loc: "Bandra", tag: "WELLNESS", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80" }
  ];

  return (
    <section className="px-4 pb-8" aria-label="Trending Scenes">
      <h3 className="text-[17px] font-black text-slate-900 tracking-tight mb-4">Trending Scenes</h3>
      <div className="space-y-4">
        {scenes.map((s, i) => (
          <SceneCard 
            key={i} 
            scene={s} 
            onJoin={() => showToast && showToast(`Joined ${s.name}! Invitation sent to your email.`)}
          />
        ))}
      </div>
    </section>
  );
};
