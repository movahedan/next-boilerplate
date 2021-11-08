import { getMatchMediasByGivenMediaQuery } from 'lib/browser/browser.utils';

import { globalGetServerSideProps } from './global-get-server-side-props';

import type { GetServerSidePropsContext } from 'next';

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
		} as GetServerSidePropsContext;

		const results = await globalGetServerSideProps(sampleGetServerSideProps)(
			ctx
		);

		expect(results).toEqual({
			props: {
				...sampleGetServerSidePropsResult,
				browser: {
					mediaQueries: getMatchMediasByGivenMediaQuery('sm'),
				},
			},
		});
	});

	it('should set cache header on given config', async () => {
		const setHeader = jest.fn();
		const ctx = {
			req: {},
			res: { setHeader },
		} as unknown as GetServerSidePropsContext;

		await globalGetServerSideProps(sampleGetServerSideProps, {
			cache: true,
		})(ctx);

		expect(setHeader).toBeCalledWith(
			'Cache-Control',
			'public, max-age=10, stale-while-revalidate=60'
		);
	});

	it("should do not return browser data when given getServerSideProps does not have any props on it's results", async () => {
		const ctx = {
			req: {},
		} as GetServerSidePropsContext;

		const results = await globalGetServerSideProps(
			sampleRedirectGetServerSideProps
		)(ctx);

		expect(results).toEqual(sampleRedirectGetServerSidePropsResults);
	});
});
