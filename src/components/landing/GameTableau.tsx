import React from 'react';
import { ShieldAlert, Flame, Bomb, Brain, Smile, Sparkles, Check } from 'lucide-react';
import { Language, GameType } from '../../types';
import { sound } from '../../utils/sound';

interface GameTableauProps {
  language: Language;
  onSelectGame?: (game: GameType) => void;
  compact?: boolean;
  parallaxOffset?: { x: number; y: number };
}

/**
 * GameTableau:
 * A cohesive, art-directed physical game-night tableau featuring tactile artifacts
 * from the five KARI games (classified dossier, social party card, word tiles + timer,
 * trivia duel card, and emoji cipher strip).
 *
 * Phase 2 Enhancements:
 * - Restrained desktop parallax response
 * - Believable material tactile hover states (paper lift, velvet card response, wood tile sheen)
 * - Deeper, realistic contact shadows on elevation
 * - No bouncing, no spinning, 100% physical restraint
 */
export const GameTableau: React.FC<GameTableauProps> = ({
  language,
  onSelectGame,
  compact = false,
  parallaxOffset = { x: 0, y: 0 },
}) => {
  const handleItemClick = (game: GameType) => {
    sound.playPop(520);
    if (onSelectGame) {
      onSelectGame(game);
    }
  };

  // Parallax translation factors for the physical artifacts (medium depth)
  const pX = parallaxOffset.x * 0.55;
  const pY = parallaxOffset.y * 0.55;

  return (
    <div
      className={`relative w-full select-none ${
        compact ? 'max-w-md mx-auto py-2' : 'max-w-xl lg:max-w-none py-2 lg:py-0'
      }`}
      aria-label="GLEE Games Physical Game Night Artifacts"
    >
      {/* Ambient Focused Game-Table Illumination (Soft warm overhead light pool with gentle breathing) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full pointer-events-none -z-10 animate-ambient-breathe"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(234, 88, 12, 0.09) 0%, rgba(124, 58, 237, 0.06) 45%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />

      {/* ========================================================================= */}
      {/* 1. MOBILE STREAMLINED DECK (< sm) - Simplified, no overflow */}
      {/* ========================================================================= */}
      <div className="block sm:hidden w-full max-w-sm mx-auto space-y-3">
        {/* Mobile Item 1: Classified Spy Dossier Card */}
        <div
          onClick={() => handleItemClick('spy')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleItemClick('spy'); }}
          className="p-3.5 rounded-xl bg-[#0e131f] border border-orange-500/30 shadow-lg shadow-black/60 flex items-center justify-between gap-3 active:scale-[0.98] transition-transform cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-950/60 border border-orange-500/40 flex items-center justify-center text-orange-400 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="text-start">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-black uppercase text-orange-400 tracking-wider">
                  DOSSIER #048
                </span>
                <span className="px-1.5 py-0.2 rounded border border-red-500/60 text-[8px] font-mono font-bold text-red-400 bg-red-950/40">
                  TOP SECRET
                </span>
              </div>
              <div className="text-xs font-bold text-white mt-0.5">
                {language === 'ar' ? 'لعبة الجاسوس' : language === 'fr' ? 'Jeu de l’Espion' : 'The Spy Game'}
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400">2–10p →</span>
        </div>

        {/* Mobile Item 2: Who's Most Likely Party Card */}
        <div
          onClick={() => handleItemClick('whos_most_likely')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleItemClick('whos_most_likely'); }}
          className="p-3.5 rounded-xl bg-[#140e24] border border-purple-500/30 shadow-lg shadow-black/60 flex items-center justify-between gap-3 active:scale-[0.98] transition-transform cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-950/60 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div className="text-start">
              <span className="font-mono text-[9px] font-black uppercase text-purple-300 tracking-wider">
                PARTY VOTING
              </span>
              <div className="text-xs font-bold text-white mt-0.5">
                {language === 'ar' ? 'مين أكتر واحد؟' : language === 'fr' ? 'Qui est le plus...' : "Who's Most Likely"}
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400">3–17p →</span>
        </div>

        {/* Mobile Item 3: Word Bomb Tiles & Timer */}
        <div
          onClick={() => handleItemClick('word_bomb')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleItemClick('word_bomb'); }}
          className="p-3.5 rounded-xl bg-[#1a0f12] border border-red-500/30 shadow-lg shadow-black/60 flex items-center justify-between gap-3 active:scale-[0.98] transition-transform cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <Bomb className="w-5 h-5" />
            </div>
            <div className="text-start">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] font-black uppercase text-red-300 tracking-wider">
                  RAPID T-MINUS
                </span>
                <span className="px-1.5 py-0.2 rounded bg-black border border-red-500/50 text-[8px] font-mono font-bold text-red-400">
                  00:03.4
                </span>
              </div>
              <div className="text-xs font-bold text-white mt-0.5">
                {language === 'ar' ? 'قنبلة الكلمات' : language === 'fr' ? 'Bombe de Mots' : 'Word Chain Bomb'}
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400">2–17p →</span>
        </div>

        {/* Mobile Bottom Micro-Tags */}
        <div className="pt-1 flex items-center justify-center gap-3 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1 text-blue-400">
            <Brain className="w-3 h-3" /> Trivia Duel
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-amber-400">
            <Smile className="w-3 h-3" /> Emoji Decoder
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP & TABLET CINEMATIC TABLEAU (>= sm) */}
      {/* ========================================================================= */}
      <div
        className="hidden sm:flex relative w-full min-h-[420px] md:min-h-[460px] items-center justify-center transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translate3d(${pX}px, ${pY}px, 0)`,
        }}
      >
        
        {/* 1. SPY GAME: Classified Dossier File Card (Back Left) */}
        <div
          onClick={() => handleItemClick('spy')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleItemClick('spy'); }}
          className="absolute top-2 left-2 sm:left-4 md:left-6 w-[220px] sm:w-[245px] p-4 rounded-xl bg-[#0e131f] border border-orange-500/30 shadow-[0_20px_35px_-10px_rgba(0,0,0,0.85),0_0_1px_1px_rgba(249,115,22,0.15)] -rotate-6 hover:-rotate-3 hover:-translate-y-2 hover:shadow-[0_32px_50px_-10px_rgba(0,0,0,0.95),0_0_16px_rgba(249,115,22,0.2)] hover:border-orange-400/60 transition-all duration-200 cursor-pointer group z-10"
          title="Spy Game: Classified Dossier"
        >
          {/* Paperclip illusion in corner with subtle metallic glint */}
          <div className="absolute -top-3 right-6 w-3 h-8 rounded-full border-2 border-slate-400/50 bg-slate-800/80 -rotate-12 shadow-sm pointer-events-none group-hover:border-slate-300/80 transition-colors" />

          {/* Dossier Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2.5">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-orange-400/90">
                DOSSIER // TOP SECRET
              </span>
            </div>
            <span className="font-mono text-[8px] text-slate-400">#048-SPY</span>
          </div>

          {/* Red Ink Confidential Stamp with slight angle settle on hover */}
          <div className="my-1 flex items-center justify-between">
            <span className="inline-block px-2 py-0.5 border border-red-500/70 rounded text-[9px] font-mono font-black text-red-400 tracking-wider rotate-[-3deg] group-hover:rotate-0 bg-red-950/40 transition-transform">
              CONFIDENTIAL
            </span>
            <span className="text-[10px] font-mono text-slate-300 font-bold">2–10 PLAYERS</span>
          </div>

          {/* Redacted Mission Text Lines */}
          <div className="space-y-1.5 mt-2.5 font-mono text-[10px] text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[8px] uppercase">STATUS:</span>
              <span className="text-orange-300 font-bold">1 IMPOSTER</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-400 text-[8px] uppercase">LOC:</span>
              <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[9px] text-slate-300">
                SPACE STATION
              </span>
            </div>
            <div className="flex items-center gap-1 pt-0.5">
              <span className="text-slate-400 text-[8px] uppercase">TARGET:</span>
              <span className="bg-black/90 text-transparent select-none px-2 rounded">
                █████████
              </span>
            </div>
          </div>

          {/* Micro subtle prompt */}
          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-orange-400/80 group-hover:text-orange-300">
            <span>UNMASK THE SPY</span>
            <span className="group-hover:translate-x-1 transition-transform rtl:rotate-180">→</span>
          </div>
        </div>

        {/* 2. WHO'S MOST LIKELY TO: Velvet Party Card (Top Right) */}
        <div
          onClick={() => handleItemClick('whos_most_likely')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleItemClick('whos_most_likely'); }}
          className="absolute top-4 right-2 sm:right-4 md:right-6 w-[210px] sm:w-[235px] p-4 rounded-xl bg-[#140e24] border border-purple-500/30 shadow-[0_20px_35px_-10px_rgba(0,0,0,0.85),0_0_1px_1px_rgba(168,85,247,0.15)] rotate-4 hover:rotate-1 hover:-translate-y-2 hover:shadow-[0_32px_50px_-10px_rgba(0,0,0,0.95),0_0_16px_rgba(168,85,247,0.2)] hover:border-purple-400/60 transition-all duration-200 cursor-pointer group z-20"
          title="Who's Most Likely To: Party Voting Card"
        >
          {/* Card Header with Party Badge */}
          <div className="flex items-center justify-between pb-2 border-b border-purple-500/20 mb-2">
            <div className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-mono text-[9px] font-black uppercase tracking-wider text-purple-300">
                PARTY VOTING CARD
              </span>
            </div>
            <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-900/60 text-purple-300 border border-purple-500/30">
              ROUND 04
            </span>
          </div>

          {/* Card Question Text */}
          <p className="font-bold text-xs sm:text-sm text-slate-100 leading-snug my-2 group-hover:text-amber-100 transition-colors">
            "Who is most likely to start laughing during a serious moment?"
          </p>

          {/* Chalk Ink Player Vote Tokens */}
          <div className="mt-3 flex items-center gap-1.5 pt-2 border-t border-purple-500/15">
            <span className="text-[8px] font-mono text-purple-400 uppercase">VOTES:</span>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/40">
              Maya (3)
            </span>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-200 border border-pink-400/30">
              Alex (1)
            </span>
          </div>
        </div>

        {/* 3. WORD CHAIN BOMB: Letter Tiles + Countdown Timer (Foreground Left) */}
        <div
          onClick={() => handleItemClick('word_bomb')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleItemClick('word_bomb'); }}
          className="absolute bottom-10 left-4 sm:left-10 md:left-14 p-3.5 rounded-xl bg-[#1a0f12] border border-red-500/30 shadow-[0_22px_40px_-10px_rgba(0,0,0,0.9),0_0_1px_1px_rgba(239,68,68,0.2)] -rotate-2 hover:rotate-0 hover:-translate-y-2 hover:shadow-[0_34px_55px_-10px_rgba(0,0,0,0.95),0_0_20px_rgba(239,68,68,0.22)] hover:border-red-400/60 transition-all duration-200 cursor-pointer group z-30"
          title="Word Chain Bomb: Tactile Letter Tiles & Timer"
        >
          {/* Header with Fuse Spark */}
          <div className="flex items-center justify-between gap-3 mb-2 pb-1.5 border-b border-red-500/20">
            <div className="flex items-center gap-1.5">
              <Bomb className="w-3.5 h-3.5 text-red-400" />
              <span className="font-mono text-[9px] font-black uppercase tracking-widest text-red-300">
                T-MINUS FUSE
              </span>
            </div>
            {/* Digital countdown pill with active pulse */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/80 border border-red-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-mono text-[10px] font-black text-red-400 tracking-wider">
                00:03.4
              </span>
            </div>
          </div>

          {/* Physical Scrabble Letter Tiles (B - O - M - B) with micro tactile elevation */}
          <div className="flex items-center gap-1.5 my-1.5">
            <div className="w-8 h-9 rounded-lg bg-[#271518] border border-red-500/40 shadow-md flex flex-col items-center justify-center text-white font-black text-sm relative group-hover:border-red-400 group-hover:-translate-y-0.5 transition-all duration-150">
              <span>B</span>
              <span className="absolute bottom-0.5 right-1 text-[7px] font-mono text-red-400/80">3</span>
            </div>
            <div className="w-8 h-9 rounded-lg bg-[#271518] border border-red-500/40 shadow-md flex flex-col items-center justify-center text-white font-black text-sm relative group-hover:border-red-400 group-hover:-translate-y-0.5 transition-all duration-150 delay-[40ms]">
              <span>O</span>
              <span className="absolute bottom-0.5 right-1 text-[7px] font-mono text-red-400/80">1</span>
            </div>
            <div className="w-8 h-9 rounded-lg bg-[#271518] border border-red-500/40 shadow-md flex flex-col items-center justify-center text-white font-black text-sm relative group-hover:border-red-400 group-hover:-translate-y-0.5 transition-all duration-150 delay-[80ms]">
              <span>M</span>
              <span className="absolute bottom-0.5 right-1 text-[7px] font-mono text-red-400/80">3</span>
            </div>
            <div className="w-8 h-9 rounded-lg bg-[#271518] border border-red-500/40 shadow-md flex flex-col items-center justify-center text-white font-black text-sm relative group-hover:border-red-400 group-hover:-translate-y-0.5 transition-all duration-150 delay-[120ms]">
              <span>B</span>
              <span className="absolute bottom-0.5 right-1 text-[7px] font-mono text-red-400/80">3</span>
            </div>
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[8px] font-mono text-slate-400">
            <span>RULE: ENDS WITH "B"</span>
            <span className="text-red-400 font-bold">PASS PHONE!</span>
          </div>
        </div>

        {/* 4. CAMPUS TRIVIA DUEL: Arena Duel Card (Foreground Right) */}
        <div
          onClick={() => handleItemClick('trivia')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleItemClick('trivia'); }}
          className="absolute bottom-6 right-2 sm:right-6 md:right-10 w-[210px] sm:w-[230px] p-3.5 rounded-xl bg-[#0c1424] border border-blue-500/30 shadow-[0_20px_35px_-10px_rgba(0,0,0,0.85),0_0_1px_1px_rgba(59,130,246,0.15)] rotate-3 hover:rotate-0 hover:-translate-y-2 hover:shadow-[0_30px_50px_-10px_rgba(0,0,0,0.95),0_0_16px_rgba(59,130,246,0.2)] hover:border-blue-400/60 transition-all duration-200 cursor-pointer group z-25"
          title="Campus Trivia Duel: 1v1 Quiz Card"
        >
          {/* Card Header */}
          <div className="flex items-center justify-between pb-1.5 border-b border-blue-500/20 mb-2">
            <div className="flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-mono text-[9px] font-black uppercase tracking-wider text-blue-300">
                1V1 DUEL ARENA
              </span>
            </div>
            <span className="text-[8px] font-mono text-slate-400">STREAK: 4🔥</span>
          </div>

          {/* Question Text */}
          <p className="font-bold text-xs text-slate-100 leading-snug mb-2">
            "Which element has the chemical symbol Au?"
          </p>

          {/* Duel Answer Chips */}
          <div className="space-y-1 text-[10px]">
            <div className="flex items-center justify-between px-2 py-1 rounded bg-blue-500/20 border border-blue-400/40 text-blue-200 font-bold group-hover:border-blue-400/70 transition-colors">
              <span>A: Gold</span>
              <Check className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="flex items-center justify-between px-2 py-1 rounded bg-white/5 text-slate-400">
              <span>B: Silver</span>
            </div>
          </div>
        </div>

        {/* 5. EMOJI DECODER: Mysterious Cipher Strip (Center Floating Overlay) */}
        <div
          onClick={() => handleItemClick('emoji')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') handleItemClick('emoji'); }}
          className="absolute top-[44%] left-[46%] -translate-x-1/2 -translate-y-1/2 px-3.5 py-2.5 rounded-xl bg-[#1a140a] border border-amber-500/40 shadow-[0_25px_45px_-10px_rgba(0,0,0,0.9),0_0_1px_1px_rgba(245,158,11,0.2)] rotate-[-7deg] hover:rotate-[-3deg] hover:-translate-y-2 hover:shadow-[0_35px_55px_-10px_rgba(0,0,0,0.95),0_0_20px_rgba(245,158,11,0.25)] hover:border-amber-400/80 transition-all duration-200 cursor-pointer group z-40"
          title="Emoji Decoder: Cipher Strip"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm sm:text-base font-black">
              <span>👑</span>
              <span className="text-amber-400 font-mono text-xs">+</span>
              <span>🦁</span>
              <span className="text-amber-400 font-mono text-xs">=</span>
              <span className="w-5 h-5 rounded bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 text-xs font-mono font-black group-hover:border-amber-400 group-hover:text-amber-200 transition-colors">
                ?
              </span>
            </div>
            <div className="border-l border-amber-500/20 pl-2 text-start">
              <div className="text-[8px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                CIPHER #042
              </div>
              <div className="text-[9px] font-bold text-slate-300">
                The Lion King
              </div>
            </div>
          </div>
        </div>

        {/* 6. PHYSICAL DETAILS: Tactile Velvet Enamel Game Token (subtle individual parallax) */}
        <div
          className="absolute top-28 left-[38%] w-5 h-5 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 border border-purple-200/40 shadow-[0_6px_12px_rgba(0,0,0,0.7)] flex items-center justify-center text-[8px] text-white font-black z-15 pointer-events-none transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `translate3d(${pX * 0.3}px, ${pY * 0.3}px, 0)`,
          }}
        >
          ★
        </div>
      </div>

      {/* Ambient bottom hint */}
      <div className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] font-mono text-slate-400">
        <Sparkles className="w-3 h-3 text-amber-400/80" />
        <span>PASS &amp; PLAY ON 1 DEVICE • NO SETUP NEEDED</span>
      </div>
    </div>
  );
};
