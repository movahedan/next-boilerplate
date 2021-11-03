import {
	getIsTablet,
	getIsDesktop,
	getUserAgent,
	getParsedUserAgent,
} from './user-agent';

describe('user-agent', () => {
	it('getUserAgent should return proper user-agent', () => {
		const sampleServerUa =
			'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:92.0) Gecko/20100101 Firefox/92.0';

		const headers = {
			'user-agent': sampleServerUa,
		};

		expect(getUserAgent(headers)).toEqual(sampleServerUa);
		expect(getUserAgent({})).toEqual('');
	});

	it('getParsedUserAgent should return proper user-agent', () => {
		expect(getParsedUserAgent(sampleUa)).toEqual(sampleResult);
	});

	it('getIsDesktop should return isTablet boolean', () => {
		expect(
			// @ts-expect-error It's just for mocking purpose
			getIsDesktop({ ua: '', device: { type: 'tablet' } })
		).toBeFalsy();

		expect(
			// @ts-expect-error It's just for mocking purpose
			getIsDesktop({ ua: '', device: { type: 'mobile' } })
		).toBeFalsy();

		expect(
			// @ts-expect-error It's just for mocking purpose
			getIsDesktop({ ua: 'iPad', device: { type: 'tablet' } })
		).toBeFalsy();

		expect(
			// @ts-expect-error It's just for mocking purpose
			getIsDesktop({ ua: '', device: { type: '' } })
		).toBeTruthy();
	});

	it('getIsTablet should return isTablet boolean', () => {
		let isTablet = false;

		// @ts-expect-error It's just for mocking purpose
		isTablet = getIsTablet({ ua: '', device: { type: 'tablet' } });
		expect(isTablet).toBe(true);

		// @ts-expect-error It's just for mocking purpose
		isTablet = getIsTablet({ ua: 'iPad', device: {} });
		expect(isTablet).toBe(true);

		// @ts-expect-error It's just for mocking purpose
		isTablet = getIsTablet({ ua: 'iPad', device: { type: 'tablet' } });
		expect(isTablet).toBe(true);

		// @ts-expect-error It's just for mocking purpose
		isTablet = getIsTablet({ ua: '', device: { type: 'mobile' } });
		expect(isTablet).toBe(false);
	});
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
