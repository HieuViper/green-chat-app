/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Poppins': 'Poppins',
      },
      animation: {
        'text': 'text 5s linear infinite',
        'shine': 'shine 1s',
      },
      keyframes: {
        'text': {
          '0%, 100%': {
            'background-size': '300% 300%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '300% 300%',
            'background-position': 'right center'
          }
        },
        'shine': {
          '100%': { left: '125%' },
        },
      },
      colors: {
        main: {
          500: '#21978B',
        },
      }
    },
  },
  plugins: [],
}
