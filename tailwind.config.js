module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'beige': '#f2ebe5',
        'lightblue': '#dddae3',
        'lightpink': '#c6ada6',
        'navyblue': '#4f5666',
        'navypink': '#a76e63',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
  