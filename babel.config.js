module.exports = {
	presets: [
		[
			'next/babel',
			{
				'styled-jsx': {
					optimizeForSpeed: true,
					plugins: ['styled-jsx-plugin-postcss', '@styled-jsx/plugin-sass'],
				},
			},
		],
	],
};
