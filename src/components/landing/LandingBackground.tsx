import React from 'react';

interface LandingBackgroundProps {
  parallaxOffset?: { x: number; y: number };
}

/**
 * Cinematic KARI Atmosphere Background (6-Layer Depth Architecture):
 * 1. Deep base: Obsidian slate (#070a12)
 * 2. Atmospheric lighting: Soft overhead pendant lamp pool over the game table (gentle breathing)
 * 3. Subtle texture: Fine tactile game-mat felt / acoustic weave
 * 4. Distant environment: Subtle gaming lounge silhouettes and architectural bevels
 * 5. Restrained warm ambient embers (organic slow drift)
 * 6. Edge vignette for high-contrast typographic readability
 */
export const LandingBackground: React.FC<LandingBackgroundProps> = ({
  parallaxOffset = { x: 0, y: 0 },
}) => {
  // Ultra-restrained parallax for background layer (max ~3-4px)
  const bgShiftX = parallaxOffset.x * 0.15;
  const bgShiftY = parallaxOffset.y * 0.15;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* Layer 1: Deep obsidian base */}
      <div className="absolute inset-0 bg-[#070a12]" />

      {/* Layer 2: Overhead Directional Lighting (Warm Game-Room Table Lamp with gentle breathing) */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[850px] sm:w-[1100px] h-[550px] pointer-events-none animate-ambient-breathe transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translate3d(calc(-50% + ${bgShiftX}px), ${bgShiftY}px, 0)`,
          background:
            'radial-gradient(ellipse 65% 55% at 50% 15%, rgba(234, 88, 12, 0.12) 0%, rgba(124, 58, 237, 0.08) 50%, rgba(7, 10, 18, 0) 100%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Subtle secondary ambient fill on the right (warm table illumination) */}
      <div
        className="absolute top-1/4 right-[5%] w-[450px] h-[450px] rounded-full pointer-events-none opacity-60 transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `translate3d(${bgShiftX * 1.5}px, ${bgShiftY * 1.5}px, 0)`,
          background:
            'radial-gradient(circle, rgba(147, 51, 234, 0.09) 0%, rgba(234, 88, 12, 0.04) 40%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Layer 3: Tactile Game Table Surface Texture (Fine Matte Felt Grid) */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #ffffff 0.75px, transparent 0.75px),
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 48px 48px, 48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,1) 15%, rgba(0,0,0,0) 80%)',
        }}
      />

      {/* Layer 4: Distant Environmental Frame / Architectural Perspective Lines */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle horizontal gaming table horizon line */}
          <line x1="0" y1="68%" x2="100%" y2="68%" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 8" />
          {/* Corner bevel frame accents */}
          <path d="M 40 40 L 120 40 M 40 40 L 40 120" stroke="#f97316" strokeWidth="1.5" fill="none" />
          <path d="M calc(100% - 40px) 40 L calc(100% - 120px) 40 M calc(100% - 40px) 40 L calc(100% - 40px) 120" stroke="#a855f7" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Layer 5: Restrained Ambient Floating Embers (Gentle slow drift) */}
      <div className="absolute top-[30%] left-[20%] w-1.5 h-1.5 rounded-full bg-orange-400/40 blur-[0.5px] animate-ember-a" />
      <div className="absolute top-[60%] right-[25%] w-2 h-2 rounded-full bg-purple-400/30 blur-[0.5px] animate-ember-b" />
      <div className="absolute top-[45%] right-[15%] w-1.5 h-1.5 rounded-full bg-amber-300/40 blur-[0.5px] animate-ember-c" />

      {/* Layer 6: Deep Edge Vignette Framing (Ensures 100% contrast & zero glare) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 85% at 50% 45%, transparent 40%, rgba(7, 10, 18, 0.85) 90%, #070a12 100%)',
        }}
      />
    </div>
  );
};
