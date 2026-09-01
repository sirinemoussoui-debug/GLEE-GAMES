import { WordBombCategory, WordBombChallenge } from '../types';
import {
  ALL_WORD_BOMB_CHALLENGES,
  WORD_BOMB_THEMES,
  WordBombSelector,
  getChallengesByCategory,
} from './word_bomb';

export {
  ALL_WORD_BOMB_CHALLENGES,
  WORD_BOMB_THEMES,
  WordBombSelector,
  getChallengesByCategory,
};

// Backward-compatible category array mapping
export const WORD_BOMB_CATEGORIES: WordBombCategory[] = WORD_BOMB_THEMES;
