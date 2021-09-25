import { mediaQueries } from 'lib/utils';

type MatchMediaEntry = [keyof typeof mediaQueries, MediaQueryList | undefined];
export const matchMediaEntries = Object.entries(mediaQueries).map(
	([key, value]) => [key, global.window?.matchMedia(value)]
) as MatchMediaEntry[];
