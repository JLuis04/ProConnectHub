/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Montserrat",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "card-hover":
          "0 10px 40px -10px rgb(29 79 50 / 0.14), 0 4px 6px -2px rgb(29 79 50 / 0.06)",
      },
      colors: {
        surface: {
          DEFAULT: "#f9faf9",
          elevated: "#ffffff",
        },
        ink: {
          DEFAULT: "#1A1A1A",
        },
        muted: {
          DEFAULT: "#78716c",
        },
        brand: {
          50: "#e8f2ec",
          100: "#d0e4d8",
          200: "#a8cfba",
          300: "#6faf8a",
          400: "#3d855f",
          500: "#2a6649",
          600: "#1d4f32",
          700: "#163f28",
          800: "#0f2d1c",
        },
      },
    },
  },
  plugins: [],
};
