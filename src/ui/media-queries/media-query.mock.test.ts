import { mediaQueriesEntries } from 'ui/media-queries/media-queries.utils';

import type { MediaQueries, ScreenNames } from 'ui/media-queries';

it('Dummy test', () => {
	expect(true).toBeTruthy();
});

const getMatchMediasByGivenMediaQuery = (
	mediaQuery: ScreenNames
): MediaQueries => {
	if (mediaQuery === 'lg') {
		return { sm: true, md: true, lg: true };
	} else if (mediaQuery === 'md') {
		return { sm: true, md: true, lg: false };
	}

	return { sm: true, md: false, lg: false };
};

export const mockMatchMedia = (mediaQueryName: ScreenNames = 'sm') => {
	const currentMediaQueries = getMatchMediasByGivenMediaQuery(mediaQueryName);

	const matchMedia = jest.fn().mockImplementation((media) => {
		const mediaQueryEntry = mediaQueriesEntries.find(
			([, value]) => media == value
		) as [ScreenNames, never];

		const matches = currentMediaQueries[mediaQueryEntry?.[0] || 'sm'];

		return {
			matches,
			media,
			onchange: jest.fn(),
			dispatchEvent: jest.fn(),
			addListener: jest.fn(), // Deprecated
			removeListener: jest.fn(), // Deprecated
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		} as MediaQueryList;
	});

	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: matchMedia,
	});

	return matchMedia;
};
