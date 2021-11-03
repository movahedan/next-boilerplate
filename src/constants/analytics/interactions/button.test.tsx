import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-test-renderer';

import { useAnalytics } from 'lib/analytics';
import {
	prepareDataLayer,
	getDataLayerSpy,
	expectDataLayer,
} from 'lib/analytics/testing-utilities.test';

import { trackHeaderInteractions } from 'constants/analytics';

import { interactionEventKey } from './documents';

jest.useFakeTimers();

const HeaderWithAnalyticTracking = () => {
	const ref = useAnalytics<undefined, undefined, HTMLDivElement>(
		() => trackHeaderInteractions,
		[]
	);

	return (
		<div ref={ref}>
			<button data-testid='btn' />
		</div>
	);
};

describe('Header event tracking', () => {
	beforeAll(() => {
		prepareDataLayer();
	});

	it('should fire analytics push event on button click', async () => {
		const dataLayer = getDataLayerSpy();
		const { getByTestId } = render(<HeaderWithAnalyticTracking />);

		jest.runAllTimers();

		act(() => {
			userEvent.click(getByTestId('btn'));
		});

		expectDataLayer(dataLayer).toBePushedWith(interactionEventKey, {
			data: {
				interaction: {
					location: 'location',
					component: 'button',
					description: 'description',
					details: '',
				},
			},
		});
	});

	it('should not fire analytics push event when there is no button', async () => {
		const dataLayer = getDataLayerSpy();
		const { queryByTestId } = render(<HeaderWithAnalyticTracking />);

		jest.runAllTimers();

		const button = queryByTestId('a-button-that-doest-not-exist');

		if (button) {
			act(() => {
				userEvent.click(button);
			});
		}

		expectDataLayer(dataLayer).not.toBeCalled();
	});
});
