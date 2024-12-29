/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(40px)" },
        },
        bubble: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "80%": { opacity: "0.6" },
          "98%": { opacity: "0", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(0)" },
        },
        explode: {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        particle: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-20px)", opacity: "0" },
        },
      },
      animation: {
        float: "float 15s ease-in-out infinite",
        bubble: "bubble 5s linear infinite",
        explode: "explode 0.3s ease-out forwards",
        particle: "particle 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
