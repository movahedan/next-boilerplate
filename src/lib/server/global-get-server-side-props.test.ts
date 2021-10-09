import { getMatchMediasByGivenMediaQuery } from 'lib/browser';

import { globalGetServerSideProps, getCacheConfig } from '.';

describe('global-get-server-side-props', () => {
	const sampleGetServerSidePropsResult = { someAttribute: 'value' };
	const sampleGetServerSideProps = async () => ({
		props: sampleGetServerSidePropsResult,
	});

	it('should initialize dom media-query', async () => {
		const ctx = {
			req: { headers: { 'user-agent': '' } },
		};

		const results = await globalGetServerSideProps(sampleGetServerSideProps)(
			// @ts-expect-error It's just for mocking purpose
			ctx
		);

		expect(results).toEqual({
			props: {
				...sampleGetServerSidePropsResult,
				browser: {
					mediaQuery: getMatchMediasByGivenMediaQuery('lg'),
				},
			},
		});
	});

	it('should set cahce header on given config', async () => {
		const setHeader = jest.fn();
		const ctx = {
			req: {},
			res: { setHeader },
		};

		await globalGetServerSideProps(sampleGetServerSideProps, {
			cachable: true,
			// @ts-expect-error It's just for mocking purpose
		})(ctx);

		expect(setHeader).toBeCalledWith('Cache-Control', getCacheConfig());
	});
});
