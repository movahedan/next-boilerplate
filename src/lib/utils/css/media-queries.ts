import { screensConfig as config } from './tailwind-config';

type MediaQueries = { [key in keyof typeof config]: string };
export const mediaQueries: MediaQueries = Object.fromEntries(
	Object.entries(config).map(([key, value]) => [
		key as unknown,
		`(max-width: ${value})`,
	])
);
