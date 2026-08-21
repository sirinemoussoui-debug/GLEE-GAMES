import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Bomb,
  Flame,
  RotateCcw,
  Home,
  ArrowRight,
  Trophy,
  Plus,
  Trash2,
  Heart,
  HeartOff,
  AlertTriangle,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Player, Language, WordBombCategory } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { WORD_BOMB_CATEGORIES } from '../../data/wordBomb';
import { sound } from '../../utils/sound';
import { GameOverScreen } from '../GameOverScreen';

interface WordBombGameProps {
  language: Language;
  players: Player[];
  onUpdatePlayers: (players: Player[]) => void;
  onChooseGame: () => void;
}

export const WordBombGame: React.FC<WordBombGameProps> = ({
  language,
  players,
  onUpdatePlayers,
  onChooseGame,
}) => {
  const t = TRANSLATIONS[language];

  // Game state
  const [phase, setPhase] = useState<'setup' | 'playing' | 'exploded' | 'game_over'>('setup');
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [totalRounds, setTotalRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(1);
  const [baseTimerSeconds, setBaseTimerSeconds] = useState(15);
  const [secondsRemaining, setSecondsRemaining] = useState(15);

  // Active category
  const [currentCategory, setCurrentCategory] = useState<WordBombCategory | null>(null);
  const [usedCategories, setUsedCategories] = useState<string[]>([]);
  
  // Turn state
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [typedWord, setTypedWord] = useState('');
  const [usedWordsThisRound, setUsedWordsThisRound] = useState<string[]>([]);
  const [explodedPlayer, setExplodedPlayer] = useState<Player | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  // Timer interval ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const avatarColors = [
    '#EF4444', '#F97316', '#F59E0B', '#10B981', '#06B6D4',
    '#3B82F6', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6',
    '#84CC16', '#A855F7', '#E11D48', '#0EA5E9', '#D97706',
    '#059669', '#7C3AED',
  ];

  // Helper for category localized name
  const getCategoryName = (cat: WordBombCategory | null) => {
    if (!cat) return '';
    return language === 'ar' ? cat.nameAr : language === 'fr' ? cat.nameFr : cat.nameEn;
  };

  // Add player
  const handleAddPlayer = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = playerNameInput.trim();
    if (!trimmed || players.length >= 17) return;

    sound.playPop(520);
    const newPlayer: Player = {
      id: `bomb-p-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: trimmed,
      avatarColor: avatarColors[players.length % avatarColors.length],
      score: 0,
      lives: 3,
      isEliminated: false,
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
        ? ['سارة', 'عمر', 'نورة', 'خالد', 'كريم']
        : language === 'fr'
        ? ['Alice', 'Hugo', 'Juliette', 'Arthur', 'Chloé']
        : ['Alex', 'Morgan', 'Taylor', 'Jordan', 'Chris'];

    const newPlayers: Player[] = sampleNames.map((name, idx) => ({
      id: `bomb-squad-${idx}-${Date.now()}`,
      name,
      avatarColor: avatarColors[idx % avatarColors.length],
      score: 0,
      lives: 3,
      isEliminated: false,
    }));
    onUpdatePlayers(newPlayers);
  };

  // Start the Bomb game
  const handleStartGame = () => {
    if (players.length < 2) return;
    sound.playSuccess();

    // Reset lives and scores
    const initialized = players.map((p) => ({
      ...p,
      lives: 3,
      isEliminated: false,
    }));
    onUpdatePlayers(initialized);

    setCurrentRound(1);
    startNewRound(initialized, 1);
  };

  // Start new round
  const startNewRound = (currentPlayers: Player[], roundNum: number) => {
    const available = WORD_BOMB_CATEGORIES.filter((c) => !usedCategories.includes(c.id));
    const pool = available.length > 0 ? available : WORD_BOMB_CATEGORIES;
    const chosenCat = pool[Math.floor(Math.random() * pool.length)];

    setCurrentCategory(chosenCat);
    setUsedCategories((prev) => [...prev, chosenCat.id]);
    setUsedWordsThisRound([]);
    setTypedWord('');
    setDuplicateWarning(null);
    setExplodedPlayer(null);

    // Pick first non-eliminated player index
    const activeIndices = currentPlayers
      .map((p, idx) => (!p.isEliminated && (p.lives ?? 3) > 0 ? idx : -1))
      .filter((idx) => idx !== -1);

    const firstIndex = activeIndices.length > 0 ? activeIndices[0] : 0;
    setCurrentTurnIndex(firstIndex);
    setSecondsRemaining(baseTimerSeconds);
    setPhase('playing');
  };

  // Active players
  const activePlayers = players.filter((p) => !p.isEliminated && (p.lives ?? 3) > 0);
  const currentActivePlayer = players[currentTurnIndex] || players[0];

  // Bomb exploded handler
  const handleBombExploded = () => {
    sound.playExplosion();
    const victim = players[currentTurnIndex];
    setExplodedPlayer(victim || null);

    if (victim) {
      const newLives = Math.max(0, (victim.lives ?? 3) - 1);
      const updated = players.map((p) => {
        if (p.id === victim.id) {
          return {
            ...p,
            lives: newLives,
            isEliminated: newLives <= 0,
          };
        }
        // Surviving players get +50 round victory points
        return {
          ...p,
          score: p.score + 50,
        };
      });
      onUpdatePlayers(updated);
    }

    setPhase('exploded');
  };

  // Timer effect during 'playing' phase
  useEffect(() => {
    if (phase !== 'playing') {
      return;
    }

    if (secondsRemaining <= 0) {
      handleBombExploded();
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
  }, [phase, secondsRemaining, currentTurnIndex, players]);

  // Pass bomb to next active player
  const handlePassBomb = () => {
    const wordToAdd = typedWord.trim();
    if (wordToAdd) {
      // Check if word already used
      const isDuplicate = usedWordsThisRound.some(
        (w) => w.toLowerCase() === wordToAdd.toLowerCase()
      );
      if (isDuplicate) {
        sound.playWrong();
        setDuplicateWarning(`"${wordToAdd}" was already used this round!`);
        return;
      }
      setUsedWordsThisRound((prev) => [wordToAdd, ...prev]);
    }

    sound.playPop(750);
    setDuplicateWarning(null);
    setTypedWord('');

    // Award +20 points for successfully passing the bomb
    if (currentActivePlayer) {
      const updated = players.map((p) =>
        p.id === currentActivePlayer.id ? { ...p, score: p.score + 20 } : p
      );
      onUpdatePlayers(updated);
    }

    // Find next active player index
    let nextIdx = (currentTurnIndex + 1) % players.length;
    let attempts = 0;
    while ((players[nextIdx]?.isEliminated || (players[nextIdx]?.lives ?? 3) <= 0) && attempts < players.length) {
      nextIdx = (nextIdx + 1) % players.length;
      attempts++;
    }

    setCurrentTurnIndex(nextIdx);
    // Slight randomized timer pressure
    const nextTimer = Math.max(7, baseTimerSeconds - Math.floor(usedWordsThisRound.length / 3));
    setSecondsRemaining(nextTimer);
  };

  // Move to next round or finish tournament
  const handleNextRound = () => {
    const remainingCount = players.filter((p) => (p.lives ?? 3) > 0).length;
    if (currentRound >= totalRounds || remainingCount <= 1) {
      setPhase('game_over');
      return;
    }

    const nextRoundNum = currentRound + 1;
    setCurrentRound(nextRoundNum);
    startNewRound(players, nextRoundNum);
  };

  // Restart
  const handleRestart = () => {
    sound.playPop(500);
    const resetPlayers = players.map((p) => ({
      ...p,
      score: 0,
      lives: 3,
      isEliminated: false,
    }));
    onUpdatePlayers(resetPlayers);
    setUsedCategories([]);
    setCurrentRound(1);
    startNewRound(resetPlayers, 1);
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
          setTotalRounds((prev) => prev + 5);
          handleNextRound();
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-wider">
            <Bomb className="w-4 h-4 text-red-400 animate-pulse" />
            <span>{t.wordBombTitle}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.bombSetupTitle}
          </h1>
          <p className="text-sm text-slate-300">
            {t.wordBombDesc} ({t.playersRangeBomb})
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
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!playerNameInput.trim() || players.length >= 17}
                className="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-black text-sm transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-red-600/30 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{t.addPlayerBtn}</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleAddSampleSquad}
                className="text-xs text-red-400 hover:text-red-300 font-bold transition-colors cursor-pointer py-1 px-2 rounded-lg bg-red-500/10"
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

          {/* Timer Setting */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.bombTimerSetting}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[10, 15, 20].map((secs) => (
                <button
                  key={secs}
                  type="button"
                  onClick={() => {
                    sound.playPop(500);
                    setBaseTimerSeconds(secs);
                  }}
                  className={`py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    baseTimerSeconds === secs
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {secs}s
                </button>
              ))}
            </div>
          </div>

          {/* Rounds */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.totalRounds}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[3, 5, 8].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => {
                    sound.playPop(500);
                    setTotalRounds(count);
                  }}
                  className={`py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    totalRounds === count
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {count} {t.round}s
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartGame}
            disabled={players.length < 2}
            className="w-full py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-500 disabled:opacity-40 text-white font-black text-base transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-xl shadow-red-600/30"
          >
            <Bomb className="w-5 h-5 animate-pulse" />
            <span>{t.startBombGame}</span>
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
  // PLAYING / TICKING BOMB PHASE
  // ----------------------------------------------------
  if (phase === 'playing') {
    const isUrgent = secondsRemaining <= 4;

    return (
      <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-300">
        {/* Top Status Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-red-500/20 text-red-400 text-xs font-black">
              {t.round} {currentRound} / {totalRounds}
            </span>
          </div>

          <button
            onClick={onChooseGame}
            className="text-xs text-slate-400 hover:text-white font-bold transition-colors cursor-pointer"
          >
            {t.chooseAnotherGame}
          </button>
        </div>

        {/* Big Active Bomb Card */}
        <div
          className={`glass rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center border-2 transition-all ${
            isUrgent
              ? 'border-red-500 shadow-red-500/30 bg-red-950/30 animate-pulse'
              : 'border-red-500/30'
          }`}
        >
          {/* Active Player Turn Banner */}
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
              {t.currentTurn}:
            </span>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black text-white shadow-xl ring-4 ring-red-500/50 animate-bounce"
                style={{ backgroundColor: currentActivePlayer?.avatarColor }}
              >
                {currentActivePlayer?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                {currentActivePlayer?.name}
              </span>
            </div>
          </div>

          {/* Animated Bomb & Countdown */}
          <div className="relative py-2">
            <div
              className={`w-32 h-32 mx-auto rounded-full flex flex-col items-center justify-center text-white shadow-2xl border-4 transition-transform duration-200 ${
                isUrgent
                  ? 'bg-red-600 border-yellow-400 scale-110 shadow-red-600/60 animate-ping-short'
                  : 'bg-red-900/60 border-red-500/50'
              }`}
            >
              <Bomb
                className={`w-8 h-8 mb-1 ${
                  isUrgent ? 'text-yellow-300 animate-spin' : 'text-red-400'
                }`}
              />
              <span className="text-4xl font-black tracking-tight font-mono">
                {secondsRemaining}s
              </span>
            </div>
          </div>

          {/* Category Highlight */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
            <div className="text-[11px] font-black text-red-400 uppercase tracking-wider">
              {t.categoryTarget}
            </div>
            <div className="text-xl sm:text-2xl font-black text-white flex items-center justify-center gap-2">
              <span>{currentCategory?.icon}</span>
              <span>{getCategoryName(currentCategory)}</span>
            </div>
          </div>

          {duplicateWarning && (
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{duplicateWarning}</span>
            </div>
          )}

          {/* Optional Word Input / Quick Pass Button */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={typedWord}
                onChange={(e) => {
                  setTypedWord(e.target.value);
                  setDuplicateWarning(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handlePassBomb();
                }}
                placeholder="Type word (or say aloud) & pass..."
                className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            <button
              onClick={handlePassBomb}
              className="w-full py-5 px-6 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-lg shadow-xl shadow-red-600/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Zap className="w-6 h-6 text-yellow-300" />
              <span>{t.passBombBtn}</span>
            </button>
          </div>
        </div>

        {/* Used Words List */}
        {usedWordsThisRound.length > 0 && (
          <div className="bg-white/5 rounded-2xl p-3 border border-white/10 space-y-1.5">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t.usedWordsList} ({usedWordsThisRound.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {usedWordsThisRound.map((w, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-200 text-xs font-bold"
                >
                  ✓ {w}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Players Lives Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {players.map((p, idx) => {
            const isTurn = idx === currentTurnIndex;
            const pLives = p.lives ?? 3;
            return (
              <div
                key={p.id}
                className={`p-2.5 rounded-2xl border transition-all flex flex-col items-center text-center ${
                  isTurn
                    ? 'bg-red-600/20 border-red-500 ring-2 ring-red-500/40'
                    : 'bg-white/5 border-white/10 opacity-80'
                }`}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white mb-1 shadow"
                  style={{ backgroundColor: p.avatarColor }}
                >
                  {p.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-bold text-white truncate max-w-full">
                  {p.name}
                </span>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1, 2, 3].map((heartIndex) => (
                    <Heart
                      key={heartIndex}
                      className={`w-3 h-3 ${
                        heartIndex <= pLives
                          ? 'text-red-500 fill-red-500'
                          : 'text-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // EXPLODED ROUND REVEAL PHASE
  // ----------------------------------------------------
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-6 animate-in zoom-in-95 duration-300">
      <div className="glass rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center border-2 border-red-500/50">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-4xl animate-bounce">
          💥
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-black text-red-400 tracking-tight">
            {t.bombExplodedTitle}
          </h2>
          <p className="text-sm text-slate-300">
            {t.bombExplodedSubtitle}{' '}
            <span className="text-white font-black text-base">
              {explodedPlayer?.name}
            </span>
          </p>
        </div>

        {/* Player Status Display */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black text-white shadow-lg"
            style={{ backgroundColor: explodedPlayer?.avatarColor }}
          >
            {explodedPlayer?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="text-left">
            <div className="text-sm font-black text-white">{explodedPlayer?.name}</div>
            <div className="text-xs text-rose-400 font-bold">{t.playerLostLife}</div>
          </div>
        </div>

        {/* Words Said */}
        {usedWordsThisRound.length > 0 && (
          <div className="space-y-2 text-left">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t.usedWordsList}
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
              {usedWordsThisRound.map((w, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl bg-white/10 text-slate-200 text-xs font-bold"
                >
                  ✓ {w}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Next Round Button */}
        <div className="pt-2 space-y-2">
          <button
            onClick={handleNextRound}
            className="w-full py-4 px-6 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black text-base shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>{currentRound >= totalRounds ? t.finalScores : t.nextBombRound}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
