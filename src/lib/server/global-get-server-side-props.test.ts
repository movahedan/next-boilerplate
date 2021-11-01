import { getMatchMediasByGivenMediaQuery } from 'lib/browser';

import { globalGetServerSideProps, getCacheConfig } from '.';

describe('global-get-server-side-props', () => {
	const sampleGetServerSidePropsResult = { someAttribute: 'value' };
	const sampleGetServerSideProps = async () => ({
		props: sampleGetServerSidePropsResult,
	});
	const sampleRedirectGetServerSidePropsResults = {
		redirect: {
			destination: '/',
			permanent: false,
		},
	};
	const sampleRedirectGetServerSideProps = async () =>
		sampleRedirectGetServerSidePropsResults;

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

	it('should set cache header on given config', async () => {
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

	it("should do not return browser data when given getServerSideProps does not have any props on it's results", async () => {
		const ctx = {
			req: {},
		};

		const results = await globalGetServerSideProps(
			sampleRedirectGetServerSideProps
			// @ts-expect-error It's just for mocking purpose
		)(ctx);

		expect(results).toEqual(sampleRedirectGetServerSidePropsResults);
	});
});
