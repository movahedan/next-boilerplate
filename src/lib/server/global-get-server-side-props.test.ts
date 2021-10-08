import { getMatchMediasByGivenMediaQuery } from 'lib/browser';

import { globalGetServerSideProps } from '.';

describe('global-get-server-side-props', () => {
	const sampleGetServerSidePropsResult = { someAttribute: 'value' };

	it('should initialize dom media-query', async () => {
		const results = await globalGetServerSideProps(async () => ({
			props: sampleGetServerSidePropsResult,
		}))({
			// @ts-expect-error It's just for mocking purpose
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