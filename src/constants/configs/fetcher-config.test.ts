import { fetcher } from 'lib/fetcher';

import { fetcherConfig } from './fetcher-config';

describe('fetcherConfig', () => {
	beforeEach(() => {
		fetcherConfig();
	});

	it('the function should config fetcher to send credentials', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({ foo: 'bar' }));
		await fetcher('/');

		expect(global.fetch).toBeCalledWith('/', {
			credentials: 'include',
		});
	});

	it('the function should config fetcher to console.error', async () => {
		fetchMock.mockResolvedValueOnce({
			ok: false,
			status: 500,
			statusText: 'error',
			url: '/',
		} as Response);

		const consoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => undefined);

		await fetcher('/').catch(() => {
			expect(consoleError).toHaveBeenCalledWith({
				name: '500',
				message: 'error',
				stack: '/',
				apiError: { ok: false, status: 500, statusText: 'error', url: '/' },
			});
		});
	});
});
