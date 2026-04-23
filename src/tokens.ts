import type { PlateColor, PlateCounts } from './types';

// ─── Design Tokens ───────────────────────────────────────────────────────────
export const COLORS = {
  bgGame: '#707070',
  lightWhite: '#F8FAFC',
  darkWhite: '#E2E8F0',
  lightGrey: '#CAD5E2',
  darkGrey: '#90A1B9',
  lightBlack: '#314158',
  darkBlack: '#1D293D',
  lightRed: '#EC003F',
  darkRed: '#C70036',
  lightGold: '#F0B100',
  darkGold: '#D08700',
} as const;

// ─── Plate Assets (SVG circles from Figma) ───────────────────────────────────
export const PLATE_ICONS: Record<PlateColor, string> = {
  White:  '/assets/plate-white.svg',
  Red:    '/assets/plate-red.svg',
  Silver: '/assets/plate-silver.svg',
  Gold:   '/assets/plate-gold.svg',
  Black:  '/assets/plate-black.svg',
};

// ─── Logo / Background assets ─────────────────────────────────────────────────
export const LOGO_SVG = '/assets/logo.svg';
export const CONVEYOR_BG = '/assets/conveyor-bg.png';

// ─── Plate Prices ─────────────────────────────────────────────────────────────
export const PLATE_PRICES: Record<PlateColor, number> = {
  White:  30,
  Red:    40,
  Silver: 60,
  Gold:   80,
  Black:  100,
};

export const PLATE_COLORS: PlateColor[] = ['White', 'Red', 'Silver', 'Gold', 'Black'];

// ─── Plate visual colors (for the stacked plate shape) ───────────────────────
export const PLATE_BG: Record<PlateColor, { top: string; bottom: string }> = {
  White:  { top: '#F8FAFC', bottom: '#E2E8F0' },
  Red:    { top: '#EC003F', bottom: '#C70036' },
  Silver: { top: '#CAD5E2', bottom: '#90A1B9' },
  Gold:   { top: '#F0B100', bottom: '#D08700' },
  Black:  { top: '#314158', bottom: '#1D293D' },
};

// ─── Game Config ──────────────────────────────────────────────────────────────
export const GAME_DURATION_SECONDS = 120; // 2 minutes
export const MIN_PLATES_PER_ROUND = 3;
export const MAX_PLATES_PER_ROUND = 12;
export const PLATE_STACKING_DELAY_MS = 400; // delay between each plate drop
export const SETTLE_ANIMATION_DURATION_MS = 500;

// ─── Default plate counts ─────────────────────────────────────────────────────
export const EMPTY_PLATE_COUNTS: PlateCounts = {
  White: 0,
  Red: 0,
  Silver: 0,
  Gold: 0,
  Black: 0,
};

// ─── High score localStorage key ─────────────────────────────────────────────
export const HIGH_SCORE_KEY = 'sushiro-highscore';