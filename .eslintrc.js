const nextPlugin = {
	extends: [
		'next', // eslint-plugin-react, eslint-plugin-react-hooks, eslint-plugin-next
		'next/core-web-vitals', // updates eslint-plugin-next to error on a number of rules that are warnings by default if they affect Core Web Vitals.
		'plugin:@next/next/recommended',
	],
	ignorePatterns: ['node_modules/*', '.out/*', '.next/*'],
	rules: {
		'react/prop-types': 'off',
		'react/display-name': 'off',
		'react/react-in-jsx-scope': 'off',
		'react-hooks/exhaustive-deps': 'warn',
		'react-hooks/rules-of-hooks': 'error',
		'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
	},
};

const eslintPlugin = {
	extends: [
		'eslint:recommended', // eslint
	],
	rules: {
		'newline-before-return': 'error',
		'no-unsafe-optional-chaining': 'off',
	},
};

const tailwindPlugin = {
	extends: ['plugin:tailwind/recommended'],
};

const a11yPlugin = {
	extends: ['plugin:prettier/recommended'], // eslint-config-prettier
	rules: {
		'jsx-a11y/anchor-is-valid': 'off', // This rule is not compatible with Next.js <Link /> components
	},
};

const prettierPlugin = {
	ignorePatterns: ['!.prettierrc'], // we want to lint .prettierrc (ignored by default by eslint)
	extends: [
		'plugin:prettier/recommended', // eslint-config-prettier
	],
	rules: {
		'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Includes .prettierrc.js rules
	},
};

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
				allow: [
					'**/*.css',
					'**/*.png',
					'**/*.svg',
					'**/*.jpg',
					'**/*.jpeg',
					'node',
					'@testing-library/jest-dom/extend-expect',
				],
			},
		],
		'import/order': [
			'error',
			{
				groups: [
					['builtin', 'external'],
					'internal',
					['parent', 'sibling', 'index'],
					'type',
				],
				pathGroups: [
					{
						pattern: 'ui',
						group: 'internal',
						position: 'after',
					},
					{
						pattern: 'apis',
						group: 'type',
						position: 'before',
					},
					{
						pattern: 'types',
						group: 'type',
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
			},
		],
	},
	overrides: [
		{
			files: [
				'./src/pages/**/*.tsx',
				'./src/pages/**/*.ts',
				'./src/types/global.d.ts',
			],
			rules: {
				'import/no-default-export': 'off',
			},
		},
	],
	typescriptConfig: {
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
};

const typescriptConfig = {
	files: ['**/*.ts', '**/*.tsx'],
	plugins: ['@typescript-eslint'],
	parser: '@typescript-eslint/parser',
	settings: {
		...importPlugin.typescriptConfig.settings,
	},
	extends: [
		...importPlugin.typescriptConfig.extends,
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
	},
};

module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
		jest: true,
	},
	settings: {
		...importPlugin.settings,
	},
	ignorePatterns: [
		...nextPlugin.ignorePatterns,
		...prettierPlugin.ignorePatterns,
		'.husky/*',
	],
	plugins: [...importPlugin.plugins],
	extends: [
		...eslintPlugin.extends,
		...nextPlugin.extends,
		...importPlugin.extends,
		...a11yPlugin.extends,
		...prettierPlugin.extends,
		...tailwindPlugin.extends,
	],
	rules: {
		...eslintPlugin.rules,
		...nextPlugin.rules,
		...importPlugin.rules,
		...a11yPlugin.rules,
		...prettierPlugin.rules,
	},
	overrides: [typescriptConfig, ...importPlugin.overrides],
};
