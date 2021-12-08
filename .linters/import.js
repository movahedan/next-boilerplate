const importOrderConfig = {
	groups: [
		['builtin', 'external'],
		'internal',
		['parent', 'sibling', 'index'],
		'type',
	],
	pathGroups: [
		{
			pattern: 'entry/*',
			group: 'internal',
			position: 'after',
		},
		{
			pattern: 'ui/*',
			group: 'internal',
			position: 'after',
		},
		{
			pattern: 'pages.styles',
			group: 'internal',
			position: 'after',
		},
	],
	pathGroupsExcludedImportTypes: ['builtin', 'external'],
	'newlines-between': 'always',
	alphabetize: {
		order: 'asc',
		caseInsensitive: false,
	},
	warnOnUnassignedImports: false,
}

const importPlugin = {
	plugins: ['import'],
	settings: {
		'import/internal-regex': '^(?:@/|src/)',
		'import/resolver': {
			node: {
				paths: ['.'],
			},
		},
	},
	extends: [
		'plugin:import/recommended', // eslint-plugin-import
		'plugin:import/errors', // eslint-plugin-import
		'plugin:import/warnings', // eslint-plugin-import
	],
	rules: {
		// Import statement rules (eslint-plugin-import)
		'import/named': 'warn',
		'import/export': 'warn',
		'import/no-cycle': 'error',
		'import/extensions': 'off',
		'import/namespace': 'error',
		'import/group-exports': 'off',
		'import/no-deprecated': 'warn',
		'import/no-duplicates': 'error',
		'import/no-unresolved': 'error',
		'import/no-self-import': 'error',
		'import/no-default-export': 'error',
		'import/no-unused-modules': 'error',
		'import/no-mutable-exports': 'error',
		'import/no-named-as-default': 'error',
		'import/newline-after-import': 'error',
		'import/no-useless-path-segments': 'error',
		'import/no-relative-parent-imports': 'off',
		'no-restricted-imports': ['error', { patterns: ['..*'] }],
		'import/no-anonymous-default-export': [
			'error',
			{
				allowArray: false,
				allowArrowFunction: false,
				allowAnonymousClass: false,
				allowAnonymousFunction: false,
				allowCallExpression: true, // The true value here is for backward compatibility
				allowLiteral: false,
				allowObject: false,
			},
		],
		'import/no-unassigned-import': [
			'error',
			{
				allow: ['**/*.css', 'node', '@testing-library/jest-dom/extend-expect'],
			},
		],
		'import/order': [
			'error',
			importOrderConfig,
		],
	},
	overrides: [
		{
			files: ['./**/*.d.ts', './jest/**/*.ts', './src/__mocks__/**/*.ts'],
			rules: {
				'import/no-unassigned-import': 'off',
				'import/no-default-export': 'off',
			},
		},
		{
			files: [
				'./src/pages/**/*.ts?(x)',
				'./src/**/*.stories.ts?(x)',
				'./src/lib/utils/tailwind-theme.ts',
			],
			rules: {
				'import/no-default-export': 'off',
			},
		},
		{
			files: ['**/*.ts', '**/*.tsx'],
			settings: {
				'import/parsers': {
					'@typescript-eslint/parser': ['.ts', '.tsx'],
				},
				'import/resolver': {
					// eslint-import-resolver-typescript
					typescript: {
						project: '.',
						alwaysTryTypes: true,
					},
				},
			},
			extends: [
				'plugin:import/typescript', // Import plugin (eslint-plugin-import)
			],
		},
	],
};

module.exports = importPlugin;
