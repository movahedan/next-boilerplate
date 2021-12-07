// @ts-check

const toRem = (value) => `${value / 16}rem`;
const fontList = ['sans-serif', 'Sen'];
const fontHeroList = ['sans-serif', 'Sen', 'Red Hat Mono'];

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
			'white-opacity-10': 'rgba(255, 255, 255, 0.1)',
			dark: '#212121',
			blue: '#3AB3DA',
			yellow: '#FFC93D',
			mouse: '#121212',
		},
		colors: {
			transparent: 'transparent',
			white: '#FFFFFF',
			'white-opacity-10': 'rgba(255, 255, 255, 0.1)',
			black: '#000000',
			yellow: '#FFC93D',
			'yellow-opacity-10': 'rgba(255, 201, 61, 0.1)',
			blue: '#3AB3DA',
			'blue-opacity-10': 'rgba(58, 179, 218, 0.1)',
			mellow: '#888888',
			gray: '#B5B5B5',
			primary: {
				default: '#424242',
				light: '#BDBDBD',
			},
			secondary: '#4DF8A6',
		},
		textColor: {
			transparent: 'transparent',
			white: '#FFFFFF',
			black: '#000000',
			yellow: '#FFC93D',
			blue: '#3AB3DA',
			mellow: '#888888',
			gray: '#B5B5B5',
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
			'hero-xl': {
				css: {
					fontFamily: fontHeroList,
					fontSize: toRem(64),
					lineHeight: toRem(100),
					fontWeight: '500',
				},
			},

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
					fontSize: toRem(32),
					lineHeight: toRem(40),
					fontWeight: 'bold',
					maxWidth: toRem(640),
				},
			},
			'heading-2xl': {
				css: {
					fontFamily: fontList,
					fontSize: toRem(48),
					lineHeight: toRem(40),
					fontWeight: 'bold',
					maxWidth: toRem(640),
				},
			},

			'wow-xl': {
				css: {
					fontFamily: fontList,
					fontSize: toRem(80),
					lineHeight: toRem(96),
					fontWeight: '700',
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
					lineHeight: toRem(40),
					fontWeight: 'normal',
				},
			},
			'2xl': {
				css: {
					fontFamily: fontList,
					fontSize: toRem(32),
					lineHeight: toRem(38),
					fontWeight: 'normal',
				},
			},
		},

		extend: {
			borderColor: {
				mouse: 'rgba(255, 255, 255, 0.3)',
			},
			borderWidth: {
				'3px': toRem(3),
			},
			borderRadius: {
				'6px': toRem(6),
				'20px': toRem(20),
			},
			cursor: {
				none: 'none',
			},
			width: {
				'72px': toRem(72),
				'240px': toRem(240),
				'480px': toRem(480),
				'960px': toRem(960),
			},
			height: {
				'72px': toRem(72),
				'70vh': '70vh',
			},
			minHeight: {
				'24px': toRem(24),
			},
			maxWidth: {
				screen: '100vw',
				'640px': toRem(640),
			},
			margin: {
				'10px': toRem(10),
				'40px': toRem(40),
				'80px': toRem(80),
				'128px': toRem(128),
			},
			padding: {
				'2px': toRem(2),
			},
			opacity: {},
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
