import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neo: {
          primary: "var(--neo-primary)",
          bg: "var(--neo-bg)",
          surface: "var(--neo-surface)",
          on: "var(--neo-on)",
          accent: "var(--neo-accent)",
          muted: "var(--neo-muted)",
          success: "var(--neo-success)",
          error: "var(--neo-error)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        subtle: "var(--shadow-subtle)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
};

export default config;