import { setCacheHeader } from './set-cache-header';

import type { ServerResponse } from 'http';

describe('setCacheHeader', () => {
	const mockSetHeader = jest.fn();
	const res = {
		setHeader: mockSetHeader,
	} as unknown as ServerResponse;

	it('should add cache-control header with non-risky default values', async () => {
		setCacheHeader(res);

		expect(mockSetHeader).toBeCalledWith(
			'Cache-Control',
			'public, max-age=10, stale-while-revalidate=60'
		);
	});

	it('should add cache-control header with customizable values', async () => {
		setCacheHeader(res, { maxAge: 100, swr: 600 });

		expect(mockSetHeader).toBeCalledWith(
			'Cache-Control',
			'public, max-age=100, stale-while-revalidate=600'
		);
	});

	it('should have support for null swr config', async () => {
		setCacheHeader(res, { maxAge: 100, swr: null });

		expect(mockSetHeader).toBeCalledWith(
			'Cache-Control',
			'public, max-age=100'
		);
	});

	it('should have support for null maxAge config', async () => {
		setCacheHeader(res, { maxAge: null, swr: 300 });

		expect(mockSetHeader).toBeCalledWith(
			'Cache-Control',
			'public, stale-while-revalidate=300'
		);
	});

	it('should have support for null maxAge and swr config', async () => {
		setCacheHeader(res, { maxAge: null, swr: null });

		expect(mockSetHeader).toBeCalledWith('Cache-Control', 'public');
	});
});
