import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timeId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timeId);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
      <div>
        <h2>현재 시간:</h2>
        <p>
          {hours < 10 ? `0${hours}` : hours}:
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </p>
      </div>
  );
}

export default Clock;