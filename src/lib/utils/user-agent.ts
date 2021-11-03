import UAParser from 'ua-parser-js';

import type { IncomingMessage } from 'http';

export const getUserAgent = (headers: IncomingMessage['headers']) =>
	headers?.['user-agent'] ?? '';

export const getParsedUserAgent = (userAgent: string) =>
	new UAParser(userAgent).getResult();

export const getIsDesktop = (parsedUA: UAParser.IResult): boolean => {
	const deviceType = parsedUA.device.type;
	const isDesktop = deviceType !== 'mobile' && deviceType !== 'tablet';

	return Boolean(isDesktop);
};

export const getIsTablet = (parsedUA: UAParser.IResult): boolean => {
	const { type } = parsedUA.device;
	const isIPad = parsedUA.ua.match(/iPad/i);
	const isTablet = isIPad || type === 'tablet';

	return Boolean(isTablet);
};
