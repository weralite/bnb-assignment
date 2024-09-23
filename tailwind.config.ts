import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '1-sm': '610px',
        '1-md': '815px',
        '1-lg': '1095px',
      },
      spacing: {
        '15': '3.75rem',
        '30': '7.5rem',
        '40': '10rem',
      },
      boxShadow: {
        'custom': '0 3px 12px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.08)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'header-brand': 'var(--header_brand-color, #ff5a5f)',
        'slate-350': '#CBD5E0',
        'custom-grey': '#f0f0f0',
      },
    },
  },
  plugins: [],
};
export default config;
