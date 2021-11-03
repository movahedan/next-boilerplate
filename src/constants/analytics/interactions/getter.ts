import { interactionEventKey } from './documents';

import type { InteractionEvent } from './documents';
import type { AnalyticEventInfo } from 'lib/analytics';

export const getInteraction = (
	props: InteractionEvent['interaction']
): AnalyticEventInfo<typeof interactionEventKey, InteractionEvent> => {
	const {
		location = '',
		component = '',
		description = '',
		details = '',
	} = props;

	return {
		eventType: interactionEventKey,
		data: {
			interaction: {
				location,
				component,
				description,
				details,
			},
		},
	};
};
