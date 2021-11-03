import { tailwindTheme } from './tailwind-theme';

export const tailwindConfig = tailwindTheme;

export type Screens = typeof tailwindTheme.theme.screens;
export const screensConfig: Screens = tailwindTheme.theme.screens;

type MediaQueries = { [key in keyof typeof screensConfig]: string };
export const mediaQueries: MediaQueries = Object.fromEntries(
	Object.entries(screensConfig).map(([key, value]) => [
		key as unknown,
		`(min-width: ${value})`,
	])
);
