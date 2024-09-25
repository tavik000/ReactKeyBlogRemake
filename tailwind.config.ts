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
  			tiny: '0.75rem'
  		},
  		gridTemplateColumns: {
  			'13': 'repeat(13, minmax(0, 1fr))'
  		},
  		colors: {
  			blue: {
  				'400': '#2589FE',
  				'500': '#0070F3',
  				'600': '#2F6FEB'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			large: '1rem',
  			medium: '0.375rem',
  			small: '0.25rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		borderWidth: {
  			medium: '2px'
  		},
  		height: {
  			'400px': '400px'
  		},
  		width: {
  			'1200px': '1200px'
  		},
  		minWidth: {
  			'32px': '32px',
  			'40px': '40px',
  			'54px': '54px'
  		},
  		minHeight: {
  			'32px': '32px',
  			'40px': '40px'
  		},
  		boxShadow: {
  			'0550': '0 5px 5px 0 rgba(0, 0, 0, 0.3)',
  			'02': '0 2px rgba(0, 0, 0, 0.2)'
  		},
  		maxWidth: {
  			'400px': '25rem',
  			'1140px': '1140px'
  		},
  		padding: {
  			'3px': '3px',
  			'5px': '5px',
  			'11px': '11px',
  			'1em': '1em'
  		},
  		margin: {
  			'5px': '5px'
  		}
  	},
  	keyframes: {
  		shimmer: {
  			'100%': {
  				transform: 'translateX(100%)'
  			}
  		},
  		'slide-down': {
  			'0%': {
  				transform: 'translateY(-100%)'
  			},
  			'100%': {
  				transform: 'translateY(0)'
  			}
  		},
  		'slide-up': {
  			'0%': {
  				transform: 'translateY(0)'
  			},
  			'100%': {
  				transform: 'translateY(-100%)'
  			}
  		}
  	},
  	animation: {
  		'slide-down': 'slide-down 0.5s ease-out',
  		'slide-up': 'slide-up 0.5s ease-in'
  	}
  },
  darkMode: ['class', 'class'],
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    [nextui()],
      require("tailwindcss-animate")
],
};
export default config;
