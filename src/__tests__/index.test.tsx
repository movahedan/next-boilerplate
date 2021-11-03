import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { create } from 'react-test-renderer';

import { attachBrowserServerSideData } from 'lib/browser';
import Homepage, { getServerSideProps } from 'pages/index';

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
			req: { headers: {} },
			res: { setHeader: jest.fn() },
			query: {},
			resolvedUrl: '/',
		};

		// @ts-expect-error Mocking
		const results = await getServerSideProps(context);
		expect(results).toEqual({
			props: {
				data: {
					message: 'Message from getServerSideProps',
				},
				...attachBrowserServerSideData(context.req.headers),
			},
		});
	});
});
