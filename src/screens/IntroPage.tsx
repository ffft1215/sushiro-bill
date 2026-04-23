import React from 'react';
import { motion } from 'framer-motion';
import type { Language } from '../types';
import { PLATE_BG, CONVEYOR_BG } from '../tokens';
import Button from '../components/Button';
import Footer from '../components/Footer';

interface IntroPageProps {
  lang: Language;
  onLangToggle: () => void;
  onPlay: () => void;
}

const COPY = {
  en: {
    title: 'wait... how much was that',
    subtitle: 'sushiro bill. no calculator.',
    play: 'start',
    langLabel: 'eng',
    appName: 'Sushiro',
  },
  th: {
    title: 'กินไปเท่าไหร่วะ',
    subtitle: 'เกมคิดเงินซูชิโร่ในหัว ลองดูจะรอดมั้ย',
    play: 'เริ่ม',
    langLabel: 'ไทย',
    appName: 'Sushiro',
  },
};

// Decorative stacked plates column shown on right side of intro
const DEMO_PLATES: Array<'White' | 'Red' | 'Silver' | 'Gold' | 'Black' | 'White' | 'Red' | 'Silver'> = [
  'White', 'Red', 'White', 'Silver', 'Gold', 'Red', 'White', 'Black',
];

const IntroPage: React.FC<IntroPageProps> = ({ lang, onLangToggle, onPlay }) => {
  const copy = COPY[lang];

  return (
    <div className="absolute inset-0 bg-bg-game overflow-hidden">
      {/* Lang toggle — pill switch, aligned with footer */}
      <button
        onClick={onLangToggle}
        className="absolute left-[37px] top-[24px] flex gap-3 items-center hover:opacity-80 transition-opacity"
        aria-label={`Switch language, currently ${copy.langLabel}`}
      >
        {/* Toggle track */}
        <div
          className="relative rounded-full flex-shrink-0"
          style={{ width: 52, height: 28, backgroundColor: '#314158', border: '2px solid #1D293D' }}
        >
          {/* Sliding knob */}
          <motion.div
            animate={{ x: lang === 'th' ? 24 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            style={{
              position: 'absolute',
              top: 2,
              width: 20,
              height: 20,
              borderRadius: '50%',
              backgroundColor: '#F8FAFC',
            }}
          />
        </div>
        <span className="font-ibm-thai text-[20px] text-white leading-normal">
          {copy.langLabel}
        </span>
      </button>

      <Footer className="absolute right-[37px] top-[24px]" />

      {/* ── Title block ── */}
      <div
        className="absolute top-[120px] flex flex-col gap-3 items-center text-center text-white"
        style={{ left: '50%', transform: 'translateX(-50%)', width: 'max-content', maxWidth: 900 }}
      >
        <motion.p
          key={`title-${lang}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-ibm-thai font-semibold text-[36px] leading-tight text-center"
        >
          {copy.title}
        </motion.p>
        <motion.p
          key={`subtitle-${lang}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-ibm-thai font-light text-[24px] leading-normal text-center"
        >
          {copy.subtitle}
        </motion.p>
      </div>

      {/* ── Play button ── */}
      <div
        className="absolute top-[278px]"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      >
        <Button label={copy.play} onClick={onPlay} />
      </div>

      {/* ── Decorative plate stack (right side, centred horizontally after midpoint) ── */}
      <div
        className="absolute flex flex-col-reverse gap-[3px] items-start"
        style={{ left: 498, top: 374 }}
      >
        {DEMO_PLATES.map((color, i) => {
          const { top: topColor, bottom: bottomColor } = PLATE_BG[color];
          return (
            <motion.div
              key={i}
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.05 * i, duration: 0.3, ease: 'easeOut' }}
              style={{ width: 284 }}
            >
              <div style={{ backgroundColor: topColor, height: 32, borderRadius: 3.2 }} />
              <div
                style={{
                  backgroundColor: bottomColor,
                  height: 16,
                  borderRadius: '0 0 3.2px 3.2px',
                  borderTop: `2.4px solid ${bottomColor}`,
                  marginLeft: 31.2,
                  width: 222.4,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* ── Conveyor belt bar at bottom ── */}
      <div className="absolute left-[374px] top-[779px] w-[532px] h-[53px] rounded-tr-[2px] overflow-hidden">
        <img src={CONVEYOR_BG} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>

    </div>
  );
};

export default IntroPage;