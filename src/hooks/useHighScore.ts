import { useState, useCallback } from 'react';
import { HIGH_SCORE_KEY } from '../tokens';

export function useHighScore() {
  const [highScore, setHighScore] = useState<number>(() => {
    const stored = localStorage.getItem(HIGH_SCORE_KEY);
    return stored ? parseInt(stored, 10) : 0;
  });

  const updateHighScore = useCallback((newScore: number) => {
    setHighScore(prev => {
      if (newScore > prev) {
        localStorage.setItem(HIGH_SCORE_KEY, String(newScore));
        return newScore;
      }
      return prev;
    });
  }, []);

  return { highScore, updateHighScore };
}