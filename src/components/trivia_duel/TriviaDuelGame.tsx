import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Brain,
  Timer,
  CheckCircle,
  XCircle,
  RotateCcw,
  Home,
  ArrowRight,
  Plus,
  Trash2,
  Trophy,
  Sparkles,
  HelpCircle,
  Award,
} from 'lucide-react';
import { Player, Language, TriviaQuestion } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { TRIVIA_QUESTIONS } from '../../data/triviaQuestions';
import { sound } from '../../utils/sound';
import { GameOverScreen } from '../GameOverScreen';

interface TriviaDuelGameProps {
  language: Language;
  players: Player[];
  onUpdatePlayers: (players: Player[]) => void;
  onChooseGame: () => void;
}

export const TriviaDuelGame: React.FC<TriviaDuelGameProps> = ({
  language,
  players,
  onUpdatePlayers,
  onChooseGame,
}) => {
  const t = TRANSLATIONS[language];

  // Game state
  const [phase, setPhase] = useState<'setup' | 'question' | 'reveal' | 'game_over'>('setup');
  const [playerNameInput, setPlayerNameInput] = useState('');
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [timerDuration, setTimerDuration] = useState(15);
  const [secondsRemaining, setSecondsRemaining] = useState(15);

  // Active question state
  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | null>(null);
  const [usedQuestionIds, setUsedQuestionIds] = useState<string[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [awardedPlayerId, setAwardedPlayerId] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const avatarColors = [
    '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444',
    '#06B6D4', '#EC4899', '#6366F1', '#14B8A6', '#84CC16',
    '#A855F7', '#E11D48', '#0EA5E9', '#D97706', '#059669',
  ];

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
        ? ['ياسر', 'مريم', 'فيصل', 'دانا', 'أحمد']
        : language === 'fr'
        ? ['Antoine', 'Manon', 'Romain', 'Sarah', 'Paul']
        : ['David', 'Elena', 'Lucas', 'Zoe', 'Marcus'];

    const newPlayers: Player[] = sampleNames.map((name, idx) => ({
      id: `trivia-squad-${idx}-${Date.now()}`,
      name,
      avatarColor: avatarColors[idx % avatarColors.length],
      score: 0,
    }));
    onUpdatePlayers(newPlayers);
  };

  // Start the Trivia game
  const handleStartGame = () => {
    if (players.length < 2) return;
    sound.playSuccess();

    const resetScores = players.map((p) => ({ ...p, score: 0 }));
    onUpdatePlayers(resetScores);
    setUsedQuestionIds([]);
    setCurrentQuestionIndex(1);
    loadQuestion([], 1);
  };

  // Load a new trivia question
  const loadQuestion = (used: string[], qNum: number) => {
    const available = TRIVIA_QUESTIONS.filter((q) => !used.includes(q.id));
    const pool = available.length > 0 ? available : TRIVIA_QUESTIONS;
    const randomQ = pool[Math.floor(Math.random() * pool.length)];

    setCurrentQuestion(randomQ);
    setUsedQuestionIds((prev) => [...prev, randomQ.id]);
    setSelectedOptionIndex(null);
    setIsTimeUp(false);
    setAwardedPlayerId(null);
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
    sound.playWrong();
    setIsTimeUp(true);
    setPhase('reveal');
  };

  // Timer effect
  useEffect(() => {
    if (phase !== 'question') {
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
  }, [phase, secondsRemaining, currentQuestionIndex]);

  // Handle option click
  const handleSelectOption = (idx: number) => {
    if (phase !== 'question' || !qData) return;

    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedOptionIndex(idx);

    if (idx === qData.correctIndex) {
      sound.playCorrect();
      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#10B981', '#3B82F6', '#F59E0B'],
      });
    } else {
      sound.playWrong();
    }

    setPhase('reveal');
  };

  // Award points to a specific player
  const handleAwardPoints = (playerId: string) => {
    sound.playPop(700);
    setAwardedPlayerId(playerId);

    const updated = players.map((p) =>
      p.id === playerId ? { ...p, score: p.score + 100 } : p
    );
    onUpdatePlayers(updated);
  };

  // Next question
  const handleNextQuestion = () => {
    if (currentQuestionIndex >= totalQuestions) {
      setPhase('game_over');
      return;
    }

    const nextQ = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextQ);
    loadQuestion(usedQuestionIds, nextQ);
  };

  // Restart
  const handleRestart = () => {
    sound.playPop(500);
    handleStartGame();
  };

  // ----------------------------------------------------
  // GAME OVER SCREEN
  // ----------------------------------------------------
  if (phase === 'game_over') {
    return (
      <GameOverScreen
        language={language}
        players={players}
        onRestartGame={handleRestart}
        onNextRound={() => {
          setTotalQuestions((prev) => prev + 5);
          handleNextQuestion();
        }}
        onChooseAnotherGame={onChooseGame}
      />
    );
  }

  // ----------------------------------------------------
  // SETUP PHASE
  // ----------------------------------------------------
  if (phase === 'setup') {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-8 space-y-6 animate-in fade-in duration-300">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-wider">
            <Brain className="w-4 h-4 text-blue-400" />
            <span>{t.triviaDuelTitle}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.triviaSetupTitle}
          </h1>
          <p className="text-sm text-slate-300">
            {t.triviaDuelDesc} ({t.playersRangeTrivia})
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

          {/* Settings Grid */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t.triviaQuestionsCount}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[5, 10, 15].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => {
                      sound.playPop(500);
                      setTotalQuestions(count);
                    }}
                    className={`py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                      totalQuestions === count
                        ? 'bg-blue-600 text-white'
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
              <div className="grid grid-cols-3 gap-1.5">
                {[10, 15, 20].map((secs) => (
                  <button
                    key={secs}
                    type="button"
                    onClick={() => {
                      sound.playPop(500);
                      setTimerDuration(secs);
                    }}
                    className={`py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                      timerDuration === secs
                        ? 'bg-blue-600 text-white'
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
            disabled={players.length < 2}
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
  // QUESTION / REVEAL PHASE
  // ----------------------------------------------------
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-blue-500/20 text-blue-400 text-xs font-black">
            {t.question} {currentQuestionIndex} / {totalQuestions}
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-white/5 text-slate-400 text-xs font-bold uppercase">
            {currentQuestion?.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
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

      {/* Question Card */}
      <div className="glass rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl border-2 border-blue-500/30 text-center">
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
                disabled={phase === 'reveal'}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border font-bold text-sm sm:text-base flex items-center justify-between transition-all cursor-pointer active:scale-98 ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-xs font-black">
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

        {/* Reveal Explanation Box */}
        {phase === 'reveal' && (
          <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-left space-y-1.5 animate-in fade-in">
            <div className="text-[11px] font-black text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.explanationLabel}</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {qData?.explanation}
            </p>
          </div>
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
                      ? 'bg-emerald-600/30 border-emerald-500 ring-2 ring-emerald-500/40'
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
            onClick={handleNextQuestion}
            className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-base shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>
              {currentQuestionIndex >= totalQuestions ? t.finalScores : t.nextTriviaQuestion}
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
