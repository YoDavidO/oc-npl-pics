/** @type {import('tailwindcss').Config} */
import fulldevUI from 'fulldev-ui/tailwind';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [fulldevUI],
}
