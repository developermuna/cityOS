import React from 'react';
import { RentalOwnerCard } from '../components/RentalOwnerCard';

export const RentalOwnerSection = ({ owner, onContact }) => {
  return (
    <section className="px-4 py-2" aria-label="Owner Information">
      <RentalOwnerCard owner={owner} onContact={onContact} />
    </section>
  );
};
