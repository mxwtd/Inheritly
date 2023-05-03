/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      "rounded": {
        "xl": "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
