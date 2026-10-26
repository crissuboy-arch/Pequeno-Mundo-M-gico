import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#2D2F5B",
        ink: "#454877",
        cream: "#FFF8EC",
        sky: { DEFAULT: "#D4EAF8", deep: "#A9D4F0", pale: "#E6F2FB" },
        blush: { DEFAULT: "#FADCE6", deep: "#F4B9CD" },
        mint: { DEFAULT: "#D3EEDF", deep: "#A8DCC1" },
        gold: { DEFAULT: "#F6BE3F", deep: "#D99E1C", soft: "#FFE9A8" },
        rose: "#C23A74",
      },
      fontFamily: {
        display: ["'Fredoka Variable'", "ui-rounded", "system-ui", "sans-serif"],
        sans: ["'Nunito Variable'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 26px rgba(45,47,91,.10)",
        cover: "0 22px 50px rgba(45,47,91,.28)",
        btn: "0 6px 0 #D99E1C",
      },
    },
  },
  plugins: [],
};

export default config;
