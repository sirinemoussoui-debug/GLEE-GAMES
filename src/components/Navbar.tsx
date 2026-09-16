import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Globe, HelpCircle, Home, Gamepad2, ArrowLeft, ChevronDown, Check } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { sound } from '../utils/sound';
import { KariIconMark, KariLetterA } from './common/KariLogo';

export const LANGUAGES: { code: Language; name: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'it', name: 'Italiano', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'zh', name: '中文', dir: 'ltr' },
  { code: 'ko', name: '한국어', dir: 'ltr' },
];

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenRules: () => void;
  onGoHome: () => void;
  onGoLobby: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
  currentScreen: 'landing' | 'lobby' | 'spy_game' | 'whos_most_likely' | 'word_bomb' | 'trivia' | 'emoji';
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onOpenRules,
  onGoHome,
  onGoLobby,
  isMuted,
  onToggleSound,
  currentScreen,
}) => {
  const t = TRANSLATIONS[language];
  const isInGame = !['landing', 'lobby'].includes(currentScreen);
  const isLobby = currentScreen === 'lobby';
  const isLanding = currentScreen === 'landing';

  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLangOpen(false);
      }
    };
    if (isLangOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLangOpen]);

  const activeLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-[#0b1120]/90 backdrop-blur-md border-b border-white/10 px-3 sm:px-4 py-2.5 shrink-0 transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand Zone */}
        <button
          onClick={() => {
            sound.playPop(520);
            onGoHome();
          }}
          className="flex items-center gap-2 group text-start cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-xl p-1"
          aria-label="Glee Games Home"
        >
          <KariIconMark size={36} className="group-hover:scale-105 transition-transform" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl sm:text-2xl font-black tracking-tight flex items-center bg-gradient-to-r from-orange-400 via-amber-300 to-purple-400 bg-clip-text text-transparent">
              GLEE
            </span>
            <span className="text-[10px] sm:text-xs font-black tracking-widest uppercase px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-300 border border-orange-500/30">
              {language === 'ar' ? 'غيمز' : 'GAMES'}
            </span>
          </div>
          {isLobby && (
            <div className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-slate-400 font-bold uppercase tracking-wider ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
              <span>ARCADE // 5 READY</span>
            </div>
          )}
        </button>

        {/* Action Controls Zone */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Language Selector */}
          <div ref={langDropdownRef} className="relative">
            <button
              type="button"
              onClick={() => {
                sound.playPop(500);
                setIsLangOpen(!isLangOpen);
              }}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 hover:bg-white/10 text-slate-200 hover:text-white transition-all text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 cursor-pointer"
              aria-label={t.changeLanguage}
              aria-expanded={isLangOpen}
            >
              <Globe className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              <span className="font-bold text-xs">
                {activeLangObj.name}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                  isLangOpen ? 'rotate-180 text-orange-400' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu with all 9 languages */}
            {isLangOpen && (
              <div
                className="absolute top-full mt-1.5 end-0 z-50 bg-[#0f172a] border border-white/15 rounded-xl shadow-2xl p-1 min-w-[140px] max-h-[320px] overflow-y-auto flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
                role="menu"
                aria-label="Language options"
              >
                {LANGUAGES.map((l) => {
                  const isActive = language === l.code;
                  return (
                    <button
                      key={l.code}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        sound.playPop(480);
                        onLanguageChange(l.code);
                        setIsLangOpen(false);
                      }}
                      className={`flex items-center justify-between gap-3 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer text-start ${
                        isActive
                          ? 'bg-orange-600 text-white font-bold orange-glow'
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                      dir={l.dir}
                    >
                      <span>{l.name}</span>
                      {isActive && <Check className="w-3.5 h-3.5 shrink-0 text-white" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

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
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-orange-500/50 hover:bg-white/10 text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-orange-400 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden md:inline">{t.rules}</span>
          </button>

          {/* Navigation Shortcuts depending on screen */}
          {isInGame && (
            <button
              onClick={() => {
                sound.playPop(480);
                onGoLobby();
              }}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-300 hover:text-white hover:bg-orange-500/30 text-xs font-bold transition-all cursor-pointer"
              title={t.backToLobby}
              aria-label={t.backToLobby}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">{t.backToLobby}</span>
            </button>
          )}

          {isLobby && (
            <button
              onClick={() => {
                sound.playPop(480);
                onGoHome();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 hover:border-orange-400 hover:bg-orange-500/20 text-orange-300 hover:text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:shadow-orange-500/20"
              title={t.backToLanding}
              aria-label={t.backToLanding}
            >
              <Home className="w-3.5 h-3.5 text-orange-400" />
              <span>{t.backToLanding}</span>
            </button>
          )}

          {isLanding && (
            <button
              onClick={() => {
                sound.playPop(480);
                onGoLobby();
              }}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-orange-600/30 border border-orange-500/40 text-orange-300 hover:text-white hover:bg-orange-600/50 text-xs font-bold transition-all cursor-pointer"
              title={t.exploreArcade}
              aria-label={t.exploreArcade}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">{t.exploreArcade}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
