import React, { useState, useEffect, useRef } from 'react';
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
  Timer as TimerIcon,
  Flame,
  Zap,
  Users,
  User,
  HelpCircle,
  BookOpen,
} from 'lucide-react';
import { Player, Language, EmojiPuzzle } from '../../types';
import { TRANSLATIONS } from '../../translations';
import {
  EMOJI_PUZZLES,
  EMOJI_CATEGORIES,
  shuffleEmojiOptions,
  EmojiCategoryMeta,
} from '../../data/emojiPuzzles';
import { sound } from '../../utils/sound';
import { GameOverScreen } from '../GameOverScreen';

interface EmojiDecoderGameProps {
  language: Language;
  players: Player[];
  onUpdatePlayers: (players: Player[]) => void;
  onChooseGame: () => void;
}

interface ActivePuzzleViewData {
  emojis: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  answer: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

export const EmojiDecoderGame: React.FC<EmojiDecoderGameProps> = ({
  language,
  players,
  onUpdatePlayers,
  onChooseGame,
}) => {
  const t = TRANSLATIONS[language];

  // Mode & Configuration state
  const [phase, setPhase] = useState<'setup' | 'turn_announcement' | 'puzzle' | 'reveal' | 'game_over'>('setup');
  const [gameMode, setGameMode] = useState<'party' | 'solo'>('party');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [totalPuzzles, setTotalPuzzles] = useState<number>(10);
  const [timerDuration, setTimerDuration] = useState<number>(20); // 0 for off

  // Player management in Setup
  const [playerNameInput, setPlayerNameInput] = useState('');

  // Active game session state
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(1);
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);
  const [usedPuzzleIds, setUsedPuzzleIds] = useState<string[]>([]);
  const [activePuzzle, setActivePuzzle] = useState<EmojiPuzzle | null>(null);
  const [shuffledData, setShuffledData] = useState<ActivePuzzleViewData | null>(null);

  // Per-round gameplay state
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Scoring & Stats Tracking
  const [playerStreaks, setPlayerStreaks] = useState<Record<string, number>>({});
  const [soloScore, setSoloScore] = useState<number>(0);
  const [soloCorrectCount, setSoloCorrectCount] = useState<number>(0);
  const [soloStreak, setSoloStreak] = useState<number>(0);
  const [soloBestStreak, setSoloBestStreak] = useState<number>(0);
  const [roundPointsEarned, setRoundPointsEarned] = useState<number>(0);
  const [roundStreakBonus, setRoundStreakBonus] = useState<number>(0);
  const [roundSpeedBonus, setRoundSpeedBonus] = useState<number>(0);
  const [manualAwardedPlayerId, setManualAwardedPlayerId] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const avatarColors = [
    '#F59E0B', '#EC4899', '#8B5CF6', '#10B981', '#3B82F6',
    '#EF4444', '#06B6D4', '#6366F1', '#14B8A6', '#84CC16',
    '#A855F7', '#E11D48', '#0EA5E9', '#D97706', '#059669',
  ];

  // Helper to add player
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

  const handleRemovePlayer = (id: string) => {
    sound.playPop(400);
    onUpdatePlayers(players.filter((p) => p.id !== id));
  };

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

  // Start the Game
  const handleStartGame = () => {
    if (gameMode === 'party' && players.length < 2) return;
    sound.playSuccess();

    // Reset scores & streaks
    const resetScores = players.map((p) => ({ ...p, score: 0 }));
    onUpdatePlayers(resetScores);

    const initialStreaks: Record<string, number> = {};
    players.forEach((p) => {
      initialStreaks[p.id] = 0;
    });
    setPlayerStreaks(initialStreaks);

    setSoloScore(0);
    setSoloCorrectCount(0);
    setSoloStreak(0);
    setSoloBestStreak(0);
    setUsedPuzzleIds([]);
    setCurrentPuzzleIndex(1);
    setActivePlayerIndex(0);

    loadNextPuzzle([], 1, 0);
  };

