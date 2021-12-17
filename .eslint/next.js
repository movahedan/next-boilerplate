const nextPlugin = {
	extends: ['next/core-web-vitals'],
	rules: {
		'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
	},
};

module.exports = nextPlugin;
