const eslintPlugin = {
	extends: ['eslint:recommended'],
	rules: {
		'newline-before-return': 'error',
		'max-lines': [
			'error',
			{ max: 1000, skipBlankLines: true, skipComments: true },
		],
		'no-unsafe-optional-chaining': 'off',
	},
	overrides: [
		{
			files: ['./**/*.test.{ts,tsx}'],
			rules: {
				'max-lines': [
					'error',
					{ max: 3000, skipBlankLines: true, skipComments: true },
				],
			},
		},
	],
};

module.exports = eslintPlugin;
