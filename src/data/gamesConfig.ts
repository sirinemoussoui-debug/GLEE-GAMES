import { GameType } from '../types';

export interface GameDefinition {
  id: GameType;
  titleKey: string;
  cardTaglineKey: string;
  descKey: string;
  badgeKey: string;
  playersKey: string;
  minPlayers: number;
  maxPlayers: number;
  category: 'party' | 'speed' | 'trivia';
  icon: 'ShieldAlert' | 'Eye' | 'Bomb' | 'Brain' | 'Smile';
  accentGradient: string;
  borderGlow: string;
  cardBgGlow: string;
  buttonGradient: string;
  badgeStyle: string;
  themeTag: string;
  accentColor: string;
  ambientShadow: string;
  desktopSpan: string;
  stats: {
    roundsOrPacks: string;
    mode: string;
  };
}

export const GAMES_CATALOG: GameDefinition[] = [
  {
    id: 'spy',
    titleKey: 'spyGameTitle',
    cardTaglineKey: 'spyGameCardTagline',
    descKey: 'spyGameTagline',
    badgeKey: 'spyBadge',
    playersKey: 'playersRangeSpy',
    minPlayers: 2,
    maxPlayers: 10,
    category: 'party',
    icon: 'ShieldAlert',
    accentGradient: 'from-orange-500 via-amber-500 to-red-500',
    borderGlow: 'hover:border-orange-400/80 hover:shadow-[0_12px_45px_rgba(249,115,22,0.3)]',
    cardBgGlow: 'bg-orange-500/10',
    buttonGradient: 'from-orange-600 via-amber-500 to-orange-600 hover:from-orange-500 hover:to-amber-400 text-white shadow-orange-500/40',
    badgeStyle: 'bg-orange-500/20 border-orange-400/40 text-orange-300',
    themeTag: 'CLASSIFIED // DOSSIER',
    accentColor: '#f97316',
    ambientShadow: 'group-hover:shadow-orange-500/20',
    desktopSpan: 'lg:col-span-3',
    stats: {
      roundsOrPacks: '9+ Categories',
      mode: 'Social Deduction',
    },
  },
  {
    id: 'whos_most_likely',
    titleKey: 'whoMostLikelyTitle',
    cardTaglineKey: 'whosMostLikelyCardTagline',
    descKey: 'whoMostLikelyDesc',
    badgeKey: 'whoMostLikelyBadge',
    playersKey: 'playersRangeWhos',
    minPlayers: 3,
    maxPlayers: 17,
    category: 'party',
    icon: 'Eye',
    accentGradient: 'from-purple-500 via-pink-500 to-indigo-500',
    borderGlow: 'hover:border-purple-400/80 hover:shadow-[0_12px_45px_rgba(168,85,247,0.3)]',
    cardBgGlow: 'bg-purple-500/10',
    buttonGradient: 'from-purple-600 via-pink-500 to-purple-600 hover:from-purple-500 hover:to-pink-400 text-white shadow-purple-500/40',
    badgeStyle: 'bg-purple-500/20 border-purple-400/40 text-purple-300',
    themeTag: 'SOCIAL CHAOS // EXPOSED',
    accentColor: '#a855f7',
    ambientShadow: 'group-hover:shadow-purple-500/20',
    desktopSpan: 'lg:col-span-3',
    stats: {
      roundsOrPacks: '350+ Questions',
      mode: 'Anonymous Voting',
    },
  },
  {
    id: 'word_bomb',
    titleKey: 'wordBombTitle',
    cardTaglineKey: 'wordBombCardTagline',
    descKey: 'wordBombDesc',
    badgeKey: 'wordBombBadge',
    playersKey: 'playersRangeBomb',
    minPlayers: 2,
    maxPlayers: 17,
    category: 'speed',
    icon: 'Bomb',
    accentGradient: 'from-red-500 via-rose-500 to-orange-500',
    borderGlow: 'hover:border-red-400/80 hover:shadow-[0_12px_45px_rgba(239,68,68,0.3)]',
    cardBgGlow: 'bg-red-500/10',
    buttonGradient: 'from-red-600 via-rose-500 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-red-500/40',
    badgeStyle: 'bg-red-500/20 border-red-400/40 text-red-300',
    themeTag: 'T-MINUS FUSE // RAPID',
    accentColor: '#ef4444',
    ambientShadow: 'group-hover:shadow-red-500/20',
    desktopSpan: 'lg:col-span-2',
    stats: {
      roundsOrPacks: '500+ Challenges',
      mode: 'Ticking Bomb',
    },
  },
  {
    id: 'trivia',
    titleKey: 'triviaDuelTitle',
    cardTaglineKey: 'triviaDuelCardTagline',
    descKey: 'triviaDuelDesc',
    badgeKey: 'triviaDuelBadge',
    playersKey: 'playersRangeTrivia',
    minPlayers: 1,
    maxPlayers: 17,
    category: 'trivia',
    icon: 'Brain',
    accentGradient: 'from-blue-500 via-cyan-500 to-indigo-500',
    borderGlow: 'hover:border-blue-400/80 hover:shadow-[0_12px_45px_rgba(59,130,246,0.3)]',
    cardBgGlow: 'bg-blue-500/10',
    buttonGradient: 'from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-500/40',
    badgeStyle: 'bg-blue-500/20 border-blue-400/40 text-blue-300',
    themeTag: '1V1 QUIZ ARENA',
    accentColor: '#3b82f6',
    ambientShadow: 'group-hover:shadow-blue-500/20',
    desktopSpan: 'lg:col-span-2',
    stats: {
      roundsOrPacks: '345+ Questions',
      mode: 'Speed & Streak',
    },
  },
  {
    id: 'emoji',
    titleKey: 'emojiDecoderTitle',
    cardTaglineKey: 'emojiDecoderCardTagline',
    descKey: 'emojiDecoderDesc',
    badgeKey: 'emojiDecoderBadge',
    playersKey: 'playersRangeEmoji',
    minPlayers: 1,
    maxPlayers: 17,
    category: 'trivia',
    icon: 'Smile',
    accentGradient: 'from-amber-500 via-yellow-500 to-emerald-500',
    borderGlow: 'hover:border-amber-400/80 hover:shadow-[0_12px_45px_rgba(245,158,11,0.3)]',
    cardBgGlow: 'bg-amber-500/10',
    buttonGradient: 'from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-400 text-white shadow-amber-500/40',
    badgeStyle: 'bg-amber-500/20 border-amber-400/40 text-amber-300',
    themeTag: 'CIPHER MATRIX // RIDDLES',
    accentColor: '#f59e0b',
    ambientShadow: 'group-hover:shadow-amber-500/20',
    desktopSpan: 'lg:col-span-2',
    stats: {
      roundsOrPacks: '105+ Visual Riddles',
      mode: 'Solo & Party',
    },
  },
];
