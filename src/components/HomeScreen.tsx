import React from 'react';
import {
  Play,
  Users,
  Eye,
  Sparkles,
  Flame,
  ShieldAlert,
  ArrowRight,
  BookOpen,
  Bomb,
  Brain,
  Smile,
  Zap,
} from 'lucide-react';
import { Language, GameType } from '../types';
import { TRANSLATIONS } from '../translations';
import { sound } from '../utils/sound';

interface HomeScreenProps {
  language: Language;
  onStartGame: (gameType: GameType) => void;
  onOpenRules: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  language,
  onStartGame,
  onOpenRules,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
      {/* Hero Section */}
      <section className="w-full text-center py-8 md:py-14 px-4 relative overflow-hidden flex flex-col items-center">
        {/* Background ambient glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-orange-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Brand Tag Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-orange-300 text-xs font-black uppercase tracking-wider mb-5 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          <span>Multiplayer Social Party Hub</span>
        </div>

        {/* Main Title */}
        <div className="mb-3 relative">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white drop-shadow-lg">
            GLEE
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-100 mb-2 max-w-2xl">
          {t.tagline}
        </p>

        {/* Subtitle */}
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md">
          <button
            onClick={() => {
              sound.playSuccess();
              onStartGame('spy');
            }}
            className="w-full sm:w-auto px-9 py-4 bg-orange-600 rounded-2xl font-black text-lg text-white orange-glow hover:bg-orange-500 transition-all active:scale-95 flex items-center justify-center gap-2.5 cursor-pointer group shadow-xl"
          >
            <Play className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
            <span className="whitespace-nowrap">{t.playNow}</span>
          </button>

          <button
            onClick={() => {
              sound.playPop(520);
              onOpenRules();
            }}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl glass text-slate-200 hover:text-white hover:border-orange-400/50 hover:bg-white/10 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-orange-400" />
            <span className="whitespace-nowrap">{t.rules}</span>
          </button>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-10 pt-6 border-t border-white/10 w-full max-w-xl text-center">
          <div className="p-3 glass rounded-2xl">
            <span className="text-2xl block mb-1">🎮</span>
            <div className="text-orange-400 font-black text-sm sm:text-base">5 Live Games</div>
            <div className="text-slate-400 text-xs mt-0.5 font-bold">100% Free</div>
          </div>
          <div className="p-3 glass rounded-2xl">
            <span className="text-2xl block mb-1">👥</span>
            <div className="text-purple-400 font-black text-sm sm:text-base">2–17 Players</div>
            <div className="text-slate-400 text-xs mt-0.5 font-bold">Pass & Play</div>
          </div>
          <div className="p-3 glass rounded-2xl">
            <span className="text-2xl block mb-1">🌍</span>
            <div className="text-amber-400 font-black text-sm sm:text-base">Multilingual</div>
            <div className="text-slate-400 text-xs mt-0.5 font-bold">EN • عربي • FR</div>
          </div>
        </div>
      </section>

      {/* Game Catalog Section */}
      <section className="w-full max-w-5xl px-4 py-6 mb-12 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Party Games Collection
            </h2>
          </div>
          <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            5 Playable Games
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Game 1: Spy Game */}
          <div
            onClick={() => {
              sound.playSuccess();
              onStartGame('spy');
            }}
            className="group relative glass rounded-3xl p-6 sm:p-7 border-2 border-orange-500/40 hover:border-orange-400 orange-glow transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-orange-500/15 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-xs font-black">
                  <Sparkles className="w-3 h-3 text-orange-400" />
                  {t.spyBadge}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-300">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  <span>{t.playersRangeSpy}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-3">
                <div className="w-13 h-13 rounded-2xl bg-orange-600 flex items-center justify-center orange-glow group-hover:scale-105 transition-transform shrink-0">
                  <ShieldAlert className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-orange-400 transition-colors">
                    {t.spyGameTitle}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                    {t.spyGameTagline}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-orange-400 group-hover:text-orange-300 transition-colors">
                Play Now • Categories & Custom Words
              </span>
              <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-lg">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Game 2: Who's Most Likely To */}
          <div
            onClick={() => {
              sound.playSuccess();
              onStartGame('whos_most_likely');
            }}
            className="group relative glass rounded-3xl p-6 sm:p-7 border-2 border-purple-500/40 hover:border-purple-400 transition-all cursor-pointer overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-purple-600/20"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/15 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-black">
                  <Flame className="w-3 h-3 text-purple-400" />
                  {t.whoMostLikelyBadge}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-300">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  <span>{t.playersRangeWhos}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-3">
                <div className="w-13 h-13 rounded-2xl bg-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-lg shadow-purple-600/30">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-purple-400 transition-colors">
                    {t.whoMostLikelyTitle}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                    {t.whoMostLikelyDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
                Play Now • 105+ Questions & Live Voting
              </span>
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-lg">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Game 3: Word Chain Bomb */}
          <div
            onClick={() => {
              sound.playSuccess();
              onStartGame('word_bomb');
            }}
            className="group relative glass rounded-3xl p-6 sm:p-7 border-2 border-red-500/40 hover:border-red-400 transition-all cursor-pointer overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-red-600/20"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-red-500/15 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-400/40 text-red-300 text-xs font-black">
                  <Bomb className="w-3 h-3 text-red-400" />
                  {t.wordBombBadge}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-300">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  <span>{t.playersRangeBomb}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-3">
                <div className="w-13 h-13 rounded-2xl bg-red-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-lg shadow-red-600/30">
                  <Bomb className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-red-400 transition-colors">
                    {t.wordBombTitle}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                    {t.wordBombDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-red-400 group-hover:text-red-300 transition-colors">
                Play Now • Ticking Timer & Lives System
              </span>
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-lg">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Game 4: Campus Trivia Duel */}
          <div
            onClick={() => {
              sound.playSuccess();
              onStartGame('trivia');
            }}
            className="group relative glass rounded-3xl p-6 sm:p-7 border-2 border-blue-500/40 hover:border-blue-400 transition-all cursor-pointer overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-blue-600/20"
          >
            <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/15 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-black">
                  <Brain className="w-3 h-3 text-blue-400" />
                  {t.triviaDuelBadge}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-300">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  <span>{t.playersRangeTrivia}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-3">
                <div className="w-13 h-13 rounded-2xl bg-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-lg shadow-blue-600/30">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                    {t.triviaDuelTitle}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                    {t.triviaDuelDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                Play Now • 155+ Trivia Questions & Quiz Battle
              </span>
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-lg">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Game 5: Emoji Decoder */}
          <div
            onClick={() => {
              sound.playSuccess();
              onStartGame('emoji');
            }}
            className="md:col-span-2 group relative glass rounded-3xl p-6 sm:p-7 border-2 border-amber-500/40 hover:border-amber-400 transition-all cursor-pointer overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-amber-600/20"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/15 rounded-full blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />

            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-black">
                  <Smile className="w-3 h-3 text-amber-400" />
                  {t.emojiDecoderBadge}
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-300">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  <span>{t.playersRangeEmoji}</span>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-3">
                <div className="w-13 h-13 rounded-2xl bg-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 shadow-lg shadow-amber-600/30">
                  <Smile className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                    {t.emojiDecoderTitle}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                    {t.emojiDecoderDesc}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 group-hover:text-amber-300 transition-colors">
                Play Now • 105+ Visual Riddles, Hints & Multiple Choices
              </span>
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-lg">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
