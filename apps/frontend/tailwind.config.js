/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {keyframes: {
      float: {
        '0%, 100%': { transform: 'translateX(0)' },
        '50%': { transform: 'translateX(40px)' },
      }
    },
    animation: {
      'float': 'float 15s ease-in-out infinite',
    }},
  },
  plugins: [],
}
