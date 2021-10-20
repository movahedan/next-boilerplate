import { fetchSampleList } from './sample.fetchers';
import { useSample } from './sample.hooks';
import { initialSampleContext } from './sample.initialData';
import { sampleMock } from './sample.mock';
import { SampleModelProvider } from './sample.providers';
import {
	extractSampleServerSideData,
	attachSampleModelServerSideData,
} from './sample.utils';

export const SampleModel = {
	mockData: sampleMock,
	useData: useSample,
	fetchData: fetchSampleList,
	Provider: SampleModelProvider,
	initialData: initialSampleContext[0],
	attachObject: attachSampleModelServerSideData,
	extractObject: extractSampleServerSideData,
};
