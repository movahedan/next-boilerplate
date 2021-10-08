import { fetchSampleList } from './fetchers';
import { useSample } from './hooks';
import { initialSampleContext } from './initialData';
import { sampleMock } from './mock';
import { SampleModelProvider } from './providers';
import {
	extractSampleServerSideData,
	attachSampleModelServerSideData,
} from './utils';

export * from './types';

export const SampleModel = {
	mockData: sampleMock,
	useData: useSample,
	fetchData: fetchSampleList,
	Provider: SampleModelProvider,
	initialData: initialSampleContext[0],
	attachObject: attachSampleModelServerSideData,
	extractObject: extractSampleServerSideData,
};
