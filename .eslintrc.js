module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
		jest: true,
	},
	extends: [
		'.linters/a11y.js',
		'.linters/eslint.js',
		'.linters/import.js',
		'.linters/next.js',
		'.linters/prettier.js',
		'.linters/tailwind.js',
		'.linters/typescript.js',
	],
};
