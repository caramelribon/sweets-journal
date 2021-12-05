module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'beige': '#faeee7',
        'lightblue': '#9dbeb9',
        'pinky': '#ff8882',
        'kon': '#194350',
        'pink': '#ffc2b4',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
  