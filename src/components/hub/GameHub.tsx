import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Flame,
  Zap,
  Brain,
  HelpCircle,
  History,
  Play,
  ArrowRight,
  Users,
  Smartphone,
  X,
  ShieldAlert,
  Eye,
  Bomb,
  Smile,
  Sparkles,
} from 'lucide-react';
import { GAMES_CATALOG } from '../../data/gamesConfig';
import { GameCard } from './GameCard';
import { HubBackground } from './HubBackground';
import { Language, GameType } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { sound } from '../../utils/sound';

interface GameHubProps {
  language: Language;
  onSelectGame: (gameType: GameType) => void;
  onBackToLanding: () => void;
  onOpenRules: () => void;
}

type CategoryType = 'all' | 'party' | 'speed' | 'trivia';

export const GameHub: React.FC<GameHubProps> = ({
  language,
  onSelectGame,
  onOpenRules,
}) => {
  const t = TRANSLATIONS[language];
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [selectedGameId, setSelectedGameId] = useState<GameType | null>(null);
  const [lastPlayedId, setLastPlayedId] = useState<GameType | null>(null);

  // Read last played game from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kari_last_played_game');
      if (saved && GAMES_CATALOG.some((g) => g.id === saved)) {
        setLastPlayedId(saved as GameType);
      }
    } catch {
      // Ignore storage errors in private/sandboxed modes
    }
  }, []);

  const handleGameSelect = (gameId: GameType) => {
    try {
      localStorage.setItem('kari_last_played_game', gameId);
    } catch {
      // Ignore storage errors
    }
    onSelectGame(gameId);
  };

  const lastPlayedGame = lastPlayedId
    ? GAMES_CATALOG.find((g) => g.id === lastPlayedId)
    : null;

  const activeGame = selectedGameId
    ? GAMES_CATALOG.find((g) => g.id === selectedGameId)
    : null;

  const filteredGames = GAMES_CATALOG.filter((game) => {
    if (activeCategory === 'all') return true;
    return game.category === activeCategory;
  });

  const getCategoryCount = (category: CategoryType) => {
    if (category === 'all') return GAMES_CATALOG.length;
    return GAMES_CATALOG.filter((g) => g.category === category).length;
  };

  // Render appropriate machine icon for the active stage
  const renderActiveIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]";
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className={iconClass} aria-hidden="true" />;
      case 'Eye':
        return <Eye className={iconClass} aria-hidden="true" />;
      case 'Bomb':
        return <Bomb className={iconClass} aria-hidden="true" />;
      case 'Brain':
        return <Brain className={iconClass} aria-hidden="true" />;
      case 'Smile':
        return <Smile className={iconClass} aria-hidden="true" />;
      default:
        return <Sparkles className={iconClass} aria-hidden="true" />;
    }
  };

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center animate-in fade-in duration-300 pb-16 px-3 sm:px-4">
      {/* Immersive Arcade Room Atmospheric Background responding to selected cabinet */}
      <HubBackground activeGameId={selectedGameId} />

      {/* Main Header & Title Section */}
      <header className="w-full max-w-4xl text-center pt-3 sm:pt-6 pb-6 sm:pb-8 flex flex-col items-center">
        {/* Subtle Arcade Location / Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c111e]/90 border border-white/10 text-orange-300 text-xs font-mono font-bold tracking-wider mb-4 shadow-lg shadow-black/60">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="tracking-widest uppercase">
            {language === 'ar' ? 'صالة غلي • ٥ ألعاب جاهزة' : language === 'fr' ? 'ARCADE GLEE • 5 JEUX PRÊTS' : 'GLEE ARCADE • 5 GAMES READY'}
          </span>
          <span className="text-white/20">•</span>
          <span className="text-slate-400 font-sans font-semibold">PASS &amp; PLAY</span>
        </div>

        {/* Main Title: CHOOSE YOUR GAME */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-md">
          {t.gameHubTitle}
        </h1>

        {/* Supporting text: Pick a game. Gather your friends. Let the chaos begin. */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto mt-2.5 font-medium leading-relaxed">
          {t.gameHubSubtitle}
        </p>

        {/* Scalable Arcade Console Category Selector */}
        <div
          role="tablist"
          aria-label="Game categories"
          className="w-full max-w-2xl mt-6 p-1.5 rounded-2xl bg-[#090d18] border border-white/10 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.8)] flex flex-wrap items-center justify-center gap-1 sm:gap-2"
        >
          {/* ALL GAMES SWITCH */}
          <button
            role="tab"
            aria-selected={activeCategory === 'all'}
            onClick={() => {
              sound.playPop(480);
              setActiveCategory('all');
            }}
            className={`flex-1 min-w-[130px] sm:min-w-[140px] flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-150 cursor-pointer active:translate-y-0.5 ${
              activeCategory === 'all'
                ? 'bg-gradient-to-b from-[#ea580c] to-[#c2410c] text-white shadow-[0_4px_0_#7c2d12,0_8px_16px_rgba(234,88,12,0.3)] border-t border-white/30 translate-y-[-1px]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Gamepad2 className={`w-4 h-4 ${activeCategory === 'all' ? 'text-white' : 'text-orange-400'}`} aria-hidden="true" />
            <span>{t.allGamesFilter}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                activeCategory === 'all'
                  ? 'bg-black/30 text-white font-bold'
                  : 'bg-white/5 text-slate-400'
              }`}
            >
              {getCategoryCount('all')}
            </span>
          </button>

          {/* PARTY & SOCIAL SWITCH */}
          <button
            role="tab"
            aria-selected={activeCategory === 'party'}
            onClick={() => {
              sound.playPop(520);
              setActiveCategory('party');
            }}
            className={`flex-1 min-w-[130px] sm:min-w-[140px] flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-150 cursor-pointer active:translate-y-0.5 ${
              activeCategory === 'party'
                ? 'bg-gradient-to-b from-[#9333ea] to-[#7e22ce] text-white shadow-[0_4px_0_#581c87,0_8px_16px_rgba(147,51,234,0.3)] border-t border-white/30 translate-y-[-1px]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Flame className={`w-4 h-4 ${activeCategory === 'party' ? 'text-white' : 'text-purple-400'}`} aria-hidden="true" />
            <span>{t.partyCategory}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                activeCategory === 'party'
                  ? 'bg-black/30 text-white font-bold'
                  : 'bg-white/5 text-slate-400'
              }`}
            >
              {getCategoryCount('party')}
            </span>
          </button>

          {/* FAST & REFLEX SWITCH */}
          <button
            role="tab"
            aria-selected={activeCategory === 'speed'}
            onClick={() => {
              sound.playPop(520);
              setActiveCategory('speed');
            }}
            className={`flex-1 min-w-[130px] sm:min-w-[140px] flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-150 cursor-pointer active:translate-y-0.5 ${
              activeCategory === 'speed'
                ? 'bg-gradient-to-b from-[#dc2626] to-[#b91c1c] text-white shadow-[0_4px_0_#7f1d1d,0_8px_16px_rgba(220,38,38,0.3)] border-t border-white/30 translate-y-[-1px]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Zap className={`w-4 h-4 ${activeCategory === 'speed' ? 'text-white' : 'text-red-400'}`} aria-hidden="true" />
            <span>{t.speedCategory}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                activeCategory === 'speed'
                  ? 'bg-black/30 text-white font-bold'
                  : 'bg-white/5 text-slate-400'
              }`}
            >
              {getCategoryCount('speed')}
            </span>
          </button>

          {/* BRAIN & QUIZ SWITCH */}
          <button
            role="tab"
            aria-selected={activeCategory === 'trivia'}
            onClick={() => {
              sound.playPop(520);
              setActiveCategory('trivia');
            }}
            className={`flex-1 min-w-[130px] sm:min-w-[140px] flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-150 cursor-pointer active:translate-y-0.5 ${
              activeCategory === 'trivia'
                ? 'bg-gradient-to-b from-[#2563eb] to-[#1d4ed8] text-white shadow-[0_4px_0_#1e3a8a,0_8px_16px_rgba(37,99,235,0.3)] border-t border-white/30 translate-y-[-1px]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Brain className={`w-4 h-4 ${activeCategory === 'trivia' ? 'text-white' : 'text-blue-400'}`} aria-hidden="true" />
            <span>{t.triviaCategory}</span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                activeCategory === 'trivia'
                  ? 'bg-black/30 text-white font-bold'
                  : 'bg-white/5 text-slate-400'
              }`}
            >
              {getCategoryCount('trivia')}
            </span>
          </button>
        </div>
      </header>

      {/* Main Arcade Experience Content */}
      <main className="w-full max-w-5xl">
        {/* ACTIVE CABINET MARQUEE STAGE (Appears when a game is selected) */}
        {activeGame && (
          <div
            className="w-full mb-6 p-4 sm:p-5 rounded-3xl bg-[#0d1222] border-2 shadow-[0_20px_45px_-10px_rgba(0,0,0,0.95)] relative overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-top-3"
            style={{
              borderColor: activeGame.accentColor,
              boxShadow: `0 20px 45px -10px rgba(0,0,0,0.95), 0 0 35px -6px ${activeGame.accentColor}40`,
            }}
          >
            {/* Top specular edge highlight */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
              {/* Left: Active Cabinet Identity */}
              <div className="flex items-start sm:items-center gap-3.5">
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${activeGame.accentGradient} flex items-center justify-center shadow-lg shrink-0 border border-white/20`}
                  style={{
                    boxShadow: `0 6px 20px ${activeGame.accentColor}55`,
                  }}
                >
                  {renderActiveIcon(activeGame.icon)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span
                      className="text-[9px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded border"
                      style={{
                        backgroundColor: `${activeGame.accentColor}25`,
                        borderColor: `${activeGame.accentColor}60`,
                        color: '#ffffff',
                      }}
                    >
                      {t.lockedInToPlay || 'ACTIVE CABINET'}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                      {activeGame.themeTag}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {(t as any)[activeGame.titleKey] || activeGame.titleKey}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-1 font-medium mt-0.5">
                    {(t as any)[activeGame.cardTaglineKey] || (t as any)[activeGame.descKey]}
                  </p>
                </div>
              </div>

              {/* Right: Specs & Instant Launch Actuator */}
              <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-white/10 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200 bg-black/70 border border-white/10 px-3 py-1.5 rounded-xl shadow-inner">
                    <Users className="w-3.5 h-3.5 text-orange-400" />
                    <span>{(t as any)[activeGame.playersKey] || activeGame.playersKey}</span>
                  </div>
                  <div className="text-[11px] font-mono font-bold text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-xl">
                    {activeGame.stats.mode}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedGameId(null)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                    aria-label="Deselect game"
                    title="Deselect"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playSuccess();
                      handleGameSelect(activeGame.id);
                    }}
                    className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-white shadow-[0_4px_0_#7c2d12,0_12px_22px_rgba(234,88,12,0.4)] hover:-translate-y-0.5 active:translate-y-1 active:shadow-[0_1px_0_#7c2d12] transition-all cursor-pointer border-t border-white/30"
                    style={{
                      background: 'linear-gradient(180deg, #ea580c 0%, #c2410c 100%)',
                    }}
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{t.playGameBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RECENTLY PLAYED / JUMP BACK IN ACTUATOR (Only rendered if user has played a game and no game is currently selected) */}
        {lastPlayedGame && !activeGame && (
          <div className="w-full mb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="p-3 sm:p-4 rounded-2xl bg-[#0b101c] border border-orange-500/35 shadow-[0_12px_28px_rgba(0,0,0,0.7)] flex flex-wrap items-center justify-between gap-3 relative overflow-hidden">
              {/* Subtle orange accent line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-500/15 border border-orange-500/35 flex items-center justify-center text-orange-400 shrink-0 shadow-inner">
                  <History className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-orange-400 uppercase">
                    <span>{t.jumpBackIn || 'JUMP BACK IN'}</span>
                    <span className="text-white/20">•</span>
                    <span className="text-slate-400 font-sans">{t.lastPlayed || 'LAST PLAYED'}</span>
                  </div>
                  <div className="text-sm sm:text-base font-black text-white">
                    {(t as any)[lastPlayedGame.titleKey] || lastPlayedGame.titleKey}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  sound.playSuccess();
                  handleGameSelect(lastPlayedGame.id);
                }}
                className="group inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-white shadow-[0_3px_0_#7c2d12,0_8px_16px_rgba(234,88,12,0.25)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_#7c2d12] transition-all cursor-pointer border-t border-white/30"
                style={{
                  background: 'linear-gradient(180deg, #ea580c 0%, #c2410c 100%)',
                }}
              >
                <Play className="w-3 h-3 fill-white" />
                <span>{t.resumeGame || 'RESUME'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" />
              </button>
            </div>
          </div>
        )}

        {/* Shared Party Pass & Play Reminder Strip */}
        <div className="w-full mb-6 p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-300 font-bold">{t.partyEntryTitle || 'ONE DEVICE. ONE PARTY. 5 GAMES.'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-slate-400">{t.partyEntrySubtitle || 'PASS & PLAY 2–17 PLAYERS • 100% IN-BROWSER'}</span>
          </div>
        </div>

        {/* Game Grid Container */}
        {activeCategory === 'all' ? (
          /* Scalable Arcade Asymmetric Wall Grid (2 Flagship Marquees + 3 Pod Machines) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 sm:gap-6">
            {filteredGames.map((game, index) => {
              // 2 Flagship Marquees take 3 cols each (50% on lg), remainder take 2 cols each (33.3% on lg)
              const colClass = index < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
              const isSelected = selectedGameId === game.id;
              return (
                <div key={game.id} className={`col-span-1 md:col-span-1 ${colClass}`}>
                  <GameCard
                    game={game}
                    language={language}
                    onSelectGame={handleGameSelect}
                    featured={index < 2}
                    isSelected={isSelected}
                    hasActiveSelection={selectedGameId !== null}
                    onCardClick={(id) => {
                      if (selectedGameId === id) {
                        handleGameSelect(id);
                      } else {
                        setSelectedGameId(id);
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          /* Filtered Category Grid */
          <div
            className={`grid gap-5 sm:gap-6 ${
              filteredGames.length === 1
                ? 'grid-cols-1 max-w-xl mx-auto'
                : 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
            }`}
          >
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                language={language}
                onSelectGame={handleGameSelect}
                featured={false}
                isSelected={selectedGameId === game.id}
                hasActiveSelection={selectedGameId !== null}
                onCardClick={(id) => {
                  if (selectedGameId === id) {
                    handleGameSelect(id);
                  } else {
                    setSelectedGameId(id);
                  }
                }}
              />
            ))}
          </div>
        )}

        {/* Bottom Arcade Terminal Dock & Pass & Play Reminder */}
        <footer className="mt-12 p-5 sm:p-6 rounded-3xl bg-[#0c111e]/85 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-orange-500/10 border border-orange-500/25 flex items-center justify-center text-orange-400 shrink-0 shadow-inner">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-black text-white">
                {language === 'ar' ? 'جاهزون لليلة ألعاب حماسية؟' : language === 'fr' ? 'Prêts pour une soirée épique ?' : 'Ready for an Epic Game Night?'}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-0.5 font-medium">
                {language === 'ar'
                  ? 'جميع الألعاب مجانية بالكامل، تعمل في المتصفح، وتدعم اللعب الجماعي على جهاز واحد.'
                  : language === 'fr'
                  ? "Tous les jeux sont 100% gratuits, sans téléchargement et se jouent à plusieurs sur un seul écran."
                  : 'All games are 100% free, run in browser, and support pass & play on one shared screen.'}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop(560);
              onOpenRules();
            }}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-orange-400/50 text-xs sm:text-sm font-bold text-white transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm active:translate-y-0.5"
          >
            <HelpCircle className="w-4 h-4 text-orange-400 group-hover:rotate-12 transition-transform" />
            <span>{t.rules}</span>
          </button>
        </footer>
      </main>
    </div>
  );
};
