import { getMatchMediasByGivenMediaQuery } from 'lib/browser';

import { globalGetServerSideProps } from '.';

describe('global-get-server-side-props', () => {
	const sampleGetServerSidePropsResult = { someAttribute: 'value' };

	it('should initialize dom media-query', async () => {
		const results = await globalGetServerSideProps(async () => ({
			props: sampleGetServerSidePropsResult,
		}))({
			// @ts-ignore
			req: {
				headers: {
					'user-agent': '',
				},
			},
		});

		expect(results).toEqual({
			props: {
				...sampleGetServerSidePropsResult,
				browser: {
					mediaQuery: getMatchMediasByGivenMediaQuery('lg'),
				},
			},
		});
	});
});
