import { WordBombCategory, WordBombChallenge } from '../../types';
import { WORD_BOMB_THEMES } from './categories';
import { ANIMALS_CHALLENGES } from './animals';
import { GEOGRAPHY_CHALLENGES } from './geography';
import { FOOD_DRINKS_CHALLENGES } from './food_drinks';
import { MOVIES_TV_CHALLENGES } from './movies_tv';
import { GAMING_CHALLENGES } from './gaming';
import { SPORTS_CHALLENGES } from './sports';
import { MUSIC_CHALLENGES } from './music';
import { BOOKS_AUTHORS_CHALLENGES } from './books_authors';
import { SCIENCE_CHALLENGES } from './science';
import { TECHNOLOGY_CHALLENGES } from './technology';
import { UNIVERSITY_CHALLENGES } from './university';
import { EVERYDAY_CHALLENGES } from './everyday';
import { PLACES_LANDMARKS_CHALLENGES } from './places_landmarks';
import { CELEBRITIES_POPCULTURE_CHALLENGES } from './celebrities_popculture';
import { CHAOTIC_FUNNY_CHALLENGES } from './chaotic_funny';
import { LETTER_CHALLENGES } from './letter_challenges';
import { EXPANDED_PACK_CHALLENGES } from './expanded_pack';

// Systematic multi-letter challenge generator for rich coverage across categories
function generateProceduralLetterChallenges(): WordBombChallenge[] {
  const lettersEn = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'V', 'W'];
  const lettersAr = ['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ر', 'ز', 'س', 'ش', 'ص', 'ط', 'ع', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'ي'];
  const lettersFr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'V'];

  const categoryConfigs: {
    id: string;
    icon: string;
    promptEnPattern: (l: string) => string;
    promptArPattern: (l: string) => string;
    promptFrPattern: (l: string) => string;
  }[] = [
    {
      id: 'animals',
      icon: '🐾',
      promptEnPattern: (l) => `Name an animal starting with the letter (${l})`,
      promptArPattern: (l) => `اذكر اسم حيوان أو طائر يبدأ بحرف (${l})`,
      promptFrPattern: (l) => `Nomme un animal commençant par la lettre (${l})`,
    },
    {
      id: 'geography',
      icon: '🌍',
      promptEnPattern: (l) => `Name a country, capital, or famous city starting with (${l})`,
      promptArPattern: (l) => `اذكر دولة، عاصمة أو مدينة مشهورة تبدأ بحرف (${l})`,
      promptFrPattern: (l) => `Nomme un pays, capitale ou grande ville commençant par (${l})`,
    },
    {
      id: 'food_drinks',
      icon: '🍕',
      promptEnPattern: (l) => `Name a dish, fruit, snack, or drink starting with (${l})`,
      promptArPattern: (l) => `اذكر أكلة، فاكهة، وجبة خفيفة أو مشروب يبدأ بحرف (${l})`,
      promptFrPattern: (l) => `Nomme un plat, fruit, aliment ou boisson commençant par (${l})`,
    },
    {
      id: 'movies_tv',
      icon: '🎬',
      promptEnPattern: (l) => `Name a movie, TV show, or cinema character starting with (${l})`,
      promptArPattern: (l) => `اذكر فيلماً، مسلسلاً أو شخصية سينمائية تبدأ بحرف (${l})`,
      promptFrPattern: (l) => `Nomme un film, série ou personnage de cinéma commençant par (${l})`,
    },
    {
      id: 'gaming',
      icon: '🎮',
      promptEnPattern: (l) => `Name a video game or gaming character starting with (${l})`,
      promptArPattern: (l) => `اذكر لعبة فيديو أو شخصية ألعاب تبدأ بحرف (${l})`,
      promptFrPattern: (l) => `Nomme un jeu vidéo ou personnage de jeu commençant par (${l})`,
    },
    {
      id: 'sports',
      icon: '⚽',
      promptEnPattern: (l) => `Name a sport, athlete, or sports club starting with (${l})`,
      promptArPattern: (l) => `اذكر رياضة، لاعباً، أو نادياً رياضياً يبدأ بحرف (${l})`,
      promptFrPattern: (l) => `Nomme un sport, athlète ou club sportif commençant par (${l})`,
    },
    {
      id: 'music',
      icon: '🎵',
      promptEnPattern: (l) => `Name a singer, band, or musical instrument starting with (${l})`,
      promptArPattern: (l) => `اذكر مغنياً، فرقة موسيقية، أو آلة عزف تبدأ بحرف (${l})`,
      promptFrPattern: (l) => `Nomme un chanteur, groupe ou instrument de musique commençant par (${l})`,
    },
    {
      id: 'science',
      icon: '🔬',
      promptEnPattern: (l) => `Name a science concept, planet, or body organ starting with (${l})`,
      promptArPattern: (l) => `اذكر مصطلحاً علمياً، كوكباً، أو عضواً في الجسم يبدأ بحرف (${l})`,
      promptFrPattern: (l) => `Nomme un concept scientifique, planète ou organe commençant par (${l})`,
    },
    {
      id: 'technology',
      icon: '💻',
      promptEnPattern: (l) => `Name a tech company, app, device, or programming term starting with (${l})`,
      promptArPattern: (l) => `اذكر شركة تقنية، تطبيقاً، جهازاً، أو لغة برمجة تبدأ بحرف (${l})`,
      promptFrPattern: (l) => `Nomme une marque tech, appli, appareil ou terme informatique commençant par (${l})`,
    },
    {
      id: 'university',
      icon: '🎓',
      promptEnPattern: (l) => `Name a study major, classroom object, or campus thing starting with (${l})`,
      promptArPattern: (l) => `اذكر تخصصاً دراسياً، أداة صفية، أو شيئاً في الجامعة يبدأ بحرف (${l})`,
      promptFrPattern: (l) => `Nomme une filière d'études, fourniture ou chose du campus commençant par (${l})`,
    },
    {
      id: 'everyday',
      icon: '🏠',
      promptEnPattern: (l) => `Name an everyday household object or clothing item starting with (${l})`,
      promptArPattern: (l) => `اذكر غرضاً من أغراض المنزل أو قطعة ملابس تبدأ بحرف (${l})`,
      promptFrPattern: (l) => `Nomme un objet de la maison ou vêtement commençant par (${l})`,
    },
    {
      id: 'celebrities_popculture',
      icon: '🌟',
      promptEnPattern: (l) => `Name a famous person, historical icon, or hero starting with (${l})`,
      promptArPattern: (l) => `اذكر شخصية مشهورة، قائداً تاريخياً، أو بطلاً خارقاً يبدأ بحرف (${l})`,
      promptFrPattern: (l) => `Nomme une célébrité, figure historique ou héros commençant par (${l})`,
    },
  ];

  const procedural: WordBombChallenge[] = [];

  categoryConfigs.forEach((cfg, catIdx) => {
    // Generate 20 distinct letter prompts per category
    for (let i = 0; i < 20; i++) {
      const letEn = lettersEn[i % lettersEn.length];
      const letAr = lettersAr[i % lettersAr.length];
      const letFr = lettersFr[i % lettersFr.length];
      const diff = i % 3 === 0 ? 'easy' : i % 3 === 1 ? 'medium' : 'hard';

      procedural.push({
        id: `wcb_proc_${cfg.id}_${i + 1}`,
        category: cfg.id,
        difficulty: diff,
        icon: cfg.icon,
        letterEn: letEn,
        letterAr: letAr,
        letterFr: letFr,
        promptEn: cfg.promptEnPattern(letEn),
        promptAr: cfg.promptArPattern(letAr),
        promptFr: cfg.promptFrPattern(letFr),
      });
    }
  });

  return procedural;
}

