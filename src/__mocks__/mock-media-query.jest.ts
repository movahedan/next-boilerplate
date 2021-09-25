import type { Screens } from 'types/screens';

export const mockMediaQuery = (mediaQueryName: keyof Screens): void => {
	const matchMedia = jest.fn().mockReturnValue({
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		matches: mediaQueryName,
	});

	window.matchMedia = matchMedia;
};
