import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0a0f1e',
        'ink-2': '#3d4461',
        'ink-3': '#8892a4',
        line: '#e8ecf4',
        bg: '#f6f7fb',
        red: {
          primary: '#e8192c',
          dark: '#c0101f',
          light: '#fff0f1',
        },
        green: {
          primary: '#00a86b',
          light: '#e6f8f2',
        },
        blue: {
          primary: '#1a56db',
          light: '#eef3ff',
        },
        yellow: {
          primary: '#f59f00',
          light: '#fff8e6',
        },
      },
      fontFamily: {
        sinhala: ["'Noto Sans Sinhala'", 'sans-serif'],
        body: ["'Sora'", 'sans-serif'],
        serif: ["'Instrument Serif'", 'serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '16px',
        lg: '24px',
      },
      spacing: {
        gutter: '24px',
        section: '48px',
      },
      boxShadow: {
        card: '0 2px 12px rgba(10,15,30,.07)',
        hover: '0 8px 28px rgba(10,15,30,.13)',
        deep: '0 20px 60px rgba(0,0,0,.28)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease both',
      },
      keyframes: {
        fadeUp: {
          from: {
            opacity: '0',
            transform: 'translateY(24px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
