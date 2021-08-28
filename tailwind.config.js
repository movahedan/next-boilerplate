module.exports = {
  purge: {
    mode: "all",
    options: {
      keyframes: true,
      fontFace: true,
    },
    preserveHtmlElements: false,
    content: [],
  },

  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        screen: "100vw",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    float: false,
  },
};
