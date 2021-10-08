import axios from 'axios';

import { endpoints } from 'lib/utils';

import type { Sample } from './types';
import type { AxiosWrapperType } from 'axios';

export const fetchSampleList: AxiosWrapperType<Sample> = () =>
	axios
		.get(endpoints.sample())
		.then(({ data }) => ({ data, error: undefined }))
		.catch((error) => ({ data: undefined, error }));
