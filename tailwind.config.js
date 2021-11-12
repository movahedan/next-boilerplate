// @ts-check

const toRem = (value) => `${value / 16}rem`;
const fontList = ['sans-serif', 'Red Hat Mono'];

/**
 * @type {import("tailwindcss/tailwind-config").TailwindConfig}
 **/
module.exports = {
	purge: ['./src/{ui,pages}/**/*.{ts,tsx}'],
	darkMode: false,
	theme: {
		screens: {
			sm: toRem(480),
			md: toRem(768),
			lg: toRem(1280),
		},
		backgroundColor: {
			white: '#FFFFFF',
			dark: '#212121',
		},
		textColor: {
			white: '#FFFFFF',
			black: '#000000',
			primary: {
				default: '#424242',
				light: '#BDBDBD',
			},
			secondary: '#4DF8A6',
		},
		// Disabling font-related rules to force using typography system
		fontSize: {},
		lineHeight: {},
		fontWeight: {},
		fontFamily: {},
		typography: {
			'heading-sm': {
				css: {
					fontFamily: fontList,
					fontSize: toRem(14),
					lineHeight: toRem(18),
					fontWeight: 'bold',
					maxWidth: toRem(640),
				},
			},
			heading: {
				css: {
					fontFamily: fontList,
					fontSize: toRem(16),
					lineHeight: toRem(24),
					fontWeight: 'bold',
					maxWidth: toRem(640),
				},
			},
			'heading-lg': {
				css: {
					fontFamily: fontList,
					fontSize: toRem(18),
					lineHeight: toRem(28),
					fontWeight: 'bold',
					maxWidth: toRem(640),
				},
			},
			'heading-xl': {
				css: {
					fontFamily: fontList,
					fontSize: toRem(24),
					lineHeight: toRem(42),
					fontWeight: 'bold',
					maxWidth: toRem(640),
				},
			},

			sm: {
				css: {
					fontFamily: fontList,
					fontSize: toRem(12),
					lineHeight: toRem(14),
					fontWeight: 'normal',
					maxWidth: toRem(640),
				},
			},
			DEFAULT: {
				css: {
					fontFamily: fontList,
					fontSize: toRem(14),
					lineHeight: toRem(18),
					fontWeight: 'normal',
					maxWidth: toRem(640),
				},
			},
			lg: {
				css: {
					fontFamily: fontList,
					fontSize: toRem(18),
					lineHeight: toRem(28),
					fontWeight: 'normal',
					maxWidth: toRem(640),
				},
			},
			xl: {
				css: {
					fontFamily: fontList,
					fontSize: toRem(24),
					lineHeight: toRem(42),
					fontWeight: 'normal',
					maxWidth: toRem(640),
				},
			},
		},

		extend: {
			width: {
				'240px': toRem(240),
			},
			minHeight: {
				'24px': toRem(24),
			},
			maxWidth: {
				screen: '100vw',
				'640px': toRem(640),
			},
		},
	},
	variants: {
		extend: {
			margin: ['first', 'last', 'responsive'],
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/line-clamp'),
	],
	xwind: {
		mode: 'objectstyles',
	},
};
