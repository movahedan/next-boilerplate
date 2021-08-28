const production = "production";
const development = "development";
const devMode = process.env.NODE_ENV != production;

module.exports = {
  future: {
    webpack5: true,
  },
  mode: devMode ? production : development, // Used for tree shaking, see sideEffects in package.json
};

// const connect =
//   (...middlewares) =>
//   (config) =>
//     middlewares[0]
//       ? middlewares[0](
//           middlewares.slice(1).length ? connect(middlewares.slice(1)) : config
//         )
//       : config;
