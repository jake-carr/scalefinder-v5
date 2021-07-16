module.exports = {
  purge: {
    enabled: true,
    content: [
      './client/src/**/*.html',
      './client/src/**/*.jsx',
      './client/dist/*.html',
    ],
    options: {
      keyframes: true,
    },
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
