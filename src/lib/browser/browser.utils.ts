import { tailwindConfig } from 'lib/utils';

import {
	getIsDesktop,
	getIsTablet,
	getParsedUserAgent,
	getUserAgent,
} from './user-agent';

import type { Screens, BrowserObject } from './browser.d';
import type { IncomingMessage } from 'http';

const screensConfig: Screens = tailwindConfig.theme.screens;
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
	) as BrowserObject['browser']['mediaQueries'],
});

export const getMatchMediasFromUserAgent = (
	headers: IncomingMessage['headers']
): BrowserObject['browser']['mediaQueries'] => {
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
): BrowserObject['browser']['mediaQueries'] => {
	if (mediaQuery === 'lg') return { sm: true, md: true, lg: true };
	else if (mediaQuery === 'md') return { sm: true, md: true, lg: false };

	return { sm: true, md: false, lg: false };
};
