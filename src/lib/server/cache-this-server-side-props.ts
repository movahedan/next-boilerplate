import type { ServerResponse } from 'http';

interface CacheConfig {
	maxAge?: null | number; // max-age (seconds)
	swr?: null | number; // stale-while-revalidation (seconds)
}

export const getCacheConfig = ({
	maxAge = 10,
	swr = 60,
}: CacheConfig = {}): string => {
	const typeSection = 'public';
	const maxAgeSection = maxAge === null ? '' : `max-age=${maxAge}`;
	const staleSecion = swr === null ? '' : `stale-while-revalidate=${swr}`;

	return [typeSection, maxAgeSection, staleSecion].filter(Boolean).join(', ');
};

type CacheThisServerSideProps = (
	res: {
		setHeader: ServerResponse['setHeader'];
	},
	config?: CacheConfig
) => void;

export const cacheThisServerSideProps: CacheThisServerSideProps = (
	res,
	config
) => res.setHeader('Cache-Control', getCacheConfig(config));
