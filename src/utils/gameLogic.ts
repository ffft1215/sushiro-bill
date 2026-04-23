import type { PlateColor, PlateItem, PlateCounts } from '../types';
import {
  PLATE_COLORS,
  PLATE_PRICES,
  MIN_PLATES_PER_ROUND,
  MAX_PLATES_PER_ROUND,
  EMPTY_PLATE_COUNTS,
} from '../tokens';

/**
 * Generate a random round of plates (3–12 plates, random colors).
 */
export function generateRound(): PlateItem[] {
  const count =
    Math.floor(Math.random() * (MAX_PLATES_PER_ROUND - MIN_PLATES_PER_ROUND + 1)) +
    MIN_PLATES_PER_ROUND;

  return Array.from({ length: count }, (_, i) => ({
    id: `plate-${Date.now()}-${i}`,
    color: PLATE_COLORS[Math.floor(Math.random() * PLATE_COLORS.length)] as PlateColor,
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