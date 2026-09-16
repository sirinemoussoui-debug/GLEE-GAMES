import { TriviaQuestion } from '../types';
import { SCIENCE_QUESTIONS } from './trivia/science';
import { BIOLOGY_QUESTIONS } from './trivia/biology';
import { MEDICINE_QUESTIONS } from './trivia/medicine';
import { PHYSICS_QUESTIONS } from './trivia/physics';
import { CHEMISTRY_QUESTIONS } from './trivia/chemistry';
import { SPACE_QUESTIONS } from './trivia/space';
import { HISTORY_QUESTIONS } from './trivia/history';
import { GEOGRAPHY_QUESTIONS } from './trivia/geography';
import { SPORTS_QUESTIONS } from './trivia/sports';
import { ARTS_QUESTIONS } from './trivia/arts';
import { CINEMA_QUESTIONS } from './trivia/cinema';
import { TECHNOLOGY_QUESTIONS } from './trivia/technology';
import { CULTURE_QUESTIONS } from './trivia/culture';

export {
  SCIENCE_QUESTIONS,
  BIOLOGY_QUESTIONS,
  MEDICINE_QUESTIONS,
  PHYSICS_QUESTIONS,
  CHEMISTRY_QUESTIONS,
  SPACE_QUESTIONS,
  HISTORY_QUESTIONS,
  GEOGRAPHY_QUESTIONS,
  SPORTS_QUESTIONS,
  ARTS_QUESTIONS,
  CINEMA_QUESTIONS,
  TECHNOLOGY_QUESTIONS,
  CULTURE_QUESTIONS,
};

export interface TriviaCategoryMeta {
  id: string;
  nameEn: string;
  nameAr: string;
  nameFr: string;
  icon: string;
  count: number;
}

export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  ...SCIENCE_QUESTIONS,
  ...BIOLOGY_QUESTIONS,
  ...MEDICINE_QUESTIONS,
  ...PHYSICS_QUESTIONS,
  ...CHEMISTRY_QUESTIONS,
  ...SPACE_QUESTIONS,
  ...HISTORY_QUESTIONS,
  ...GEOGRAPHY_QUESTIONS,
  ...SPORTS_QUESTIONS,
  ...ARTS_QUESTIONS,
  ...CINEMA_QUESTIONS,
  ...TECHNOLOGY_QUESTIONS,
  ...CULTURE_QUESTIONS,
];

export const TRIVIA_CATEGORIES: TriviaCategoryMeta[] = [
  { id: 'all', nameEn: 'All Categories', nameAr: 'جميع التصنيفات', nameFr: 'Toutes les catégories', icon: '🌟', count: TRIVIA_QUESTIONS.length },
  { id: 'science', nameEn: 'Science & Nature', nameAr: 'العلوم والطبيعة', nameFr: 'Sciences & Nature', icon: '🔬', count: SCIENCE_QUESTIONS.length },
  { id: 'biology', nameEn: 'Biology & Living World', nameAr: 'علم الأحياء والكائنات', nameFr: 'Biologie & Vivant', icon: '🧬', count: BIOLOGY_QUESTIONS.length },
  { id: 'medicine', nameEn: 'Medicine & Health', nameAr: 'الطب وصحة الإنسان', nameFr: 'Médecine & Santé', icon: '🩺', count: MEDICINE_QUESTIONS.length },
  { id: 'physics', nameEn: 'Physics & Energy', nameAr: 'الفيزياء والطاقة', nameFr: 'Physique & Énergie', icon: '⚡', count: PHYSICS_QUESTIONS.length },
  { id: 'chemistry', nameEn: 'Chemistry & Elements', nameAr: 'الكيمياء والعناصر', nameFr: 'Chimie & Éléments', icon: '⚗️', count: CHEMISTRY_QUESTIONS.length },
  { id: 'space', nameEn: 'Space & Astronomy', nameAr: 'الفضاء والفلك', nameFr: 'Espace & Astronomie', icon: '🪐', count: SPACE_QUESTIONS.length },
  { id: 'history', nameEn: 'History & Civilization', nameAr: 'التاريخ والحضارات', nameFr: 'Histoire & Civilisations', icon: '🏛️', count: HISTORY_QUESTIONS.length },
  { id: 'geography', nameEn: 'Geography & World', nameAr: 'الجغرافيا ودول العالم', nameFr: 'Géographie & Monde', icon: '🌍', count: GEOGRAPHY_QUESTIONS.length },
  { id: 'sports', nameEn: 'Sports & Olympics', nameAr: 'الرياضة والأولمبياد', nameFr: 'Sports & Jeux Olympiques', icon: '🏆', count: SPORTS_QUESTIONS.length },
  { id: 'arts', nameEn: 'Arts & Literature', nameAr: 'الفنون والأدب العالمي', nameFr: 'Arts & Littérature', icon: '🎨', count: ARTS_QUESTIONS.length },
  { id: 'cinema', nameEn: 'Cinema & Pop Culture', nameAr: 'السينما وصناعة الأفلام', nameFr: 'Cinéma & Pop-Culture', icon: '🎬', count: CINEMA_QUESTIONS.length },
  { id: 'technology', nameEn: 'Technology & Computing', nameAr: 'التقنية وعلوم الحاسوب', nameFr: 'Technologie & Informatique', icon: '💻', count: TECHNOLOGY_QUESTIONS.length },
  { id: 'culture', nameEn: 'General Culture & Heritage', nameAr: 'الثقافة العامة والتراث', nameFr: 'Culture Générale & Patrimoine', icon: '📚', count: CULTURE_QUESTIONS.length },
];

export function getQuestionsByCategory(category: string): TriviaQuestion[] {
  if (!category || category === 'all') {
    return TRIVIA_QUESTIONS;
  }
  return TRIVIA_QUESTIONS.filter((q) => q.category.toLowerCase() === category.toLowerCase());
}

export function shuffleQuestionOptions(q: TriviaQuestion): TriviaQuestion {
  const indices = [0, 1, 2, 3];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const oldCorrect = q.en.correctIndex;
  const newCorrect = indices.indexOf(oldCorrect);

  return {
    ...q,
    en: {
      ...q.en,
      options: indices.map((idx) => q.en.options[idx]),
      correctIndex: newCorrect,
    },
    ar: {
      ...q.ar,
      options: indices.map((idx) => q.ar.options[idx]),
      correctIndex: newCorrect,
    },
    fr: {
      ...q.fr,
      options: indices.map((idx) => q.fr.options[idx]),
      correctIndex: newCorrect,
    },
  };
}

export function getRandomQuestions(count: number, category: string = 'all', excludeIds: string[] = []): TriviaQuestion[] {
  const pool = getQuestionsByCategory(category).filter((q) => !excludeIds.includes(q.id));
  const candidatePool = pool.length >= count ? pool : getQuestionsByCategory(category);
  
  // Fisher-Yates shuffle
  const shuffled = [...candidatePool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count).map(shuffleQuestionOptions);
}
