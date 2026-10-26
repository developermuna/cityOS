import React from 'react';
import { NearbyProviderCard } from '../components/NearbyProviderCard';

export const NearbyProvidersSection = ({ providers, onSelectProvider, onBookDirect }) => {
  return (
    <section className="px-4" aria-label="Nearby Service Professionals">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-[17px] font-black text-slate-900 tracking-tight">
            Nearby Service Providers
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            Background verified and rated by local Rayagada residents
          </p>
        </div>
      </div>

      <div className="space-y-2.5">
        {providers.map((provider) => (
          <NearbyProviderCard
            key={provider.id}
            provider={provider}
            onSelect={onSelectProvider}
            onBookDirect={onBookDirect}
          />
        ))}
      </div>
    </section>
  );
};
