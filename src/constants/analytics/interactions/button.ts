import { interactionEventKey } from './documents';

import type { AnalyticTracker } from 'lib/analytics';

export const trackHeaderInteractions: AnalyticTracker = (
	containerRef,
	analyticCommand
): void => {
	setTimeout(() => {
		const buttons = (<HTMLDivElement>containerRef.current).querySelectorAll(
			'button[data-testid=btn]'
		);

		if (buttons) {
			buttons.forEach((quickLinkElement: Element) => {
				(quickLinkElement as HTMLButtonElement).onclick = () => {
					analyticCommand(interactionEventKey, {
						interaction: {
							location: 'location',
							component: 'button',
							description: 'description',
							details: '',
						},
					});
				};
			});
		}
	});
};
