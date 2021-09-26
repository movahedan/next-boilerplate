import type UAParser from 'ua-parser-js';

export const getIsTablet = (parsedUA?: UAParser.IResult): boolean => {
	const deviceType = parsedUA?.device.type;
	const isIPad = parsedUA?.ua.match(/iPad/i);
	const isTablet = isIPad || deviceType === 'tablet';

	return Boolean(isTablet);
};
