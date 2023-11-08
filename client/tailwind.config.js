/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-text": "var(--text)",
        "brand-gray": "var(--bg)",
        "brand-white": "var(--white)",
        "brand-green": "var(--green)",
      },
      fontFamily: {
        sans: ["Mulish", "sans-serif"],
      },
    },
  },
  plugins: [],
};
