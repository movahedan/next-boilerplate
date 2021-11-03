import axios from 'axios';

import { backendEndpoints } from 'constants/endpoints';

import type { Sample } from './sample';
import type { AxiosWrapperType } from 'axios';

export const fetchSampleList: AxiosWrapperType<Sample> = () =>
	axios
		.get(backendEndpoints.sample())
		.then(({ data }) => ({ data, error: undefined }))
		.catch((error) => ({ data: undefined, error }));
