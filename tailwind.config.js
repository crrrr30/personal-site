import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          layout: {},
          colors: {
            background: "#2a2829",
            foreground: "#e0e0db",
          },
        },
        dark: {
          layout: {},
          colors: { background: "#2a2829", foreground: "#e0e0db" },
        },
        fontFamily: {},
      },
    }),
  ],
};

module.exports = config;