// Combine all sets into a master list of 500+ challenges
const ALL_BASE_CHALLENGES: WordBombChallenge[] = [
  ...ANIMALS_CHALLENGES,
  ...GEOGRAPHY_CHALLENGES,
  ...FOOD_DRINKS_CHALLENGES,
  ...MOVIES_TV_CHALLENGES,
  ...GAMING_CHALLENGES,
  ...SPORTS_CHALLENGES,
  ...MUSIC_CHALLENGES,
  ...BOOKS_AUTHORS_CHALLENGES,
  ...SCIENCE_CHALLENGES,
  ...TECHNOLOGY_CHALLENGES,
  ...UNIVERSITY_CHALLENGES,
  ...EVERYDAY_CHALLENGES,
  ...PLACES_LANDMARKS_CHALLENGES,
  ...CELEBRITIES_POPCULTURE_CHALLENGES,
  ...CHAOTIC_FUNNY_CHALLENGES,
  ...LETTER_CHALLENGES,
  ...EXPANDED_PACK_CHALLENGES,
  ...generateProceduralLetterChallenges(),
];

// Deduplicate by ID
const uniqueChallengeMap = new Map<string, WordBombChallenge>();
ALL_BASE_CHALLENGES.forEach((ch) => {
  if (!uniqueChallengeMap.has(ch.id)) {
    uniqueChallengeMap.set(ch.id, ch);
  }
});

export const ALL_WORD_BOMB_CHALLENGES: WordBombChallenge[] = Array.from(uniqueChallengeMap.values());

// Export themes
export { WORD_BOMB_THEMES };

// Helper: Get challenges by category
export function getChallengesByCategory(categoryId: string): WordBombChallenge[] {
  if (!categoryId || categoryId === 'all') {
    return ALL_WORD_BOMB_CHALLENGES;
  }
  return ALL_WORD_BOMB_CHALLENGES.filter((c) => c.category === categoryId);
}

// Smart Anti-Repetition Selector
export class WordBombSelector {
  private static recentChallengeIds: string[] = [];
  private static maxHistory = 80;

  public static getNextChallenge(
    categoryId: string = 'all',
    forcedDifficulty?: 'easy' | 'medium' | 'hard'
  ): WordBombChallenge {
    let pool = getChallengesByCategory(categoryId);
    if (pool.length === 0) {
      pool = ALL_WORD_BOMB_CHALLENGES;
    }

    // Filter out recently played challenges
    const unplayedPool = pool.filter((c) => !this.recentChallengeIds.includes(c.id));
    const activeCandidates = unplayedPool.length > 5 ? unplayedPool : pool;

    let filtered = activeCandidates;
    if (forcedDifficulty) {
      const withDiff = activeCandidates.filter((c) => c.difficulty === forcedDifficulty);
      if (withDiff.length > 0) filtered = withDiff;
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    const selected = filtered[randomIndex] || pool[0];

    // Push to history
    this.recentChallengeIds.push(selected.id);
    if (this.recentChallengeIds.length > this.maxHistory) {
      this.recentChallengeIds.shift();
    }

    return selected;
  }

  public static resetHistory(): void {
    this.recentChallengeIds = [];
  }
}
