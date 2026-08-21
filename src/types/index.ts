export type Language = 'en' | 'ar' | 'fr';

export type GameType =
  | 'spy'
  | 'whos_most_likely'
  | 'who_most_likely'
  | 'word_bomb'
  | 'trivia'
  | 'trivia_duel'
  | 'emoji'
  | 'emoji_decoder';

export interface Player {
  id: string;
  name: string;
  avatarColor: string;
  score: number;
  isSpy?: boolean;
  hasRevealed?: boolean;
  votedFor?: string | null;
  votesReceived?: number;
  isEliminated?: boolean;
  lives?: number;
}

export interface WordItem {
  id: string;
  category: string;
  en: string;
  ar: string;
  fr: string;
  hintEn?: string;
  hintAr?: string;
  hintFr?: string;
}

export interface WordCategory {
  id: string;
  icon: string;
  nameEn: string;
  nameAr: string;
  nameFr: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionFr: string;
  words: WordItem[];
}

export type SpyGamePhase =
  | 'setup'
  | 'pass_reveal'
  | 'discussion'
  | 'voting'
  | 'spy_guess'
  | 'round_reveal'
  | 'game_over';

export interface SpyGameSettings {
  totalRounds: number;
  timerSeconds: number; // 0 for unlimited, or 60, 120, 180, 240, 300
  selectedCategories: string[];
  spyCount: number; // 1 or 2
  allowSpyGuess: boolean;
  customWords: WordItem[];
}

export interface RoundHistory {
  roundNumber: number;
  secretWord: WordItem;
  spyIds: string[];
  mostVotedPlayerId: string | null;
  spyCaught: boolean;
  spyGuessedCorrectly: boolean;
  pointsAwarded: Record<string, number>;
}

// ----------------------------------------------------
// NEW GAME 1: WHO'S MOST LIKELY TO
// ----------------------------------------------------
export interface WhosMostLikelyQuestion {
  id: string;
  category: string;
  en: string;
  ar: string;
  fr: string;
}

export type WhosMostLikelyPhase = 'setup' | 'voting' | 'results' | 'game_over';

export interface WhosMostLikelySettings {
  totalRounds: number;
  selectedCategories: string[];
  pointsPerVote: number;
}

// ----------------------------------------------------
// NEW GAME 2: WORD CHAIN BOMB
// ----------------------------------------------------
export interface WordBombCategory {
  id: string;
  icon: string;
  nameEn: string;
  nameAr: string;
  nameFr: string;
  starterWordsEn?: string[];
  starterWordsAr?: string[];
  starterWordsFr?: string[];
}

export type WordBombPhase = 'setup' | 'playing' | 'exploded' | 'game_over';

export interface WordBombSettings {
  roundTimerSeconds: number; // 10, 15, 20, 30
  totalRounds: number;
  decreaseTimerPerTurn: boolean;
}

// ----------------------------------------------------
// NEW GAME 3: CAMPUS TRIVIA DUEL
// ----------------------------------------------------
export interface TriviaQuestion {
  id: string;
  category: string;
  en: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  };
  ar: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  };
  fr: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation?: string;
  };
}

export type TriviaPhase = 'setup' | 'question' | 'reveal' | 'game_over';

export interface TriviaSettings {
  totalQuestions: number;
  timerSeconds: number; // 10, 15, 20, 30
  selectedCategories: string[];
}

// ----------------------------------------------------
// NEW GAME 4: EMOJI DECODER
// ----------------------------------------------------
export interface EmojiPuzzle {
  id: string;
  emojis: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  en: {
    answer: string;
    options: string[];
    hint?: string;
  };
  ar: {
    answer: string;
    options: string[];
    hint?: string;
  };
  fr: {
    answer: string;
    options: string[];
    hint?: string;
  };
}

export type EmojiPhase = 'setup' | 'puzzle' | 'reveal' | 'game_over';

export interface EmojiSettings {
  totalPuzzles: number;
  timerSeconds: number;
  difficulty: 'all' | 'easy' | 'medium' | 'hard';
}
