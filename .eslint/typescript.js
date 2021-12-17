const typescriptConfig = {
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],
			plugins: ['@typescript-eslint'],
			parser: '@typescript-eslint/parser',
			extends: [
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/eslint-recommended',
			],
			rules: {
				'@typescript-eslint/ban-ts-comment': ['warn'],
				'@typescript-eslint/no-unused-vars': ['error'],
				'@typescript-eslint/no-var-requires': ['error'],
				'@typescript-eslint/no-empty-function': ['warn'],
				'@typescript-eslint/explicit-module-boundary-types': ['off'],
				'@typescript-eslint/explicit-function-return-type': ['off'],
				'@typescript-eslint/consistent-type-imports': [
					'error',
					{ prefer: 'type-imports' },
				],
			},
		},
	],
};

module.exports = typescriptConfig;
