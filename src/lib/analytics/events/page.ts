import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { analyticEvent } from './command';

import type { ReactEventHandler } from 'react';

interface IPageEventProps {
	id: string; // A unique page identifier (if available).
	name: string; // A unique page name.
}

export const analyticPageEvent = (props: IPageEventProps) =>
	analyticEvent('page', { page: props });

export const useAnalyticsPageEvent = () => {
	const router = useRouter();
	const dummyAnalyticPageEventProps = useDummyPageEventProps();

	useEffect(() => {
		const pageView: ReactEventHandler = () => {
			setTimeout(() => {
				analyticPageEvent(dummyAnalyticPageEventProps);
			}, 150);
		};

		setTimeout(() => {
			analyticPageEvent(dummyAnalyticPageEventProps);
		}, 150);

		router.events.on('routeChangeComplete', pageView);

		return () => {
			router.events.off('routeChangeComplete', pageView);
		};
	}, [dummyAnalyticPageEventProps, router.events]);
};

const useDummyPageEventProps = () => ({
	id: 'string',
	name: 'string',
});
