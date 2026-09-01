import { WhosMostLikelyQuestion, WhosCategoryMeta, Language } from '../types';
import { WHOS_CATEGORIES } from './most_likely/categories';
import { CAMPUS_QUESTIONS } from './most_likely/campus';
import { FUNNY_QUESTIONS } from './most_likely/funny';
import { EMBARRASSING_QUESTIONS } from './most_likely/embarrassing';
import { MYSTERIOUS_QUESTIONS } from './most_likely/mysterious';
import { BOLD_QUESTIONS } from './most_likely/bold';
import { CHAOTIC_QUESTIONS } from './most_likely/chaotic';
import { FRIENDSHIP_QUESTIONS } from './most_likely/friendship';
import { EVERYDAY_QUESTIONS } from './most_likely/everyday';
import { PERSONALITY_QUESTIONS } from './most_likely/personality';
import { ENTERTAINMENT_QUESTIONS } from './most_likely/entertainment';
import { TRAVEL_QUESTIONS } from './most_likely/travel';
import { FOOD_QUESTIONS } from './most_likely/food';
import { HYPOTHETICAL_QUESTIONS } from './most_likely/hypothetical';

export { WHOS_CATEGORIES };

// MASTER 350+ QUESTIONS DATABASE
export const WHOS_MOST_LIKELY_QUESTIONS: WhosMostLikelyQuestion[] = [
  ...CAMPUS_QUESTIONS,
  ...FUNNY_QUESTIONS,
  ...EMBARRASSING_QUESTIONS,
  ...MYSTERIOUS_QUESTIONS,
  ...BOLD_QUESTIONS,
  ...CHAOTIC_QUESTIONS,
  ...FRIENDSHIP_QUESTIONS,
  ...EVERYDAY_QUESTIONS,
  ...PERSONALITY_QUESTIONS,
  ...ENTERTAINMENT_QUESTIONS,
  ...TRAVEL_QUESTIONS,
  ...FOOD_QUESTIONS,
  ...HYPOTHETICAL_QUESTIONS,
];

/**
 * Filter questions by category (or all if 'all' is provided)
 */
export function getQuestionsByCategory(categoryId: string = 'all'): WhosMostLikelyQuestion[] {
  if (!categoryId || categoryId === 'all') {
    return WHOS_MOST_LIKELY_QUESTIONS;
  }
  return WHOS_MOST_LIKELY_QUESTIONS.filter((q) => q.category === categoryId);
}

/**
 * Get category display name
 */
export function getCategoryDisplayName(categoryId: string, lang: Language): string {
  const cat = WHOS_CATEGORIES.find((c) => c.id === categoryId);
  if (!cat) return categoryId;
  if (lang === 'ar') return cat.nameAr;
  if (lang === 'fr') return cat.nameFr;
  return cat.nameEn;
}

/**
 * Get category icon
 */
export function getCategoryIcon(categoryId: string): string {
  const cat = WHOS_CATEGORIES.find((c) => c.id === categoryId);
  return cat ? cat.icon : '✨';
}

/**
 * Intensity label & color
 */
export function getIntensityMeta(intensity: string = 'light', lang: Language = 'en'): { label: string; colorClass: string; icon: string } {
  switch (intensity) {
    case 'embarrassing':
      return {
        label: lang === 'ar' ? 'موقف محرج 😳' : lang === 'fr' ? 'Gênant 😳' : 'Awkward 😳',
        colorClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
        icon: '😳',
      };
    case 'bold':
      return {
        label: lang === 'ar' ? 'جرأة ورومانسية 🔥' : lang === 'fr' ? 'Audacieux 🔥' : 'Bold 🔥',
        colorClass: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
        icon: '🔥',
      };
    case 'chaotic':
      return {
        label: lang === 'ar' ? 'قمة الفوضى 😈' : lang === 'fr' ? 'Chaotique 😈' : 'Chaotic 😈',
        colorClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
        icon: '😈',
      };
    case 'light':
    default:
      return {
        label: lang === 'ar' ? 'خفيف وممتع 😂' : lang === 'fr' ? 'Léger & Drôle 😂' : 'Lighthearted 😂',
        colorClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
        icon: '😂',
      };
  }
}
