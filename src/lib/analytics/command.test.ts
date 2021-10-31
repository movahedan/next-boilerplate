import { analyticEvent } from './command';
import {
	prepareDataLayer,
	getDataLayerSpy,
	expectDataLayer,
} from './utils.test';

const sampleEventFields = {
	testing: { value: 'success' },
};

const eventType = 'eventType';

describe('Analytic Commands', () => {
	beforeAll(prepareDataLayer);

	it('trackPageViewEvent calls dataLayer.push with proper args:', () => {
		const dataLayer = getDataLayerSpy();

		analyticEvent<typeof eventType, typeof sampleEventFields>(
			eventType,
			sampleEventFields
		);

		expectDataLayer(dataLayer).toBePushedWith(eventType, {
			data: sampleEventFields,
		});
	});
});
