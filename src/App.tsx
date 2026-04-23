import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import type { Language, PlateCounts } from './types';
import { HIGH_SCORE_KEY } from './tokens';
import { resetPlateCounts } from './utils/gameLogic';
import IntroPage from './screens/IntroPage';
import GameScreen from './screens/GameScreen';
import GameEndScreen from './screens/GameEndScreen';

type AppScreen = 'intro' | 'game' | 'end';

interface EndData {
  score: number;
  highScore: number;
  plateCounts: PlateCounts;
}

function getStoredHighScore(): number {
  const v = localStorage.getItem(HIGH_SCORE_KEY);
  return v ? parseInt(v, 10) : 0;
}

function saveHighScore(score: number) {
  const existing = getStoredHighScore();
  if (score > existing) {
    localStorage.setItem(HIGH_SCORE_KEY, String(score));
  }
}

// Scale the 1280x832 game to fit any viewport
function useGameScale() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      const scaleX = window.innerWidth / 1280;
      const scaleY = window.innerHeight / 832;
      setScale(Math.min(scaleX, scaleY));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return scale;
}

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('intro');
  const [lang, setLang] = useState<Language>('en');
  const [highScore, setHighScore] = useState(getStoredHighScore);
  // Incremented only when a new game session starts — gives GameScreen a stable
  // key during play so re-renders from setHighScore don't unmount/remount it.
  const [gameSessionId, setGameSessionId] = useState(0);
  const [endData, setEndData] = useState<EndData>({
    score: 0,
    highScore: 0,
    plateCounts: resetPlateCounts(),
  });

  const scale = useGameScale();

  const handleLangToggle = useCallback(() => {
    setLang(prev => (prev === 'en' ? 'th' : 'en'));
  }, []);

  const handlePlay = useCallback(() => {
    setGameSessionId(id => id + 1);
    setScreen('game');
  }, []);

  const handleHighScoreUpdate = useCallback((score: number) => {
    saveHighScore(score);
    setHighScore(getStoredHighScore());
  }, []);

  const handleGameEnd = useCallback(
    (finalScore: number, finalHighScore: number, plateCounts: PlateCounts) => {
      saveHighScore(finalScore);
      setHighScore(getStoredHighScore());
      setEndData({ score: finalScore, highScore: finalHighScore, plateCounts });
      setScreen('end');
    },
    []
  );

  const handleLeave = useCallback(() => {
    setScreen('intro');
  }, []);

  const handleRestartFromEnd = useCallback(() => {
    setGameSessionId(id => id + 1);
    setScreen('game');
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        width: 1280,
        height: 832,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: 'center center',
        overflow: 'hidden',
        background: '#707070',
      }}
    >
      {screen === 'intro' && (
        <IntroPage
          lang={lang}
          onLangToggle={handleLangToggle}
          onPlay={handlePlay}
        />
      )}

      {screen === 'game' && (
        <GameScreen
          key={`game-${gameSessionId}`}
          lang={lang}
          initialHighScore={highScore}
          onHighScoreUpdate={handleHighScoreUpdate}
          onLeave={handleLeave}
          onGameEnd={handleGameEnd}
        />
      )}

      {screen === 'end' && (
        <GameEndScreen
          score={endData.score}
          highScore={endData.highScore}
          plateCounts={endData.plateCounts}
          lang={lang}
          onRestart={handleRestartFromEnd}
          onLeave={handleLeave}
        />
      )}
    </div>
  );
};

export default App;
