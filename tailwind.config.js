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
		screens: {
			sm: '480px',
			md: '768px',
			lg: '1280px',
		},
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
