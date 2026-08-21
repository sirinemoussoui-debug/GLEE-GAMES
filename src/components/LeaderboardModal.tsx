import React from 'react';
import { Trophy, X, Crown, Medal } from 'lucide-react';
import { Player, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { sound } from '../utils/sound';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  players: Player[];
  language: Language;
  currentRound: number;
  totalRounds: number;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  players,
  language,
  currentRound,
  totalRounds,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#1e293b] border border-white/10 rounded-3xl p-6 shadow-2xl text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-600/20 border border-orange-400/40 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <h3 className="font-black text-white text-base uppercase tracking-wider">{t.leaderboard}</h3>
              <p className="text-[11px] text-slate-300">
                {t.round} {currentRound} {t.of} {totalRounds}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playPop(450);
              onClose();
            }}
            className="p-1.5 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {sortedPlayers.map((player, idx) => (
            <div
              key={player.id}
              className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                idx === 0
                  ? 'bg-orange-600/30 border-orange-500 text-orange-200'
                  : 'bg-white/5 border-white/10 text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-black text-xs text-slate-400 w-4">
                  {idx === 0 ? '👑' : `#${idx + 1}`}
                </span>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-white text-xs"
                  style={{ backgroundColor: player.avatarColor }}
                >
                  {idx + 1}
                </div>
                <span className="font-bold text-sm text-white truncate max-w-[150px]">
                  {player.name}
                </span>
              </div>

              <div className="font-black text-sm text-orange-400">
                {player.score} <span className="text-xs font-semibold">{t.pts}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={() => {
              sound.playPop(480);
              onClose();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs orange-glow transition-colors cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
