import type { SampleModelContextType } from './sample.types';

export const attachSampleModelServerSideData = (
	sampleModel?: SampleModelContextType[0]
): {
	sampleModel?: SampleModelContextType[0];
} => ({
	sampleModel,
});

export const extractSampleServerSideData = (
	props: {
		sampleModel?: SampleModelContextType[0];
	} & unknown
): undefined | SampleModelContextType[0] => props.sampleModel;
