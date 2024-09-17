import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '13px': '13px',
        '14px': '14px',
        '28px': '28px',
        small: '0.875rem',
        tiny: '0.75rem',
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
      borderRadius: {
        large: '1rem',
        medium: '0.375rem',
        small: '0.25rem',
      },
      borderWidth: {
        medium: '2px', 
      },
      height: {
        '400px': '400px',
      },
      width: {
        '1200px': '1200px',
      },
      minWidth: {
        '32px': '32px',
        '40px': '40px',
        '54px': '54px',
      },
      minHeight: {
        '32px': '32px',
        '40px': '40px',
      },
      boxShadow: {
        '0550': '0 5px 5px 0 rgba(0, 0, 0, 0.3)',
        '02': '0 2px rgba(0, 0, 0, 0.2)',
      },
      maxWidth: {
        '400px': '25rem',
        '1140px': '1140px',
      },
      padding: {
        '3px': '3px',
        '5px': '5px',
        '11px': '11px',
        '1em': '1em',
      },
      margin: {
        '5px': '5px',
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
      'slide-down': {
        '0%': { transform: 'translateY(-100%)' },
        '100%': { transform: 'translateY(0)' },
      },
      'slide-up': {
        '0%': { transform: 'translateY(0)' },
        '100%': { transform: 'translateY(-100%)' },
      },
    },
    animation: {
      'slide-down': 'slide-down 0.5s ease-out',
      'slide-up': 'slide-up 0.5s ease-in',
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    [nextui()],
  ],
};
export default config;
