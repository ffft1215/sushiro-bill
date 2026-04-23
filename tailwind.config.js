/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-white': '#F8FAFC',
        'dark-white': '#E2E8F0',
        'light-grey': '#CAD5E2',
        'dark-grey': '#90A1B9',
        'light-black': '#314158',
        'dark-black': '#1D293D',
        'light-red': '#EC003F',
        'dark-red': '#C70036',
        'light-gold': '#F0B100',
        'dark-gold': '#D08700',
        'bg-game': '#707070',
      },
      fontFamily: {
        'ibm-thai': ['"IBM Plex Sans Thai"', 'sans-serif'],
      },
      keyframes: {
        plateSlideIn: {
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        settleDown: {
          '0%':   { transform: 'translateY(0)' },
          '30%':  { transform: 'translateY(-8px)' },
          '55%':  { transform: 'translateY(4px)' },
          '75%':  { transform: 'translateY(-3px)' },
          '90%':  { transform: 'translateY(1px)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-6px)' },
          '40%': { transform: 'translateX(6px)' },
          '60%': { transform: 'translateX(-4px)' },
          '80%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        'plate-slide-in': 'plateSlideIn 0.3s ease-out forwards',
        'settle-down': 'settleDown 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'shake': 'shake 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
}
