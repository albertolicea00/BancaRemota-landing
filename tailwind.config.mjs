/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bpa: '#1E5F52',
        bandec: '#5B2A1F',
        accent: '#81D717',
        gold: '#B38B4D',
        bm: '#1A3A6B',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease both',
      },
    },
  },
  plugins: [],
};
