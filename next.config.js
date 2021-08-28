// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  webpack5: true,
  mode: process.env.NODE_ENV != "production" ? "production" : "development", // Used for tree shaking, see sideEffects in package.json
};
