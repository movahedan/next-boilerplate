import { render } from '@testing-library/react';

import { useAnalytics } from 'lib/analytics';
import {
	prepareDataLayer,
	getDataLayerSpy,
	expectDataLayer,
} from 'lib/analytics/testing-utilities.test';

jest.useFakeTimers();

describe('useAnalytics', () => {
	const PageWithAnalyticTracker = () => {
		useAnalytics(
			() => ({
				eventType: 'sample',
				data: {},
			}),
			[]
		);

		return null;
	};

	const AnalyticTrackingWrongAttachment = () => {
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		useAnalytics(() => () => {}, []);

		return (
			<div>
				<button data-testid='btn' />
			</div>
		);
	};

	beforeAll(() => {
		prepareDataLayer();
	});

	it('should fire analytics push event on page view', async () => {
		const dataLayer = getDataLayerSpy();
		render(<PageWithAnalyticTracker />);

		expectDataLayer(dataLayer).toBePushedWith('sample', {
			data: {},
		});
	});

	it('should not fire analytics push event when ref is not attached', async () => {
		jest.spyOn(console, 'error').mockImplementation(() => undefined);
		expect(() => render(<AnalyticTrackingWrongAttachment />)).toThrowError(
			'[useAnalytics]: containerRef is not attached to any element'
		);
	});
});
