import React, { useState, useEffect } from 'react';
import {formatNowDate} from "../../components/approval/ele-component/common/dataUtils";

function Clock() {
  const [time, setTime] = useState(new Date());

  const style = {
    color : 'var(--color-text-content)',
    fontSize : '13px',
    padding : '10px 0px'
  }

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
          <p style={style}>{formatNowDate()}
            <span>{hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
          </p>
      </div>
  );
}

export default Clock;