// @ts-check
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	mode: IS_PRODUCTION ? 'production' : 'development', // Used for tree shaking, see "sideEffects" in package.json
};

module.exports = nextConfig;
