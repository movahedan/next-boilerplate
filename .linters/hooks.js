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

const hooksPlugin = {
	rules: {
		'react-hooks/exhaustive-deps': ['warn', { additionalHooks }],
		'react-hooks/rules-of-hooks': 'error',
	},
};

module.exports = hooksPlugin;
