import React from 'react';
import type { PlateColor } from '../types';
import { PLATE_ICONS, PLATE_PRICES } from '../tokens';

interface LegendProps {
  color: PlateColor;
  className?: string;
}

const Legend: React.FC<LegendProps> = ({ color, className = '' }) => {
  return (
    <div
      className={`
        bg-white border border-dark-white flex gap-[10px] items-center
        overflow-hidden px-[15px] py-[14px] rounded-[4px] shrink-0
        ${className}
      `}
    >
      <div className="w-[30px] h-[30px] shrink-0">
        <img
          src={PLATE_ICONS[color]}
          alt={color}
          className="w-full h-full object-contain"
        />
      </div>
      <span className="font-ibm-thai text-[20px] text-black leading-normal whitespace-nowrap">
        {PLATE_PRICES[color]}฿
      </span>
    </div>
  );
};

export default Legend;