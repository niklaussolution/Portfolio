import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050505',
          900: '#080808',
          800: '#0D0D0D',
        },
        security: {
          red: '#E10600',
          'red-light': '#FF1A1A',
        },
        paper: {
          white: '#FFFFFF',
          soft: '#F3F3F3',
          muted: '#999999',
        },
      },
      borderColor: {
        line: 'rgba(255,255,255,0.10)',
        'line-red': 'rgba(225,6,0,0.35)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        scan: 'scan 3s linear infinite',
        blink: 'blink 1.4s step-start infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        blink: {
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
