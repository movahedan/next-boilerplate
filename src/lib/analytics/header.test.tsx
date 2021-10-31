import { render } from '@testing-library/react';
import React from 'react';

import { AnalyticsHeadScript } from './header';

describe('<AnalyticsHeadScript>', () => {
	it('should renders correct script', async () => {
		const { queryByTestId } = render(
			<AnalyticsHeadScript url={process.env.ANALYTIC_URL} />
		);

		const scriptElement = queryByTestId('analytics-script');

		expect(scriptElement).toHaveAttribute('async');
		expect(scriptElement).toHaveAttribute('defer');
		expect(scriptElement).toHaveAttribute('src', process.env.ANALYTIC_URL);
	});

	it('should returns null when no url is passed to it', async () => {
		const { queryByTestId } = render(<AnalyticsHeadScript />);

		const scriptElement = queryByTestId('analytics-script');

		expect(scriptElement).not.toBeInTheDocument();
	});
});
