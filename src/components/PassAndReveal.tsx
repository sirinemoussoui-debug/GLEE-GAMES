import React, { useState } from 'react';
import { Eye, EyeOff, ShieldAlert, CheckCircle2, ArrowRight, Sparkles, UserCheck, Shield } from 'lucide-react';
import { Player, WordItem, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { sound } from '../utils/sound';

interface PassAndRevealProps {
  language: Language;
  players: Player[];
  secretWord: WordItem;
  currentRound: number;
  totalRounds: number;
  onAllRevealed: () => void;
}

export const PassAndReveal: React.FC<PassAndRevealProps> = ({
  language,
  players,
  secretWord,
  currentRound,
  totalRounds,
  onAllRevealed,
}) => {
  const t = TRANSLATIONS[language];
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  const currentPlayer = players[currentPlayerIndex];
  const isLastPlayer = currentPlayerIndex === players.length - 1;
  const allDone = revealedIds.length === players.length;

  const currentWordText =
    language === 'ar'
      ? secretWord.ar
      : language === 'fr'
      ? secretWord.fr
      : secretWord.en;

  const currentHintText =
    language === 'ar'
      ? secretWord.hintAr || secretWord.category
      : language === 'fr'
      ? secretWord.hintFr || secretWord.category
      : secretWord.hintEn || secretWord.category;

  const handleToggleReveal = () => {
    if (!isRevealed) {
      if (currentPlayer.isSpy) {
        sound.playSpyStinger();
      } else {
        sound.playReveal();
      }
      setIsRevealed(true);
      if (!revealedIds.includes(currentPlayer.id)) {
        setRevealedIds([...revealedIds, currentPlayer.id]);
      }
    } else {
      sound.playPop(420);
      setIsRevealed(false);
    }
  };

  const handleNextPlayer = () => {
    sound.playPop(520);
    setIsRevealed(false);
    if (!isLastPlayer) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-6 animate-in fade-in duration-300">
      {/* Round & Step Status */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400 bg-purple-950/60 border border-purple-500/30 px-3 py-1 rounded-xl">
          {t.round} {currentRound} {t.of} {totalRounds}
        </span>
        <span className="text-xs font-bold text-slate-400">
          {revealedIds.length} / {players.length} {t.playerRevealedBadge}
        </span>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-1.5 mb-6">
        {players.map((p, idx) => {
          const isDone = revealedIds.includes(p.id);
          const isCurrent = idx === currentPlayerIndex;
          return (
            <div
              key={p.id}
              className={`h-2 rounded-full transition-all ${
                isCurrent
                  ? 'w-8 bg-gradient-to-r from-purple-500 to-blue-500'
                  : isDone
                  ? 'w-4 bg-emerald-500'
                  : 'w-2 bg-slate-800'
              }`}
            />
          );
        })}
      </div>

      {/* Pass Box or All Done View */}
      {allDone && !isRevealed ? (
        <div className="glass rounded-3xl p-8 text-center shadow-2xl space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-pulse">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">{t.allPlayersReady}</h2>
            <p className="text-slate-300 text-sm mt-2 leading-relaxed">
              {t.discussionTip1}
            </p>
          </div>

          <button
            onClick={() => {
              sound.playSuccess();
              onAllRevealed();
            }}
            className="w-full py-5 px-8 rounded-2xl bg-orange-600 text-white font-black text-lg orange-glow hover:bg-orange-500 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>{t.beginDiscussionBtn}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <div className="glass rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
          {/* Target Player Banner */}
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              {t.passDeviceInstruction}
            </div>

            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-white"
                style={{ backgroundColor: currentPlayer.avatarColor }}
              >
                {currentPlayerIndex + 1}
              </div>
              <h2 className="text-3xl font-black text-purple-400 tracking-tight">
                {currentPlayer.name}'s Turn
              </h2>
            </div>

            <p className="text-slate-400 text-xs mt-2.5 flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-orange-400" />
              <span>{t.privacyNotice}</span>
            </p>
          </div>

          {/* Secret Role Card Flip Container */}
          <div className="min-h-[220px] flex items-center justify-center">
            {isRevealed ? (
              currentPlayer.isSpy ? (
                /* Spy Card */
                <div className="w-full p-6 rounded-2xl bg-gradient-to-b from-rose-950/80 via-purple-950/90 to-slate-900 border-2 border-rose-500/70 shadow-2xl shadow-rose-950/60 animate-in zoom-in-95 duration-200 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-rose-600/30 border border-rose-500/50 flex items-center justify-center mx-auto">
                    <ShieldAlert className="w-8 h-8 text-rose-400 animate-bounce" />
                  </div>
                  <h3 className="text-3xl font-black text-rose-400 tracking-tight uppercase">
                    {t.youAreTheSpy} 🕵️
                  </h3>
                  <p className="text-rose-100/90 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                    {t.spySecretInstruction}
                  </p>
                </div>
              ) : (
                /* Innocent Card */
                <div className="w-full p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-purple-950/50 to-slate-900 border-2 border-orange-500/50 shadow-2xl animate-in zoom-in-95 duration-200 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-600/20 border border-orange-400/40 flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-orange-400">
                    {t.secretWordLabel}
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                      {currentWordText}
                    </div>
                    {currentHintText && (
                      <div className="text-xs text-orange-300/80 mt-1 font-semibold">
                        Category: {currentHintText}
                      </div>
                    )}
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed max-w-sm mx-auto">
                    {t.innocentInstruction}
                  </p>
                </div>
              )
            ) : (
              /* Privacy Hidden Shield */
              <div
                onClick={handleToggleReveal}
                className="w-full p-8 rounded-2xl bg-white/5 border-2 border-dashed border-white/20 hover:border-orange-500/60 flex flex-col items-center justify-center gap-3 cursor-pointer group transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <EyeOff className="w-8 h-8 text-purple-400" />
                </div>
                <div className="font-extrabold text-white text-base group-hover:text-orange-400 transition-colors">
                  {t.tapToReveal}
                </div>
                <div className="text-xs text-slate-400">
                  {t.privacyNotice}
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div>
            {isRevealed ? (
              <button
                onClick={handleNextPlayer}
                className="w-full py-4 px-6 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg purple-glow transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <EyeOff className="w-5 h-5" />
                <span>
                  {isLastPlayer ? 'Got it, Finish Role Reveal' : 'Got it, Hide & Next'}
                </span>
              </button>
            ) : (
              <button
                onClick={handleToggleReveal}
                className="w-full py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-orange-400" />
                <span>{t.tapToReveal}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
