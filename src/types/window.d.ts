import 'node';
import 'jest-fetch-mock';

declare global {
	interface Window {
		dataLayer: Record<string, unknown>[];
	}

	interface Error extends Error {
		apiError?: Response;
	}
}
