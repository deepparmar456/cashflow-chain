/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        financial: {
          bg: '#090d16',
          card: '#0e1526',
          cardBorder: '#1e293b',
          cardHover: '#131c33',
          critical: '#f43f5e',
          criticalBg: '#881337',
          warning: '#f59e0b',
          warningBg: '#78350f',
          healthy: '#10b981',
          healthyBg: '#064e3b',
          accent: '#38bdf8'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Roboto Mono', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(244, 63, 94, 0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(244, 63, 94, 0.7)' },
        }
      }
    },
  },
  plugins: [],
}
