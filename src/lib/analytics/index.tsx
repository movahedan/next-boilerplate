import { useAnalyticsPageEvent, useAuthenticatedEvent } from './providers';

import type { FC } from 'react';

export const AnalyticsProvider: FC = () => {
	useAnalyticsPageEvent();
	useAuthenticatedEvent();

	return null;
};

export * from './script';
export * from './events';
