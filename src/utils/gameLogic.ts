import type { PlateColor, PlateItem, PlateCounts } from '../types';
import {
  PLATE_PRICES,
  EMPTY_PLATE_COUNTS,
} from '../tokens';

// ─── Difficulty tiers ─────────────────────────────────────────────────────────
// Tier 1 (rounds 1–5):  2–5 plates, only cheap plates (White, Red)
// Tier 2 (rounds 6–10): 5–7 plates, mix of cheap + mid plates (White, Red, Silver)
// Tier 3 (round 11+):   6–12 plates, all plate colors
type DifficultyTier = {
  minPlates: number;
  maxPlates: number;
  allowedColors: PlateColor[];
};

const DIFFICULTY_TIERS: DifficultyTier[] = [
  { minPlates: 2, maxPlates: 5,  allowedColors: ['White', 'Red'] },
  { minPlates: 5, maxPlates: 7,  allowedColors: ['White', 'Red', 'Silver'] },
  { minPlates: 6, maxPlates: 12, allowedColors: ['White', 'Red', 'Silver', 'Gold', 'Black'] },
];

function getTier(roundNumber: number): DifficultyTier {
  if (roundNumber <= 5)  return DIFFICULTY_TIERS[0];
  if (roundNumber <= 10) return DIFFICULTY_TIERS[1];
  return DIFFICULTY_TIERS[2];
}

/**
 * Generate a random round of plates with progressive difficulty.
 * @param roundNumber 1-based round index within the current game session.
 */
export function generateRound(roundNumber = 1): PlateItem[] {
  const tier = getTier(roundNumber);
  const count =
    Math.floor(Math.random() * (tier.maxPlates - tier.minPlates + 1)) +
    tier.minPlates;

  return Array.from({ length: count }, (_, i) => ({
    id: `plate-${Date.now()}-${i}`,
    color: tier.allowedColors[
      Math.floor(Math.random() * tier.allowedColors.length)
    ] as PlateColor,
  }));
}

/**
 * Calculate the total cost of a set of plates.
 */
export function calculateTotal(plates: PlateItem[]): number {
  return plates.reduce((sum, plate) => sum + PLATE_PRICES[plate.color], 0);
}

/**
 * Validate a user's string input against the correct total.
 */
export function validateAnswer(input: string, correctTotal: number): boolean {
  const parsed = parseInt(input.trim(), 10);
  return !isNaN(parsed) && parsed === correctTotal;
}

/**
 * Add the plates from a round into the running session plate counts.
 */
export function accumulatePlateCounts(
  existing: PlateCounts,
  newPlates: PlateItem[]
): PlateCounts {
  const updated = { ...existing };
  for (const plate of newPlates) {
    updated[plate.color] += 1;
  }
  return updated;
}

/**
 * Format seconds as MM:SS.
 */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/**
 * Reset plate counts to all zeros.
 */
export function resetPlateCounts(): PlateCounts {
  return { ...EMPTY_PLATE_COUNTS };
}