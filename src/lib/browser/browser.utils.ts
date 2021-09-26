import {
	getIsTablet,
	getParsedUserAgent,
	getUserAgent,
	mediaQueries,
} from 'lib/utils';

import type { BrowserMediaQuery } from './browser.types';
import type { IncomingMessage } from 'http';
import type { Screens } from 'lib/utils';

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
			mediaQueryName === 'sm' || matchMedia?.matches,
		])
	) as BrowserMediaQuery;

export const getServerMediaQuery = (
	req?: Partial<IncomingMessage>
): BrowserMediaQuery => {
	const parsedUA = getParsedUserAgent(getUserAgent(req));
	const currentMediaQuery = getIsTablet(parsedUA) ? 'md' : 'sm';

	return getMatchMediasByGivenMediaQuery(currentMediaQuery);
};

export const getMatchMediasByGivenMediaQuery = (
	mediaQuery: keyof Screens
): BrowserMediaQuery => {
	if (mediaQuery === 'lg') return { sm: true, md: true, lg: true };
	if (mediaQuery === 'md') return { sm: true, md: true, lg: false };
	else return { sm: true, md: false, lg: false };
};
