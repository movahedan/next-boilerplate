import UAParser from 'ua-parser-js';

import type { IncomingMessage } from 'http';

export const getUserAgent = (headers: IncomingMessage['headers']) =>
	headers?.['user-agent'] ?? '';

export const getParsedUserAgent = (userAgent: string) =>
	new UAParser(userAgent).getResult();

export const getIsDesktop = (parsedUA: UAParser.IResult): boolean => {
	const { type = '' } = parsedUA.device;
	const isDesktop = ['console', 'smarttv', 'wearable', 'embedded'].includes(
		type
	);

	return Boolean(isDesktop);
};

export const getIsTablet = (parsedUA: UAParser.IResult): boolean => {
	const { type } = parsedUA.device;
	const isIPad = parsedUA.ua.match(/iPad/i);
	const isTablet = type === 'tablet' || isIPad;

	return Boolean(isTablet);
};
