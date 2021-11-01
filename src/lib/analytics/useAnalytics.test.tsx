import { render } from '@testing-library/react';

import { useAnalytics } from 'lib/analytics';
import {
	prepareDataLayer,
	getDataLayerSpy,
	expectDataLayer,
} from 'lib/analytics/utils.test';

jest.useFakeTimers();
const tracker = jest.fn();

describe('Header event tracking', () => {
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

	it('should not fire analytics push event when ref attached to wrong element', async () => {
		expect(() => render(<AnalyticTrackingWrongAttachment />)).toThrow();
	});
});

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
	useAnalytics(() => tracker, []);

	return (
		<div>
			<button data-testid='btn' />
		</div>
	);
};
