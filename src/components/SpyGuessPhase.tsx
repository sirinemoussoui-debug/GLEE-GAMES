import React from 'react';
import { Lightbulb, CheckCircle2, XCircle, ShieldAlert } from 'lucide-react';
import { Player, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { sound } from '../utils/sound';

interface SpyGuessPhaseProps {
  language: Language;
  accusedPlayer: Player | null;
  currentRound: number;
  totalRounds: number;
  onSpyGuessResult: (guessedCorrectly: boolean) => void;
}

export const SpyGuessPhase: React.FC<SpyGuessPhaseProps> = ({
  language,
  accusedPlayer,
  currentRound,
  totalRounds,
  onSpyGuessResult,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-6 animate-in fade-in duration-300 space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/30 px-3 py-1 rounded-full">
          {t.round} {currentRound} {t.of} {totalRounds}
        </span>
        <span className="text-xs font-bold text-orange-400 flex items-center gap-1">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Clutch Moment</span>
        </span>
      </div>

      <div className="glass rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-orange-600/20 border border-orange-400/40 flex items-center justify-center mx-auto shadow-lg">
          <Lightbulb className="w-8 h-8 text-orange-400 animate-pulse" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {t.spyGuessTitle}
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-sm mx-auto leading-relaxed">
            {t.spyGuessSubtitle}
          </p>
        </div>

        {accusedPlayer && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs"
              style={{ backgroundColor: accusedPlayer.avatarColor }}
            >
              ★
            </div>
            <div className="text-left">
              <div className="text-[11px] text-slate-400 uppercase font-bold">{t.suspectName}</div>
              <div className="text-lg font-black text-white">{accusedPlayer.name}</div>
            </div>
          </div>
        )}

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed">
          Ask the suspect if they can name the secret word right now!
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={() => {
              sound.playSuccess();
              onSpyGuessResult(true);
            }}
            className="w-full py-4 px-6 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-base orange-glow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{t.spyGuessedCorrectlyBtn}</span>
          </button>

          <button
            onClick={() => {
              sound.playPop(480);
              onSpyGuessResult(false);
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <XCircle className="w-4 h-4 text-rose-400" />
            <span>{t.spyGuessedWrongBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
