import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Flame,
  Bomb,
  Brain,
  Smile,
  ShieldAlert,
  BookOpen,
  CheckCircle2,
  Users,
  Smartphone,
  ChevronRight,
} from 'lucide-react';
import { Language, GameType } from '../types';
import { TRANSLATIONS } from '../translations';
import { sound } from '../utils/sound';
import { KariLetterA } from './common/KariLogo';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose, language }) => {
  const [activeTab, setActiveTab] = useState<GameType>('spy');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playPop(450);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const t = TRANSLATIONS[language];

  const gameTabs: { id: GameType; label: string; icon: React.ReactNode; color: string; accent: string }[] = [
    { id: 'spy', label: t.spyGameTitle, icon: <ShieldAlert className="w-4 h-4" />, color: 'text-orange-400', accent: '#f97316' },
    { id: 'whos_most_likely', label: t.whoMostLikelyTitle, icon: <Flame className="w-4 h-4" />, color: 'text-purple-400', accent: '#a855f7' },
    { id: 'word_bomb', label: t.wordBombTitle, icon: <Bomb className="w-4 h-4" />, color: 'text-red-400', accent: '#ef4444' },
    { id: 'trivia', label: t.triviaDuelTitle, icon: <Brain className="w-4 h-4" />, color: 'text-blue-400', accent: '#3b82f6' },
    { id: 'emoji', label: t.emojiDecoderTitle, icon: <Smile className="w-4 h-4" />, color: 'text-amber-400', accent: '#f59e0b' },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="arcade-manual-title"
    >
      {/* Physical Manual Card Container */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0a0e18] border border-white/15 rounded-3xl p-5 sm:p-7 max-h-[90vh] overflow-y-auto shadow-[0_30px_70px_-15px_rgba(0,0,0,0.98)] text-slate-100 focus:outline-none space-y-5 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Top Paper Edge Specular Highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent pointer-events-none" />

        {/* Manual Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#140e0a] border border-orange-500/40 flex items-center justify-center text-orange-400 shadow-inner">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-tight text-white flex items-center">
                  GLEE
                </span>
                <span className="text-[10px] font-mono text-orange-400 font-bold px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/30 uppercase tracking-widest">
                  {t.arcadeManualHeader || 'ARCADE MANUAL'}
                </span>
              </div>
              <h2 id="arcade-manual-title" className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                {t.rulesModalTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop(450);
              onClose();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-orange-400"
            aria-label="Close Arcade Manual"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Arcade Overview Strip */}
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>1 SHARED DEVICE</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>2–17 PLAYERS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
            <span className="text-slate-300">PASS &amp; PLAY</span>
          </div>
        </div>

        {/* Game Tab Switcher (Tactile Console Rockers) */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none" role="tablist" aria-label="Game Rules Tabs">
          {gameTabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  sound.playPop(500);
                  setActiveTab(tab.id);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all duration-150 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#181d2c] text-white border border-orange-500/50 shadow-[0_4px_12px_rgba(0,0,0,0.5)] translate-y-[-1px]'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200 border border-transparent'
                }`}
              >
                <span className={tab.color}>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Rules Module Content */}
        <div className="space-y-4 text-sm min-h-[220px]">
          {activeTab === 'spy' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-orange-950/30 border border-orange-500/30">
                <div className="flex items-center gap-2 text-orange-300 font-black text-sm uppercase tracking-wider mb-1">
                  <ShieldAlert className="w-4 h-4 text-orange-400" />
                  <span>MISSION BRIEFING: SPY GAME</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  One imposter is secretly among you. All innocent players receive the secret location and word, while the spy gets nothing. Find the spy before they figure out the secret!
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">1</span>
                  <div>
                    <span className="font-bold text-white">Pass & Reveal:</span> Hold the screen privately to view your secret identity and word. Release immediately before handing the phone over.
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">2</span>
                  <div>
                    <span className="font-bold text-white">Interrogation:</span> Take turns asking indirect questions. Don't be too obvious or the spy will deduce the secret word!
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">3</span>
                  <div>
                    <span className="font-bold text-white">Vote & Guess:</span> Vote on the suspect. If caught, the spy gets one clutch attempt to guess the secret word for +150 points.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'whos_most_likely' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/30">
                <div className="flex items-center gap-2 text-purple-300 font-black text-sm uppercase tracking-wider mb-1">
                  <Flame className="w-4 h-4 text-purple-400" />
                  <span>MISSION BRIEFING: WHO'S MOST LIKELY TO</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  A high-chaos social voting game (3–17 players). Expose your friends' funniest habits, secrets, and spicy tendencies.
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">1</span>
                  <div>
                    <span className="font-bold text-white">The Dilemma:</span> A question appears on screen covering campus drama, late night habits, or social chaos.
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">2</span>
                  <div>
                    <span className="font-bold text-white">Tap to Vote:</span> Each player votes for the friend who matches the question best.
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">3</span>
                  <div>
                    <span className="font-bold text-white">The Reveal:</span> Highest-voted friend is crowned and earns round bonus points!
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'word_bomb' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30">
                <div className="flex items-center gap-2 text-red-300 font-black text-sm uppercase tracking-wider mb-1">
                  <Bomb className="w-4 h-4 text-red-400" />
                  <span>MISSION BRIEFING: WORD CHAIN BOMB</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Fast-paced ticking adrenaline (2–17 players). Name a word matching the category and pass the phone before it explodes in your hands!
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">1</span>
                  <div>
                    <span className="font-bold text-white">Say the Word:</span> State a valid word aloud matching the current topic and starting letter.
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">2</span>
                  <div>
                    <span className="font-bold text-white">Pass the Bomb:</span> Tap "PASS BOMB" immediately to reset the fuse and hand the phone to your neighbor.
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">3</span>
                  <div>
                    <span className="font-bold text-white">Boom:</span> When the hidden timer reaches zero, the holder loses a heart. Last player standing wins!
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trivia' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30">
                <div className="flex items-center gap-2 text-blue-300 font-black text-sm uppercase tracking-wider mb-1">
                  <Brain className="w-4 h-4 text-blue-400" />
                  <span>MISSION BRIEFING: CAMPUS TRIVIA DUEL</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Head-to-head quiz showdown (1–17 players). Race against the 15-second clock across science, geography, history, pop culture, and gaming.
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">1</span>
                  <div>
                    <span className="font-bold text-white">Speed Clock:</span> Read the prompt and pick your answer before the 15-second bar depletes.
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">2</span>
                  <div>
                    <span className="font-bold text-white">Instant Feedback:</span> Answers instantly reveal green/red with sound and fascinating trivia facts.
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">3</span>
                  <div>
                    <span className="font-bold text-white">Streak Multipliers:</span> Chain correct answers to build streaks and climb the leaderboard.
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'emoji' && (
            <div className="space-y-3 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30">
                <div className="flex items-center gap-2 text-amber-300 font-black text-sm uppercase tracking-wider mb-1">
                  <Smile className="w-4 h-4 text-amber-400" />
                  <span>MISSION BRIEFING: EMOJI DECODER</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Visual riddle puzzle (1–17 players). Decipher movie titles, famous proverbs, college moments, and foods encoded into emoji puzzles.
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">1</span>
                  <div>
                    <span className="font-bold text-white">Crack the Clues:</span> Look closely at the emoji equation (e.g. 🦁 + 👑 = The Lion King).
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">2</span>
                  <div>
                    <span className="font-bold text-white">Clue Assistant:</span> Stuck on a tricky riddle? Hit the clue button for a subtle hint.
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">3</span>
                  <div>
                    <span className="font-bold text-white">Party Scoring:</span> Pass the device or solve collaboratively as a squad.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tactile Manual Footer & Dismiss Actuator */}
        <div className="pt-3 border-t border-white/10">
          <button
            onClick={() => {
              sound.playPop(550);
              onClose();
            }}
            className="w-full py-3.5 px-6 rounded-2xl text-white font-black text-sm uppercase tracking-wider transition-all duration-150 cursor-pointer overflow-hidden shadow-[0_4px_0_#7c2d12,0_10px_20px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_#7c2d12] flex items-center justify-center gap-2 border-t border-white/30"
            style={{
              background: 'linear-gradient(180deg, #ea580c 0%, #c2410c 100%)',
            }}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{t.closeBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
