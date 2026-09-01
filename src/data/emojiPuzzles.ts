import { EmojiPuzzle, Language } from '../types';
import { KDRAMA_EMOJI_PUZZLES } from './emoji/kdramas';
import { SONG_EMOJI_PUZZLES } from './emoji/songs';
import { COUNTRY_EMOJI_PUZZLES } from './emoji/countries';
import { PLACE_EMOJI_PUZZLES } from './emoji/places';
import { SPORT_EMOJI_PUZZLES } from './emoji/sports';
import { GAME_EMOJI_PUZZLES } from './emoji/games';
import { MOVIE_EMOJI_PUZZLES } from './emoji/movies';
import { TV_SERIES_EMOJI_PUZZLES } from './emoji/tv_series';
import { BOOK_EMOJI_PUZZLES } from './emoji/books';
import { FAMOUS_PEOPLE_EMOJI_PUZZLES } from './emoji/famous_people';
import { FOOD_EMOJI_PUZZLES } from './emoji/food';
import { ANIMAL_EMOJI_PUZZLES } from './emoji/animals';
import { CULTURE_EMOJI_PUZZLES } from './emoji/culture';

export interface EmojiCategoryMeta {
  id: string;
  icon: string;
  nameEn: string;
  nameAr: string;
  nameFr: string;
  descEn: string;
  descAr: string;
  descFr: string;
  badgeColor: string;
}

export const EMOJI_CATEGORIES: EmojiCategoryMeta[] = [
  {
    id: 'all',
    icon: '✨',
    nameEn: 'Mixed / All Categories',
    nameAr: 'مكس / جميع الأقسام',
    nameFr: 'Mix / Toutes Catégories',
    descEn: 'Unpredictable variety across all themes and worlds',
    descAr: 'تحدي شامل ومتنوع يجمع كل المجالات في جولة واحدة',
    descFr: 'Une variété dynamique mêlant tous les univers',
    badgeColor: 'from-amber-500 to-orange-500',
  },
  {
    id: 'kdramas',
    icon: '🇰🇷',
    nameEn: 'K-Dramas',
    nameAr: 'دراما كورية (K-Drama)',
    nameFr: 'K-Dramas Coréens',
    descEn: 'Iconic Korean dramas, viral hits, and romantic sagas',
    descAr: 'أشهر المسلسلات الكورية والرومانسية وألعاب الإثارة',
    descFr: 'Les séries coréennes cultes et succès internationaux',
    badgeColor: 'from-pink-500 to-rose-500',
  },
  {
    id: 'movies',
    icon: '🎬',
    nameEn: 'Movies & Cinema',
    nameAr: 'أفلام وسينما عالمية',
    nameFr: 'Films & Cinéma',
    descEn: 'Legendary blockbusters, animations, and movie classics',
    descAr: 'أفلام هوليوود والأنيميشن والتحف السينمائية الكلاسيكية',
    descFr: 'Grands classiques du cinéma et succès d\'animation',
    badgeColor: 'from-indigo-500 to-blue-500',
  },
  {
    id: 'tv_series',
    icon: '📺',
    nameEn: 'TV Series',
    nameAr: 'مسلسلات تلفزيونية',
    nameFr: 'Séries Télévisées',
    descEn: 'Binge-worthy shows, sitcoms, and dark thrillers',
    descAr: 'أعظم مسلسلات الدراما والكوميديا والإثارة العالمية',
    descFr: 'Les séries cultes, comédies et polars captivants',
    badgeColor: 'from-purple-500 to-violet-500',
  },
  {
    id: 'songs',
    icon: '🎵',
    nameEn: 'Songs & Music Hits',
    nameAr: 'أغاني وموسيقى عالمية وعربية',
    nameFr: 'Musiques & Hits',
    descEn: 'Chart-topping songs, pop classics, and legendary melodies',
    descAr: 'أشهر الأغاني العربية والعالمية والكلاسيكيات الخالدة',
    descFr: 'Tubes planétaires, classiques pop et refrains cultes',
    badgeColor: 'from-teal-500 to-emerald-500',
  },
  {
    id: 'games',
    icon: '🎮',
    nameEn: 'Video Games',
    nameAr: 'ألعاب فيديو وجيمنج',
    nameFr: 'Jeux Vidéo & Gaming',
    descEn: 'Epic gaming franchises, horror survival, and sandbox worlds',
    descAr: 'ألعاب البلايستيشن والكمبيوتر والمغامرات والرعب التفاعلي',
    descFr: 'Grandes sagas du jeu vidéo, survie et mondes ouverts',
    badgeColor: 'from-emerald-500 to-green-500',
  },
  {
    id: 'countries',
    icon: '🌍',
    nameEn: 'Countries & Flags',
    nameAr: 'دول وعواصم وثقافات',
    nameFr: 'Pays & Drapeaux',
    descEn: 'Nations, cultural landmarks, and world geographies',
    descAr: 'بلدان العالم وأعلامها ومميزاتها الجغرافية والتراثية',
    descFr: 'Nations du monde, traditions et repères géographiques',
    badgeColor: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'places',
    icon: '🏛️',
    nameEn: 'Places & Landmarks',
    nameAr: 'معالم وأماكن مشهورة',
    nameFr: 'Monuments & Lieux',
    descEn: 'Wonders of the world, historic architecture, and towers',
    descAr: 'عجائب الدنيا السبع والصروح التاريخية وناطحات السحاب',
    descFr: 'Merveilles du monde, grands monuments et cités antiques',
    badgeColor: 'from-yellow-500 to-amber-600',
  },
  {
    id: 'sports',
    icon: '⚽',
    nameEn: 'Sports & Athletes',
    nameAr: 'رياضة وأساطير الملاعب',
    nameFr: 'Sports & Athlètes',
    descEn: 'Football legends, Olympic champions, and racing events',
    descAr: 'أساطير كرة القدم والألعاب الأولمبية ومسابقات السرعة',
    descFr: 'Légendes du football, champions olympiques et records',
    badgeColor: 'from-orange-500 to-red-500',
  },
  {
    id: 'books',
    icon: '📚',
    nameEn: 'Books & Literature',
    nameAr: 'كتب وروايات شهيرة',
    nameFr: 'Livres & Littérature',
    descEn: 'Classic novels, modern fantasy, and bestselling stories',
    descAr: 'روايات أسامة المسلم، أحمد آل حمدان، والروائع العالمية',
    descFr: 'Romans célèbres, fantasy moderne et chefs-d\'œuvre littéraires',
    badgeColor: 'from-amber-600 to-yellow-600',
  },
  {
    id: 'famous_people',
    icon: '🧠',
    nameEn: 'Famous People & Minds',
    nameAr: 'شخصيات تاريخية وعلماء',
    nameFr: 'Personnalités & Savants',
    descEn: 'Visionary scientists, historical leaders, and world creators',
    descAr: 'علماء غيروا التاريخ ورواد الأعمال والقادة والمكتشفون',
    descFr: 'Génies de la science, grands dirigeants et inventeurs',
    badgeColor: 'from-sky-500 to-indigo-500',
  },
  {
    id: 'food',
    icon: '🍕',
    nameEn: 'Food & Cuisine',
    nameAr: 'أكلات ومطابخ العالم',
    nameFr: 'Gastronomie & Cuisine',
    descEn: 'Delicious street food, international staples, and national dishes',
    descAr: 'أشهى الأطباق العربية والآسيوية والإيطالية والمأكولات الشعبية',
    descFr: 'Délices du monde, plats nationaux et street food incontournable',
    badgeColor: 'from-red-500 to-rose-600',
  },
  {
    id: 'animals',
    icon: '🦁',
    nameEn: 'Animals & Wildlife',
    nameAr: 'حيوانات وحياة برية',
    nameFr: 'Animaux & Faune',
    descEn: 'Fascinating creatures, exotic fauna, and wild instincts',
    descAr: 'مملكة الحيوان والكائنات النادرة وأسرار الطبيعة البرية',
    descFr: 'Créatures fascinantes, animaux sauvages et records naturels',
    badgeColor: 'from-lime-500 to-emerald-600',
  },
  {
    id: 'culture',
    icon: '💡',
    nameEn: 'General Culture & Inventions',
    nameAr: 'ثقافة عامة واختراعات',
    nameFr: 'Culture Générale & Sciences',
    descEn: 'Human innovations, world history, and science milestones',
    descAr: 'أعظم اختراعات البشرية والمحطات العلمية والتقاليد العالمية',
    descFr: 'Inventions humaines, découvertes scientifiques et histoire',
    badgeColor: 'from-fuchsia-500 to-purple-600',
  },
];

