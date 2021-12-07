const additionalHooks = `(${[
	'useAnalytics',
	'useIntersect',
	'useResizeEffect',
	'useScrollEffect',
	'useThrottleCallback',
	'useThrottleEffect',
	'useMouseEffect',
	'useScrollEffect',
].join('|')})`;

const nextPlugin = {
	extends: ['next/core-web-vitals'],
	rules: {
		'react-hooks/exhaustive-deps': ['warn', { additionalHooks }],
		'react-hooks/rules-of-hooks': 'error',
		'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
	},
};

module.exports = nextPlugin;
