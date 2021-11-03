import {
	getIsDesktop,
	getIsTablet,
	getParsedUserAgent,
	getUserAgent,
} from 'lib/utils/user-agent';

import type { Screens } from 'constants/tailwind';
import { mediaQueries } from 'constants/tailwind';

import type { BrowserMediaQuery } from './browser.d';
import type { IncomingMessage } from 'http';

type MatchMediaEntry = [keyof typeof mediaQueries, MediaQueryList | undefined];
export const getMatchMediaEntries = () =>
	Object.entries(mediaQueries).map(([key, value]) => [
		key,
		global.window?.matchMedia(value),
	]) as MatchMediaEntry[];

export const mediaQueryInitializer = () =>
	Object.fromEntries(
		getMatchMediaEntries().map(([mediaQueryName, matchMedia]) => [
			mediaQueryName,
			matchMedia?.matches,
		])
	) as BrowserMediaQuery;

export const getMatchMediasFromUserAgent = (
	headers: IncomingMessage['headers']
): BrowserMediaQuery => {
	const parsedUA = getParsedUserAgent(getUserAgent(headers));
	const currentMediaQuery = getIsTablet(parsedUA)
		? 'md'
		: getIsDesktop(parsedUA)
		? 'lg'
		: 'sm';

	return getMatchMediasByGivenMediaQuery(currentMediaQuery);
};

export const getMatchMediasByGivenMediaQuery = (
	mediaQuery: keyof Screens
): BrowserMediaQuery => {
	if (mediaQuery === 'lg') return { sm: true, md: true, lg: true };
	else if (mediaQuery === 'md') return { sm: true, md: true, lg: false };

	return { sm: true, md: false, lg: false };
};
