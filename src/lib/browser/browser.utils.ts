import {
	getIsDesktop,
	getIsTablet,
	getParsedUserAgent,
	getUserAgent,
} from 'lib/utils';

import { mediaQueries } from 'ui/utils';
import type { Screens } from 'ui/utils';

import type { BrowserMediaQuery } from './browser.types';
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
	req: IncomingMessage
): BrowserMediaQuery => {
	const parsedUA = getParsedUserAgent(getUserAgent(req));
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
