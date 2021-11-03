import { getAnalyticsPage } from './getter';

import type { pageViewEventKey, PageViewEvent } from './documents';
import type { AnalyticEventInfo } from 'lib/analytics';

export const getSamplePageAnalyticsProps = (): AnalyticEventInfo<
	typeof pageViewEventKey,
	PageViewEvent
> =>
	getAnalyticsPage({
		id: '',
		name: 'sample',
		type: 'sample',
		lastUpdated: '',
	});
