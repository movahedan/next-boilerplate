// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
	webpack5: true,
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	// Used for tree shaking, see "sideEffects" in package.json
	mode: process.env.NODE_ENV != 'production' ? 'production' : 'development',
};
