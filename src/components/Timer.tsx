import React from 'react';
import { formatTime } from '../utils/gameLogic';

interface TimerProps {
  timeLeft: number;
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  const isLow = timeLeft <= 30;

  return (
    <div
      className={`
        bg-white border-[3px] border-dark-white flex items-center justify-center
        h-[58px] w-[147px] overflow-hidden px-[40px] py-[14px] rounded-[4px]
        ${isLow ? 'border-light-red' : ''}
      `}
    >
      <span
        className={`
          font-ibm-thai text-[32px] leading-normal whitespace-nowrap
          ${isLow ? 'text-light-red' : 'text-black'}
        `}
      >
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default Timer;