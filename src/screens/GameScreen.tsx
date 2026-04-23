
import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { GamePhase, PlateItem, PlateCounts, Language } from '../types';
import { PLATE_COLORS, CONVEYOR_BG, PLATE_STACKING_DELAY_MS } from '../tokens';
import {
  generateRound,
  calculateTotal,
  validateAnswer,
  accumulatePlateCounts,
  resetPlateCounts,
} from '../utils/gameLogic';
import { useGameTimer } from '../hooks/useGameTimer';
import Legend from '../components/Legend';
import Timer from '../components/Timer';
import ScoreBoard from '../components/ScoreBoard';
import PlateStack from '../components/PlateStack';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import Footer from '../components/Footer';

interface GameScreenProps {
  lang: Language;
  initialHighScore: number;
  onHighScoreUpdate: (score: number) => void;
  onLeave: () => void;
  onGameEnd: (finalScore: number, highScore: number, plateCounts: PlateCounts) => void;
}

const SCORE_LABELS = {
  en: { score: 'Score', highScore: 'High Score', leave: 'LEAVE', restart: 'RESTART' },
  th: { score: 'คะแนน', highScore: 'คะแนนสูงสุด', leave: 'ออก', restart: 'เริ่มใหม่' },
};

const GameScreen: React.FC<GameScreenProps> = ({
  lang,
  initialHighScore,
  onHighScoreUpdate,
  onLeave,
  onGameEnd,
}) => {
  const labels = SCORE_LABELS[lang];

  const [phase, setPhase] = useState<GamePhase>('stacking');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(initialHighScore);
  const [visiblePlates, setVisiblePlates] = useState<PlateItem[]>([]);
  const [totalPlateCounts, setTotalPlateCounts] = useState<PlateCounts>(resetPlateCounts());
  const [inputValue, setInputValue] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isLastSettling, setIsLastSettling] = useState(false);

  const correctTotalRef = useRef(0);
  const currentPlatesRef = useRef<PlateItem[]>([]);
  const stackingTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scoreRef = useRef(0);
  const highScoreRef = useRef(initialHighScore);
  const totalPlateCountsRef = useRef<PlateCounts>(resetPlateCounts());
  const roundNumberRef = useRef(1);
  const gameStartedRef = useRef(false);
  const timerStartedRef = useRef(false); // timer starts only after first round finishes stacking

  scoreRef.current = score;
  highScoreRef.current = highScore;
  totalPlateCountsRef.current = totalPlateCounts;

  const handleTimerExpire = useCallback(() => {
    stackingTimersRef.current.forEach(clearTimeout);
    stackingTimersRef.current = [];
    const finalHS = Math.max(scoreRef.current, highScoreRef.current);
    onHighScoreUpdate(scoreRef.current);
    onGameEnd(scoreRef.current, finalHS, totalPlateCountsRef.current);
  }, [onHighScoreUpdate, onGameEnd]);

  const { timeLeft, startTimer, resetTimer } = useGameTimer(handleTimerExpire);

  const startRound = useCallback(() => {
    stackingTimersRef.current.forEach(clearTimeout);
    stackingTimersRef.current = [];
    const plates = generateRound(roundNumberRef.current);
    currentPlatesRef.current = plates;
    correctTotalRef.current = calculateTotal(plates);
    setVisiblePlates([]);
    setInputValue('');
    setIsLastSettling(false);
    setPhase('stacking');

    plates.forEach((plate, index) => {
      const t = setTimeout(() => {
        setVisiblePlates(prev => [...prev, plate]);
        if (index === plates.length - 1) {
          setIsLastSettling(true);
          const t2 = setTimeout(() => {
            setIsLastSettling(false);
            setPhase('awaiting-answer');
            // Start the countdown the very first time plates finish stacking
            if (!timerStartedRef.current) {
              timerStartedRef.current = true;
              startTimer();
            }
          }, 650);
          stackingTimersRef.current.push(t2);
        }
      }, PLATE_STACKING_DELAY_MS * (index + 1));
      stackingTimersRef.current.push(t);
    });
  }, [startTimer]);

  useEffect(() => {
    // gameStartedRef prevents React 18 StrictMode double-invoke from calling
    // startRound() twice. Timer is intentionally NOT started here — it starts
    // automatically after the first round of plates finishes stacking.
    if (gameStartedRef.current) return;
    gameStartedRef.current = true;
    startRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = useCallback(() => {
    if (validateAnswer(inputValue, correctTotalRef.current)) {
      const newScore = scoreRef.current + 1;
      setScore(newScore);
      if (newScore > highScoreRef.current) {
        setHighScore(newScore);
        onHighScoreUpdate(newScore);
      }
      setTotalPlateCounts(prev => accumulatePlateCounts(prev, currentPlatesRef.current));
      roundNumberRef.current += 1;
      startRound();
    } else {
      setIsShaking(true);
      setPhase('try-again');
      setInputValue('');
      setTimeout(() => setIsShaking(false), 500);
    }
  }, [inputValue, onHighScoreUpdate, startRound]);

  const handleRestart = useCallback(() => {
    stackingTimersRef.current.forEach(clearTimeout);
    stackingTimersRef.current = [];
    setScore(0);
    scoreRef.current = 0;
    setHighScore(initialHighScore);
    highScoreRef.current = initialHighScore;
    setTotalPlateCounts(resetPlateCounts());
    setInputValue('');
    roundNumberRef.current = 1;
    gameStartedRef.current = false;
    timerStartedRef.current = false; // reset so timer waits for first stack again
    resetTimer();
    setTimeout(() => {
      gameStartedRef.current = true;
      startRound();
    }, 50);
  }, [resetTimer, startRound, initialHighScore]);

  return (
    <div className="absolute inset-0 bg-bg-game overflow-hidden">

      <Footer className="absolute right-[37px] top-[24px]" />

      <div className="absolute left-[51px] top-[64px] flex gap-2 items-center">
        {PLATE_COLORS.map(color => (
          <Legend key={color} color={color} />
        ))}
      </div>

      <div className="absolute right-[37px] top-[64px]">
        <Timer timeLeft={timeLeft} />
      </div>

      <PlateStack plates={visiblePlates} isLastSettling={isLastSettling} />

      <div className="absolute right-[37px] top-[259px]">
        <ScoreBoard
          score={score}
          highScore={highScore}
          scoreLabel={labels.score}
          highScoreLabel={labels.highScore}
        />
      </div>

      <div className="absolute right-[37px] top-[411px]">
        <InputBox
          phase={phase}
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          isShaking={isShaking}
          lang={lang}
        />
      </div>

      <div className="absolute right-[37px] bottom-[48px] flex gap-6 items-center">
        <Button label={labels.restart} onClick={handleRestart} />
        <Button label={labels.leave} onClick={onLeave} />
      </div>

      <div className="absolute left-0 top-[779px] w-[532px] h-[53px] rounded-tr-[2px] overflow-hidden">
        <img src={CONVEYOR_BG} alt="" className="absolute inset-0 w-full h-full object-cover" />
      </div>

    </div>
  );
};

export default GameScreen;