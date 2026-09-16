import React from 'react';
import {
  ShieldAlert,
  Eye,
  Bomb,
  Brain,
  Smile,
  Users,
  Play,
  ArrowRight,
  Sparkles,
  Zap,
  Star,
} from 'lucide-react';
import { GameDefinition } from '../../data/gamesConfig';
import { Language, GameType } from '../../types';
import { TRANSLATIONS } from '../../translations';
import { sound } from '../../utils/sound';
import { GameArtwork } from './GameArtwork';

interface GameCardProps {
  game: GameDefinition;
  language: Language;
  onSelectGame: (gameId: GameType) => void;
  featured?: boolean;
  isSelected?: boolean;
  hasActiveSelection?: boolean;
  onCardClick?: (gameId: GameType) => void;
}

const FEATURED_LABELS: Record<Language, string> = {
  en: 'FEATURED',
  ar: 'مميز',
  fr: 'VEDETTE',
  it: 'IN EVIDENZA',
  ru: 'ИЗБРАННОЕ',
  tr: 'ÖNE ÇIKAN',
  es: 'DESTACADO',
  zh: '精选',
  ko: '추천',
};

export const GameCard: React.FC<GameCardProps> = ({
  game,
  language,
  onSelectGame,
  featured = false,
  isSelected = false,
  hasActiveSelection = false,
  onCardClick,
}) => {
  const t = TRANSLATIONS[language];

  // Map icon with high visual clarity
  const renderIcon = () => {
    const iconClass = "w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]";
    switch (game.icon) {
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

  const title = (t as any)[game.titleKey] || game.titleKey;
  const tagline = (t as any)[game.cardTaglineKey] || game.cardTaglineKey;
  const badge = (t as any)[game.badgeKey] || game.badgeKey;
  const playersRange = (t as any)[game.playersKey] || game.playersKey;

  const handleLaunch = () => {
    sound.playSuccess();
    onSelectGame(game.id);
  };

  const handleCardInteraction = () => {
    if (isSelected) {
      handleLaunch();
    } else if (onCardClick) {
      sound.playPop(520);
      onCardClick(game.id);
    } else {
      handleLaunch();
    }
  };

  const isDimmed = hasActiveSelection && !isSelected;

  return (
    <div
      onClick={handleCardInteraction}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleLaunch();
        }
      }}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`${title} - ${tagline}. ${playersRange}. Mode: ${game.stats.mode}`}
      className={`group relative rounded-3xl p-5 sm:p-6 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 active:scale-[0.99] ${
        isSelected
          ? 'bg-[#0e1424] border-2 -translate-y-2 sm:-translate-y-2.5 shadow-[0_24px_55px_-6px_rgba(0,0,0,0.98)] ring-1 ring-white/20'
          : isDimmed
          ? 'bg-[#0a0f1b] border border-white/5 opacity-80 hover:opacity-100 hover:border-white/20 hover:-translate-y-1 shadow-[0_12px_28px_-8px_rgba(0,0,0,0.85)]'
          : 'bg-[#0c111e] border border-white/10 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.85)] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-8px_rgba(0,0,0,0.95)] hover:border-white/20'
      } ${
        featured ? 'min-h-[340px] sm:min-h-[360px]' : 'min-h-[320px] sm:min-h-[340px]'
      }`}
      style={{
        borderColor: isSelected ? game.accentColor : undefined,
        boxShadow: isSelected
          ? `0 24px 55px -6px rgba(0,0,0,0.98), 0 0 25px -4px ${game.accentColor}35`
          : undefined,
      }}
    >
      {/* Top Bevel Highlight Edge */}
      <div className={`absolute top-0 inset-x-0 h-px pointer-events-none transition-opacity ${isSelected ? 'bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-100' : 'bg-gradient-to-r from-transparent via-white/20 to-transparent'}`} />

      {/* Game-Specific Physical Artwork Layer */}
      <GameArtwork gameId={game.id} accentGradient={game.accentGradient} selected={isSelected} />

      {/* Top Thin Accent Filament */}
      <div
        className={`absolute top-0 left-6 right-6 h-[2px] transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`}
        style={{
          background: `linear-gradient(90deg, transparent, ${game.accentColor}, transparent)`,
        }}
      />

      {/* Top Meta Bar: Category Tag & Player Range */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        {/* Category Badge or Featured Flag */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {featured && (
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-black uppercase tracking-wider shadow-sm">
              <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
              <span>{FEATURED_LABELS[language] || 'FEATURED'}</span>
            </div>
          )}
          {isSelected && (
            <div
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm"
              style={{
                backgroundColor: `${game.accentColor}25`,
                borderColor: `${game.accentColor}60`,
                color: '#ffffff',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>{t.lockedInToPlay || 'ACTIVE'}</span>
            </div>
          )}
          <div
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border backdrop-blur-md ${game.badgeStyle}`}
          >
            <Zap className="w-2.5 h-2.5" aria-hidden="true" />
            <span>{badge}</span>
          </div>
        </div>

        {/* Players Capacity Badge */}
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-200 bg-black/70 border border-white/10 px-2.5 py-0.5 rounded-full shadow-inner shrink-0">
          <Users className="w-3 h-3 text-orange-400" aria-hidden="true" />
          <span>{playersRange}</span>
        </div>
      </div>

      {/* Visual Content Core: High-legibility info layer */}
      <div className="relative z-10 flex-1 flex flex-col justify-end mt-14 sm:mt-18">
        <div className="flex items-start gap-3.5 sm:gap-4">
          {/* Distinctive Arcade Cabinet Machine Icon Box */}
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${game.accentGradient} flex items-center justify-center shadow-lg transition-all duration-200 shrink-0 border border-white/20 ${isSelected ? 'scale-105 shadow-xl ring-2 ring-white/30' : 'group-hover:scale-105'}`}
            style={{
              boxShadow: `0 8px 20px ${game.accentColor}40`,
            }}
          >
            {renderIcon()}
          </div>

          {/* Title & Tagline */}
          <div className="flex-1 min-w-0">
            {/* Theme Tag */}
            <div className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mb-0.5">
              {game.themeTag}
            </div>

            <h3 className={`text-xl sm:text-2xl font-black transition-colors tracking-tight leading-snug truncate ${isSelected ? 'text-amber-300 drop-shadow' : 'text-white group-hover:text-amber-300'}`}>
              {title}
            </h3>

            {/* Tactile Tagline */}
            <p className="text-xs sm:text-sm font-medium text-slate-300 mt-0.5 line-clamp-2 leading-relaxed">
              {tagline}
            </p>
          </div>
        </div>

        {/* Secondary Info Chips: Game Type & Mode & Content */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border font-mono transition-colors ${isSelected ? 'text-white bg-white/15 border-white/30 shadow-sm' : 'text-slate-300 bg-black/40 border-white/10'}`}>
            {game.stats.mode}
          </span>
          <span className="text-[10px] font-bold text-slate-400 bg-black/40 px-2.5 py-0.5 rounded-md border border-white/10 font-mono">
            {game.stats.roundsOrPacks}
          </span>
        </div>
      </div>

      {/* Bottom Arcade Action Footer: Physical Actuator button */}
      <div className="relative z-10 mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
        {/* Live Status Indicator */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-orange-400 shadow-[0_0_8px_#fb923c]' : 'bg-emerald-400 shadow-[0_0_6px_#34d399]'} animate-pulse`} />
          <span className={`uppercase text-[10px] tracking-wider font-bold ${isSelected ? 'text-orange-300 font-black' : 'text-slate-300'}`}>
            {isSelected ? (t.lockedInToPlay || 'READY') : t.gameActivePill}
          </span>
        </div>

        {/* Physical Play Actuator Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleLaunch();
          }}
          className={`group/actuator relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider text-white transition-all duration-150 cursor-pointer overflow-hidden border-t border-white/30 min-h-[44px] ${
            isSelected
              ? 'scale-105 shadow-[0_5px_0_#7c2d12,0_12px_22px_rgba(234,88,12,0.4)] ring-1 ring-white/30'
              : 'shadow-[0_4px_0_#7c2d12,0_10px_20px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 hover:shadow-[0_5px_0_#7c2d12,0_14px_24px_rgba(234,88,12,0.3)]'
          } active:translate-y-1 active:shadow-[0_1px_0_#7c2d12]`}
          style={{
            background: 'linear-gradient(180deg, #ea580c 0%, #c2410c 100%)',
          }}
          aria-label={`${t.playGameBtn} ${title}`}
        >
          {/* Top Specular Edge Highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-white/40 pointer-events-none" />

          <Play className="w-3.5 h-3.5 fill-white group-hover/actuator:scale-110 transition-transform drop-shadow" aria-hidden="true" />
          <span className="drop-shadow tracking-wide">{t.playGameBtn}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/actuator:translate-x-1 transition-transform rtl:rotate-180 drop-shadow" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
