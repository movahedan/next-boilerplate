import type { TfieldsObject, TAnalyticEvent } from './types';

// TODO is it good? should I reset after any changes?
const resetFields = (fieldsObject: TfieldsObject = {}): TfieldsObject => {
	return Object.entries(fieldsObject).reduce(
		(undefinedFieldsObject, [fieldKey]) => {
			return {
				...undefinedFieldsObject,
				[fieldKey]: undefined,
			};
		},
		{}
	);
};

export const analyticEvent: TAnalyticEvent = (name, fieldsObject = {}) => {
	if (name && window) {
		window.dataLayer = window.dataLayer || [];

		if (typeof fieldsObject === 'object') {
			window.dataLayer.push({ event: name, ...fieldsObject });
			window.dataLayer.push(resetFields(fieldsObject));
		} else {
			window.dataLayer.push({ event: name });
		}

		return [name, fieldsObject];
	}

	return ['', {}];
};
