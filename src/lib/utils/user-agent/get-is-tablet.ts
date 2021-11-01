import type UAParser from 'ua-parser-js';

export const getIsTablet = (parsedUA: UAParser.IResult): boolean => {
	const { type } = parsedUA.device;
	const isIPad = parsedUA.ua.match(/iPad/i);
	const isTablet = isIPad || type === 'tablet';

	return Boolean(isTablet);
};
