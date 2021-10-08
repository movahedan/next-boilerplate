import { getParsedUserAgent } from '.';

it('get-user-agent should return proper user-agent', () => {
	expect(getParsedUserAgent(sampleUa)).toEqual(sampleResult);
});

const sampleUa =
	'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:92.0) Gecko/20100101 Firefox/92.0';
const sampleResult = {
	browser: {
		major: '92',
		name: 'Firefox',
		version: '92.0',
	},
	cpu: {
		architecture: 'amd64',
	},
	device: {
		model: undefined,
		type: undefined,
		vendor: undefined,
	},
	engine: {
		name: 'Gecko',
		version: '92.0',
	},
	os: {
		name: 'Ubuntu',
		version: undefined,
	},
	ua: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:92.0) Gecko/20100101 Firefox/92.0',
};
