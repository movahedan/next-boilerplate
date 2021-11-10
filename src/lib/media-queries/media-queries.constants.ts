import { tailwindConfig } from 'lib/utils';

import type { ScreenNames } from './media-queries.d';

export const mediaQueriesEntries: [ScreenNames, string][] = Object.entries(
	tailwindConfig.theme.screens
).map(([key, value]) => [key as ScreenNames, `(min-width: ${value})`]);

export const getMatchMediaEntries: () => [
	ScreenNames,
	MediaQueryList | undefined
][] = () =>
	mediaQueriesEntries.map(([key, value]) => [
		key,
		global.window?.matchMedia(value),
	]);
