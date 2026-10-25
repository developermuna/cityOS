import React from 'react';

export const SceneCard = ({ scene, onJoin }) => {
  return (
    <article className="flex bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-sm transition-all p-4 rounded-[28px] border border-slate-100 shadow-sm" aria-label={`Scene: ${scene.name}`}>
      <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
        <img src={scene.image} alt={scene.name} className="w-full h-full object-cover" />
      </div>
      <div className="ml-4 flex-grow flex flex-col justify-between py-1">
        <div>
           <span className="text-[9px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full uppercase">{scene.tag}</span>
           <h4 className="text-[15px] font-black text-slate-900 leading-tight mt-1.5">{scene.name}</h4>
           <p className="text-[11px] text-slate-500 font-bold uppercase mt-1">{scene.loc}</p>
        </div>
        <div className="text-right">
           <button 
             type="button"
             onClick={onJoin}
             className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black uppercase cursor-pointer active:scale-95 transition-all"
           >
             JOIN SCENE
           </button>
        </div>
      </div>
    </article>
  );
};
