const a11yPlugin = {
	extends: ['plugin:jsx-a11y/recommended'], // eslint-config-prettier
	rules: {
		'jsx-a11y/anchor-is-valid': 'off', // This rule is not compatible with Next.js <Link /> components
	},
};

module.exports = a11yPlugin;
