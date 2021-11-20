const eslintPlugin = {
	extends: ['eslint:recommended'],
	rules: {
		'newline-before-return': 'error',
		'max-lines': [
			'error',
			{ max: 100, skipBlankLines: true, skipComments: true },
		],
		'no-unsafe-optional-chaining': 'off',
	},
	overrides: [
		{
			files: [
				'.eslintrc.js',
				'./tailwind.config.js',
				'./src/lib/utils/tailwind-theme.ts',
			],
			rules: {
				'max-lines': 'off',
			},
		},
		{
			files: ['./**/*.test.{ts,tsx}'],
			rules: {
				'max-lines': [
					'error',
					{ max: 300, skipBlankLines: true, skipComments: true },
				],
			},
		},
	],
};

module.exports = eslintPlugin;
