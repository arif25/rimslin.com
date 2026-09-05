import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "#060b08",
        surface: {
          50: "#f0fdf4",
          100: "#0b1610",
          200: "#102018",
          300: "#182d22",
          400: "#223d2f",
        },
        gulf: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
        gold: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-amiri)", "serif"],
        bengali: ["var(--font-bengali)", "'Noto Sans Bengali'", "sans-serif"],
      },
      backgroundImage: {
        "hero-emerald-glow":
          "radial-gradient(700px circle at 50% 0%, rgba(16, 185, 129, 0.18), transparent 70%)",
        "gold-glow":
          "radial-gradient(450px circle at 50% 50%, rgba(245, 158, 11, 0.12), transparent 60%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "wave-bar": "waveBar 1.2s ease-in-out infinite alternate",
        "pulse-glow": "pulseGlow 2.5s infinite",
        "float-gentle": "floatGentle 4s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        waveBar: {
          "0%": { height: "20%" },
          "100%": { height: "100%" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(16, 185, 129, 0.3)" },
          "50%": { boxShadow: "0 0 35px rgba(16, 185, 129, 0.65)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
