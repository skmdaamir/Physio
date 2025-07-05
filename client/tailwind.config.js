/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // include all component files
  ],
  theme: {
    extend: {
      keyframes: {
        modalIn: {
          '0%': { opacity: 0, transform: 'translateY(50px) scale(0.95)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        modalIn: 'modalIn 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};

