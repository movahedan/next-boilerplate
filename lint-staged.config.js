module.exports = {
  // Run type-check on changes to TypeScript files
  "**/*.ts?(x)": () => "yarn type-check",
  // Run ESLint on changes to JavaScript/TypeScript files
  "**/*.(ts)?(x)": () => `yarn lint`,
};