  // Load a new puzzle from database
  const loadNextPuzzle = (used: string[], pIndex: number, playerIdx: number) => {
    let pool = EMOJI_PUZZLES.filter((p) => !used.includes(p.id));

    // Category filter
    if (selectedCategory !== 'all') {
      pool = pool.filter((p) => p.category === selectedCategory);
    }

    // Difficulty filter
    if (selectedDifficulty !== 'all') {
      pool = pool.filter((p) => p.difficulty === selectedDifficulty);
    }

    // Fallback if exhausted
    if (pool.length === 0) {
      pool = EMOJI_PUZZLES;
      if (selectedCategory !== 'all') {
        pool = pool.filter((p) => p.category === selectedCategory);
      }
    }

    const nextP = pool[Math.floor(Math.random() * pool.length)] || EMOJI_PUZZLES[0];
    const shuffled = shuffleEmojiOptions(nextP, language);

    setActivePuzzle(nextP);
    setShuffledData(shuffled);
    setUsedPuzzleIds((prev) => [...prev, nextP.id]);
    setSelectedOptionIndex(null);
    setShowHint(false);
    setManualAwardedPlayerId(null);
    setRoundPointsEarned(0);
    setRoundStreakBonus(0);
    setRoundSpeedBonus(0);

    if (timerDuration > 0) {
      setTimeLeft(timerDuration);
      setIsTimerRunning(true);
    } else {
      setTimeLeft(0);
      setIsTimerRunning(false);
    }

    if (gameMode === 'party' && players.length > 1) {
      setPhase('turn_announcement');
    } else {
      setPhase('puzzle');
    }
  };

  // Start question after turn announcement
  const handleProceedToPuzzle = () => {
    sound.playPop(580);
    setPhase('puzzle');
  };

  // Timer Effect
  useEffect(() => {
    if (phase !== 'puzzle' || !isTimerRunning || timerDuration <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleTimeExpire();
          return 0;
        }
        if (prev <= 4) {
          sound.playPop(300 + prev * 50);
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, isTimerRunning, timerDuration]);

  // Handle timeout
  const handleTimeExpire = () => {
    sound.playWrong();
    setIsTimerRunning(false);
    setSelectedOptionIndex(-1); // Marked as timed out

    if (gameMode === 'party') {
      const activePlayer = players[activePlayerIndex];
      if (activePlayer) {
        setPlayerStreaks((prev) => ({ ...prev, [activePlayer.id]: 0 }));
      }
    } else {
      setSoloStreak(0);
    }

    setPhase('reveal');
  };

  // Option selection
  const handleSelectOption = (idx: number) => {
    if (phase !== 'puzzle' || !shuffledData) return;
    setIsTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);

    setSelectedOptionIndex(idx);
    const isCorrect = idx === shuffledData.correctIndex;

    if (isCorrect) {
      sound.playCorrect();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899'],
      });

      // Calculate speed bonus
      const speedBonus = timerDuration > 0 ? Math.max(0, Math.floor((timeLeft / timerDuration) * 50)) : 0;
      let totalGain = 100 + speedBonus;
      let streakBonus = 0;

      if (gameMode === 'party') {
        const activePlayer = players[activePlayerIndex];
        if (activePlayer) {
          const currentPStreak = (playerStreaks[activePlayer.id] || 0) + 1;
          setPlayerStreaks((prev) => ({ ...prev, [activePlayer.id]: currentPStreak }));
          streakBonus = (currentPStreak - 1) * 20;
          totalGain += streakBonus;

          const updated = players.map((p, pIdx) =>
            pIdx === activePlayerIndex ? { ...p, score: p.score + totalGain } : p
          );
          onUpdatePlayers(updated);
        }
      } else {
        // Solo mode
        const newStreak = soloStreak + 1;
        setSoloStreak(newStreak);
        if (newStreak > soloBestStreak) setSoloBestStreak(newStreak);
        streakBonus = (newStreak - 1) * 20;
        totalGain += streakBonus;

        setSoloScore((prev) => prev + totalGain);
        setSoloCorrectCount((prev) => prev + 1);
      }

