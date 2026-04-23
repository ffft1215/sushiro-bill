export type PlateColor = 'White' | 'Red' | 'Silver' | 'Gold' | 'Black';

export type GamePhase =
  | 'intro'
  | 'stacking'
  | 'awaiting-answer'
  | 'try-again'
  | 'game-end';

export type Language = 'en' | 'th';

export interface PlateItem {
  id: string;
  color: PlateColor;
}

export interface PlateCounts {
  White: number;
  Red: number;
  Silver: number;
  Gold: number;
  Black: number;
}

export interface GameState {
  phase: GamePhase;
  score: number;
  highScore: number;
  timeLeft: number; // seconds
  currentPlates: PlateItem[];
  totalPlateCounts: PlateCounts;
  inputValue: string;
  isShaking: boolean;
}