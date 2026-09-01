import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Brain,
  Timer,
  CheckCircle,
  XCircle,
  RotateCcw,
  ArrowRight,
  Plus,
  Trash2,
  Trophy,
  Sparkles,
  Flame,
  User,
  Users,
  Target,
  Medal,
  Play,
  Layers,
} from 'lucide-react';
import { Player, Language, TriviaQuestion } from '../../types';
import { TRANSLATIONS } from '../../translations';
import {
  TRIVIA_QUESTIONS,
  TRIVIA_CATEGORIES,
  getRandomQuestions,
} from '../../data/triviaQuestions';
import { sound } from '../../utils/sound';

interface TriviaDuelGameProps {
  language: Language;
  players: Player[];
  onUpdatePlayers: (players: Player[]) => void;
  onChooseGame: () => void;
}

interface PlayerMatchStats {
  correct: number;
  total: number;
  currentStreak: number;
  maxStreak: number;
}

export const TriviaDuelGame: React.FC<TriviaDuelGameProps> = ({
  language,
  players,
  onUpdatePlayers,
  onChooseGame,
}) => {
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';

  // Modes: 'solo' or 'party'
  const [gameMode, setGameMode] = useState<'solo' | 'party'>('party');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Game state phases:
  // - 'setup': configuration & player roster
  // - 'turn_announcement': full-screen / card turn handoff before question
  // - 'question': answering active question
  // - 'reveal': showing correct answer, explanation & automatic points
  // - 'solo_summary': solo results
  // - 'multiplayer_game_over': multiplayer leaderboard & winner
  const [phase, setPhase] = useState<
    'setup' | 'turn_announcement' | 'question' | 'reveal' | 'solo_summary' | 'multiplayer_game_over'
  >('setup');

  const [playerNameInput, setPlayerNameInput] = useState('');
  const [totalQuestions, setTotalQuestions] = useState(20);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [timerDuration, setTimerDuration] = useState(15);
  const [secondsRemaining, setSecondsRemaining] = useState(15);

  // Question match pool
  const [matchQuestions, setMatchQuestions] = useState<TriviaQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isOptionLocked, setIsOptionLocked] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [earnedPointsThisRound, setEarnedPointsThisRound] = useState(0);

  // Multiplayer Turn Scheduling & Individual Stats
  const [turnSchedule, setTurnSchedule] = useState<string[]>([]);
  const [playerStats, setPlayerStats] = useState<Record<string, PlayerMatchStats>>({});

  // Solo Mode Performance State
  const [soloScore, setSoloScore] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const avatarColors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
    '#06B6D4', '#EC4899', '#6366F1', '#14B8A6', '#84CC16',
    '#A855F7', '#E11D48', '#0EA5E9', '#D97706', '#059669',
  ];

  // Helper to format player-named strings
  const formatString = (template: string, name: string, pts?: number) => {
    let res = template.replace(/{name}/g, name);
    if (pts !== undefined) {
      res = res.replace(/{pts}/g, pts.toString());
    }
    return res;
  };

  // Add player
  const handleAddPlayer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = playerNameInput.trim();
    if (!trimmed || players.length >= 17) return;

    sound.playPop(520);
    const newPlayer: Player = {
      id: `trivia-p-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
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
        ? ['سارة', 'أحمد', 'لينا', 'يوسف']
        : language === 'fr'
        ? ['Sarah', 'Ahmed', 'Lina', 'Youssef']
        : ['Sarah', 'Ahmed', 'Lina', 'Youssef'];

    const newPlayers: Player[] = sampleNames.map((name, idx) => ({
      id: `trivia-squad-${idx}-${Date.now()}`,
      name,
      avatarColor: avatarColors[idx % avatarColors.length],
      score: 0,
    }));
    onUpdatePlayers(newPlayers);
  };

  // Current answering player for Multiplayer
  const activePlayerId =
    gameMode === 'party' && turnSchedule.length > 0
      ? turnSchedule[Math.min(currentQuestionIndex - 1, turnSchedule.length - 1)]
      : null;

  const activePlayer =
    gameMode === 'party' && activePlayerId
      ? players.find((p) => p.id === activePlayerId) || players[0]
      : null;

  // Next player preview
  const nextPlayerId =
    gameMode === 'party' && turnSchedule.length > 0 && currentQuestionIndex < totalQuestions
      ? turnSchedule[currentQuestionIndex]
      : null;
  const nextPlayer =
    gameMode === 'party' && nextPlayerId
      ? players.find((p) => p.id === nextPlayerId)
      : null;

  // Start the match
  const handleStartGame = () => {
    if (gameMode === 'party' && players.length < 2) return;
    sound.playSuccess();

    // Prepare questions with balanced options
    const pickedQuestions = getRandomQuestions(totalQuestions, selectedCategory);
    setMatchQuestions(pickedQuestions);

    if (gameMode === 'party') {
      // Reset players' scores
      const resetScores = players.map((p) => ({ ...p, score: 0 }));
      onUpdatePlayers(resetScores);

      // Build Fair Turn Schedule: distribute turns evenly without consecutive questions for same player
      const schedule: string[] = [];
      for (let i = 0; i < totalQuestions; i++) {
        schedule.push(players[i % players.length].id);
      }
      setTurnSchedule(schedule);

      // Initialize individual stats per player
      const initStats: Record<string, PlayerMatchStats> = {};
      players.forEach((p) => {
        initStats[p.id] = { correct: 0, total: 0, currentStreak: 0, maxStreak: 0 };
      });
      setPlayerStats(initStats);

      setCurrentQuestionIndex(1);
      prepareQuestion(pickedQuestions, 0, true);
    } else {
      setSoloScore(0);
      setCurrentStreak(0);
      setMaxStreak(0);
      setCorrectAnswersCount(0);

      setCurrentQuestionIndex(1);
      prepareQuestion(pickedQuestions, 0, false);
    }
  };

  // Prepare a specific question
  const prepareQuestion = (
    questionsList: TriviaQuestion[],
    index: number,
    isMultiplayer: boolean
  ) => {
    const nextQ = questionsList[index] || TRIVIA_QUESTIONS[0];
    setCurrentQuestion(nextQ);
    setSelectedOptionIndex(null);
    setIsOptionLocked(false);
    setIsTimeUp(false);
    setEarnedPointsThisRound(0);
    setSecondsRemaining(timerDuration);

    if (isMultiplayer) {
      setPhase('turn_announcement');
    } else {
      setPhase('question');
    }
  };

  // Begin answering (from turn announcement screen)
  const handleStartAnswering = () => {
    sound.playPop(600);
    setSecondsRemaining(timerDuration);
    setPhase('question');
  };

  // Localized question content
  const qData = currentQuestion
    ? language === 'ar'
      ? currentQuestion.ar
      : language === 'fr'
      ? currentQuestion.fr
      : currentQuestion.en
    : null;

  // Handle time up
  const handleTimeUp = () => {
    if (isOptionLocked) return;
    setIsOptionLocked(true);
    sound.playWrong();
    setIsTimeUp(true);
    setEarnedPointsThisRound(0);

    if (gameMode === 'party' && activePlayer) {
      setPlayerStats((prev) => {
        const pStat = prev[activePlayer.id] || { correct: 0, total: 0, currentStreak: 0, maxStreak: 0 };
        return {
          ...prev,
          [activePlayer.id]: {
            ...pStat,
            total: pStat.total + 1,
            currentStreak: 0,
          },
        };
      });
    } else if (gameMode === 'solo') {
      setCurrentStreak(0);
    }

    setPhase('reveal');
  };

  // Timer effect
  useEffect(() => {
    if (phase !== 'question' || isOptionLocked) {
      return;
    }

    if (secondsRemaining <= 0) {
      handleTimeUp();
      return;
    }

    const timer = setTimeout(() => {
      setSecondsRemaining((prev) => {
        const next = prev - 1;
        if (next <= 4 && next > 0) {
          sound.playUrgentTick();
        } else if (next > 0) {
          sound.playTick();
        }
        return next;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [phase, secondsRemaining, currentQuestionIndex, isOptionLocked]);

  // Handle option click (with double-click protection)
  const handleSelectOption = (idx: number) => {
    if (phase !== 'question' || !qData || isOptionLocked) return;

    // Instantly lock options to prevent double answering
    setIsOptionLocked(true);
    setSelectedOptionIndex(idx);

    const isCorrect = idx === qData.correctIndex;

    if (isCorrect) {
      sound.playCorrect();
      confetti({
        particleCount: 45,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#10B981', '#3B82F6', '#F59E0B'],
      });

      // Calculate speed bonus: max +50 pts based on remaining time
      const speedFraction = Math.max(0, secondsRemaining / timerDuration);
      const speedBonus = Math.round(speedFraction * 50);

      if (gameMode === 'party' && activePlayer) {
        const pStat = playerStats[activePlayer.id] || { correct: 0, total: 0, currentStreak: 0, maxStreak: 0 };
        const newStreak = pStat.currentStreak + 1;
        const newMaxStreak = Math.max(pStat.maxStreak, newStreak);
        const streakMultiplier = newStreak >= 3 ? 1.5 : newStreak === 2 ? 1.25 : 1.0;
        const totalPointsAwarded = Math.round((100 + speedBonus) * streakMultiplier);

        setEarnedPointsThisRound(totalPointsAwarded);

        // Update player stats
        setPlayerStats((prev) => ({
          ...prev,
          [activePlayer.id]: {
            correct: pStat.correct + 1,
            total: pStat.total + 1,
            currentStreak: newStreak,
            maxStreak: newMaxStreak,
          },
        }));

        // Automatically award points to active player
        const updatedPlayers = players.map((p) =>
          p.id === activePlayer.id ? { ...p, score: p.score + totalPointsAwarded } : p
        );
        onUpdatePlayers(updatedPlayers);
      } else {
        // Solo mode calculation
        const newStreak = currentStreak + 1;
        setCurrentStreak(newStreak);
        if (newStreak > maxStreak) setMaxStreak(newStreak);
        setCorrectAnswersCount((prev) => prev + 1);

        const streakMultiplier = newStreak >= 3 ? 1.5 : newStreak === 2 ? 1.25 : 1.0;
        const totalPointsAwarded = Math.round((100 + speedBonus) * streakMultiplier);
        setEarnedPointsThisRound(totalPointsAwarded);
        setSoloScore((prev) => prev + totalPointsAwarded);
      }
    } else {
      sound.playWrong();
      setEarnedPointsThisRound(0);

      if (gameMode === 'party' && activePlayer) {
        setPlayerStats((prev) => {
          const pStat = prev[activePlayer.id] || { correct: 0, total: 0, currentStreak: 0, maxStreak: 0 };
          return {
            ...prev,
            [activePlayer.id]: {
              ...pStat,
              total: pStat.total + 1,
              currentStreak: 0,
            },
          };
        });
      } else if (gameMode === 'solo') {
        setCurrentStreak(0);
      }
    }

    setPhase('reveal');
  };

  // Next question handler
  const handleNextQuestion = () => {
    if (currentQuestionIndex >= totalQuestions) {
      if (gameMode === 'solo') {
        setPhase('solo_summary');
      } else {
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#F59E0B', '#3B82F6', '#10B981', '#EC4899'],
        });
        setPhase('multiplayer_game_over');
      }
      return;
    }

    const nextIdx = currentQuestionIndex;
    setCurrentQuestionIndex(nextIdx + 1);
    prepareQuestion(matchQuestions, nextIdx, gameMode === 'party');
  };

  // Restart match
  const handleRestart = () => {
    sound.playPop(500);
    handleStartGame();
  };

  // ----------------------------------------------------
  // 1. TURN ANNOUNCEMENT PHASE (Multiplayer Pass & Play)
  // ----------------------------------------------------
  if (phase === 'turn_announcement' && activePlayer) {
    const currentActiveStat = playerStats[activePlayer.id] || {
      correct: 0,
      total: 0,
      currentStreak: 0,
      maxStreak: 0,
    };

    return (
      <div className="w-full max-w-xl mx-auto px-4 py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-wider">
            <Users className="w-4 h-4 text-blue-400" />
            <span>
              {t.question} {currentQuestionIndex} / {totalQuestions}
            </span>
          </div>
          <p className="text-sm font-bold text-slate-400">
            {t.passDeviceTo}
          </p>
        </div>

        <div className="glass rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl border-2 border-blue-500/40 text-center relative overflow-hidden">
          {/* Glowing Ambient Background */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-25 pointer-events-none"
            style={{ backgroundColor: activePlayer.avatarColor }}
          />

          {/* Player Avatar */}
          <div className="relative flex justify-center">
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center text-4xl sm:text-5xl font-black text-white shadow-2xl ring-4 ring-white/20 animate-bounce duration-1000"
              style={{ backgroundColor: activePlayer.avatarColor }}
            >
              {activePlayer.name.charAt(0).toUpperCase()}
            </div>
            {currentActiveStat.currentStreak >= 2 && (
              <div className="absolute -bottom-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center gap-1 shadow-lg border border-amber-300 animate-pulse">
                <Flame className="w-3.5 h-3.5 fill-slate-950" />
                <span>{currentActiveStat.currentStreak}x {t.streakLabel}</span>
              </div>
            )}
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {formatString(t.playerTurnTitle, activePlayer.name)}
            </h1>
            <p className="text-base sm:text-lg font-bold text-blue-300">
              {formatString(t.playerIsAnswering, activePlayer.name)}
            </p>
          </div>

          {/* Current Player Match Metrics */}
          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                {t.soloScoreLabel}
              </span>
              <div className="text-xl font-black text-white">
                {activePlayer.score} {t.pts}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase">
                {t.correctAnswersStat}
              </span>
              <div className="text-xl font-black text-emerald-400">
                {currentActiveStat.correct} / {currentActiveStat.total}
              </div>
            </div>
          </div>

          {/* Ready Button */}
          <button
            onClick={handleStartAnswering}
            className="w-full py-4 sm:py-5 px-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-lg shadow-xl shadow-blue-600/40 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 ring-2 ring-blue-400/50"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>{t.readyToAnswer}</span>
          </button>
        </div>

        {/* Compact Scores Strip */}
        <div className="glass rounded-2xl p-3 border border-white/10">
          <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2 px-1 text-center">
            {t.matchScoresTitle}
          </div>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {players.map((p) => {
              const isActive = p.id === activePlayer.id;
              return (
                <div
                  key={p.id}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-blue-600/30 border-blue-400 text-white ring-2 ring-blue-500/40 scale-105'
                      : 'bg-white/5 border-white/10 text-slate-300'
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0"
                    style={{ backgroundColor: p.avatarColor }}
                  >
                    {p.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate max-w-[80px]">{p.name}</span>
                  <span className="text-blue-300 font-black">{p.score}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. SOLO SUMMARY SCREEN
  // ----------------------------------------------------
  if (phase === 'solo_summary') {
    const accuracy = Math.round((correctAnswersCount / totalQuestions) * 100);
    let titleBadge = 'Culture Explorer 🌟';
    if (accuracy >= 90) titleBadge = 'Knowledge Master 🏆';
    else if (accuracy >= 70) titleBadge = 'Trivia Prodigy 🌟';
    else if (accuracy >= 50) titleBadge = 'Sharp Mind 💡';

    return (
      <div className="w-full max-w-xl mx-auto px-4 py-8 space-y-6 animate-in fade-in zoom-in-95 duration-400">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-400 text-xs font-black uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-blue-400" />
            <span>{titleBadge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.soloPerformanceSummary}
          </h1>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-white/10 text-center">
          {/* Main Score Display */}
          <div className="p-6 rounded-3xl bg-blue-600/20 border border-blue-500/30 space-y-2">
            <span className="text-xs font-black text-blue-400 uppercase tracking-wider">
              {t.soloScoreLabel}
            </span>
            <div className="text-5xl font-black text-white">{soloScore}</div>
            <span className="text-xs font-bold text-slate-300">{t.pts}</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase">
                {t.accuracyLabel}
              </div>
              <div className="text-xl font-black text-emerald-400">{accuracy}%</div>
              <div className="text-[10px] text-slate-400 font-bold">
                {correctAnswersCount}/{totalQuestions}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase">
                {t.maxStreakStat}
              </div>
              <div className="text-xl font-black text-amber-400 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{maxStreak}x</span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold">Combo</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase">
                {t.totalRounds}
              </div>
              <div className="text-xl font-black text-blue-400">{totalQuestions}</div>
              <div className="text-[10px] text-slate-400 font-bold">
                {selectedCategory === 'all' ? 'All Topics' : selectedCategory}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleRestart}
              className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-blue-600/30 active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{t.playAgain}</span>
            </button>

            <button
              onClick={() => setPhase('setup')}
              className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4 text-blue-400" />
              <span>{t.gameSetup}</span>
            </button>

            <button
              onClick={onChooseGame}
              className="w-full py-2 text-xs text-slate-400 hover:text-white font-bold transition-colors cursor-pointer text-center"
            >
              {t.chooseAnotherGame}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 3. MULTIPLAYER FINAL RESULTS SCREEN
  // ----------------------------------------------------
  if (phase === 'multiplayer_game_over') {
    // Sort players by score descending
    const sortedPlayers = [...players].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const bCorrect = playerStats[b.id]?.correct || 0;
      const aCorrect = playerStats[a.id]?.correct || 0;
      return bCorrect - aCorrect;
    });

    const winner = sortedPlayers[0];

    return (
      <div className="w-full max-w-xl mx-auto px-4 py-8 space-y-6 animate-in fade-in zoom-in-95 duration-400">
        {/* Winner Announcement Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>{t.gameOver}</span>
          </div>

          {winner && (
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {formatString(t.playerWonMatch, winner.name)}
              </h1>
              <p className="text-sm font-bold text-amber-300">
                🏆 {winner.score} {t.pts}
              </p>
            </div>
          )}
        </div>

        {/* Leaderboard Card */}
        <div className="glass rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl border border-white/10">
          <div className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2 text-center">
            {t.viewFinalLeaderboard}
          </div>

          <div className="space-y-2.5">
            {sortedPlayers.map((player, idx) => {
              const stats = playerStats[player.id] || { correct: 0, total: 1, currentStreak: 0, maxStreak: 0 };
              const acc = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
              const isFirst = idx === 0;

              return (
                <div
                  key={player.id}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    isFirst
                      ? 'bg-amber-500/15 border-amber-500/40 ring-1 ring-amber-500/30'
                      : idx === 1
                      ? 'bg-slate-400/10 border-slate-400/30'
                      : idx === 2
                      ? 'bg-amber-700/10 border-amber-700/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rank Badge */}
                    <div className="text-lg font-black shrink-0 w-7 text-center">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}`}
                    </div>

                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-black text-white shrink-0 shadow-md"
                      style={{ backgroundColor: player.avatarColor }}
                    >
                      {player.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Player Info */}
                    <div className="text-left min-w-0">
                      <div className="text-sm sm:text-base font-black text-white truncate flex items-center gap-1.5">
                        <span>{player.name}</span>
                        {isFirst && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <div className="text-[11px] text-slate-400 font-bold flex items-center gap-2">
                        <span>{stats.correct}/{stats.total} ({acc}%)</span>
                        {stats.maxStreak >= 2 && (
                          <span className="text-amber-400 flex items-center gap-0.5">
                            <Flame className="w-3 h-3 fill-amber-400" />
                            {stats.maxStreak}x
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right shrink-0">
                    <div className="text-xl font-black text-white">
                      {player.score}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">
                      {t.pts}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <button
              onClick={handleRestart}
              className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-blue-600/30 active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{t.playAgain}</span>
            </button>

            <button
              onClick={() => setPhase('setup')}
              className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4 text-blue-400" />
              <span>{t.gameSetup}</span>
            </button>

            <button
              onClick={onChooseGame}
              className="w-full py-2 text-xs text-slate-400 hover:text-white font-bold transition-colors cursor-pointer text-center"
            >
              {t.chooseAnotherGame}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 4. SETUP PHASE
  // ----------------------------------------------------
  if (phase === 'setup') {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-wider">
            <Brain className="w-4 h-4 text-blue-400" />
            <span>{t.triviaDuelBadge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.triviaSetupTitle}
          </h1>
          <p className="text-sm text-slate-300">{t.triviaDuelDesc}</p>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {/* Game Mode Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.triviaGameMode}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  sound.playPop(520);
                  setGameMode('solo');
                }}
                className={`p-3.5 rounded-2xl border font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  gameMode === 'solo'
                    ? 'bg-blue-600/30 border-blue-500 text-white ring-2 ring-blue-500/40 shadow-lg'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <User className="w-5 h-5 text-blue-400" />
                <span>{t.triviaModeSolo}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playPop(520);
                  setGameMode('party');
                }}
                className={`p-3.5 rounded-2xl border font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  gameMode === 'party'
                    ? 'bg-purple-600/30 border-purple-500 text-white ring-2 ring-purple-500/40 shadow-lg'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <Users className="w-5 h-5 text-purple-400" />
                <span>{t.triviaModeParty}</span>
              </button>
            </div>
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.triviaCategorySelect} ({TRIVIA_QUESTIONS.length} Questions)
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                sound.playPop(480);
                setSelectedCategory(e.target.value);
              }}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
            >
              {TRIVIA_CATEGORIES.map((cat) => {
                const catName =
                  language === 'ar' ? cat.nameAr : language === 'fr' ? cat.nameFr : cat.nameEn;
                return (
                  <option key={cat.id} value={cat.id} className="bg-slate-900 text-white">
                    {cat.icon} {catName} ({cat.count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Party Mode Player Setup */}
          {gameMode === 'party' && (
            <div className="space-y-4 pt-2 border-t border-white/10 animate-in fade-in">
              <form onSubmit={handleAddPlayer} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={playerNameInput}
                    onChange={(e) => setPlayerNameInput(e.target.value)}
                    placeholder={t.enterName}
                    maxLength={20}
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={!playerNameInput.trim() || players.length >= 17}
                    className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-black text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-blue-600/30 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.addPlayerBtn}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={handleAddSampleSquad}
                    className="text-xs text-blue-400 hover:text-blue-300 font-bold transition-colors cursor-pointer py-1 px-2 rounded-lg bg-blue-500/10"
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
                  <span>
                    {t.playersList} ({players.length}/17)
                  </span>
                  {players.length < 2 && (
                    <span className="text-amber-400">{t.minPlayersWarning}</span>
                  )}
                </div>

                {players.length === 0 ? (
                  <div className="py-6 text-center border-2 border-dashed border-white/10 rounded-2xl text-slate-400 text-xs">
                    {t.minPlayersWarning}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
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
            </div>
          )}

          {/* Settings Grid */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t.triviaQuestionsCount}
              </label>
              <div className="grid grid-cols-4 gap-1">
                {[10, 15, 20, 25].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => {
                      sound.playPop(500);
                      setTotalQuestions(count);
                    }}
                    className={`py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                      totalQuestions === count
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t.triviaTimerPerQuestion}
              </label>
              <div className="grid grid-cols-4 gap-1">
                {[10, 15, 20, 30].map((secs) => (
                  <button
                    key={secs}
                    type="button"
                    onClick={() => {
                      sound.playPop(500);
                      setTimerDuration(secs);
                    }}
                    className={`py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                      timerDuration === secs
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {secs}s
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartGame}
            disabled={gameMode === 'party' && players.length < 2}
            className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-black text-base transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-xl shadow-blue-600/30"
          >
            <Brain className="w-5 h-5" />
            <span>{t.startTriviaGame}</span>
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
  // 5. QUESTION / REVEAL PHASE
  // ----------------------------------------------------
  const activePlayerStat =
    gameMode === 'party' && activePlayer
      ? playerStats[activePlayer.id] || { correct: 0, total: 0, currentStreak: 0, maxStreak: 0 }
      : null;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-4 animate-in fade-in duration-300">
      {/* Top Turn & Status Bar */}
      <div className="flex items-center justify-between gap-2">
        {/* Current Turn / Question Badge */}
        <div className="flex items-center gap-2 min-w-0">
          {gameMode === 'party' && activePlayer ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-white shadow-md">
              <div
                className="w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black text-white shrink-0"
                style={{ backgroundColor: activePlayer.avatarColor }}
              >
                {activePlayer.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-black truncate">
                {formatString(t.playerTurnTitle, activePlayer.name)}
              </span>
            </div>
          ) : (
            <span className="px-3 py-1 rounded-xl bg-blue-500/20 text-blue-400 text-xs font-black">
              {t.question} {currentQuestionIndex} / {totalQuestions}
            </span>
          )}

          <span className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-[11px] font-bold uppercase hidden sm:inline-block">
            {currentQuestion?.category}
          </span>
        </div>

        {/* Right Status (Streak, Timer, Points) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Active Player Streak in Party Mode */}
          {gameMode === 'party' && activePlayerStat && activePlayerStat.currentStreak > 1 && (
            <div className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-400 text-xs font-black flex items-center gap-1 border border-amber-500/30 animate-pulse">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>{activePlayerStat.currentStreak}x</span>
            </div>
          )}

          {/* Solo Streak & Score */}
          {gameMode === 'solo' && (
            <div className="flex items-center gap-2">
              {currentStreak > 1 && (
                <div className="px-2.5 py-1 rounded-xl bg-amber-500/20 text-amber-400 text-xs font-black flex items-center gap-1 border border-amber-500/30 animate-pulse">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{currentStreak}x</span>
                </div>
              )}
              <div className="px-2.5 py-1 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-black">
                {soloScore} {t.pts}
              </div>
            </div>
          )}

          {/* Countdown Timer */}
          {phase === 'question' && (
            <div
              className={`px-3 py-1 rounded-xl font-mono text-xs font-black flex items-center gap-1.5 ${
                secondsRemaining <= 4
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse'
                  : 'bg-white/10 text-white'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>{secondsRemaining}s</span>
            </div>
          )}

          <button
            onClick={onChooseGame}
            className="text-xs text-slate-400 hover:text-white font-bold transition-colors cursor-pointer"
          >
            {t.chooseAnotherGame}
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${(currentQuestionIndex / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="glass rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border-2 border-blue-500/30 text-center">
        {/* Question Counter Sub-label */}
        <div className="text-xs font-black text-blue-400 uppercase tracking-wider">
          {t.question} {currentQuestionIndex} / {totalQuestions} • {currentQuestion?.category}
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
          {qData?.question}
        </h2>

        {/* 4 Multiple Choice Options */}
        <div className="grid grid-cols-1 gap-2.5 pt-2 text-left">
          {qData?.options.map((option, idx) => {
            const isCorrect = idx === qData.correctIndex;
            const isSelected = selectedOptionIndex === idx;

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
                disabled={isOptionLocked || phase === 'reveal'}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border font-bold text-sm sm:text-base flex items-center justify-between transition-all cursor-pointer active:scale-98 disabled:cursor-default ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-xs font-black shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

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

        {/* Educational Insight Box */}
        {phase === 'reveal' && (
          <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-500/30 text-left space-y-1.5 animate-in fade-in">
            <div className="text-[11px] font-black text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.explanationLabel}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {qData?.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Action Footer in Reveal Phase */}
      {phase === 'reveal' && (
        <div className="glass rounded-3xl p-5 space-y-4 shadow-xl border border-white/10 animate-in fade-in">
          {/* Result Banner */}
          <div className="text-center space-y-1">
            {selectedOptionIndex === qData?.correctIndex ? (
              <div className="space-y-0.5">
                <div className="text-lg font-black text-emerald-400">
                  {t.correctResultBanner}
                </div>
                {gameMode === 'party' && activePlayer && (
                  <div className="text-xs font-bold text-emerald-300">
                    {formatString(t.pointsEarnedNotice, activePlayer.name, earnedPointsThisRound)}
                  </div>
                )}
                {gameMode === 'solo' && (
                  <div className="text-xs font-bold text-emerald-300">
                    +{earnedPointsThisRound} {t.pts}
                  </div>
                )}
              </div>
            ) : isTimeUp ? (
              <div className="text-base font-black text-rose-400">
                ⏰ {t.timeUpTrivia} (+0 {t.pts})
              </div>
            ) : (
              <div className="text-base font-black text-rose-400">
                {t.incorrectResultBanner} (+0 {t.pts})
              </div>
            )}
          </div>

          {/* Compact Live Scoreboard in Party Mode (Display Only) */}
          {gameMode === 'party' && (
            <div className="pt-2 border-t border-white/10 space-y-2">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider text-center">
                {t.matchScoresTitle}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {players.map((p) => {
                  const isCurrent = p.id === activePlayer?.id;
                  return (
                    <div
                      key={p.id}
                      className={`p-2 rounded-xl border flex items-center justify-between text-xs transition-all ${
                        isCurrent
                          ? 'bg-blue-600/25 border-blue-400 ring-2 ring-blue-500/30'
                          : 'bg-white/5 border-white/10 opacity-70'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div
                          className="w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black text-white shrink-0"
                          style={{ backgroundColor: p.avatarColor }}
                        >
                          {p.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold text-white truncate max-w-[65px]">{p.name}</span>
                      </div>
                      <span className="font-black text-blue-300">{p.score}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={handleNextQuestion}
            className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-base shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>
              {currentQuestionIndex >= totalQuestions
                ? gameMode === 'solo'
                  ? t.soloPerformanceSummary
                  : t.viewFinalLeaderboard
                : nextPlayer
                ? `${t.nextTriviaQuestion} (${formatString(t.nextPlayerNotice, nextPlayer.name)})`
                : t.nextTriviaQuestion}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
