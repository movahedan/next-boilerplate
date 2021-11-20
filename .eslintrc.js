module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true,
		jest: true,
	},
	extends: [
		'.linters/eslint.js',
		'.linters/tailwind.js',
		'.linters/import.js',
		'.linters/prettier.js',
		'.linters/a11y.js',
		'.linters/typescript.js',
	],
};
