import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: ["3rem", { lineHeight: "1.15" }],
        h1: ["2.25rem", { lineHeight: "1.25" }],
        h2: ["1.875rem", { lineHeight: "1.3" }],
        h3: ["1.5rem", { lineHeight: "1.35" }],
        body: ["1rem", { lineHeight: "1.625" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        caption: ["0.75rem", { lineHeight: "1.4" }],
      },
      maxWidth: {
        content: "80rem",
      },
      keyframes: {
        cardFadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "card-fade-in": "cardFadeIn 0.35s ease-out both",
      },
      colors: {
        /* Book-first semantic palette: calm, focused, trustworthy */
        primary: {
          DEFAULT: "#1e293b",   /* slate-800 */
          foreground: "#f8fafc", /* slate-50 */
        },
        surface: "#fafaf9",     /* stone-50, paper-adjacent */
        accent: {
          DEFAULT: "#14b8a6",   /* teal-500 */
          hover: "#0d9488",     /* teal-600 */
        },
        secondary: "#f1f5f9",   /* slate-100 for secondary UI */
      },
    },
  },
  plugins: [],
};
export default config;
