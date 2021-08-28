// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
	webpack5: true,
	// Used for tree shaking, see sideEffects in package.json
	mode: process.env.NODE_ENV != 'production' ? 'production' : 'development',
};
