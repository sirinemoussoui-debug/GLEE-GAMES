import { WordCategory } from '../types';
import { PLACES_CATEGORY } from './spy/places';
import { COUNTRIES_CATEGORY } from './spy/countries';
import { FOOD_CATEGORY } from './spy/food';
import { ANIMALS_CATEGORY } from './spy/animals';
import { WONDERS_CATEGORY } from './spy/wonders';
import { CINEMA_CATEGORY } from './spy/cinema';
import { ARTS_CATEGORY } from './spy/arts';
import { STUDENT_CATEGORY } from './spy/student';
import { OBJECTS_CATEGORY } from './spy/objects';

export const WORD_CATEGORIES: WordCategory[] = [
  PLACES_CATEGORY,
  COUNTRIES_CATEGORY,
  FOOD_CATEGORY,
  ANIMALS_CATEGORY,
  WONDERS_CATEGORY,
  CINEMA_CATEGORY,
  ARTS_CATEGORY,
  STUDENT_CATEGORY,
  OBJECTS_CATEGORY,
];

export const PARTY_ICEBREAKERS = {
  en: [
    'How often do people normally encounter or use this?',
    'Is this associated with a warm or a cold environment?',
    'Would you bring this on a trip or a night out with friends?',
    'Can you buy or visit this with money?',
    'Is this something loud or quiet?',
    'Does this usually stay indoors or outdoors?',
    'Have you personally experienced or seen this this week?',
    'Would you be scared or excited to encounter this right now?',
  ],
  ar: [
    'كم مرة في الأسبوع يتعامل الشخص الطبيعي مع هذا الشيء؟',
    'هل هذا الشيء يرتبط بجو حار أم بارد؟',
    'هل تأخذ هذا الشيء معك في رحلة مع أصحابك؟',
    'هل يمكنك شراء هذا أو الذهاب إليه بالمال؟',
    'هل هذا الشيء يصدر صوتاً عالياً أم هادئاً؟',
    'هل هو موجود في الداخل عادةً أم في الهواء الطلق؟',
    'هل رأيت هذا أو جربته خلال الأسبوع الحالي؟',
    'إذا ظهر أمامك الآن، هل تفرح أم تتفاجأ؟',
  ],
  fr: [
    'À quelle fréquence une personne utilise ou visite cela ?',
    'Est-ce associé à un environnement chaud ou froid ?',
    'Prendrais-tu cela lors d\'un voyage entre amis ou en soirée ?',
    'Peut-on l\'acheter ou y accéder avec de l\'argent ?',
    'Est-ce quelque chose de bruyant ou de silencieux ?',
    'Se trouve-t-il généralement à l\'intérieur ou en plein air ?',
    'L\'as-tu expérimenté ou vu cette semaine ?',
    'Serais-tu ravi ou surpris de voir cela surgir maintenant ?',
  ],
};

export const DEFAULT_AVATARS = [
  '#8B5CF6', // Purple
  '#3B82F6', // Blue
  '#F97316', // Orange
  '#EC4899', // Pink
  '#10B981', // Emerald
  '#06B6D4', // Cyan
  '#F59E0B', // Amber
  '#6366F1', // Indigo
  '#14B8A6', // Teal
  '#EF4444', // Red
];

export const PRESET_PLAYER_NAMES = {
  en: ['Alex', 'Maya', 'Sam', 'Leo', 'Nora', 'Zack', 'Elena', 'Kai'],
  ar: ['سارة', 'عمر', 'ليلى', 'كريم', 'ياسمين', 'حمزة', 'نور', 'طارق'],
  fr: ['Lucas', 'Camille', 'Antoine', 'Léa', 'Hugo', 'Inès', 'Maxime', 'Chloé'],
};
