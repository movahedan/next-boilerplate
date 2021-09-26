import type { IncomingMessage } from 'http';

export const getUserAgent = (req?: Partial<IncomingMessage>) => {
	const userAgent =
		req?.headers?.['user-agent'] || global.window?.navigator.userAgent;

	return userAgent;
};
