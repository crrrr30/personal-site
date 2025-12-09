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
            background: "#ffffff",
            foreground: "#000000",
            brand: "#0c25d4",
          },
        },
        dark: {
          layout: {},
          colors: {
            background: "#ffffff",
            foreground: "#000000",
            brand: "#0c25d4",
          },
        },
        fontFamily: {},
      },
    }),
  ],
};

module.exports = config;
