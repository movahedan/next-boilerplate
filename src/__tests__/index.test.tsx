import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import Homepage, { getServerSideProps } from 'pages/index';

import type { GetServerSidePropsContext } from 'next';

describe('<Homepage>', () => {
	it('should match snapshot', async () => {
		const component = create(
			<Homepage data={{ message: 'Message from getServerSideProps' }} />
		).toJSON();
		expect(component).toMatchSnapshot();
	});

	it('should be accessible', async () => {
		const { container } = render(
			<Homepage data={{ message: 'Message from getServerSideProps' }} />
		);
		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	it('should have getServerSideProps', async () => {
		const context = {
			req: { headers: { 'user-agent': '' } },
			res: { setHeader: jest.fn() },
			query: {},
			resolvedUrl: '/',
		} as unknown as GetServerSidePropsContext;

		const results = await getServerSideProps(context);
		expect(results).toEqual({
			props: {
				data: {
					message: 'Message from getServerSideProps',
				},
				browser: {
					mediaQueries: {
						lg: false,
						md: false,
						sm: true,
					},
				},
			},
		});
	});
});
