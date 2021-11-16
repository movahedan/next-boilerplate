import { fetcher } from 'lib/fetcher';

import { backendEndpoints } from 'constants/endpoints';

import type { Sample } from './sample';

export const fetchSampleList = (): Promise<Sample> =>
	fetcher<Sample>(backendEndpoints.sample());
