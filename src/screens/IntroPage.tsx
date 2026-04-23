import React from 'react';
import { motion } from 'framer-motion';
import type { Language } from '../types';
import { PLATE_COLORS, PLATE_BG, CONVEYOR_BG, LOGO_SVG } from '../tokens';
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
    subtitle: 'Sushiro bill. No calculator.',
    play: 'PLAY',
    langLabel: 'Eng',
    appName: 'Sushiro',
  },
  th: {
    title: 'กินไปเท่าไหร่วะ',
    subtitle: 'เกมคิดเงินซูชิในหัว ลองดูจะรอดมั้ย',
    play: 'เล่นเลย',
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

      {/* ── Top bar: Logo + app name (left) | lang toggle (below logo) | footer (right) ── */}
      <div className="absolute left-[37px] top-[24px] flex gap-4 items-center">
        <div className="w-[91px] h-[41px]">
          <img src={LOGO_SVG} alt="Sushiro logo" className="w-full h-full object-contain" />
        </div>
        <span className="font-ibm-thai text-[20px] text-white leading-normal">{copy.appName}</span>
      </div>

      {/* Lang toggle */}
      <button
        onClick={onLangToggle}
        className="absolute left-[37px] top-[79px] flex gap-4 items-center group"
      >
        <div className="w-[91px] h-[41px] opacity-60 group-hover:opacity-100 transition-opacity">
          <img src={LOGO_SVG} alt="" className="w-full h-full object-contain" />
        </div>
        <span className="font-ibm-thai text-[20px] text-white leading-normal underline">
          {copy.langLabel}
        </span>
      </button>

      <Footer className="absolute right-[37px] top-[24px]" />

      {/* ── Title block ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute left-1/2 -translate-x-1/2 top-[120px] flex flex-col gap-9 items-center text-center text-white"
      >
        <p className="font-ibm-thai font-semibold text-[64px] whitespace-nowrap leading-tight">
          {copy.title}
        </p>
        <p className="font-ibm-thai font-light text-[36px] leading-normal">
          {copy.subtitle}
        </p>
      </motion.div>

      {/* ── Play button ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="absolute left-1/2 -translate-x-1/2 top-[278px]"
      >
        <Button label={copy.play} onClick={onPlay} />
      </motion.div>

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

      {/* ── Plate color legend row (used as decorative strip) ── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-30">
        {PLATE_COLORS.map(color => {
          const { top } = PLATE_BG[color];
          return <div key={color} className="w-4 h-4 rounded-full" style={{ backgroundColor: top }} />;
        })}
      </div>
    </div>
  );
};

export default IntroPage;