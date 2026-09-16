import React from 'react';
import { GameType } from '../../types';

interface HubBackgroundProps {
  activeGameId?: GameType | null;
}

/**
 * HubBackground:
 * An atmospheric arcade-selection room background continuing the KARI physical world.
 * 1. Deep obsidian base (#070a12)
 * 2. Subtle directional overhead downlight pool that softly responds to the active arcade cabinet
 * 3. Faint perspective arcade hall horizon lines
 * 4. Subtle acoustic felt / floor texture
 * 5. Edge vignette for high contrast and zero glare
 */
export const HubBackground: React.FC<HubBackgroundProps> = ({ activeGameId }) => {
  // Atmospheric lighting gradients tuned to each game while preserving unified dark KARI branding
  const getAmbientGradients = () => {
    switch (activeGameId) {
      case 'spy':
        return {
          overhead: 'radial-gradient(ellipse 70% 60% at 50% 10%, rgba(249, 115, 22, 0.12) 0%, rgba(30, 41, 59, 0.10) 50%, rgba(7, 10, 18, 0) 100%)',
          accent: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, rgba(15, 23, 42, 0.05) 45%, transparent 70%)',
        };
      case 'whos_most_likely':
        return {
          overhead: 'radial-gradient(ellipse 70% 60% at 50% 10%, rgba(168, 85, 247, 0.12) 0%, rgba(236, 72, 153, 0.06) 50%, rgba(7, 10, 18, 0) 100%)',
          accent: 'radial-gradient(circle, rgba(168, 85, 247, 0.09) 0%, rgba(99, 102, 241, 0.04) 45%, transparent 70%)',
        };
      case 'word_bomb':
        return {
          overhead: 'radial-gradient(ellipse 70% 60% at 50% 10%, rgba(239, 68, 68, 0.13) 0%, rgba(234, 88, 12, 0.08) 50%, rgba(7, 10, 18, 0) 100%)',
          accent: 'radial-gradient(circle, rgba(239, 68, 68, 0.09) 0%, rgba(220, 38, 38, 0.04) 45%, transparent 70%)',
        };
      case 'trivia':
        return {
          overhead: 'radial-gradient(ellipse 70% 60% at 50% 10%, rgba(59, 130, 246, 0.12) 0%, rgba(14, 165, 233, 0.07) 50%, rgba(7, 10, 18, 0) 100%)',
          accent: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.04) 45%, transparent 70%)',
        };
      case 'emoji':
        return {
          overhead: 'radial-gradient(ellipse 70% 60% at 50% 10%, rgba(245, 158, 11, 0.12) 0%, rgba(16, 185, 129, 0.06) 50%, rgba(7, 10, 18, 0) 100%)',
          accent: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, rgba(217, 119, 6, 0.04) 45%, transparent 70%)',
        };
      default:
        return {
          overhead: 'radial-gradient(ellipse 70% 60% at 50% 10%, rgba(234, 88, 12, 0.09) 0%, rgba(124, 58, 237, 0.06) 50%, rgba(7, 10, 18, 0) 100%)',
          accent: 'radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, rgba(234, 88, 12, 0.03) 45%, transparent 70%)',
        };
    }
  };

  const gradients = getAmbientGradients();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* Base: Deep obsidian slate */}
      <div className="absolute inset-0 bg-[#070a12]" />

      {/* Overhead Directional Lighting (Warm Arcade Hall Lighting Pool that responds softly to active game) */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] sm:w-[1200px] h-[580px] pointer-events-none animate-ambient-breathe transition-all duration-700 ease-out"
        style={{
          background: gradients.overhead,
          filter: 'blur(70px)',
        }}
      />

      {/* Secondary Ambient Accent Pool on the lower right */}
      <div
        className="absolute bottom-10 right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-40 transition-all duration-700 ease-out"
        style={{
          background: gradients.accent,
          filter: 'blur(80px)',
        }}
      />

      {/* Tactile Surface Texture: Subtle felt / arcade floor weave */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #ffffff 0.75px, transparent 0.75px),
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 48px 48px, 48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 85%)',
        }}
      />

      {/* Distant Perspective Horizon / Arcade Hall Guide Lines */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle horizontal horizon line */}
          <line x1="0" y1="28%" x2="100%" y2="28%" stroke="#ffffff" strokeWidth="1" strokeDasharray="6 12" />
          {/* Subtle vertical machine divider markers */}
          <line x1="20%" y1="28%" x2="15%" y2="100%" stroke="#ffffff" strokeWidth="0.75" strokeDasharray="3 9" />
          <line x1="80%" y1="28%" x2="85%" y2="100%" stroke="#ffffff" strokeWidth="0.75" strokeDasharray="3 9" />
        </svg>
      </div>

      {/* Edge Vignette: Ensures maximum contrast for typography and cards */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 95% 90% at 50% 40%, transparent 45%, rgba(7, 10, 18, 0.85) 90%, #070a12 100%)',
        }}
      />
    </div>
  );
};
