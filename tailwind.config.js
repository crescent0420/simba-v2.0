/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        simba: {
          orange: '#E8620A',
          dark: '#1A1208',
          gold: '#F5A623',
          cream: '#FFF8F0',
        },
        mtn: {
          yellow: '#FFCC00',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
      },
    },
  },
  plugins: [],
};