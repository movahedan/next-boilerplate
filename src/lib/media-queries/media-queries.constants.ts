import { tailwindTheme } from 'lib/utils';

import type { ScreenNames } from './media-queries.types';

export const mediaQueriesEntries: [ScreenNames, string][] = Object.entries(
	tailwindTheme.theme.screens
).map(([key, value], index) => [
	key as ScreenNames,
	`(min-width: ${index === 0 ? '0' : value})`,
]);

export const getMatchMediaEntries: () => [
	ScreenNames,
	MediaQueryList | undefined
][] = () =>
	mediaQueriesEntries.map(([key, value]) => [
		key,
		global.window?.matchMedia(value),
	]);
