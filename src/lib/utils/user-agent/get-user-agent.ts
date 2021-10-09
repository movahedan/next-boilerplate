import type { IncomingMessage } from 'http';

export const getUserAgent = (req: IncomingMessage) => {
	const userAgent = req.headers?.['user-agent'];

	return userAgent ?? '';
};
