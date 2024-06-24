import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '13px': '13px',
        '14px': '14px',
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
      minWidth: {
        '54px': '54px',
      },
      minHeight: {
        '32px': '32px',
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
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
