import { fetcher } from 'lib/fetcher';

import type { GetServerSidePropsContext } from 'next';

type FetcherConfig = (
	req?: GetServerSidePropsContext['req'],
	res?: GetServerSidePropsContext['res']
) => void;

export const fetcherConfig: FetcherConfig = () => {
	fetcher.setDefaultConfig({ credentials: 'include' });
	fetcher.setErrorHandler((error) => {
		console.error(error);

		throw error;
	});
};
