import React from 'react';
import { ShieldAlert, Flame, Bomb, Brain, Smile, Check } from 'lucide-react';
import { GameType } from '../../types';

interface GameArtworkProps {
  gameId: GameType;
  accentGradient: string;
  selected?: boolean;
}

/**
 * GameArtwork:
 * Art-directed physical game artifacts tailored specifically to each game:
 * - Spy Game: Classified Case File Dossier with paperclip, top-secret stamp & redacted text
 * - Who's Most Likely To: Velvet Party Voting Card with social dilemma & player vote tokens
 * - Word Chain Bomb: Wooden Scrabble Letter Tiles & Rapid Digital Countdown Timer
 * - Campus Trivia Duel: Head-to-Head 1v1 Quiz Duel Arena with opposing answer choices
 * - Emoji Decoder: Encrypted Emoji Equation Cipher Strip with decryption matrix
 */
export const GameArtwork: React.FC<GameArtworkProps> = ({ gameId, selected = false }) => {
  switch (gameId) {
    /* ========================================================================= */
    /* 1. SPY GAME: Classified Dossier / Top Secret Case File                     */
    /* ========================================================================= */
    case 'spy':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl select-none">
          {/* Deep stealth atmospheric gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-950/20 via-slate-950/60 to-slate-950/95" />

          {/* Tactical blueprint grid */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(to right, #f97316 1px, transparent 1px), linear-gradient(to bottom, #f97316 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />

          {/* Paperclip in corner */}
          <div className={`absolute top-2 right-12 w-2.5 h-7 rounded-full border-2 border-slate-400/40 bg-slate-800/80 -rotate-12 shadow-sm pointer-events-none transition-colors ${selected ? 'border-orange-400/70' : 'group-hover:border-slate-300/70'}`} />

          {/* Dossier Code Stamp */}
          <div className={`absolute top-3.5 right-3.5 flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 border text-[9px] font-mono font-bold transition-colors ${selected ? 'border-orange-500/60 text-orange-300' : 'border-orange-500/30 text-orange-400'}`}>
            <ShieldAlert className="w-2.5 h-2.5 text-orange-400" />
            <span>CASE #048</span>
          </div>

          {/* Physical Classified Dossier Slip (Mid-card watermark illusion) */}
          <div className={`absolute top-14 right-4 w-[160px] p-2.5 rounded-lg bg-[#0e131f]/90 border border-orange-500/20 shadow-lg transition-transform duration-300 ${selected ? 'rotate-0 scale-105 border-orange-500/40 ring-1 ring-orange-500/20' : 'rotate-2 group-hover:rotate-0'}`}>
            {/* Red Confidential Ink Stamp */}
            <div className="flex items-center justify-between pb-1 border-b border-white/5">
              <span className="text-[8px] font-mono font-black text-red-400 border border-red-500/60 px-1 rounded bg-red-950/40">
                CONFIDENTIAL
              </span>
              <span className="text-[7px] font-mono text-slate-400">IMPOSTER: 1</span>
            </div>
            {/* Redacted lines */}
            <div className="mt-1.5 space-y-1 font-mono text-[8px] text-slate-300">
              <div className="flex items-center gap-1">
                <span className="text-slate-400 text-[7px]">LOC:</span>
                <span className="text-orange-300 font-bold">SPACE STATION</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-slate-400 text-[7px]">KEY:</span>
                <span className="bg-black/90 text-transparent select-none px-1 rounded">
                  ████████
                </span>
              </div>
            </div>
          </div>

          {/* Ambient Warm Corner Radial */}
          <div className={`absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-orange-600/10 blur-3xl transition-all duration-500 ${selected ? 'bg-orange-600/25 scale-110' : 'group-hover:bg-orange-600/20'}`} />
        </div>
      );

    /* ========================================================================= */
    /* 2. WHO'S MOST LIKELY TO: Velvet Party Voting Card                          */
    /* ========================================================================= */
    case 'whos_most_likely':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl select-none">
          {/* Party Violet Atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/25 via-slate-950/60 to-slate-950/95" />

          {/* Directional Party Lamp Beam */}
          <div className={`absolute -top-10 left-1/3 w-48 h-60 bg-gradient-to-b from-purple-500/15 via-pink-500/10 to-transparent rotate-12 blur-2xl transition-colors duration-500 ${selected ? 'from-purple-500/30' : 'group-hover:from-purple-500/25'}`} />

          {/* Round Tag */}
          <div className={`absolute top-3.5 right-3.5 flex items-center gap-1 px-2 py-0.5 rounded bg-purple-950/60 border text-[9px] font-mono font-bold transition-colors ${selected ? 'border-purple-400/60 text-purple-200' : 'border-purple-500/40 text-purple-300'}`}>
            <Flame className="w-2.5 h-2.5 text-purple-400" />
            <span>VOTE ROUND 04</span>
          </div>

          {/* Party Question Dilemma Card (Mid-card physical slip) */}
          <div className={`absolute top-14 right-4 w-[170px] p-2.5 rounded-xl bg-[#140e24]/90 border border-purple-500/25 shadow-lg transition-transform duration-300 ${selected ? 'rotate-0 scale-105 border-purple-500/40 ring-1 ring-purple-500/20' : '-rotate-2 group-hover:rotate-0'}`}>
            <p className="text-[10px] font-bold text-slate-200 leading-snug line-clamp-2">
              "Who is most likely to text their ex after midnight?"
            </p>
            {/* Player Vote Badges */}
            <div className="mt-2 pt-1 border-t border-purple-500/20 flex items-center gap-1">
              <span className="text-[7px] font-mono text-purple-400 uppercase">VOTES:</span>
              <span className="text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
                Sam (3)
              </span>
              <span className="text-[8px] font-bold px-1.5 py-0.2 rounded-full bg-pink-500/20 text-pink-200 border border-pink-400/30">
                You (1)
              </span>
            </div>
          </div>

          {/* Violet Ambient Radial */}
          <div className={`absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-purple-600/10 blur-3xl transition-all duration-500 ${selected ? 'bg-purple-600/25 scale-110' : 'group-hover:bg-purple-600/20'}`} />
        </div>
      );

    /* ========================================================================= */
    /* 3. WORD CHAIN BOMB: Wooden Letter Tiles + Rapid Countdown Timer            */
    /* ========================================================================= */
    case 'word_bomb':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl select-none">
          {/* Ticking Hazard Red Atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/25 via-slate-950/60 to-slate-950/95" />

          {/* Digital 7-Segment Countdown Timer with Live Ticking Indicator */}
          <div className={`absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-black/80 border shadow-inner transition-colors ${selected ? 'border-red-500/60' : 'border-red-500/40'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span className="font-mono text-[10px] font-black text-red-400 tracking-wider">
              00:03.4
            </span>
          </div>

          {/* Scrabble Wooden Letter Tiles (B - O - M - B) */}
          <div className={`absolute top-14 right-4 p-2 rounded-xl bg-[#1a0f12]/90 border border-red-500/25 shadow-lg transition-transform duration-300 ${selected ? 'rotate-0 scale-105 border-red-500/40 ring-1 ring-red-500/20' : '-rotate-1 group-hover:rotate-0'}`}>
            <div className="flex items-center gap-1">
              <div className="w-6 h-7 rounded bg-[#271518] border border-red-500/40 flex flex-col items-center justify-center text-white font-black text-xs relative">
                <span>B</span>
                <span className="absolute bottom-0 right-0.5 text-[6px] font-mono text-red-400/80">3</span>
              </div>
              <div className="w-6 h-7 rounded bg-[#271518] border border-red-500/40 flex flex-col items-center justify-center text-white font-black text-xs relative">
                <span>O</span>
                <span className="absolute bottom-0 right-0.5 text-[6px] font-mono text-red-400/80">1</span>
              </div>
              <div className="w-6 h-7 rounded bg-[#271518] border border-red-500/40 flex flex-col items-center justify-center text-white font-black text-xs relative">
                <span>M</span>
                <span className="absolute bottom-0 right-0.5 text-[6px] font-mono text-red-400/80">3</span>
              </div>
              <div className="w-6 h-7 rounded bg-[#271518] border border-red-500/40 flex flex-col items-center justify-center text-white font-black text-xs relative">
                <span>B</span>
                <span className="absolute bottom-0 right-0.5 text-[6px] font-mono text-red-400/80">3</span>
              </div>
            </div>
            <div className="mt-1 flex items-center justify-between text-[7px] font-mono text-slate-400">
              <span>STARTS WITH "B"</span>
              <span className="text-red-400 font-bold">PASS!</span>
            </div>
          </div>

          {/* Thermal Red Corner Radial */}
          <div className={`absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-red-600/10 blur-3xl transition-all duration-500 ${selected ? 'bg-red-600/25 scale-110' : 'group-hover:bg-red-600/20'}`} />
        </div>
      );

    /* ========================================================================= */
    /* 4. CAMPUS TRIVIA DUEL: 1v1 Quiz Arena Card                                 */
    /* ========================================================================= */
    case 'trivia':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl select-none">
          {/* Blue Stadium Arena Atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/25 via-slate-950/60 to-slate-950/95" />

          {/* Streak Indicator */}
          <div className={`absolute top-3.5 right-3.5 flex items-center gap-1 px-2 py-0.5 rounded bg-blue-950/60 border text-[9px] font-mono font-bold transition-colors ${selected ? 'border-blue-400/60 text-blue-200' : 'border-blue-400/30 text-blue-300'}`}>
            <Brain className="w-2.5 h-2.5 text-blue-400" />
            <span>STREAK: 4🔥</span>
          </div>

          {/* 1v1 Arena Duel Card (Mid-card physical quiz preview) */}
          <div className={`absolute top-14 right-4 w-[165px] p-2.5 rounded-xl bg-[#0c1424]/90 border border-blue-500/25 shadow-lg transition-transform duration-300 ${selected ? 'rotate-0 scale-105 border-blue-500/40 ring-1 ring-blue-500/20' : 'rotate-2 group-hover:rotate-0'}`}>
            <p className="text-[10px] font-bold text-slate-200 leading-snug line-clamp-1">
              "Symbol for Gold?"
            </p>
            {/* Duel Answer Chips */}
            <div className="mt-1.5 space-y-1 text-[8px] font-mono">
              <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-blue-500/20 border border-blue-400/40 text-blue-200 font-bold">
                <span>A: Au</span>
                <Check className="w-2.5 h-2.5 text-emerald-400" />
              </div>
              <div className="flex items-center justify-between px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                <span>B: Ag</span>
              </div>
            </div>
          </div>

          {/* Cyan/Blue Corner Radial */}
          <div className={`absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-blue-600/10 blur-3xl transition-all duration-500 ${selected ? 'bg-blue-600/25 scale-110' : 'group-hover:bg-blue-600/20'}`} />
        </div>
      );

    /* ========================================================================= */
    /* 5. EMOJI DECODER: Encrypted Cipher Strip                                   */
    /* ========================================================================= */
    case 'emoji':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl select-none">
          {/* Amber Riddles Atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-950/20 via-slate-950/60 to-slate-950/95" />

          {/* Cipher Version */}
          <div className={`absolute top-3.5 right-3.5 flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/60 border text-[9px] font-mono font-bold transition-colors ${selected ? 'border-amber-400/60 text-amber-200' : 'border-amber-400/30 text-amber-300'}`}>
            <Smile className="w-2.5 h-2.5 text-amber-400" />
            <span>CIPHER #042</span>
          </div>

          {/* Encrypted Emoji Equation Strip */}
          <div className={`absolute top-14 right-4 w-[165px] p-2.5 rounded-xl bg-[#1a140a]/90 border border-amber-500/30 shadow-lg transition-transform duration-300 ${selected ? 'rotate-0 scale-105 border-amber-500/40 ring-1 ring-amber-500/20' : '-rotate-2 group-hover:rotate-0'}`}>
            <div className="flex items-center gap-1.5 text-xs font-black">
              <span>👑</span>
              <span className="text-amber-400 font-mono text-[9px]">+</span>
              <span>🦁</span>
              <span className="text-amber-400 font-mono text-[9px]">=</span>
              <span className="w-4 h-4 rounded bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 text-[9px] font-mono font-black">
                ?
              </span>
            </div>
            <div className="mt-1.5 pt-1 border-t border-amber-500/20 text-[8px] font-mono text-amber-300 font-bold truncate">
              ANSWER: The Lion King
            </div>
          </div>

          {/* Amber Corner Radial */}
          <div className={`absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-amber-500/10 blur-3xl transition-all duration-500 ${selected ? 'bg-amber-500/25 scale-110' : 'group-hover:bg-amber-500/20'}`} />
        </div>
      );

    default:
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-slate-950/60 to-slate-950/95" />
        </div>
      );
  }
};
