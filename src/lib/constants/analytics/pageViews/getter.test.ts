import { pageViewEventKey } from './documents';
import { getAnalyticsPage } from './getter';

describe('Analytics common event object tools: getPage', () => {
	let defaultProps = {
		id: '1',
		lastUpdated: '2021-08-03T11:25:42.566+10:00',
		name: 'name',
		type: 'type',
	};

	beforeEach(() => {
		defaultProps = {
			id: '1',
			lastUpdated: '2021-08-03T11:25:42.566+10:00',
			name: 'name',
			type: 'type',
		};
	});

	it('should return correct data', () => {
		const result = getAnalyticsPage(defaultProps);

		const expectedResults = {
			eventType: pageViewEventKey,
			data: {
				page: {
					id: defaultProps.id,
					name: defaultProps.name,
					type: defaultProps.type,
					primary_category: '',
					secondary_category: '',
					tags: [defaultProps.name],
					breadcrumbs: [''],
					updated_date: '03/08/2021',
				},
			},
		};

		expect(result).toEqual(expectedResults);
	});

	it('should return correct data when lastUpdated is invalid or blank', () => {
		const result = getAnalyticsPage({ ...defaultProps, lastUpdated: '' });

		const expectedResults = {
			eventType: pageViewEventKey,
			data: {
				page: {
					id: defaultProps.id,
					name: defaultProps.name,
					type: defaultProps.type,
					primary_category: '',
					secondary_category: '',
					tags: [defaultProps.name],
					breadcrumbs: [''],
					updated_date: '',
				},
			},
		};

		expect(result).toEqual(expectedResults);
	});
});
