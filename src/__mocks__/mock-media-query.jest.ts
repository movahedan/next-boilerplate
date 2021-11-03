import { getMatchMediasByGivenMediaQuery, mediaQueries } from 'lib/browser';

import type { Screens } from 'constants/css';

export const mockMatchMedia = (
	mediaQueryName: keyof Screens = 'sm',
	removeMockedFunction = false
) => {
	const currentMediaQueries = getMatchMediasByGivenMediaQuery(mediaQueryName);

	const matchMedia = jest.fn().mockImplementation((media) => {
		const mediaQueryEntry = Object.entries(mediaQueries).find(
			([, value]) => media == value
		) as [keyof Screens, never];
		const matches = currentMediaQueries[mediaQueryEntry?.[0] || 'sm'];

		if (removeMockedFunction) {
			return {
				matches,
				media,
				onchange: null,
			} as MediaQueryList;
		}

		return {
			matches,
			media,
			onchange: null,
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
