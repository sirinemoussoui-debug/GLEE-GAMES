import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Crown, Sparkles, RotateCcw, Home, ArrowRight, Award } from 'lucide-react';
import { Player, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { sound } from '../utils/sound';

interface GameOverScreenProps {
  language: Language;
  players: Player[];
  onRestartGame: () => void;
  onNextRound: () => void;
  onChooseAnotherGame: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  language,
  players,
  onRestartGame,
  onNextRound,
  onChooseAnotherGame,
}) => {
  const t = TRANSLATIONS[language];

  // Sort players by score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const second = sortedPlayers[1];
  const third = sortedPlayers[2];

  useEffect(() => {
    sound.playVictoryFanfare();

    // Trigger confetti fireworks
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#8B5CF6', '#3B82F6', '#F97316', '#10B981'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#8B5CF6', '#3B82F6', '#F97316', '#10B981'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 animate-in fade-in zoom-in-95 duration-400 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-400/30 text-orange-400 text-xs font-black uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-orange-400" />
          <span>Tournament Completed</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          {t.gameOverTitle}
        </h1>
      </div>

      {/* Podium Display */}
      <div className="glass rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8">
        <div className="flex items-end justify-center gap-3 pt-6 pb-2">
          {/* 2nd Place (if available) */}
          {second && (
            <div className="flex flex-col items-center flex-1 max-w-[120px]">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-xs mb-2 shadow-lg"
                style={{ backgroundColor: second.avatarColor }}
              >
                2
              </div>
              <span className="text-xs font-bold text-slate-200 truncate w-full text-center">
                {second.name}
              </span>
              <span className="text-[11px] font-black text-slate-400 mb-2">
                {second.score} {t.pts}
              </span>
              <div className="w-full h-24 bg-white/5 rounded-t-2xl border-t-2 border-slate-400 flex items-center justify-center font-black text-slate-300 text-lg">
                2nd
              </div>
            </div>
          )}

          {/* 1st Place (Winner) */}
          {winner && (
            <div className="flex flex-col items-center flex-1 max-w-[140px] -mt-6">
              <Crown className="w-8 h-8 text-yellow-400 animate-bounce mb-1" />
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-base mb-2 shadow-xl ring-4 ring-orange-500/50"
                style={{ backgroundColor: winner.avatarColor }}
              >
                👑
              </div>
              <span className="text-sm font-black text-white truncate w-full text-center">
                {winner.name}
              </span>
              <span className="text-xs font-black text-orange-400 mb-2">
                {winner.score} {t.pts}
              </span>
              <div className="w-full h-36 bg-orange-600/30 rounded-t-2xl border-t-2 border-orange-400 flex flex-col items-center justify-center font-black text-orange-300">
                <span className="text-2xl">1st</span>
                <span className="text-[10px] text-orange-200 uppercase font-bold tracking-wider">
                  Champion
                </span>
              </div>
            </div>
          )}

          {/* 3rd Place (if available) */}
          {third && (
            <div className="flex flex-col items-center flex-1 max-w-[120px]">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-xs mb-2 shadow-lg"
                style={{ backgroundColor: third.avatarColor }}
              >
                3
              </div>
              <span className="text-xs font-bold text-slate-200 truncate w-full text-center">
                {third.name}
              </span>
              <span className="text-[11px] font-black text-slate-400 mb-2">
                {third.score} {t.pts}
              </span>
              <div className="w-full h-16 bg-white/5 rounded-t-2xl border-t-2 border-orange-700/60 flex items-center justify-center font-black text-orange-400 text-lg">
                3rd
              </div>
            </div>
          )}
        </div>

        {/* Full Leaderboard Table */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            {t.finalStandings}:
          </h3>
          <div className="space-y-2">
            {sortedPlayers.map((p, idx) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <span className="font-black text-xs text-slate-400 w-4">#{idx + 1}</span>
                  <div
                    className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-black text-white"
                    style={{ backgroundColor: p.avatarColor }}
                  >
                    {idx === 0 ? '👑' : idx + 1}
                  </div>
                  <span className="font-bold text-sm text-white">{p.name}</span>
                </div>
                <span className="font-black text-sm text-orange-400">
                  {p.score} {t.pts}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => {
              sound.playSuccess();
              onRestartGame();
            }}
            className="w-full py-5 px-8 rounded-2xl bg-orange-600 text-white font-black text-lg orange-glow hover:bg-orange-500 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
            <span>{t.playAgain}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                sound.playPop(520);
                onNextRound();
              }}
              className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4 text-purple-400" />
              <span>{t.nextRound} (+1)</span>
            </button>

            <button
              onClick={() => {
                sound.playPop(480);
                onChooseAnotherGame();
              }}
              className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4 text-orange-400" />
              <span>{t.chooseAnother}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
