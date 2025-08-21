/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        brand: "var(--color-brand)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
