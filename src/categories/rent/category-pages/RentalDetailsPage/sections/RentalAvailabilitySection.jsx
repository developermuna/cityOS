import React from 'react';
import { RentalAvailabilityCalendar } from '../components/RentalAvailabilityCalendar';
import { RentalDurationSelector } from '../components/RentalDurationSelector';

export const RentalAvailabilitySection = ({
  itemId,
  rentalDates,
  onDatesChange,
  onDurationChange
}) => {
  return (
    <section className="px-4 py-2 space-y-3" aria-label="Availability and Duration">
      <RentalAvailabilityCalendar
        itemId={itemId}
        startDate={rentalDates?.startDate}
        endDate={rentalDates?.endDate}
        onDatesChange={onDatesChange}
      />
      <RentalDurationSelector
        duration={rentalDates?.duration || 1}
        unit={rentalDates?.unit || 'day'}
        onChange={onDurationChange}
      />
    </section>
  );
};
