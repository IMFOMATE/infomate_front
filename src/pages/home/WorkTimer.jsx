import React, { useEffect, useState } from 'react';

function WorkTimer({ startTime, endTime }) {

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (startTime && !endTime) {
      intervalId = setInterval(() => {
        const now = new Date().getTime();
        const elapsed = now - new Date(startTime);
        setElapsedTime(elapsed);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [startTime, endTime]);

  const formatElapsedTime = () => {
    const seconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}H ${minutes}M ${remainingSeconds}S`;
  }

  return (
      <p>{formatElapsedTime()}</p>
  );
}

export default WorkTimer;