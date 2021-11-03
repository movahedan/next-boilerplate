import { renderHook } from '@testing-library/react-hooks';

import { useAnalytics } from 'lib/analytics';
import {
	prepareDataLayer,
	getDataLayerSpy,
	expectDataLayer,
} from 'lib/analytics/testing-utilities.test';

import { pageViewEventKey } from './documents';
import { getSamplePageAnalyticsProps } from './sample';

describe('trackBrowsePagesView', () => {
	beforeAll(prepareDataLayer);

	it('trackBrowsePagesView calls dataLayer.push with proper args', () => {
		const dataLayer = getDataLayerSpy();

		renderHook(() => {
			useAnalytics(() => getSamplePageAnalyticsProps(), []);
		});

		expectDataLayer(dataLayer).toBePushedWith(pageViewEventKey, expectedEvent);
	});
});

const expectedEvent = {
	data: {
		page: {
			id: '',
			type: 'sample',
			name: 'sample',
			tags: ['sample'],
			breadcrumbs: [''],
			primary_category: '',
			secondary_category: '',
			updated_date: 'NaN/NaN/NaN',
		},
	},
};
