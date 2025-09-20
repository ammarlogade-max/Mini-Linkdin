module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0056b3',
          dark: '#003d82'
        },
        secondary: {
          DEFAULT: '#6c757d',
          dark: '#495057'
        }
      }
    },
  },
  plugins: [],
}