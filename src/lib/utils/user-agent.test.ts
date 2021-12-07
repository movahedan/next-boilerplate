import {
	desktopUserAgentCases,
	mobileUserAgentCases,
} from '__mocks__/mock-user-agent.jest';

import { getHeaderUserAgent, getIsMobileUserAgent } from './user-agent';

describe('user-agent', () => {
	describe('getHeaderUserAgent', () => {
		it('should return the user-agent inside of passed header', () => {
			const userAgent = getHeaderUserAgent({
				'user-agent': mobileUserAgentCases[0][1],
			});
			expect(userAgent).toBe(mobileUserAgentCases[0][1]);
		});

		it('should return an empty string if no user-agent available in passed header', () => {
			const userAgent = getHeaderUserAgent({ 'user-agent': undefined });
			expect(userAgent).toBe('');
		});
	});

	describe('getIsMobileUserAgent', () => {
		test.each(mobileUserAgentCases)(
			'should return true for mobile user agents (like: %p)',
			(_, value: string) => {
				expect(getIsMobileUserAgent(value)).toBeTruthy();
			}
		);

		test.each(desktopUserAgentCases)(
			'should return false for desktop user agents (like: %p)',
			(_, value: string) => {
				expect(getIsMobileUserAgent(value)).toBeFalsy();
			}
		);
	});
});
