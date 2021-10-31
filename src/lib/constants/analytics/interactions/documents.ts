export const interactionEventKey = 'interaction';

export type InteractionEvent = {
	interaction: {
		location: string;
		component: string;
		description: string;
		details: string;
	};
};
