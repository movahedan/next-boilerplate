module.exports = {
	'**/*.ts?(x)': () => 'yarn type-check',
	'**/*.(ts)?(x)': () => 'yarn lint',
	'**/*.test.ts?(x)': () => 'yarn test -o',
};
