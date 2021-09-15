import { useAnalyticsPageEvent, useAuthenticatedEvent } from './events';

import type { FC } from 'react';

export const AnalyticsProvider: FC = () => {
	useAnalyticsPageEvent();
	useAuthenticatedEvent();

	return null;
};
