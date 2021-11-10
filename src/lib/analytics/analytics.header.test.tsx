import { render } from '@testing-library/react';
import { create } from 'react-test-renderer';

import { AnalyticsHeadScript } from 'lib/analytics';

describe('<AnalyticsHeadScript>', () => {
	it('should renders correct script', async () => {
		const url = 'https://domain.com';
		const { queryByTestId } = render(<AnalyticsHeadScript url={url} />);

		const scriptElement = queryByTestId('analytics-script');

		expect(scriptElement).toHaveAttribute('async');
		expect(scriptElement).toHaveAttribute('defer');
		expect(scriptElement).toHaveAttribute('src', url);
	});

	it('should returns null when no url is passed to it', async () => {
		const component = create(<AnalyticsHeadScript />).toJSON();

		expect(component).toMatchSnapshot();
	});
});
