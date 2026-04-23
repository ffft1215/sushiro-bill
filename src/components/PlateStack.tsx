import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PlateItem } from '../types';
import { PLATE_BG } from '../tokens';

interface PlateStackProps {
  plates: PlateItem[];
  isLastSettling: boolean;
}

const PLATE_WIDTH = 284;
const PLATE_TOP_HEIGHT = 32;
const PLATE_BOTTOM_HEIGHT = 16;
const PLATE_GAP = 3;

const PlateStack: React.FC<PlateStackProps> = ({ plates, isLastSettling }) => {
  return (
    <div
      className="absolute left-[131px]"
      style={{
        bottom: '152px', // above conveyor belt (779px from top of 832px = 53px from bottom, +99px stack area)
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: `${PLATE_GAP}px`,
        width: `${PLATE_WIDTH}px`,
      }}
    >
      <AnimatePresence>
        {plates.map((plate, index) => {
          const isLast = index === plates.length - 1;
          const { top: topColor, bottom: bottomColor } = PLATE_BG[plate.color];

          return (
            <motion.div
              key={plate.id}
              initial={{ x: -120, opacity: 0 }}
              animate={
                isLast && isLastSettling
                  ? {
                      x: 0,
                      opacity: 1,
                      y: [0, -8, 4, -3, 1, 0],
                      transition: {
                        x: { duration: 0.25, ease: 'easeOut' },
                        opacity: { duration: 0.2 },
                        y: { delay: 0.25, duration: 0.5, ease: 'easeOut' },
                      },
                    }
                  : { x: 0, opacity: 1 }
              }
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ width: PLATE_WIDTH }}
            >
              {/* Top part of plate (wide) */}
              <div
                style={{
                  backgroundColor: topColor,
                  height: PLATE_TOP_HEIGHT,
                  borderRadius: '3.2px',
                  width: '100%',
                }}
              />
              {/* Bottom lip of plate (narrower) */}
              <div
                style={{
                  backgroundColor: bottomColor,
                  height: PLATE_BOTTOM_HEIGHT,
                  borderRadius: '0 0 3.2px 3.2px',
                  borderTop: `2.4px solid ${bottomColor}`,
                  marginLeft: 31.2,
                  width: 222.4,
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default PlateStack;