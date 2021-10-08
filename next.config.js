// @ts-check

// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
const { withSentryConfig } = require('@sentry/nextjs');

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

const SentryWebpackPluginOptions = {
	// Additional config options for the Sentry Webpack plugin. Keep in mind that
	// the following options are set automatically, and overriding them is not
	// recommended:
	//   release, url, org, project, authToken, configFile, stripPrefix,
	//   urlPrefix, include, ignore

	debug: false,
	// For all available options, see:
	// https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(nextConfig, SentryWebpackPluginOptions);
