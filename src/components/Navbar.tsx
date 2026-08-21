import React from 'react';
import { Volume2, VolumeX, Globe, HelpCircle, Home, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { sound } from '../utils/sound';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenRules: () => void;
  onGoHome: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
  isInGame: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onOpenRules,
  onGoHome,
  isMuted,
  onToggleSound,
  isInGame,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-[#1e293b] border-b border-white/10 px-4 py-3 shrink-0 transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Zone */}
        <button
          onClick={() => {
            sound.playPop(520);
            onGoHome();
          }}
          className="flex items-center gap-3 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-xl p-1"
          aria-label="Glee Home"
        >
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center font-black text-2xl text-white orange-glow group-hover:scale-105 transition-transform shrink-0">
            G
          </div>
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-orange-400 via-amber-300 to-purple-400 bg-clip-text text-transparent">
            {t.appName}
          </span>
        </button>

        {/* Action Controls Zone */}
        <div className="flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-orange-500/50 hover:bg-white/10 transition-all focus-visible:ring-2 focus-visible:ring-orange-400 cursor-pointer"
            title={isMuted ? t.soundOff : t.soundOn}
            aria-label={isMuted ? t.soundOff : t.soundOn}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Rules Button */}
          <button
            onClick={() => {
              sound.playPop(650);
              onOpenRules();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-orange-500/50 hover:bg-white/10 text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-orange-400 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">{t.rules}</span>
          </button>

          {/* Language Selector */}
          <div className="relative flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 text-slate-400 mx-1.5 hidden xs:block" />
            <button
              onClick={() => {
                sound.playPop(480);
                onLanguageChange('en');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-orange-600 text-white font-bold orange-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => {
                sound.playPop(480);
                onLanguageChange('ar');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                language === 'ar'
                  ? 'bg-orange-600 text-white font-bold orange-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              عربي
            </button>
            <button
              onClick={() => {
                sound.playPop(480);
                onLanguageChange('fr');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                language === 'fr'
                  ? 'bg-orange-600 text-white font-bold orange-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              FR
            </button>
          </div>

          {/* Home Button (Visible when inside game setup/play) */}
          {isInGame && (
            <button
              onClick={() => {
                sound.playPop(400);
                onGoHome();
              }}
              className="p-2 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-600/50 transition-all focus-visible:ring-2 focus-visible:ring-purple-400 cursor-pointer"
              title={t.backToHome}
              aria-label={t.backToHome}
            >
              <Home className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
