import { fetcher } from './fetcher';

describe('fetcher', () => {
	it('should have setDefaultConfig and setErrorHandler attached to it', () => {
		expect(fetcher.setDefaultConfig).toBeTruthy();
		expect(fetcher.setErrorHandler).toBeTruthy();
	});

	it('should fetch!', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({ foo: 'bar' }));

		const results = await fetcher('/');
		expect(results).toStrictEqual({ foo: 'bar' });
	});

	it('should properly throw api error', async () => {
		fetchMock.mockResolvedValueOnce({
			ok: false,
			status: 500,
			statusText: 'error',
			url: '/',
		} as Response);

		fetcher('/').catch((error) => {
			expect(error).toStrictEqual({
				name: '500',
				message: 'error',
				stack: '/',
				apiError: { ok: false, status: 500, statusText: 'error', url: '/' },
			});
		});
	});

	it('should throw api with the error handler given before', async () => {
		fetcher.setErrorHandler((error) => {
			throw {
				...error,
				apiError: {
					...error.apiError,
					foo: 'bar',
				},
			};
		});

		fetchMock.mockResolvedValueOnce({
			ok: false,
			status: 500,
			statusText: 'error',
			url: '/',
		} as Response);

		fetcher('/').catch((error) => {
			expect(error).toStrictEqual({
				name: '500',
				message: 'error',
				stack: '/',
				apiError: {
					ok: false,
					status: 500,
					statusText: 'error',
					url: '/',
					foo: 'bar',
				},
			});
		});
	});
});
