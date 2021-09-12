import 'node';

declare global {
	interface Window {
		dataLayer: Record<string, unknown>[];
	}
}
