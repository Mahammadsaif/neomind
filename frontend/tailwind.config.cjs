/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
        colors: {
            bg: "rgb(var(--color-bg))",
            surface: "rgb(var(--color-surface))",
            text: "rgb(var(--color-text))",
            primary: "rgb(var(--color-primary))",
            primaryHover: "rgb(var(--color-primary-hover))",
            muted: "rgb(var(--color-muted))",
            accent: "rgb(var(--color-accent))",
        },
        borderRadius: {
            sm: "var(--radius-sm)",
            md: "var(--radius-md)",
            lg: "var(--radius-lg)",
            xl: "var(--radius-xl)",
        },
    },
 },
};