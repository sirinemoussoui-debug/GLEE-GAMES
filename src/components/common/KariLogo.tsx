import React from 'react';

interface KariLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showSubtitle?: boolean;
  subtitle?: string;
  iconOnly?: boolean;
  className?: string;
  animated?: boolean;
}

/**
 * Smiling 'A' Icon Mark - The core brand symbol of Kari Games.
 * Features a bold geometric letter 'A' with an integrated smiling face inside the counter.
 */
export const KariIconMark: React.FC<{
  size?: number | string;
  className?: string;
  glow?: boolean;
}> = ({ size = 40, className = '', glow = true }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="kariBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <filter id="kariGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#EA580C" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Rounded Container */}
      <rect
        x="3"
        y="3"
        width="94"
        height="94"
        rx="26"
        fill="#0f172a"
        stroke="url(#kariBrandGrad)"
        strokeWidth="2.5"
      />

      {/* Subtle Inner Glow Background */}
      <rect
        x="6"
        y="6"
        width="88"
        height="88"
        rx="23"
        fill="url(#kariBrandGrad)"
        fillOpacity="0.12"
      />

      {/* Letter 'A' Solid Outer Body */}
      <path
        d="M 50 16 C 53.5 16 56.5 18 58 21.5 L 82.5 72 C 84.5 76 81.5 81 77 81 L 67 81 C 64 81 61.5 79 60 76 L 56 68 L 44 68 L 40 76 C 38.5 79 36 81 33 81 L 23 81 C 18.5 81 15.5 76 17.5 72 L 42 21.5 C 43.5 18 46.5 16 50 16 Z"
        fill="url(#kariBrandGrad)"
        filter={glow ? 'url(#kariGlow)' : undefined}
      />

      {/* Triangle Counter Inside 'A' (Dark Face Canvas) */}
      <path
        d="M 50 33 L 60.5 58 L 39.5 58 Z"
        fill="#0f172a"
      />

      {/* Subtle friendly Eyes inside the 'A' */}
      <circle cx="46.5" cy="46" r="2.2" fill="#FDBA74" />
      <circle cx="53.5" cy="46" r="2.2" fill="#FDBA74" />

      {/* Friendly Smile inside the 'A' */}
      <path
        d="M 45 52 Q 50 56 55 52"
        fill="none"
        stroke="#FDBA74"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Sparkle Accent Dot */}
      <circle cx="78" cy="22" r="3.5" fill="#FBBF24" />
    </svg>
  );
};

/**
 * Smiling 'A' Inline Glyph for the KARI wordmark.
 * Designed to fit seamlessly alongside standard heavy sans-serif typography.
 */
export const KariLetterA: React.FC<{
  className?: string;
}> = ({ className = 'w-[0.82em] h-[0.95em]' }) => {
  return (
    <span className={`inline-block relative align-baseline mx-[0.03em] ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="kariLetterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
        </defs>

        {/* Letter 'A' Form */}
        <path
          d="M 50 8 C 53.5 8 57 10 58.5 13.5 L 88 77 C 90 81 87 86 82.5 86 L 71 86 C 68 86 65 84 63.5 81 L 58 68 L 42 68 L 36.5 81 C 35 84 32 86 29 86 L 17.5 86 C 13 86 10 81 12 77 L 41.5 13.5 C 43 10 46.5 8 50 8 Z"
          fill="url(#kariLetterGrad)"
        />

        {/* Inner Counter / Face Canvas */}
        <path
          d="M 50 28 L 63 58 L 37 58 Z"
          fill="#090d16"
        />

        {/* Friendly Eyes */}
        <circle cx="45.5" cy="43.5" r="2.8" fill="#FDBA74" />
        <circle cx="54.5" cy="43.5" r="2.8" fill="#FDBA74" />

        {/* Natural Smile Arc */}
        <path
          d="M 44 51 Q 50 56.5 56 51"
          fill="none"
          stroke="#FDBA74"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};

/**
 * Main KARI GAMES Brand Logo Component
 */
export const KariLogo: React.FC<KariLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  subtitle = 'GAMES',
  iconOnly = false,
  className = '',
}) => {
  if (iconOnly) {
    const iconSizes = {
      xs: 24,
      sm: 32,
      md: 42,
      lg: 56,
      xl: 72,
      hero: 96,
    };
    return <KariIconMark size={iconSizes[size]} className={className} />;
  }

  // Size configurations
  const textSizes = {
    xs: 'text-base',
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-5xl sm:text-6xl',
    hero: 'text-6xl sm:text-7xl md:text-8xl lg:text-9xl',
  };

  const badgeSizes = {
    xs: 'text-[9px] px-1.5 py-0.2',
    sm: 'text-[10px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-0.5 tracking-widest',
    lg: 'text-sm px-3 py-1 tracking-widest',
    xl: 'text-base px-4 py-1.5 tracking-widest',
    hero: 'text-base sm:text-lg px-5 py-2 tracking-[0.25em]',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon Mark for sm/md/lg */}
      {(size === 'sm' || size === 'md' || size === 'lg') && (
        <KariIconMark
          size={size === 'sm' ? 34 : size === 'md' ? 42 : 52}
          className="group-hover:scale-105 transition-transform shrink-0"
        />
      )}

      <div className="flex flex-col items-start leading-none">
        <div className="flex items-center gap-2">
          {/* KARI wordmark with the custom smiling 'A' */}
          <span
            className={`font-black tracking-tight font-display flex items-center ${textSizes[size]} bg-gradient-to-r from-orange-400 via-amber-300 to-purple-400 bg-clip-text text-transparent`}
          >
            <span>K</span>
            <KariLetterA />
            <span>RI</span>
          </span>

          {/* GAMES Pill Badge */}
          {showSubtitle && subtitle && (
            <span
              className={`font-black uppercase bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-500/30 text-orange-300 rounded-full ${badgeSizes[size]}`}
            >
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
