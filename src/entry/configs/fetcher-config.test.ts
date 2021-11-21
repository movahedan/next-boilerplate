import { fetcher } from 'lib/fetcher';

import { fetcherConfig } from './fetcher-config';

describe('fetcherConfig', () => {
	const dispatcher = jest.fn();
	let consoleError = jest
		.spyOn(console, 'error')
		.mockImplementation(() => undefined);

	beforeEach(() => {
		fetcherConfig(dispatcher);
		consoleError = jest
			.spyOn(console, 'error')
			.mockImplementation(() => undefined);
	});

	it('the function should config fetcher to send credentials', async () => {
		fetchMock.mockResponseOnce(JSON.stringify({ foo: 'bar' }));
		await fetcher('/');

		expect(global.fetch).toBeCalledWith('/', {
			credentials: 'include',
		});
	});

	it('the function should config fetcher in a way to console.error the network error', async () => {
		fetchMock.mockRejectedValue({
			error: 'error-name',
			message: 'error-message',
			stack: '',
		});

		await fetcher('/api/data').catch(() => {
			expect(dispatcher).not.toHaveBeenCalled();
			expect(consoleError).toHaveBeenCalledWith({
				error: 'error-name',
				message: 'error-message',
				stack: '',
			});
		});
	});

	it('the function should config fetcher in a way to console.error', async () => {
		fetchMock.mockResolvedValueOnce({
			ok: false,
			status: 500,
			statusText: 'error-status-text',
			url: '/api/data',
		} as Response);

		await fetcher('/api/data').catch(() => {
			expect(consoleError).toHaveBeenCalledWith({
				name: '500',
				message: 'error-status-text',
				stack: '/api/data',
				apiError: {
					ok: false,
					status: 500,
					statusText: 'error-status-text',
					url: '/api/data',
				},
			});
		});
	});

	it('the function should config fetcher in a way to handle 401 errors', async () => {
		fetchMock.mockResolvedValueOnce({
			ok: false,
			status: 401,
			statusText: 'error-status-text',
			url: '/api/data',
		} as Response);

		await fetcher('/api/data').catch(() => {
			expect(dispatcher).toHaveBeenCalledWith(false);
			expect(consoleError).toHaveBeenCalledWith({
				name: '401',
				message: 'error-status-text',
				stack: '/api/data',
				apiError: {
					ok: false,
					status: 401,
					statusText: 'error-status-text',
					url: '/api/data',
				},
			});
		});
	});
});
