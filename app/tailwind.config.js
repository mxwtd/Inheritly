/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      body: ['Helvetica', 'Arial', 'sans-serif']
    },
    extend: {
      rounded: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      scale: {
        102: '1.02'
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
