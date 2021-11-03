import { useContext } from 'react';

import { SampleModelContext } from './contexts';

import type { SampleModelContextType } from './sample';

export const useSample = (): SampleModelContextType => {
	const [sampleModel, setAllProductCategories] = useContext(SampleModelContext);

	// In order to lazy fetch, uncomment this and see providers.ts:
	// useSampleModelInitializer(
	//   setAllProductCategories,
	//   sampleModel
	// );

	return [sampleModel, setAllProductCategories];
};
