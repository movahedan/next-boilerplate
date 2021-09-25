// @ts-check

/**
 * @type {import("tailwindcss/tailwind-config").TailwindConfig}
 **/
module.exports = {
	purge: {
		mode: 'all',
		options: {
			keyframes: true,
			fontFace: true,
		},
		preserveHtmlElements: false,
		content: [],
	},
	// mode: 'jit',
	darkMode: false,
	theme: {
		screens: require('./tailwind.screens'),
		extend: {
			maxWidth: {
				screen: '100vw',
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
