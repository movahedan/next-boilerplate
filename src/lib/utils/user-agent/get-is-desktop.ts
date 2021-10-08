import type UAParser from 'ua-parser-js';

export const getIsDesktop = (parsedUA?: UAParser.IResult): boolean => {
	const deviceType = parsedUA?.device.type;
	const isDesktop = deviceType !== 'mobile' && deviceType !== 'tablet';

	return Boolean(isDesktop);
};
