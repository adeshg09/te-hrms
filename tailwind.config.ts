import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './constants/**/*.{ts,tsx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			primary: {
  				light: '#7CB2FE',
  				default: '#2680FE',
  				dark: '#164C98',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				light: '#FE9C66',
  				default: '#FE5B00',
  				dark: '#983600',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			info: {
  				light: '#74CAFF',
  				default: '#1890FF',
  				dark: '#0C53B7'
  			},
  			warning: {
  				light: '#FFE16A',
  				default: '#FFC107',
  				dark: '#B78103'
  			},
  			error: {
  				light: '#FFA48D',
  				default: '#FF4842',
  				dark: '#B72136'
  			},
  			grey: {
  				'50': '#F2F2F2',
  				'100': '#F6F5F6',
  				'200': '#ECEBED',
  				'300': '#D4D4D4',
  				'400': '#ABABAB',
  				'500': '#777778',
  				'600': '#49474E',
  				'700': '#23272E',
  				'800': '#1A1B20',
  				'900': '#0A0A0A'
  			},
  			gradients: {
  				primary: 'linear-gradient(to bottom, #7CB2FE, #2680FE)',
  				info: 'linear-gradient(to bottom, #74CAFF, #1890FF)',
  				success: 'linear-gradient(to bottom, #AAF27F, #54D62C)',
  				warning: 'linear-gradient(to bottom, #FFE16A, #FFC107)',
  				error: 'linear-gradient(to bottom, #FFA48D, #FF4842)'
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
  			xs: '4px',
  			sm: 'calc(var(--radius) - 4px)',
  			md: 'calc(var(--radius) - 2px)',
  			lg: 'var(--radius)'
  		},
  		fontFamily: {
  			lexend: ['Lexend', 'sans-serif']
  		},
  		boxShadow: {
  			'light-100': '0px 12px 20px 0px rgba(184, 184, 184, 0.03), 0px 6px 12px 0px rgba(184, 184, 184, 0.02), 0px 2px 4px 0px rgba(184, 184, 184, 0.03)',
  			'light-200': '10px 10px 20px 0px rgba(218, 213, 213, 0.10)',
  			'light-300': '-10px 10px 20px 0px rgba(218, 213, 213, 0.10)',
  			'dark-100': '0px 2px 10px 0px rgba(46, 52, 56, 0.10)',
  			'dark-200': '2px 0px 20px 0px rgba(39, 36, 36, 0.04)'
  		},
  		screens: {
  			xs: '0px',
  			sm: '768px',
  			md: '1024px',
  			lg: '1440px',
  			xl: '1920px',
  			laptop: '1280px'
  		}
  	}
  },
  //   plugins: [require("tailwindcss-animate")],
    plugins: [require("tailwindcss-animate"),require('tailwind-scrollbar')]
} satisfies Config;

export default config;
