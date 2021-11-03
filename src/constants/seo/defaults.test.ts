import { getDefaultNextSeoConfig } from '.';

describe('reportWebVitals', () => {
	it('should log web vitals when the environment variable is available', () => {
		expect(getDefaultNextSeoConfig({ noIndex: false }).noindex).toBe(false);
		expect(getDefaultNextSeoConfig({ noIndex: false }).nofollow).toBe(false);
		expect(getDefaultNextSeoConfig({ noIndex: false }).disableGooglebot).toBe(
			false
		);
	});

	it('should not log web vitals when the environment variable is unavailable', () => {
		// process.env = {
		// 	...ORIGINAL_ENV,
		// 	NODE_ENV: 'test',
		// 	NEXT_PUBLIC_INDEXING_ENABLED: undefined,
		// };

		expect(getDefaultNextSeoConfig({ noIndex: true }).noindex).toBe(true);
		expect(getDefaultNextSeoConfig({ noIndex: true }).nofollow).toBe(true);
		expect(getDefaultNextSeoConfig({ noIndex: true }).disableGooglebot).toBe(
			true
		);
	});
});
