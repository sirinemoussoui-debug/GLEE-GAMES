import React from 'react';
import { GameHub } from './hub/GameHub';
import { Language, GameType } from '../types';

interface HomeScreenProps {
  language: Language;
  onStartGame: (gameType: GameType) => void;
  onOpenRules: () => void;
  onBackToLanding?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  onStartGame,
  onOpenRules,
  onBackToLanding,
}) => {
  return (
    <GameHub
      language={language}
      onSelectGame={onStartGame}
      onBackToLanding={onBackToLanding || (() => { window.location.hash = ''; })}
      onOpenRules={onOpenRules}
    />
  );
};
