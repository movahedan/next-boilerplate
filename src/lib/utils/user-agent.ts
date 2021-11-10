import type { IncomingMessage } from 'http';

export const getHeaderUserAgent = (
	headers: IncomingMessage['headers']
): string => headers['user-agent'] ?? '';

export const getIsMobileUserAgent = (userAgent: string): boolean =>
	/Mobi|Android|iPod|iPhone/i.test(userAgent);
