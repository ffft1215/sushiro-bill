import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { GamePhase, Language } from '../types';

interface InputBoxProps {
  phase: GamePhase;
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  isShaking: boolean;
  lang: Language;
}

const LABELS: Record<Language, { stacking: string; total: string; tryAgain: string; placeholder: string; submitHint: string }> = {
  en: {
    stacking: 'Stacking...',
    total: 'Total?',
    tryAgain: 'Try again!',
    placeholder: 'Enter total (฿)',
    submitHint: 'Press Enter to submit',
  },
  th: {
    stacking: 'ซ้อนจานอยู่...',
    total: 'รวมเท่าไหร่?',
    tryAgain: 'ลองใหม่!',
    placeholder: 'ใส่ยอดรวม (฿)',
    submitHint: 'กด Enter เพื่อส่ง',
  },
};

const InputBox: React.FC<InputBoxProps> = ({
  phase,
  value,
  onChange,
  onSubmit,
  isShaking,
  lang,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const labels = LABELS[lang];

  const isStacking = phase === 'stacking';
  const isTryAgain = phase === 'try-again';
  const isActive = phase === 'awaiting-answer' || phase === 'try-again';

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive, phase]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isActive && value.trim()) {
      onSubmit();
    }
  };

  // State-specific label shown in the header tab
  const stateLabel = isStacking
    ? labels.stacking
    : isTryAgain
    ? labels.tryAgain
    : labels.total;

  // Border color
  const borderColor = isTryAgain ? '#EC003F' : '#90A1B9';

  // Header tab bg
  const headerBg = isTryAgain
    ? '#EC003F'
    : isStacking
    ? '#90A1B9'
    : '#314158';

  return (
    <motion.div
      animate={isShaking ? { x: [-6, 6, -4, 4, -2, 0] } : { x: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-[606px] h-[199px]"
    >
      {/* Main input box background */}
      <div
        className="absolute rounded-[8px] overflow-hidden"
        style={{
          inset: '21px 0 0 0',
          backgroundColor: isActive ? '#ffffff' : '#CAD5E2',
          border: `4.74px solid ${borderColor}`,
        }}
      />

      {/* Header tab */}
      <div
        className="absolute rounded-[8px] flex items-start overflow-hidden p-[15.8px]"
        style={{
          inset: '0 38.56% 77.85% 0',
          backgroundColor: headerBg,
        }}
      >
        <span
          className="font-ibm-thai text-[19px] text-dark-black whitespace-nowrap leading-normal"
          style={{ color: isStacking || isTryAgain ? '#fff' : '#F8FAFC' }}
        >
          {stateLabel}
        </span>
      </div>

      {/* Input field (only active when awaiting answer or try-again) */}
      {isActive && (
        <div className="absolute flex flex-col items-center justify-center"
          style={{ inset: '21px 0 0 0' }}>
          <input
            ref={inputRef}
            type="number"
            min="0"
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={labels.placeholder}
            className="
              w-full h-full bg-transparent text-center
              font-ibm-thai text-[48px] text-dark-black
              outline-none border-none
              placeholder:text-dark-grey placeholder:text-[32px]
            "
            style={{ paddingTop: 28 }}
          />
          <span className="text-[13px] text-dark-grey font-ibm-thai pb-2 absolute bottom-2">
            {labels.submitHint}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default InputBox;