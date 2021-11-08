import {
	getIsTablet,
	getIsDesktop,
	getUserAgent,
	getParsedUserAgent,
} from './user-agent';

import type { IResult } from 'ua-parser-js';

describe('user-agent', () => {
	it('getUserAgent should return proper user-agent', () => {
		const headers = {
			'user-agent': sampleUa,
		};

		expect(getUserAgent(headers)).toEqual(sampleUa);
		expect(getUserAgent({})).toEqual('');
	});

	it('getParsedUserAgent should return proper user-agent', () => {
		expect(getParsedUserAgent(sampleUa)).toEqual(sampleResult);
	});

	describe('getIsDesktop', () => {
		test.each(['console', 'smarttv', 'wearable', 'embedded'])(
			'getIsDesktop should return true for device type: $p',
			(type) => {
				expect(
					getIsDesktop({ ua: '', device: { type } } as unknown as IResult)
				).toBeTruthy();
			}
		);

		test.each(['tablet', 'mobile', '', undefined])(
			'getIsDesktop should return false for device type: $p',
			(type) => {
				expect(
					getIsDesktop({ ua: '', device: { type } } as unknown as IResult)
				).toBeFalsy();
			}
		);
	});

	describe('getIsTablet', () => {
		it('should return true for iPad', () => {
			const isTablet = getIsTablet({
				ua: 'iPad',
				device: {},
			} as unknown as IResult);
			expect(isTablet).toBe(true);
		});

		it('should return true for device type: tablet', () => {
			const isTablet = getIsTablet({
				ua: '',
				device: { type: 'tablet' },
			} as unknown as IResult);
			expect(isTablet).toBe(true);
		});
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
