import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['class'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    
    extend: {
      screens: {
        'xxs': '360px',
        '1-xs': '530px',
        '1-sm': '610px',
        '1-md': '815px',
        '1-lg': '1095px',
      },
      spacing: {
        '15': '3.75rem',
        '18': '4.5rem',
        '30': '7.5rem',
        '40': '10rem',
        '50': '12.5rem',
        '72': '18rem',
        '80': '20rem',
      },
      boxShadow: {
        'modal': '0 4px 15px -3px rgba(0, 0, 0, 0.2)',
        'custom': '0 3px 12px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.08)',
        'hover': '0 5px 15px 0 rgba(0,0,0,0.15), 0 2px 4px 0 rgba(0,0,0,0.1)',
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
