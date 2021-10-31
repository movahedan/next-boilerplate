export const analyticEvent = <
	AnalyticEventType = string,
	AnalyticEventData = unknown
>(
	name: AnalyticEventType,
	data: AnalyticEventData
): void => {
	if (name && global.window) {
		global.window.dataLayer = global.window.dataLayer || [];
		global.window.dataLayer.push({
			event: name,
			data: data,
		});
	}
};
