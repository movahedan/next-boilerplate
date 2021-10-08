// @ts-check

/**
 * @type {import("tailwindcss/tailwind-config").TailwindConfig}
 **/
module.exports = {
	purge: ['./src/{ui,pages}/**/*.{ts,tsx}'],
	darkMode: false,
	theme: {
		extend: {
			width: {
				'240px': '15rem',
			},
			screens: {
				sm: '480px',
				md: '768px',
				lg: '1280px',
			},
			lineHeight: {
				'14px': '0.875rem',
				'18px': '1.125rem',
				'24px': '1.5rem',
				'28px': '1.758rem',
				'42px': '2.636875rem',
			},
			fontSize: {
				'12px': '0.76rem',
				'14px': '0.875rem',
				'18px': '1.125rem',
				'24px': '1.5rem',
				'36px': '1.625rem',
			},
			fontWeight: {
				normal: 'normal',
				bold: 'bold',
			},
			textColor: {
				primary: {
					default: '#FFFFFF',
					light: '#BDBDBD',
					'on-dark-bg': '#424242',
				},
				secondary: '#4DF8A6',
			},
			backgroundColor: {
				white: '#FFFFFF',
				dark: '#212121',
				lightopacity: 'rgba(255, 255, 255, 0.1)',
			},
			maxWidth: {
				screen: '100vw',
				'640px': '40rem',
			},
		},
	},
	variants: {
		extend: {
			margin: ['last', 'responsive'],
		},
	},
	plugins: [],
};