      setRoundPointsEarned(totalGain);
      setRoundStreakBonus(streakBonus);
      setRoundSpeedBonus(speedBonus);
    } else {
      sound.playWrong();
      if (gameMode === 'party') {
        const activePlayer = players[activePlayerIndex];
        if (activePlayer) {
          setPlayerStreaks((prev) => ({ ...prev, [activePlayer.id]: 0 }));
        }
      } else {
        setSoloStreak(0);
      }
    }

    setPhase('reveal');
  };

  // Direct Reveal
  const handleDirectReveal = () => {
    sound.playReveal();
    setIsTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedOptionIndex(-2); // Manual direct reveal
    setPhase('reveal');
  };

  // Manual point award in Party mode if someone answered aloud
  const handleManualAward = (playerId: string) => {
    sound.playPop(700);
    setManualAwardedPlayerId(playerId);

    const updated = players.map((p) =>
      p.id === playerId ? { ...p, score: p.score + 100 } : p
    );
    onUpdatePlayers(updated);
  };

  // Next Round / Next Puzzle
  const handleNextPuzzle = () => {
    if (currentPuzzleIndex >= totalPuzzles) {
      setPhase('game_over');
      return;
    }

    const nextIndex = currentPuzzleIndex + 1;
    const nextPlayerIdx = (activePlayerIndex + 1) % (players.length || 1);

    setCurrentPuzzleIndex(nextIndex);
    setActivePlayerIndex(nextPlayerIdx);
    loadNextPuzzle(usedPuzzleIds, nextIndex, nextPlayerIdx);
  };

  // Restart
  const handleRestart = () => {
    sound.playPop(500);
    handleStartGame();
  };

  // ----------------------------------------------------
  // RENDER: GAME OVER
  // ----------------------------------------------------
  if (phase === 'game_over') {
    if (gameMode === 'solo') {
      const accuracy = totalPuzzles > 0 ? Math.round((soloCorrectCount / totalPuzzles) * 100) : 0;
      return (
        <div className="w-full max-w-xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{t.soloPerformanceSummary}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {soloScore} {t.pts}
            </h1>
          </div>

          <div className="glass rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-white/10">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-2xl font-black text-emerald-400">{soloCorrectCount}/{totalPuzzles}</div>
                <div className="text-[11px] font-bold text-slate-400">{t.correctAnswersStat}</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-2xl font-black text-amber-400">{soloBestStreak}🔥</div>
                <div className="text-[11px] font-bold text-slate-400">{t.maxStreakStat}</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <div className="text-2xl font-black text-sky-400">{accuracy}%</div>
                <div className="text-[11px] font-bold text-slate-400">{t.accuracyLabel}</div>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="w-full py-4 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-base transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-xl shadow-amber-600/30"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{t.restartGame}</span>
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
  // RENDER: SETUP PHASE
  // ----------------------------------------------------
  if (phase === 'setup') {
    const activeCatMeta = EMOJI_CATEGORIES.find((c) => c.id === selectedCategory) || EMOJI_CATEGORIES[0];
    const catName = language === 'ar' ? activeCatMeta.nameAr : language === 'fr' ? activeCatMeta.nameFr : activeCatMeta.nameEn;
    const catDesc = language === 'ar' ? activeCatMeta.descAr : language === 'fr' ? activeCatMeta.descFr : activeCatMeta.descEn;

    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-300">
        {/* Title Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
            <Smile className="w-4 h-4 text-amber-400" />
            <span>{t.emojiDecoderTitle}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.emojiSetupTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            {t.emojiDecoderDesc}
          </p>
        </div>

        <div className="glass rounded-3xl p-5 sm:p-7 space-y-6 shadow-2xl border border-white/10">
          {/* Game Mode Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.gameModeLabel}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  sound.playPop(500);
                  setGameMode('party');
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                  gameMode === 'party'
                    ? 'bg-amber-600/30 border-amber-500 ring-2 ring-amber-500/40 text-white shadow-lg'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2 text-sm font-black text-white">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>{t.modeParty}</span>
                </div>
                <span className="text-[11px] text-slate-300 leading-tight">
                  {t.modePartyDesc}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playPop(500);
                  setGameMode('solo');
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                  gameMode === 'solo'
                    ? 'bg-amber-600/30 border-amber-500 ring-2 ring-amber-500/40 text-white shadow-lg'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2 text-sm font-black text-white">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>{t.modeSolo}</span>
                </div>
                <span className="text-[11px] text-slate-300 leading-tight">
                  {t.modeSoloDesc}
                </span>
              </button>
            </div>
          </div>

          {/* Theme / Category Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t.categorySelectTitle}
              </label>
              <span className="text-[11px] text-amber-300 font-bold">{catName}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
              {EMOJI_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const name = language === 'ar' ? cat.nameAr : language === 'fr' ? cat.nameFr : cat.nameEn;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      sound.playPop(520);
                      setSelectedCategory(cat.id);
                    }}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-600/40 to-orange-600/40 border-amber-500 text-white ring-2 ring-amber-500/40 shadow-md'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-base shrink-0">{cat.icon}</span>
                    <span className="text-xs font-bold truncate">{name}</span>
                  </button>
                );
              })}
            </div>
            <div className="text-[11px] text-slate-400 px-1 italic">{catDesc}</div>
          </div>

          {/* Party Mode Player Setup */}
          {gameMode === 'party' && (
            <div className="space-y-3 pt-2 border-t border-white/10">
              <form onSubmit={handleAddPlayer} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={playerNameInput}
                    onChange={(e) => setPlayerNameInput(e.target.value)}
                    placeholder={t.enterName}
                    maxLength={20}
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!playerNameInput.trim() || players.length >= 17}
                    className="px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white font-black text-xs transition-all flex items-center gap-1 cursor-pointer shadow-lg shadow-amber-600/30 shrink-0"
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
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>{t.playersList} ({players.length}/17)</span>
                  {players.length < 2 && (
                    <span className="text-orange-400">{t.minPlayersWarning}</span>
                  )}
                </div>

                {players.length === 0 ? (
                  <div className="py-6 text-center border-2 border-dashed border-white/10 rounded-2xl text-slate-400 text-xs">
                    {t.minPlayersWarning}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-36 overflow-y-auto pr-1">
                    {players.map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-2 rounded-2xl bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className="w-6 h-6 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
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
            </div>
          )}

          {/* Difficulty & Timer & Round Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
            {/* Difficulty */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t.emojiDifficulty}
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
              >
                <option value="all" className="bg-slate-900 text-white">{t.diffAll}</option>
                <option value="easy" className="bg-slate-900 text-white">{t.diffEasy}</option>
                <option value="medium" className="bg-slate-900 text-white">{t.diffMedium}</option>
                <option value="hard" className="bg-slate-900 text-white">{t.diffHard}</option>
              </select>
            </div>

            {/* Timer */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t.timerSettingLabel}
              </label>
              <select
                value={timerDuration}
                onChange={(e) => setTimerDuration(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-amber-500"
              >
                <option value={10} className="bg-slate-900 text-white">{t.timer10s}</option>
                <option value={15} className="bg-slate-900 text-white">{t.timer15s}</option>
                <option value={20} className="bg-slate-900 text-white">{t.timer20s}</option>
                <option value={30} className="bg-slate-900 text-white">{t.timer30s}</option>
                <option value={0} className="bg-slate-900 text-white">{t.timerOff}</option>
              </select>
            </div>

            {/* Puzzles Count */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t.totalRounds}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[5, 10, 15].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => {
                      sound.playPop(500);
                      setTotalPuzzles(count);
                    }}
                    className={`py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                      totalPuzzles === count
                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Start Game Button */}
          <button
            onClick={handleStartGame}
            disabled={gameMode === 'party' && players.length < 2}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 disabled:opacity-40 text-white font-black text-base transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-xl shadow-amber-600/30"
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
  // RENDER: TURN ANNOUNCEMENT (PASS & PLAY INTERSTITIAL)
  // ----------------------------------------------------
  if (phase === 'turn_announcement' && gameMode === 'party') {
    const activePlayer = players[activePlayerIndex] || players[0];
    const streak = playerStreaks[activePlayer?.id] || 0;

    return (
      <div className="w-full max-w-md mx-auto px-4 py-12 space-y-6 text-center animate-in zoom-in-95 duration-300">
        <div className="glass rounded-3xl p-8 space-y-6 shadow-2xl border-2 border-amber-500/30">
          <div className="text-xs font-black uppercase tracking-widest text-amber-400">
            {t.puzzle} {currentPuzzleIndex} / {totalPuzzles}
          </div>

          <div className="relative mx-auto w-24 h-24 rounded-3xl flex items-center justify-center text-4xl font-black text-white shadow-xl shadow-amber-500/20"
               style={{ backgroundColor: activePlayer?.avatarColor || '#F59E0B' }}>
            {activePlayer?.name.charAt(0).toUpperCase()}
            {streak > 1 && (
              <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-black border border-white/20 shadow-md flex items-center gap-0.5">
                <Flame className="w-3 h-3 text-yellow-300" />
                {streak}x
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t.playerTurnAnnouncement.replace('{name}', activePlayer?.name || '')}
            </h2>
            <p className="text-xs text-slate-300 font-bold">
              {t.playerScoreSummary
                .replace('{pts}', String(activePlayer?.score || 0))
                .replace('{streak}', String(streak))}
            </p>
          </div>

          <button
            onClick={handleProceedToPuzzle}
            className="w-full py-4 px-6 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-base transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-xl shadow-amber-600/30"
          >
            <span>{t.readyToDecode}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER: PUZZLE & REVEAL ACTIVE PHASES
  // ----------------------------------------------------
  const activePlayer = gameMode === 'party' ? players[activePlayerIndex] : null;
  const currentCategoryMeta = EMOJI_CATEGORIES.find((c) => c.id === activePuzzle?.category) || EMOJI_CATEGORIES[0];
  const catLabel = language === 'ar' ? currentCategoryMeta.nameAr : language === 'fr' ? currentCategoryMeta.nameFr : currentCategoryMeta.nameEn;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-5 animate-in fade-in duration-300">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-400 text-xs font-black">
            {t.puzzle} {currentPuzzleIndex} / {totalPuzzles}
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-bold flex items-center gap-1.5">
            <span>{currentCategoryMeta.icon}</span>
            <span>{catLabel}</span>
          </span>
        </div>

        {/* Timer or Solo Score Display */}
        <div className="flex items-center gap-2">
          {timerDuration > 0 && (
            <div
              className={`px-3 py-1 rounded-xl border text-xs font-black flex items-center gap-1.5 transition-colors ${
                timeLeft <= 5
                  ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
                  : 'bg-white/5 border-white/10 text-white'
              }`}
            >
              <TimerIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>{timeLeft}s</span>
            </div>
          )}

          {gameMode === 'solo' && (
            <div className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-black flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{soloScore} pts</span>
            </div>
          )}
        </div>
      </div>

      {/* Party Active Player Chip */}
      {gameMode === 'party' && activePlayer && (
        <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black text-white shadow-sm"
              style={{ backgroundColor: activePlayer.avatarColor }}
            >
              {activePlayer.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-xs font-bold text-white">{activePlayer.name}</span>
              <span className="text-[10px] text-slate-400 block">{activePlayer.score} {t.pts}</span>
            </div>
          </div>
          {(playerStreaks[activePlayer.id] || 0) > 1 && (
            <div className="flex items-center gap-1 text-xs font-black text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-xl border border-orange-500/20">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{playerStreaks[activePlayer.id]}x streak</span>
            </div>
          )}
        </div>
      )}

      {/* Main Puzzle Card */}
      <div className="glass rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border-2 border-amber-500/30 text-center relative">
        <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
          {t.guessThePuzzle}
        </div>

        {/* Big Emojis Box */}
        <div className="py-6 px-4 rounded-3xl bg-amber-950/25 border border-amber-500/40 shadow-inner">
          <div className="text-5xl sm:text-6xl tracking-widest select-none drop-shadow-md">
            {shuffledData?.emojis}
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
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 font-bold animate-in fade-in leading-relaxed">
            💡 {shuffledData?.hint}
          </div>
        )}

        {/* 4 Option Buttons (Randomly Shuffled A, B, C, D) */}
        <div className="space-y-1 text-left">
          <span className="text-[11px] font-bold text-slate-400 block px-1">
            {t.tapToAnswer}
          </span>
          <div className="grid grid-cols-1 gap-2.5">
            {shuffledData?.options.map((opt, idx) => {
              const isCorrectOption = idx === shuffledData.correctIndex;
              const isSelected = selectedOptionIndex === idx;

              let optionStyle = 'bg-white/5 border-white/10 hover:bg-white/10 text-white';
              if (phase === 'reveal') {
                if (isCorrectOption) {
                  optionStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50';
                } else if (isSelected && !isCorrectOption) {
                  optionStyle = 'bg-rose-600/30 border-rose-500 text-rose-200';
                } else {
                  optionStyle = 'bg-white/5 border-white/5 opacity-40 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={phase === 'reveal'}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-2xl border font-bold text-sm sm:text-base flex items-center justify-between transition-all cursor-pointer active:scale-98 ${optionStyle}`}
                >
                  <span className="truncate pr-2">{opt}</span>
                  {phase === 'reveal' && isCorrectOption && (
                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {phase === 'reveal' && isSelected && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
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

      {/* Educational Explanation & Trivia Card in Reveal Phase */}
      {phase === 'reveal' && (
        <div className="glass rounded-3xl p-5 space-y-4 shadow-xl border border-white/10 animate-in fade-in-50">
          {/* Result Banner */}
          {selectedOptionIndex === shuffledData?.correctIndex ? (
            <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center space-y-1">
              <div className="text-sm font-black flex items-center justify-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>{t.correctResultBanner} (+{roundPointsEarned} pts)</span>
              </div>
              {roundStreakBonus > 0 && (
                <div className="text-[11px] text-amber-300 font-bold">
                  {t.streakBonusEarned.replace('{count}', String(soloStreak || playerStreaks[activePlayer?.id || ''] || 2)).replace('{pts}', String(roundStreakBonus))}
                </div>
              )}
            </div>
          ) : selectedOptionIndex === -1 ? (
            <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-center text-sm font-black">
              {t.timesUpBanner}
            </div>
          ) : selectedOptionIndex === -2 ? (
            <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-center text-sm font-black">
              {t.correctAnswerLabel}: {shuffledData?.answer}
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-center text-sm font-black">
              {t.incorrectResultBanner}
            </div>
          )}

          {/* Explanation Text */}
          {shuffledData?.explanation && (
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-400 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t.riddleExplanation}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {shuffledData.explanation}
              </p>
            </div>
          )}

          {/* Party Manual Override Points */}
          {gameMode === 'party' && players.length > 1 && (
            <div className="space-y-2 pt-2 border-t border-white/10">
              <span className="text-[11px] font-bold text-slate-400 block text-center uppercase tracking-wider">
                {t.awardPointsTo}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {players.map((p) => {
                  const isAwarded = manualAwardedPlayerId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleManualAward(p.id)}
                      className={`p-2 rounded-2xl border transition-all flex items-center gap-2 cursor-pointer ${
                        isAwarded
                          ? 'bg-amber-600/30 border-amber-500 ring-2 ring-amber-500/40'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0"
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
            </div>
          )}

          {/* Next Button */}
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
