import React from 'react';
import { motion } from 'framer-motion';
import type { PlateCounts, Language } from '../types';
import { PLATE_COLORS } from '../tokens';
import Legend from '../components/Legend';
import Button from '../components/Button';
import Footer from '../components/Footer';

interface GameEndScreenProps {
  score: number;
  highScore: number;
  plateCounts: PlateCounts;
  lang: Language;
  onRestart: () => void;
  onLeave: () => void;
}

const COPY = {
  en: {
    title: 'total damage:',
    score: 'Score',
    highScore: 'High Score',
    restart: 'restart',
    leave: 'leave',
  },
  th: {
    title: 'ค่าเสียหายทั้งหมด',
    score: 'คะแนน',
    highScore: 'คะแนนสูงสุด',
    restart: 'เริ่มใหม่',
    leave: 'ออก',
  },
};

const GameEndScreen: React.FC<GameEndScreenProps> = ({
  score,
  highScore,
  plateCounts,
  lang,
  onRestart,
  onLeave,
}) => {
  const copy = COPY[lang];
  const platesPlayed = PLATE_COLORS.filter(c => plateCounts[c] > 0);

  return (
    <div className="absolute inset-0 bg-bg-game overflow-hidden">
      <Footer className="absolute right-[37px] top-[24px]" />

      <div
        className="absolute"
        style={{ left: '50%', transform: 'translateX(-50%)', top: 107 }}
      >
        <motion.p
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-ibm-thai font-semibold text-[36px] text-white leading-normal whitespace-nowrap"
        >
          {copy.title}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="absolute flex gap-6 items-center font-ibm-thai"
        style={{ left: 343, top: 192 }}
      >
        <div className="bg-white border border-light-grey flex flex-col gap-2 items-center justify-center overflow-hidden px-10 py-6 rounded-lg w-[291px]">
          <span className="text-light-black text-[16px] whitespace-nowrap">{copy.score}</span>
          <span className="text-[40px] text-black text-center leading-none">{score}</span>
        </div>
        <div className="bg-white border border-light-grey flex flex-col gap-2 items-center justify-center overflow-hidden px-10 py-6 rounded-lg w-[291px]">
          <span className="text-light-black text-[16px] whitespace-nowrap">{copy.highScore}</span>
          <span className="text-[40px] text-black text-center leading-none">{highScore}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="absolute bg-light-grey rounded-[8px] overflow-hidden p-[60px] flex flex-col gap-[42px] items-center justify-center"
        style={{ left: 214, top: 343, width: 867 }}
      >
        {platesPlayed.length === 0 ? (
          <p className="font-ibm-thai text-[24px] text-dark-black">No plates this game!</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-6 items-center justify-center">
              {platesPlayed.slice(0, 3).map(color => (
                <div key={color} className="flex items-center justify-between w-[181px]">
                  <Legend color={color} />
                  <span className="font-ibm-thai text-[20px] text-black whitespace-nowrap ml-2">
                    x {plateCounts[color]}
                  </span>
                </div>
              ))}
            </div>
            {platesPlayed.length > 3 && (
              <div className="flex flex-wrap gap-6 items-center justify-center">
                {platesPlayed.slice(3).map(color => (
                  <div key={color} className="flex items-center justify-between w-[178px]">
                    <Legend color={color} />
                    <span className="font-ibm-thai text-[20px] text-black whitespace-nowrap ml-2">
                      x {plateCounts[color]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="absolute flex gap-6 items-center"
        style={{ left: '50%', transform: 'translateX(-50%)', top: 683 }}
      >
        <Button label={copy.restart} onClick={onRestart} />
        <Button label={copy.leave} onClick={onLeave} />
      </motion.div>
    </div>
  );
};

export default GameEndScreen;