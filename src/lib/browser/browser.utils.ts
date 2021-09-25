import UAParser from 'ua-parser-js';

import { matchMediaEntries } from './browser.constants';

import type { BrowserMediaQuery } from './browser.context';
import type { IncomingMessage } from 'http';
import type { Screens } from 'types/screens';

export const mediaQueryInitializer = () =>
	Object.fromEntries(
		matchMediaEntries.map(([mediaQueryName, matchMedia]) => [
			mediaQueryName,
			mediaQueryName === 'sm' || matchMedia?.matches,
		])
	) as BrowserMediaQuery;

export const getUserAgent = (req?: IncomingMessage) => {
	const userAgent =
		req?.headers['user-agent'] || global.window?.navigator.userAgent;

	return userAgent;
};

export const getParsedUserAgent = (userAgent: string) => {
	const parsedUA = new UAParser(userAgent).getResult();

	return parsedUA;
};

export const getServerMediaQuery = (
	req?: IncomingMessage
): BrowserMediaQuery => {
	const parsedUA = getParsedUserAgent(getUserAgent(req));

	const deviceType = parsedUA?.device.type;
	const isIPad = parsedUA?.ua.match(/iPad/i);
	const isTablet = isIPad || deviceType === 'tablet';

	return getMatchMediasByGivenMediaQuery(isTablet ? 'md' : 'sm');
};

const getMatchMediasByGivenMediaQuery = (
	mediaQuery: keyof Screens
): BrowserMediaQuery => {
	if (mediaQuery === 'lg') return { sm: true, md: true, lg: true };
	if (mediaQuery === 'md') return { sm: true, md: true, lg: false };
	else return { sm: true, md: false, lg: false };
};
