module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
          'nav-header': "'Merriweather Sans', sans-serif",
          'header': "'Lato', sans-serif",
          'text': "'Quicksand', sans-serif",
          "text-1":"'Glory', sans-serif"
       },
       width: {
        '45': '45%',
      },
      colors: {
        peach: '#E97541',

      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
