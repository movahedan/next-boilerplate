import axios from 'axios';

import { endpoints } from 'lib/constants';

import type { Sample } from './sample.d';
import type { AxiosWrapperType } from 'axios';

export const fetchSampleList: AxiosWrapperType<Sample> = () =>
	axios
		.get(endpoints.sample())
		.then(({ data }) => ({ data, error: undefined }))
		.catch((error) => ({ data: undefined, error }));
