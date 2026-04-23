import React from 'react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
  scoreLabel?: string;
  highScoreLabel?: string;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  highScore,
  scoreLabel = 'Score',
  highScoreLabel = 'High Score',
}) => {
  return (
    <div className="flex gap-6 items-center font-ibm-thai">
      {/* Score panel */}
      <div className="bg-white border border-light-grey flex flex-col gap-2 items-center justify-center overflow-hidden px-10 py-6 rounded-lg w-[291px]">
        <span className="text-light-black text-[16px] whitespace-nowrap">
          {scoreLabel}
        </span>
        <span className="text-[40px] text-black text-center leading-none">
          {score}
        </span>
      </div>

      {/* High Score panel */}
      <div className="bg-white border border-light-grey flex flex-col gap-2 items-center justify-center overflow-hidden px-10 py-6 rounded-lg w-[291px]">
        <span className="text-light-black text-[16px] whitespace-nowrap">
          {highScoreLabel}
        </span>
        <span className="text-[40px] text-black text-center leading-none">
          {highScore}
        </span>
      </div>
    </div>
  );
};

export default ScoreBoard;