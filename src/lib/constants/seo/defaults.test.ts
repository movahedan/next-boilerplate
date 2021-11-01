import { getDefaultNextSeoConfig } from '.';

describe('reportWebVitals', () => {
	const ORIGINAL_ENV = process.env;
	afterAll(() => {
		process.env = ORIGINAL_ENV;
	});
	beforeEach(() => {
		jest.resetModules();

		process.env = {
			...ORIGINAL_ENV,
			NODE_ENV: 'test',
			NEXT_PUBLIC_INDEXING_ENABLED: 'true',
		};
	});

	it('should log web vitals when the environment variable is available', () => {
		expect(getDefaultNextSeoConfig().noindex).toBe(false);
		expect(getDefaultNextSeoConfig().nofollow).toBe(false);
		expect(getDefaultNextSeoConfig().disableGooglebot).toBe(false);
	});

	it('should not log web vitals when the environment variable is unavailable', () => {
		process.env = {
			...ORIGINAL_ENV,
			NODE_ENV: 'test',
			NEXT_PUBLIC_INDEXING_ENABLED: undefined,
		};

		expect(getDefaultNextSeoConfig().noindex).toBe(true);
		expect(getDefaultNextSeoConfig().nofollow).toBe(true);
		expect(getDefaultNextSeoConfig().disableGooglebot).toBe(true);
	});
});
