/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        lux: {
          black: "#0a0a0a",
          dark: "#121212",
          card: "#1a1a1a",
          border: "#262626",
          gold: "#d4af37",
          goldLight: "#f0d060",
          text: "#f5f5f5",
          muted: "#8a8a8a",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        shimmer: { "0%": { backgroundPosition: "-1000px 0" }, "100%": { backgroundPosition: "1000px 0" } },
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        fadeIn: "fadeIn 0.6s ease-in-out",
      },
    },
  },
  plugins: [],
}