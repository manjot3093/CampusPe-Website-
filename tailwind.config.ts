import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0E1118',
          soft: '#161B26',
          muted: '#242C3D',
          border: '#2C3549',
        },
        paper: {
          DEFAULT: '#FAF9F5',
          warm: '#F4F2EC',
          tint: '#EAE6DC',
          border: '#DFDAD0',
        },
        electric: {
          DEFAULT: '#0062FF',
          hover: '#004ECC',
          subtle: '#EEF4FF',
          dark: '#073B94',
        },
        lavender: {
          light: '#F5F4FF',
          DEFAULT: '#EAE7FD',
          dark: '#635BFF',
        },
        ochre: {
          DEFAULT: '#FF542E',
          light: '#FFF0ED',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        editorial: ['var(--font-editorial)', 'Georgia', 'serif'],
        display: ['var(--font-editorial)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.035em',
        tight: '-0.02em',
        widestEditorial: '0.22em',
      },
      backgroundImage: {
        'campus-grid': 'linear-gradient(to right, rgba(14, 17, 24, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(14, 17, 24, 0.04) 1px, transparent 1px)',
        'campus-grid-dark': 'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
