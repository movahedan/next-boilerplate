export const pageViewEventKey = 'view_loaded';

export type PageViewEvent = {
	page: AnalyticsPage;
};

type AnalyticsPage = {
	id: string;
	name: string;
	type: string;
	primary_category: '';
	secondary_category: '';
	tags: string[];
	breadcrumbs: [''];
	updated_date: string;
};
