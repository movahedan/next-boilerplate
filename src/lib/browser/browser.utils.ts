import type { Screens } from 'constants/css';
import { screensConfig } from 'constants/css';

import {
	getIsDesktop,
	getIsTablet,
	getParsedUserAgent,
	getUserAgent,
} from './user-agent';

import type { BrowserMediaQuery } from './browser.d';
import type { IncomingMessage } from 'http';

type MediaQueries = { [key in keyof typeof screensConfig]: string };
export const mediaQueries: MediaQueries = Object.fromEntries(
	Object.entries(screensConfig).map(([key, value]) => [
		key as unknown,
		`(min-width: ${value})`,
	])
);

const mediaQueriesEntries = Object.entries(mediaQueries);

type MatchMediaEntry = [keyof typeof mediaQueries, MediaQueryList | undefined];
export const getMatchMediaEntries = () =>
	mediaQueriesEntries.map(([key, value]) => [
		key,
		global.window.matchMedia(value),
	]) as MatchMediaEntry[];

const defaultMediaQuery = 'sm';
export const initBrowserContext = () => ({
	mediaQueries: Object.fromEntries(
		mediaQueriesEntries.map(([key, value]) => [
			key,
			global.window?.matchMedia(value).matches || key === defaultMediaQuery,
		])
	) as BrowserMediaQuery,
});

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
