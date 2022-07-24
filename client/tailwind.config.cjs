/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.html", "**/*.md", "**/*.yml", "**/*.json"],
  darkMode: "class",
  theme: {
    extend: {},
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontFamily: {
      cor: ["Cormorant SC", "serif"],
      edu: ["Edu QLD Beginner", "cursive"],
    },
  },
  plugins: [],
};
