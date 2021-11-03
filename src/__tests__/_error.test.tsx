import { screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { getPage } from 'next-page-tester';
import { create } from 'react-test-renderer';

import ErrorPage from 'pages/_error';

describe.skip('<ErrorPage>', () => {
	it('page renders and matches snapshot', async () => {
		const { serverRenderToString, render } = await getPage({
			route: '/_error',
		});

		// check correctness of SSR result
		const { html } = serverRenderToString();
		expect(html).toMatchSnapshot();

		// check hydrated app
		const { nextRoot } = render();
		expect(nextRoot.outerHTML).toMatchSnapshot();
	});

	it('should match snapshot', async () => {
		const component = create(<ErrorPage />).toJSON();
		expect(component).toMatchSnapshot();

		const { render } = await getPage({
			route: '/_error',
			res: ((res) => ({ ...res, statusCode: 500 })) as Parameters<
				typeof getPage
			>[0]['res'],
		});

		render();
		expect(
			screen.getByText('An error 500 occurred on server')
		).toBeInTheDocument();
	}, 10_000);

	it('should be accessible', async () => {
		const { render } = await getPage({
			route: '/_error',
		});

		const { nextRoot } = render();
		const results = await axe(nextRoot);
		expect(results).toHaveNoViolations();
	});
});
