import React, { useState } from 'react';
import {
  X,
  EyeOff,
  Flame,
  Bomb,
  Brain,
  Smile,
  ShieldAlert,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { Language, GameType } from '../types';
import { TRANSLATIONS } from '../translations';
import { sound } from '../utils/sound';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];

  const [activeTab, setActiveTab] = useState<GameType>('spy');

  const gameTabs: { id: GameType; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'spy', label: t.spyGameTitle, icon: <ShieldAlert className="w-4 h-4" />, color: 'text-orange-400' },
    { id: 'whos_most_likely', label: t.whoMostLikelyTitle, icon: <Flame className="w-4 h-4" />, color: 'text-purple-400' },
    { id: 'word_bomb', label: t.wordBombTitle, icon: <Bomb className="w-4 h-4" />, color: 'text-red-400' },
    { id: 'trivia', label: t.triviaDuelTitle, icon: <Brain className="w-4 h-4" />, color: 'text-blue-400' },
    { id: 'emoji', label: t.emojiDecoderTitle, icon: <Smile className="w-4 h-4" />, color: 'text-amber-400' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#1e293b] border border-white/10 rounded-3xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl text-slate-100 focus:outline-none space-y-5"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center">
              <Award className="w-4 h-4 text-orange-400" />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">{t.rulesModalTitle}</h2>
          </div>
          <button
            onClick={() => {
              sound.playPop(450);
              onClose();
            }}
            className="p-1.5 rounded-xl bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {gameTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop(500);
                setActiveTab(tab.id);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? 'bg-white/15 text-white border border-white/20 shadow-md'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              <span className={tab.color}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Rules Content */}
        <div className="space-y-4 text-sm">
          {activeTab === 'spy' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20">
                <h3 className="font-bold text-orange-300 text-base mb-1">🎯 Spy Game Objective</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  One player is randomly chosen as the secret Spy who doesn't know the secret word. All other players receive the same secret word.
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-black text-purple-300">1. Pass & Reveal:</span> Each player privately holds the screen to see if they are Innocent or the Spy.
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-black text-orange-300">2. Interrogation & Discussion:</span> Take turns asking tricky questions to find the imposter without exposing the word.
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-black text-yellow-300">3. Voting & Spy Guess:</span> Vote for the suspect. If caught, the spy can attempt a clutch guess of the secret word (+150 pts).
                </div>
              </div>
            </div>
          )}

          {activeTab === 'whos_most_likely' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                <h3 className="font-bold text-purple-300 text-base mb-1">🔥 Who's Most Likely To</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  A hilarious group voting game (3–17 players). A spicy or funny question is shown, and everyone votes for the friend who fits best!
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-black text-purple-300">1. Read the Question:</span> Over 105+ questions across campus life, food habits, relationships, and late night chaos.
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-black text-orange-300">2. Vote & Tally:</span> Tap player avatars to cast votes.
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-black text-emerald-300">3. Reveal & Points:</span> The player with the most votes earns +100 bonus points and crowns the round!
                </div>
              </div>
            </div>
          )}

          {activeTab === 'word_bomb' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
                <h3 className="font-bold text-red-300 text-base mb-1">💣 Word Chain Bomb</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Fast-paced adrenaline challenge (2–17 players). Name a word matching the category and pass the bomb before the ticking timer explodes!
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-black text-red-300">1. Active Turn:</span> The player holding the bomb must say a valid word matching the active topic.
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-black text-yellow-300">2. Pass the Bomb:</span> Tap Pass Bomb to reset the timer and hand it to the next player. Repeating a word is prohibited!
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-black text-rose-300">3. Explosion & Lives:</span> If the timer hits zero, BOOM! The holder loses a life. Survivors earn round points.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trivia' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
                <h3 className="font-bold text-blue-300 text-base mb-1">🧠 Campus Trivia Duel</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Speed quiz showdown (2–17 players). Test your knowledge in science, world geography, history, pop-culture, and campus lore.
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-black text-blue-300">1. Rapid Timer:</span> 10–20 seconds per question with 4 multiple choice options.
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-black text-emerald-300">2. Instant Feedback:</span> Correct answers highlight with sound effects and fascinating "Did You Know?" facts.
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-black text-amber-300">3. Scoreboard:</span> Assign +100 points to the fastest brain of the round.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'emoji' && (
            <div className="space-y-3 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <h3 className="font-bold text-amber-300 text-base mb-1">😃 Emoji Decoder</h3>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Visual riddle puzzle (2–17 players). Crack the code hidden behind strings of emojis!
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-black text-amber-300">1. Decode the Icons:</span> Movies, famous proverbs, college moments, world cities, and foods.
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-black text-yellow-300">2. Need Help?</span> Tap the "Clue 💡" button to reveal a smart hint without spoiling the answer.
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1">
                  <span className="font-black text-emerald-300">3. Win Points:</span> Select the correct choice to trigger victory confetti and +100 pts.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action button */}
        <div className="pt-2">
          <button
            onClick={() => {
              sound.playPop(550);
              onClose();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-black text-sm orange-glow transition-all cursor-pointer"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
