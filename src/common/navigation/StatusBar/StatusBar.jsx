import React, { useState, useEffect } from 'react';

export const StatusBar = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12 || 12;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-5 pt-3 pb-1 flex items-center justify-start text-white text-xs select-none bg-transparent z-50">
      {/* Only Time is visible now */}
      <div className="flex items-center gap-1.5 font-semibold tracking-tight">
        <span className="text-[13px]">{time}</span>
      </div>
    </div>
  );
};
