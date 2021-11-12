module.exports = {
	'**/*.ts?(x)': () => ['yarn type-check', 'yarn lint', 'yarn test -o'],
};
