/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        honda: {
          darkGreen: '#1C3B24',
          forestGreen: '#16311C',
          brightGreen: '#34A853',
          ecoGreen: '#2EB85C',
          lightGreen: '#7FD03F',
          cream: '#F4ECE1',
          creamCard: '#FAF5EC',
          creamLight: '#FCF9F3',
          brownBtn: '#5D4F39',
          brownBtnDark: '#4A3E2C',
          textDark: '#1E2D1D',
          textMuted: '#586A57',
        }
      },
      fontFamily: {
        sans: ['"Montserrat"', '"Outfit"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        '3d-btn': '0 8px 0 #0E1F12, 0 12px 25px rgba(0,0,0,0.3)',
        '3d-btn-active': '0 2px 0 #0E1F12, 0 4px 10px rgba(0,0,0,0.2)',
        '3d-card': '0 12px 28px -4px rgba(0,0,0,0.12), 0 4px 10px -2px rgba(0,0,0,0.06)',
        '3d-card-selected': '0 0 0 4px #2EB85C, 0 16px 32px rgba(46,184,92,0.35)',
        'badge': '0 8px 16px rgba(0,0,0,0.25)',
      }
    },
  },
  plugins: [],
}

