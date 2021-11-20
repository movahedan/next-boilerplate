const prettierPlugin = {
	ignorePatterns: ['!.prettierrc'], // we want to lint .prettierrc (ignored by default by eslint)
	extends: [
		'plugin:prettier/recommended', // eslint-config-prettier
	],
	rules: {
		'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Includes .prettierrc.js rules
	},
};

module.exports = prettierPlugin;
