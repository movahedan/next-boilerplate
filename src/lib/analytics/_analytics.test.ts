import {
	prepareDataLayer,
	getDataLayerSpy,
	expectDataLayer,
} from 'lib/analytics/testing-utilities.test';

import { analyticEvent } from './_analytics';

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
