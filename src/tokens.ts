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
  White:  'http://localhost:3845/assets/534cd6db3c07752b51199f62ce2c52249c7bcfcd.svg',
  Red:    'http://localhost:3845/assets/49b12471a355c97fb48516ad9739a87a20922abb.svg',
  Silver: 'http://localhost:3845/assets/8a89e7c1724ffb32b47d28a0198e31146272de58.svg',
  Gold:   'http://localhost:3845/assets/3350e876987028e30db74092969ff8c73569a77c.svg',
  Black:  'http://localhost:3845/assets/c6e24160c53d64aabad9802ed05b74cf51a41633.svg',
};

// ─── Logo / Background assets ─────────────────────────────────────────────────
export const LOGO_SVG = 'http://localhost:3845/assets/c2b0f20558bc502c0f02a3eaec4d43bfbaf6b90f.svg';
export const CONVEYOR_BG = 'http://localhost:3845/assets/267a50f566ca6309adb16cfeb0bffab61c9475e5.png';

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