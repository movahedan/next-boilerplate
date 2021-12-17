import { createContext } from 'react';

import { getMatchMediaEntries } from './media-queries.utils';

import type { ScreenNames, MediaQueries } from './media-queries.types';

export const initMediaQueriesContext = (defaultValue: ScreenNames = 'sm') =>
	Object.fromEntries(
		getMatchMediaEntries().map(([key, value]) => [
			key,
			value?.matches ?? key === defaultValue ? true : false,
		])
	) as MediaQueries;

export const MediaQueriesContext = createContext<MediaQueries>(
	initMediaQueriesContext()
);
