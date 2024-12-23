/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  // ...

  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,html}",
    './index.html'
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px',
      },
      colors: {
        'kakaoBg': '#B2C7DA',
        "netblack" : '#141414'
      }
    },
  },
  plugins: [
  ],
}


