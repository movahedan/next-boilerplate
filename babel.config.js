module.exports = {
	presets: [
		[
			'next/babel',
			{
				'styled-jsx': {
					plugins: ['@styled-jsx/plugin-sass', 'styled-jsx-plugin-postcss'],
				},
			},
		],
	],
};
