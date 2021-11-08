import type { ServerResponse } from 'http';

export const setCacheHeader = (res: ServerResponse, config?: CacheConfig) =>
	res.setHeader('Cache-Control', getCacheConfig(config));

interface CacheConfig {
	maxAge?: null | number; // max-age (seconds)
	swr?: null | number; // stale-while-revalidation (seconds)
}

const getCacheConfig = ({
	maxAge = 10,
	swr = 60,
}: CacheConfig = {}): string => {
	const typeSection = 'public';
	const maxAgeSection = maxAge === null ? '' : `max-age=${maxAge}`;
	const staleSection = swr === null ? '' : `stale-while-revalidate=${swr}`;

	return [typeSection, maxAgeSection, staleSection].filter(Boolean).join(', ');
};
