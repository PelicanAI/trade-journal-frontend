/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "../components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark theme backgrounds
        "bg-primary": "#0a0b0f",
        "bg-secondary": "#12141a",
        "bg-tertiary": "#1a1d24",

        // Accent colors
        "accent-purple": "#a855f7",
        "accent-purple-dim": "rgba(168, 85, 247, 0.15)",
        "accent-cyan": "#22d3ee",

        // Text colors
        "text-primary": "#f1f5f9",
        "text-secondary": "#94a3b8",
        "text-muted": "#64748b",

        // Border colors
        "border-color": "rgba(148, 163, 184, 0.1)",
        "border-accent": "rgba(168, 85, 247, 0.3)",

        // Grid
        "grid-color": "rgba(148, 163, 184, 0.03)",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
        display: ["Bebas Neue", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-left": "fadeLeft 0.8s ease forwards",
        "type-in": "typeIn 0.3s ease forwards",
        pulse: "pulse 1s infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeLeft: {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        typeIn: {
          from: { opacity: "0", transform: "translateX(-10px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(168, 85, 247, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
