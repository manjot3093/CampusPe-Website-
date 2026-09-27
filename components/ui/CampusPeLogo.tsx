'use client';

import React from 'react';

interface CampusPeLogoProps {
  className?: string;
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export default function CampusPeLogo({
  className = '',
  theme = 'light',
  size = 'md',
}: CampusPeLogoProps) {
  const isDark = theme === 'dark';

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7 sm:w-8 sm:h-8',
    lg: 'w-9 h-9 sm:w-10 sm:h-10',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      <div className={`relative ${iconSizes[size]} shrink-0 transition-transform duration-300 ease-out group-hover:scale-105`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <rect
            x="1"
            y="1"
            width="38"
            height="38"
            rx="10"
            className={isDark ? 'fill-white/10 stroke-white/20' : 'fill-ink stroke-ink/20'}
            strokeWidth="1.2"
          />

          <path
            d="M12 28V18C12 13.5817 15.5817 10 20 10C24.4183 10 28 18 28 18V28"
            stroke={isDark ? '#FFFFFF' : '#FAF9F5'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-opacity group-hover:opacity-90"
          />

          <path
            d="M20 25V14M20 14L16 18M20 14L24 18"
            stroke="#0062FF"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="28" cy="12" r="2.5" fill="#0062FF" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className={`flex items-baseline tracking-tight ${textSizes[size]}`}>
          <span
            className={`font-sans font-bold tracking-[-0.03em] ${
              isDark ? 'text-white' : 'text-ink'
            }`}
          >
            Campus
          </span>
          <span className="ml-0.5 font-serif text-electric italic font-normal">
            Pe
          </span>
          <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
        </div>
        <span
          className={`mt-0.5 text-[8.5px] font-mono uppercase tracking-[0.24em] ${
            isDark ? 'text-white/40' : 'text-ink/45'
          } hidden sm:block`}
        >
          Network OS
        </span>
      </div>
    </div>
  );
}
