import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Smile,
  Lightbulb,
  CheckCircle,
  XCircle,
  RotateCcw,
  Home,
  ArrowRight,
  Plus,
  Trash2,
  Trophy,
  Sparkles,
  Eye,
} from 'lucide-react';
import { Player, Language, EmojiPuzzle } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { EMOJI_PUZZLES } from '../../data/emojiPuzzles';
import { sound } from '../../utils/sound';
import { GameOverScreen } from '../GameOverScreen';

interface EmojiDecoderGameProps {
  language: Language;
  players: Player[];
  onUpdatePlayers: (players: Player[]) => void;
  onChooseGame: () => void;
}

export const EmojiDecoderGame: React.FC<EmojiDecoderGameProps> = ({
  language,
  players,
  onUpdatePlayers,
  onChooseGame,
}) => {
  const t = TRANSLATIONS[language];

  // Game state
  const [phase, setPhase] = useState<'setup' | 'puzzle' | 'reveal' | 'game_over'>('setup');
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [totalPuzzles, setTotalPuzzles] = useState(10);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  // Active puzzle state
  const [currentPuzzle, setCurrentPuzzle] = useState<EmojiPuzzle | null>(null);
  const [usedPuzzleIds, setUsedPuzzleIds] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [awardedPlayerId, setAwardedPlayerId] = useState<string | null>(null);

  const avatarColors = [
    '#F59E0B', '#EC4899', '#8B5CF6', '#10B981', '#3B82F6',
    '#EF4444', '#06B6D4', '#6366F1', '#14B8A6', '#84CC16',
    '#A855F7', '#E11D48', '#0EA5E9', '#D97706', '#059669',
  ];

  // Add player
  const handleAddPlayer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = playerNameInput.trim();
    if (!trimmed || players.length >= 17) return;

    sound.playPop(520);
    const newPlayer: Player = {
      id: `emoji-p-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: trimmed,
      avatarColor: avatarColors[players.length % avatarColors.length],
      score: 0,
    };
    onUpdatePlayers([...players, newPlayer]);
    setPlayerNameInput('');
  };

  // Remove player
  const handleRemovePlayer = (id: string) => {
    sound.playPop(400);
    onUpdatePlayers(players.filter((p) => p.id !== id));
  };

  // Add sample squad
  const handleAddSampleSquad = () => {
    sound.playPop(620);
    const sampleNames =
      language === 'ar'
        ? ['شهد', 'خالد', 'لمى', 'بدر', 'سلطان']
        : language === 'fr'
        ? ['Inès', 'Thomas', 'Lina', 'Enzo', 'Clara']
        : ['Lily', 'Noah', 'Mia', 'Leo', 'Grace'];

    const newPlayers: Player[] = sampleNames.map((name, idx) => ({
      id: `emoji-squad-${idx}-${Date.now()}`,
      name,
      avatarColor: avatarColors[idx % avatarColors.length],
      score: 0,
    }));
    onUpdatePlayers(newPlayers);
  };

  // Start the Emoji game
  const handleStartGame = () => {
    if (players.length < 2) return;
    sound.playSuccess();

    const resetScores = players.map((p) => ({ ...p, score: 0 }));
    onUpdatePlayers(resetScores);
    setUsedPuzzleIds([]);
    setCurrentPuzzleIndex(1);
    loadPuzzle([], 1);
  };

  // Load a new emoji puzzle
  const loadPuzzle = (used: string[], pNum: number) => {
    let pool = EMOJI_PUZZLES.filter((p) => !used.includes(p.id));
    if (selectedDifficulty !== 'all') {
      pool = pool.filter((p) => p.difficulty === selectedDifficulty);
    }
    if (pool.length === 0) {
      pool = EMOJI_PUZZLES;
    }

    const randomP = pool[Math.floor(Math.random() * pool.length)];
    setCurrentPuzzle(randomP);
    setUsedPuzzleIds((prev) => [...prev, randomP.id]);
    setShowHint(false);
    setSelectedOption(null);
    setAwardedPlayerId(null);
    setPhase('puzzle');
  };

  // Localized puzzle data
  const puzzleData = currentPuzzle
    ? language === 'ar'
      ? currentPuzzle.ar
      : language === 'fr'
      ? currentPuzzle.fr
      : currentPuzzle.en
    : null;

  // Handle option select
  const handleSelectOption = (option: string) => {
    if (phase !== 'puzzle' || !puzzleData) return;

    setSelectedOption(option);
    const isCorrect = option.toLowerCase().trim() === puzzleData.answer.toLowerCase().trim();

    if (isCorrect) {
      sound.playCorrect();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#EC4899', '#8B5CF6'],
      });
    } else {
      sound.playWrong();
    }

    setPhase('reveal');
  };

  // Reveal answer manually
  const handleDirectReveal = () => {
    sound.playReveal();
    setSelectedOption(puzzleData?.answer || '');
    setPhase('reveal');
  };

  // Award points
  const handleAwardPoints = (playerId: string) => {
    sound.playPop(700);
    setAwardedPlayerId(playerId);

    const updated = players.map((p) =>
      p.id === playerId ? { ...p, score: p.score + 100 } : p
    );
    onUpdatePlayers(updated);
  };

  // Next puzzle
  const handleNextPuzzle = () => {
    if (currentPuzzleIndex >= totalPuzzles) {
      setPhase('game_over');
      return;
    }

    const nextP = currentPuzzleIndex + 1;
    setCurrentPuzzleIndex(nextP);
    loadPuzzle(usedPuzzleIds, nextP);
  };

  // Restart
  const handleRestart = () => {
    sound.playPop(500);
    handleStartGame();
  };

  // ----------------------------------------------------
  // GAME OVER
  // ----------------------------------------------------
  if (phase === 'game_over') {
    return (
      <GameOverScreen
        language={language}
        players={players}
        onRestartGame={handleRestart}
        onNextRound={() => {
          setTotalPuzzles((prev) => prev + 5);
          handleNextPuzzle();
        }}
        onChooseAnotherGame={onChooseGame}
      />
    );
  }

  // ----------------------------------------------------
  // SETUP
  // ----------------------------------------------------
  if (phase === 'setup') {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
            <Smile className="w-4 h-4 text-amber-400" />
            <span>{t.emojiDecoderTitle}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.emojiSetupTitle}
          </h1>
          <p className="text-sm text-slate-300">
            {t.emojiDecoderDesc} ({t.playersRangeEmoji})
          </p>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* Player Input */}
          <form onSubmit={handleAddPlayer} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={playerNameInput}
                onChange={(e) => setPlayerNameInput(e.target.value)}
                placeholder={t.enterName}
                maxLength={20}
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!playerNameInput.trim() || players.length >= 17}
                className="px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-black text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-600/30 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addPlayerBtn}</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleAddSampleSquad}
                className="text-xs text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer py-1 px-2 rounded-lg bg-amber-500/10"
              >
                ✨ {t.presetSquad}
              </button>
              {players.length > 0 && (
                <button
                  type="button"
                  onClick={() => onUpdatePlayers([])}
                  className="text-xs text-rose-400 hover:text-rose-300 font-bold transition-colors cursor-pointer py-1 px-2 rounded-lg bg-rose-500/10"
                >
                  {t.clearPlayers}
                </button>
              )}
            </div>
          </form>

          {/* Players Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>{t.playersList} ({players.length}/17)</span>
              {players.length < 2 && (
                <span className="text-orange-400">Min 2 players required</span>
              )}
            </div>

            {players.length === 0 ? (
              <div className="py-8 text-center border-2 border-dashed border-white/10 rounded-2xl text-slate-400 text-xs">
                {t.minPlayersWarning}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                {players.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
                        style={{ backgroundColor: p.avatarColor }}
                      >
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs font-bold text-white truncate">{p.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemovePlayer(p.id)}
                      className="text-slate-400 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.emojiDifficulty}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'all', label: t.diffAll },
                { id: 'easy', label: 'Easy' },
                { id: 'medium', label: 'Medium' },
                { id: 'hard', label: 'Hard' },
              ].map((diff) => (
                <button
                  key={diff.id}
                  type="button"
                  onClick={() => {
                    sound.playPop(500);
                    setSelectedDifficulty(diff.id as any);
                  }}
                  className={`py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    selectedDifficulty === diff.id
                      ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          {/* Puzzles Count */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.totalRounds}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 15].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => {
                    sound.playPop(500);
                    setTotalPuzzles(count);
                  }}
                  className={`py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    totalPuzzles === count
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {count} {t.puzzle}s
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartGame}
            disabled={players.length < 2}
            className="w-full py-4 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-black text-base transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-xl shadow-amber-600/30"
          >
            <Smile className="w-5 h-5" />
            <span>{t.startEmojiGame}</span>
          </button>

          <button
            onClick={onChooseGame}
            className="w-full py-2 text-xs text-slate-400 hover:text-white font-bold transition-colors cursor-pointer text-center"
          >
            {t.chooseAnotherGame}
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // PUZZLE & REVEAL PHASE
  // ----------------------------------------------------
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-400 text-xs font-black">
            {t.puzzle} {currentPuzzleIndex} / {totalPuzzles}
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-white/5 text-slate-400 text-xs font-bold uppercase">
            {currentPuzzle?.category}
          </span>
        </div>

        <button
          onClick={onChooseGame}
          className="text-xs text-slate-400 hover:text-white font-bold transition-colors cursor-pointer"
        >
          {t.chooseAnotherGame}
        </button>
      </div>

      {/* Main Puzzle Card */}
      <div className="glass rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border-2 border-amber-500/30 text-center relative">
        <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
          {t.guessThePuzzle}
        </div>

        {/* Big Emojis Box */}
        <div className="py-6 px-4 rounded-3xl bg-amber-950/20 border border-amber-500/30 shadow-inner">
          <div className="text-5xl sm:text-6xl tracking-widest animate-pulse select-none">
            {currentPuzzle?.emojis}
          </div>
        </div>

        {/* Clue / Hint toggle */}
        {!showHint && phase === 'puzzle' && (
          <button
            onClick={() => {
              sound.playPop(600);
              setShowHint(true);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-bold transition-all cursor-pointer"
          >
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span>{t.showHintBtn}</span>
          </button>
        )}

        {showHint && (
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-amber-200 font-bold animate-in fade-in">
            💡 {puzzleData?.hint}
          </div>
        )}

        {/* 4 Option Buttons */}
        <div className="grid grid-cols-1 gap-2.5 text-left">
          {puzzleData?.options.map((opt, idx) => {
            const isCorrect =
              opt.toLowerCase().trim() === puzzleData.answer.toLowerCase().trim();
            const isSelected = selectedOption === opt;

            let optionStyle = 'bg-white/5 border-white/10 hover:bg-white/10 text-white';
            if (phase === 'reveal') {
              if (isCorrect) {
                optionStyle =
                  'bg-emerald-600/30 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50';
              } else if (isSelected && !isCorrect) {
                optionStyle = 'bg-rose-600/30 border-rose-500 text-rose-200';
              } else {
                optionStyle = 'bg-white/5 border-white/5 opacity-40 text-slate-400';
              }
            }

            return (
              <button
                key={idx}
                disabled={phase === 'reveal'}
                onClick={() => handleSelectOption(opt)}
                className={`w-full p-4 rounded-2xl border font-bold text-sm sm:text-base flex items-center justify-between transition-all cursor-pointer active:scale-98 ${optionStyle}`}
              >
                <span>{opt}</span>
                {phase === 'reveal' && isCorrect && (
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {phase === 'reveal' && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Direct Reveal button if stuck */}
        {phase === 'puzzle' && (
          <button
            onClick={handleDirectReveal}
            className="text-xs text-slate-400 hover:text-white font-bold transition-colors cursor-pointer flex items-center justify-center gap-1 mx-auto pt-2"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.revealAnswerBtn}</span>
          </button>
        )}
      </div>

      {/* Point Assignment in Reveal Phase */}
      {phase === 'reveal' && (
        <div className="glass rounded-3xl p-5 space-y-3 shadow-xl border border-white/10">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider text-center">
            {t.awardPointsTo}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {players.map((p) => {
              const isAwarded = awardedPlayerId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleAwardPoints(p.id)}
                  className={`p-2.5 rounded-2xl border transition-all flex items-center gap-2 cursor-pointer ${
                    isAwarded
                      ? 'bg-amber-600/30 border-amber-500 ring-2 ring-amber-500/40'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
                    style={{ backgroundColor: p.avatarColor }}
                  >
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left min-w-0">
                    <div className="text-xs font-bold text-white truncate">{p.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold">
                      {p.score} {t.pts}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNextPuzzle}
            className="w-full py-4 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-base shadow-xl shadow-amber-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>
              {currentPuzzleIndex >= totalPuzzles ? t.finalScores : t.nextEmojiPuzzle}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
