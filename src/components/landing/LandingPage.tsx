import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  BookOpen,
  ArrowRight,
  Sparkles,
  Users,
  Smartphone,
  ShieldCheck,
  Flame,
  Instagram,
} from 'lucide-react';
import { Language, GameType } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { sound } from '../../utils/sound';
import { LandingBackground } from './LandingBackground';
import { GameTableau } from './GameTableau';

interface LandingPageProps {
  language: Language;
  onStartPlaying: () => void;
  onOpenRules: () => void;
  onSelectGameDirect?: (game: GameType) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  language,
  onStartPlaying,
  onOpenRules,
  onSelectGameDirect,
}) => {
  const t = TRANSLATIONS[language];

  // Parallax offset state (normalized in pixels)
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  // Cinematic "Enter the Arcade" transition state
  const [isLaunching, setIsLaunching] = useState(false);
  // Detect user preference for reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  // Check reduced motion media query on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setParallaxOffset({ x: 0, y: 0 });
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Restrained desktop mouse parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    // Disable on touch / mobile screens (< 768px)
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const { innerWidth, innerHeight } = window;
      // Normalized coordinates from -1 to 1
      const normX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const normY = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      // Max travel: ±20px horizontal, ±14px vertical (ultra-restrained depth)
      setParallaxOffset({
        x: Math.max(-20, Math.min(20, normX * 20)),
        y: Math.max(-14, Math.min(14, normY * 14)),
      });
    });
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    setParallaxOffset({ x: 0, y: 0 });
  }, []);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // START PLAYING: Tactile arcade actuator press + short cinematic transition
  const handleStartPlayingClick = () => {
    sound.playSuccess();

    if (prefersReducedMotion) {
      onStartPlaying();
      return;
    }

    // Trigger fast 220ms "ENTER THE ARCADE" transition
    setIsLaunching(true);
    setTimeout(() => {
      onStartPlaying();
    }, 220);
  };

  // Distinctive game-title headline based on language
  const headlinePart1 =
    language === 'ar'
      ? 'دَعِ '
      : language === 'fr'
      ? 'QUE LE '
      : 'LET THE ';

  const headlineHighlight =
    language === 'ar'
      ? 'الفَوْضَى'
      : language === 'fr'
      ? 'CHAOS'
      : 'CHAOS';

  const headlinePart2 =
    language === 'ar'
      ? ' تَبْدَأ.'
      : language === 'fr'
      ? ' COMMENCE.'
      : ' BEGIN.';

  const getCreatorCredit = (lang: Language) => {
    switch (lang) {
      case 'ar':
        return { prefix: 'صُنع بواسطة', suffix: '' };
      case 'fr':
        return { prefix: 'Créé par', suffix: '' };
      case 'it':
        return { prefix: 'Creato da', suffix: '' };
      case 'ru':
        return { prefix: 'Создано', suffix: '' };
      case 'tr':
        return { prefix: 'Geliştiren', suffix: '' };
      case 'es':
        return { prefix: 'Hecho por', suffix: '' };
      case 'zh':
        return { prefix: '由', suffix: '制作' };
      case 'ko':
        return { prefix: '', suffix: '제작' };
      default:
        return { prefix: 'Made by', suffix: '' };
    }
  };

  const creatorCredit = getCreatorCredit(language);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full min-h-[calc(100vh-84px)] flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-6 sm:py-10 transition-all duration-200 ${
        isLaunching ? 'opacity-20 scale-[0.98] filter brightness-75 blur-[1px]' : 'opacity-100 scale-100'
      }`}
    >
      {/* 6-Layer Cinematic Gaming Atmosphere Background with ambient breathing and subtle parallax */}
      <LandingBackground parallaxOffset={parallaxOffset} />

      {/* Main Cinematic Editorial Container (Asymmetric Desktop Layout) */}
      <div className="w-full max-w-6xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ========================================================================= */}
          {/* LEFT DECK (Editorial / Brand / Game Launcher Controls) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-start">
            
            {/* 1. Live Hardware Status Pill with subtle warm glow */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d121f]/90 border border-orange-500/30 text-xs font-mono font-bold tracking-wider mb-4 sm:mb-5 shadow-lg shadow-black/70 animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-forwards"
              style={{ animationDelay: '80ms' }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="text-orange-300 uppercase tracking-widest text-[11px]">
                PASS &amp; PLAY SOCIAL ARCADIA
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300 text-[10px] hidden sm:inline">1 SHARED SCREEN</span>
            </div>

            {/* 2. GLEE Wordmark with refined metallic typography badge */}
            <div
              className="flex items-center gap-3 select-none mb-3 sm:mb-4 animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-forwards"
              style={{ animationDelay: '160ms' }}
            >
              <div className="flex items-center font-black tracking-tight text-white leading-none text-5xl sm:text-6xl lg:text-7xl font-display">
                <span className="text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">GLEE</span>
              </div>
              <span className="text-[11px] sm:text-xs font-mono font-black tracking-[0.25em] uppercase px-3 py-1 rounded-md bg-white/5 border border-white/10 text-amber-300/90 shadow-sm self-center">
                {language === 'ar' ? 'غلي غيمز' : 'GAMES'}
              </span>
            </div>

            {/* 3. Game Title Headline: "LET THE CHAOS BEGIN." */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight uppercase leading-[1.08] max-w-xl animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-forwards"
              style={{ animationDelay: '240ms' }}
            >
              <span>{headlinePart1}</span>
              <span className="text-amber-400 drop-shadow-[0_2px_12px_rgba(245,158,11,0.35)] font-black underline decoration-orange-500/50 decoration-4 underline-offset-8">
                {headlineHighlight}
              </span>
              <span>{headlinePart2}</span>
            </h1>

            {/* 4. Short, Confident Supporting Text */}
            <p
              className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-lg mt-4 mb-6 sm:mb-7 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-forwards"
              style={{ animationDelay: '320ms' }}
            >
              {t.landingSupportingText}
            </p>

            {/* 5. Primary Game Launcher Interaction: START PLAYING Tactile Push-Button */}
            <div
              className="w-full max-w-md flex flex-col items-center lg:items-start gap-4 animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-forwards"
              style={{ animationDelay: '400ms' }}
            >
              {/* Arcade Actuator Button Chassis with dual bezel */}
              <div className="p-1 rounded-2xl bg-[#140e0a] border border-orange-500/40 shadow-[0_16px_35px_-8px_rgba(0,0,0,0.9),0_0_24px_rgba(234,88,12,0.24)] w-full sm:w-auto transition-transform duration-200">
                <button
                  onClick={handleStartPlayingClick}
                  className="group relative w-full sm:w-auto px-8 sm:px-12 py-4.5 rounded-xl font-black text-lg sm:text-xl text-white transition-all duration-150 cursor-pointer overflow-hidden shadow-[0_7px_0_#7c2d12,0_16px_28px_rgba(0,0,0,0.7)] hover:-translate-y-0.5 hover:shadow-[0_8px_0_#7c2d12,0_20px_34px_rgba(234,88,12,0.35)] active:translate-y-1.5 active:shadow-[0_1px_0_#7c2d12,0_4px_10px_rgba(0,0,0,0.6)] flex items-center justify-center gap-3.5 tracking-wider uppercase select-none"
                  style={{
                    background: 'linear-gradient(180deg, #ea580c 0%, #c2410c 60%, #9a3412 100%)',
                  }}
                  aria-label="Launch Game Lobby and Start Playing"
                >
                  {/* Specular highlight line on top edge */}
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-200/60 to-transparent pointer-events-none group-hover:via-white/70 transition-all" />

                  {/* Play Glyph Container */}
                  <div className="w-8 h-8 rounded-lg bg-black/25 flex items-center justify-center text-white border border-white/20 group-hover:scale-105 group-hover:border-white/40 transition-all">
                    <Play className="w-4 h-4 fill-white translate-x-0.5" aria-hidden="true" />
                  </div>

                  {/* Main Action Text */}
                  <span className="drop-shadow-md tracking-wider font-black">{t.startPlayingBtn}</span>

                  {/* Tactile micro-arrow */}
                  <ArrowRight className="w-5 h-5 text-amber-200 group-hover:translate-x-1 transition-transform rtl:rotate-180" aria-hidden="true" />
                </button>
              </div>

              {/* Secondary Controls: Rules & Info Strip */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mt-1">
                {/* Rules Button */}
                <button
                  onClick={() => {
                    sound.playPop(520);
                    onOpenRules();
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 hover:border-white/20 text-xs font-mono font-bold text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                  <span>{t.rules}</span>
                </button>

                {/* Direct Specs Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0c101a] border border-white/5 text-[11px] font-mono text-slate-400">
                  <Users className="w-3 h-3 text-purple-400" />
                  <span>2–17 PLAYERS</span>
                  <span className="text-slate-600">•</span>
                  <Smartphone className="w-3 h-3 text-emerald-400" />
                  <span>1 DEVICE</span>
                </div>
              </div>

              {/* 6. Quick Game Direct Launch Pills (Fast jump to any specific game cartridge) */}
              <div className="w-full pt-3 mt-1 border-t border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" />
                  GAMES:
                </span>
                <button
                  onClick={() => {
                    sound.playPop(520);
                    if (onSelectGameDirect) onSelectGameDirect('spy');
                    else onStartPlaying();
                  }}
                  className="px-2.5 py-1 rounded-md bg-orange-950/30 hover:bg-orange-950/60 border border-orange-500/25 hover:border-orange-400/50 text-[11px] font-mono font-semibold text-orange-300 hover:text-orange-200 transition-all cursor-pointer active:scale-95"
                >
                  Spy
                </button>
                <button
                  onClick={() => {
                    sound.playPop(520);
                    if (onSelectGameDirect) onSelectGameDirect('whos_most_likely');
                    else onStartPlaying();
                  }}
                  className="px-2.5 py-1 rounded-md bg-purple-950/30 hover:bg-purple-950/60 border border-purple-500/25 hover:border-purple-400/50 text-[11px] font-mono font-semibold text-purple-300 hover:text-purple-200 transition-all cursor-pointer active:scale-95"
                >
                  Most Likely
                </button>
                <button
                  onClick={() => {
                    sound.playPop(520);
                    if (onSelectGameDirect) onSelectGameDirect('word_bomb');
                    else onStartPlaying();
                  }}
                  className="px-2.5 py-1 rounded-md bg-red-950/30 hover:bg-red-950/60 border border-red-500/25 hover:border-red-400/50 text-[11px] font-mono font-semibold text-red-300 hover:text-red-200 transition-all cursor-pointer active:scale-95"
                >
                  Word Bomb
                </button>
                <button
                  onClick={() => {
                    sound.playPop(520);
                    if (onSelectGameDirect) onSelectGameDirect('trivia');
                    else onStartPlaying();
                  }}
                  className="px-2.5 py-1 rounded-md bg-blue-950/30 hover:bg-blue-950/60 border border-blue-500/25 hover:border-blue-400/50 text-[11px] font-mono font-semibold text-blue-300 hover:text-blue-200 transition-all cursor-pointer active:scale-95"
                >
                  Trivia
                </button>
                <button
                  onClick={() => {
                    sound.playPop(520);
                    if (onSelectGameDirect) onSelectGameDirect('emoji');
                    else onStartPlaying();
                  }}
                  className="px-2.5 py-1 rounded-md bg-amber-950/30 hover:bg-amber-950/60 border border-amber-500/25 hover:border-amber-400/50 text-[11px] font-mono font-semibold text-amber-300 hover:text-amber-200 transition-all cursor-pointer active:scale-95"
                >
                  Emoji
                </button>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT DECK (The GLEE Game Tableau: Unified Physical Artifacts) */}
          {/* ========================================================================= */}
          <div
            className="lg:col-span-6 w-full flex items-center justify-center mt-4 lg:mt-0 animate-in fade-in duration-400 fill-mode-forwards"
            style={{ animationDelay: '280ms' }}
          >
            <GameTableau
              language={language}
              onSelectGame={onSelectGameDirect || onStartPlaying}
              parallaxOffset={parallaxOffset}
            />
          </div>

        </div>
      </div>

      {/* Footer Creator Credit */}
      <footer className="relative z-10 w-full pt-4 pb-1 sm:pb-2 flex items-center justify-center select-none">
        <a
          href="https://www.instagram.com/black_rose000999/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 hover:bg-slate-900/90 border border-white/5 hover:border-pink-500/30 text-slate-400 hover:text-slate-200 transition-all duration-150 text-[11px] sm:text-xs font-mono group cursor-pointer shadow-sm"
          title="CHIRAZ on Instagram"
          aria-label="Made by CHIRAZ - Instagram"
        >
          <Instagram className="w-3.5 h-3.5 text-pink-400/80 group-hover:text-pink-400 group-hover:scale-110 transition-transform duration-150" />
          <span className="tracking-wide">
            {creatorCredit.prefix && <span>{creatorCredit.prefix} </span>}
            <span className="font-bold text-slate-300 group-hover:text-white transition-colors">
              CHIRAZ
            </span>
            {creatorCredit.suffix && <span> {creatorCredit.suffix}</span>}
          </span>
        </a>
      </footer>
    </div>
  );
};
