import { cacheThisServerSideProps } from './cache-this-server-side-props';

import type { ServerResponse } from 'http';

describe('cacheThisServerSideProps', () => {
	const mockRes: Pick<ServerResponse, 'setHeader'> = { setHeader: jest.fn() };

	it('should add cache-control header with non-risky default values', async () => {
		cacheThisServerSideProps(mockRes);

		expect(mockRes.setHeader).toBeCalledWith(
			'Cache-Control',
			'public, max-age=10, stale-while-revalidate=60'
		);
	});

	it('should add cache-control header with customizable values', async () => {
		cacheThisServerSideProps(mockRes, { maxAge: 100, swr: 600 });

		expect(mockRes.setHeader).toBeCalledWith(
			'Cache-Control',
			'public, max-age=100, stale-while-revalidate=600'
		);
	});

	it('should have support for removing config', async () => {
		cacheThisServerSideProps(mockRes, { maxAge: 100, swr: null });

		expect(mockRes.setHeader).toBeCalledWith(
			'Cache-Control',
			'public, max-age=100'
		);
	});
});
