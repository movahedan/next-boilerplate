import { pageViewEventKey } from './documents';

import type { PageViewEvent } from './documents';
import type { AnalyticEventInfo } from 'lib/analytics';

export const getAnalyticsPage = (props: {
	id: string;
	name: string;
	type: string;
	lastUpdated: string;
}): AnalyticEventInfo<typeof pageViewEventKey, PageViewEvent> => {
	const { id, type, name, lastUpdated = '' } = props;

	return {
		eventType: pageViewEventKey,
		data: {
			page: {
				id: id,
				name: name,
				type: type,
				primary_category: '',
				secondary_category: '',
				tags: [name],
				breadcrumbs: [''],
				updated_date: formatDate(new Date(lastUpdated)),
			},
		},
	};
};

function formatDate(date: Date) {
	let month = '' + (date.getMonth() + 1);
	let day = '' + date.getDate();
	const year = date.getFullYear();

	if (month.length < 2) {
		month = '0' + month;
	}
	if (day.length < 2) {
		day = '0' + day;
	}

	return [day, month, year].join('/');
}
