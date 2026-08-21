import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Play,
  Pause,
  Plus,
  HelpCircle,
  Vote,
  Sparkles,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { Player, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { PARTY_ICEBREAKERS } from '../data/words';
import { sound } from '../utils/sound';

interface DiscussionPhaseProps {
  language: Language;
  players: Player[];
  timerSeconds: number; // 0 for unlimited
  currentRound: number;
  totalRounds: number;
  onProceedToVote: () => void;
}

export const DiscussionPhase: React.FC<DiscussionPhaseProps> = ({
  language,
  players,
  timerSeconds,
  currentRound,
  totalRounds,
  onProceedToVote,
}) => {
  const t = TRANSLATIONS[language];
  const [timeLeft, setTimeLeft] = useState(timerSeconds);
  const [isRunning, setIsRunning] = useState(timerSeconds > 0);
  const [promptIndex, setPromptIndex] = useState(0);

  const prompts = PARTY_ICEBREAKERS[language] || PARTY_ICEBREAKERS.en;
  const currentPrompt = prompts[promptIndex % prompts.length];

  const lastTickRef = useRef<number>(timeLeft);

  useEffect(() => {
    if (timerSeconds <= 0) return;

    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          sound.playSpyStinger();
          return 0;
        }
        if (prev <= 10) {
          sound.playUrgentTick();
        } else if (prev % 15 === 0) {
          sound.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timerSeconds]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleToggleTimer = () => {
    sound.playPop(500);
    setIsRunning(!isRunning);
  };

  const handleAddTime = () => {
    sound.playPop(600);
    setTimeLeft((prev) => prev + 30);
  };

  const handleNextPrompt = () => {
    sound.playPop(520);
    setPromptIndex((prev) => prev + 1);
  };

  const progressPercent =
    timerSeconds > 0 ? (timeLeft / timerSeconds) * 100 : 100;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 animate-in fade-in duration-300 space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-full">
          {t.round} {currentRound} {t.of} {totalRounds}
        </span>
        <span className="text-xs font-bold text-slate-400">
          {players.length} {t.playersList}
        </span>
      </div>

      {/* Main Discussion Hero Card */}
      <div className="glass rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="text-center">
          <h2 className="text-3xl sm:text-5xl font-black text-orange-500 uppercase tracking-tight">
            {t.discussionTitle}
          </h2>
          <p className="text-slate-300 text-sm mt-1 max-w-md mx-auto">
            {t.discussionTip2}
          </p>
        </div>

        {/* Timer Box (If enabled) */}
        {timerSeconds > 0 ? (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              <span>{t.timerRemaining}</span>
            </div>

            <div
              className={`text-5xl sm:text-6xl font-mono py-2 px-8 rounded-2xl bg-white/5 border border-white/10 ${
                timeLeft <= 10
                  ? 'text-rose-500 animate-pulse'
                  : timeLeft <= 30
                  ? 'text-orange-400'
                  : 'text-white'
              }`}
            >
              {formatTime(timeLeft)}
            </div>

            {/* Timer Progress Bar */}
            <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden border border-white/10 max-w-xs">
              <div
                className={`h-full transition-all duration-1000 ${
                  timeLeft <= 10
                    ? 'bg-rose-500'
                    : timeLeft <= 30
                    ? 'bg-orange-500'
                    : 'bg-orange-600'
                }`}
                style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
              />
            </div>

            {/* Timer Controls */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleToggleTimer}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>{t.pauseTimer}</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>{t.resumeTimer}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleAddTime}
                className="px-3.5 py-2 rounded-xl bg-purple-600/40 hover:bg-purple-600 text-purple-200 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{t.addTime}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-xs font-bold text-orange-400">
              ⏱ {t.unlimited} — Take all the time you need to question your friends!
            </span>
          </div>
        )}

        {/* Icebreaker Question Card */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-orange-300">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>{t.discussionPromptHeader}</span>
            </div>
            <button
              onClick={handleNextPrompt}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>{t.nextPromptBtn}</span>
            </button>
          </div>
          <p className="text-white font-extrabold text-sm sm:text-base italic">
            "{currentPrompt}"
          </p>
        </div>

        {/* Players Roster in Circle / Grid */}
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            {t.playersList} ({players.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {players.map((player) => (
              <div
                key={player.id}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-slate-200"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: player.avatarColor }}
                />
                <span>{player.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button: Go to Voting */}
        <button
          onClick={() => {
            sound.playSuccess();
            onProceedToVote();
          }}
          className="w-full py-5 px-8 rounded-2xl bg-orange-600 text-white font-black text-lg orange-glow hover:bg-orange-500 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
        >
          <Vote className="w-5 h-5" />
          <span>{t.readyToVoteBtn}</span>
        </button>
      </div>
    </div>
  );
};
