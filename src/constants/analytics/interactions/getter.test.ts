import { interactionEventKey } from './documents';
import { getInteraction } from './getter';

describe('Analytics common event object tools: getPage', () => {
	let defaultProps = {
		location: '',
		component: '',
		description: '',
		details: '',
	};

	beforeEach(() => {
		defaultProps = {
			location: '',
			component: '',
			description: '',
			details: '',
		};
	});

	it('should return correct data', () => {
		const result = getInteraction(defaultProps);

		const expectedResults = {
			eventType: interactionEventKey,
			data: {
				interaction: {
					location: '',
					component: '',
					description: '',
					details: '',
				},
			},
		};

		expect(result).toEqual(expectedResults);
	});
});
