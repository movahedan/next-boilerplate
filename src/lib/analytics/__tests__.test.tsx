import { render } from '@testing-library/react';
import { create } from 'react-test-renderer';

import { AnalyticsHeadScript, useAnalytics } from 'lib/analytics';
import {
	prepareDataLayer,
	getDataLayerSpy,
	expectDataLayer,
} from 'lib/analytics/utils.test';

import { analyticEvent } from './command';

jest.useFakeTimers();

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

describe('Analytic Commands', () => {
	beforeAll(prepareDataLayer);

	it('trackPageViewEvent calls dataLayer.push with proper args:', () => {
		const dataLayer = getDataLayerSpy();

		const eventType = 'eventType';
		const sampleEventFields = {
			testing: { value: 'success' },
		};
		analyticEvent<typeof eventType, typeof sampleEventFields>(
			eventType,
			sampleEventFields
		);

		expectDataLayer(dataLayer).toBePushedWith(eventType, {
			data: sampleEventFields,
		});
	});
});

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
