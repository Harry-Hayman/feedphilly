/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/preline/preline.js",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ['Montserrat', 'ui-sans-serif', 'system-ui'],
      body: ['Open Sans', 'ui-sans-serif', 'system-ui'],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#ffffff",
      gray: colors.gray,
      indigo: colors.indigo,
      neutral: colors.neutral,
      brand: {
        cream: "#F8E9DC",
        lightGreen: "#B8E5A6",
        green: "#449735",
        lime: "#C3DA49"
      },
      yellow: colors.yellow,
      green: colors.green,
      orange: {
        ...colors.orange,
        300: "#fb713b",
        400: "#fa5a15",
        500: "#e14d0b",
      },
      red: colors.red,
      zinc: colors.zinc,
    },
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.75s ease-in forwards',
        'slide-up': 'slideUp 0.75s ease-out forwards',
        'fade-up': 'fadeUp 0.75s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [
    require("tailwindcss/nesting"),
    require("preline/plugin"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography")
  ],
};
