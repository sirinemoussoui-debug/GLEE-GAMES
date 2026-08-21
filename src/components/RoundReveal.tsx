import React from 'react';
import {
  ShieldAlert,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Trophy,
} from 'lucide-react';
import { Player, WordItem, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { sound } from '../utils/sound';

interface RoundRevealProps {
  language: Language;
  players: Player[];
  secretWord: WordItem;
  spyPlayer: Player | null;
  mostVotedPlayerId: string | null;
  spyGuessedCorrectly: boolean;
  currentRound: number;
  totalRounds: number;
  pointsAwarded: Record<string, number>;
  onNextRound: () => void;
  onViewLeaderboard: () => void;
  onRestartGame: () => void;
  onChooseAnotherGame: () => void;
}

export const RoundReveal: React.FC<RoundRevealProps> = ({
  language,
  players,
  secretWord,
  spyPlayer,
  mostVotedPlayerId,
  spyGuessedCorrectly,
  currentRound,
  totalRounds,
  pointsAwarded,
  onNextRound,
  onViewLeaderboard,
  onRestartGame,
  onChooseAnotherGame,
}) => {
  const t = TRANSLATIONS[language];
  const isFinalRound = currentRound >= totalRounds;

  const isSpyCaught = Boolean(spyPlayer && mostVotedPlayerId === spyPlayer.id);

  const wordText =
    language === 'ar'
      ? secretWord.ar
      : language === 'fr'
      ? secretWord.fr
      : secretWord.en;

  const hintText =
    language === 'ar'
      ? secretWord.hintAr || secretWord.category
      : language === 'fr'
      ? secretWord.hintFr || secretWord.category
      : secretWord.hintEn || secretWord.category;

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 animate-in fade-in duration-300 space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full">
          {t.round} {currentRound} {t.of} {totalRounds}
        </span>
        <button
          onClick={() => {
            sound.playPop(500);
            onViewLeaderboard();
          }}
          className="text-xs font-bold text-orange-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full flex items-center gap-1 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Trophy className="w-3.5 h-3.5 text-orange-400" />
          <span>{t.leaderboard}</span>
        </button>
      </div>

      <div className="glass rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Outcome Banner */}
        <div
          className={`p-5 rounded-2xl border text-center space-y-2 ${
            spyGuessedCorrectly
              ? 'bg-orange-600/30 border-orange-500 text-orange-300'
              : isSpyCaught
              ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
              : 'bg-rose-600/30 border-rose-500 text-rose-300'
          }`}
        >
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {spyGuessedCorrectly
              ? t.spyGuessedBanner
              : isSpyCaught
              ? t.spyCaughtBanner
              : t.spyWonBanner}
          </div>
        </div>

        {/* Identity & Word Reveal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* True Spy Card */}
          <div className="p-4 rounded-2xl bg-white/5 border border-rose-500/40 space-y-2">
            <div className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{t.theSpyWas}</span>
            </div>
            {spyPlayer && (
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs"
                  style={{ backgroundColor: spyPlayer.avatarColor }}
                >
                  🕵️
                </div>
                <div className="text-lg font-black text-white truncate">
                  {spyPlayer.name}
                </div>
              </div>
            )}
          </div>

          {/* Secret Word Card */}
          <div className="p-4 rounded-2xl bg-white/5 border border-orange-500/40 space-y-2">
            <div className="text-[11px] font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.theSecretWordWas}</span>
            </div>
            <div className="text-xl font-black text-white truncate">
              {wordText}
            </div>
            {hintText && (
              <div className="text-[11px] text-slate-300 truncate italic">
                {hintText}
              </div>
            )}
          </div>
        </div>

        {/* Round Points Allocation List */}
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span>{t.pointsEarnedThisRound}:</span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {players.map((player) => {
              const pts = pointsAwarded[player.id] || 0;
              const isSpy = player.id === spyPlayer?.id;

              return (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black text-white shrink-0"
                      style={{ backgroundColor: player.avatarColor }}
                    >
                      {isSpy ? '🕵️' : '✓'}
                    </div>
                    <span className="font-bold text-xs text-slate-200 truncate">
                      {player.name}
                    </span>
                    {isSpy && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                        Spy
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-black ${
                        pts > 0 ? 'text-orange-400' : 'text-slate-500'
                      }`}
                    >
                      +{pts} {t.pts}
                    </span>
                    <span className="text-xs font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded-md">
                      Total: {player.score}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => {
            sound.playSuccess();
            onNextRound();
          }}
          className="w-full py-5 px-8 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-lg orange-glow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <span>{isFinalRound ? t.gameOverTitle : t.nextRound}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
          <button
            onClick={() => {
              sound.playPop(480);
              onRestartGame();
            }}
            className="py-3 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-orange-400" />
            <span className="truncate">{t.restartGame}</span>
          </button>

          <button
            onClick={() => {
              sound.playPop(480);
              onChooseAnotherGame();
            }}
            className="py-3 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-purple-400" />
            <span className="truncate">{t.chooseAnotherGame}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
