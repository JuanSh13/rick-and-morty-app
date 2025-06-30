import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        orbitron: ["var(--font-orbitron)", "sans-serif"], // 👈 importante
      },
    },
  },
  plugins: [],
};

export default config;
