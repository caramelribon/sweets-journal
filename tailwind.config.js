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
        'navybrown': '#927d6e',
        'navygray': '#6d6d6d',
        'lightgreen': '#969687',
        'ltblue': '#d2d0d8',
        'nvybrown': '#84544b',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
  