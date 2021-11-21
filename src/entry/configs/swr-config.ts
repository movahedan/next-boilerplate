import { fetcher } from 'lib/fetcher';

import type { SWRConfiguration } from 'swr';

type SWRConfigProps = ({
	fallback,
}: {
	fallback: SWRConfiguration['fallback'];
}) => SWRConfiguration;

export const swrConfig: SWRConfigProps = ({ fallback }) => ({
	fetcher,
	fallback,
});
