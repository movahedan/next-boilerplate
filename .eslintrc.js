module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
		jest: true,
	},
	extends: [
		'.eslint/a11y.js',
		'.eslint/eslint.js',
		'.eslint/import.js',
		'.eslint/next.js',
		'.eslint/hooks.js',
		'.eslint/prettier.js',
		'.eslint/tailwind.js',
		'.eslint/typescript.js',
	],
};