export const EMOJI_PUZZLES: EmojiPuzzle[] = [
  ...KDRAMA_EMOJI_PUZZLES,
  ...SONG_EMOJI_PUZZLES,
  ...COUNTRY_EMOJI_PUZZLES,
  ...PLACE_EMOJI_PUZZLES,
  ...SPORT_EMOJI_PUZZLES,
  ...GAME_EMOJI_PUZZLES,
  ...MOVIE_EMOJI_PUZZLES,
  ...TV_SERIES_EMOJI_PUZZLES,
  ...BOOK_EMOJI_PUZZLES,
  ...FAMOUS_PEOPLE_EMOJI_PUZZLES,
  ...FOOD_EMOJI_PUZZLES,
  ...ANIMAL_EMOJI_PUZZLES,
  ...CULTURE_EMOJI_PUZZLES,
];

/**
 * Shuffles options for a puzzle and returns localized question data
 * with equal A, B, C, D random distribution of the correct answer.
 */
export function shuffleEmojiOptions(puzzle: EmojiPuzzle, lang: Language) {
  const localized = puzzle[lang] || puzzle.en;
  const originalOptions = [...localized.options];
  const correctAnswer = localized.answer;

  // Verify correct answer is in options, fallback if needed
  if (!originalOptions.some(opt => opt.toLowerCase().trim() === correctAnswer.toLowerCase().trim())) {
    originalOptions[0] = correctAnswer;
  }

  // Fisher-Yates shuffle
  const shuffled = [...originalOptions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const correctIndex = shuffled.findIndex(
    opt => opt.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
  );

  return {
    emojis: puzzle.emojis,
    category: puzzle.category,
    difficulty: puzzle.difficulty,
    answer: correctAnswer,
    options: shuffled,
    correctIndex: correctIndex >= 0 ? correctIndex : 0,
    explanation: localized.explanation || localized.hint || '',
    hint: localized.hint || localized.explanation || '',
  };
}
