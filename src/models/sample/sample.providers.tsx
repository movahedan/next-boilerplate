import { useState } from 'react';

import { SampleModelContext } from './sample.contexts';
import { initialSampleContext } from './sample.initialData';
import { useSampleModelInitializer } from './sample.initializers';

import type { SampleModelContextType } from './sample.types';
import type { FC } from 'react';

type SampleModelProviderType = FC<{
	initialData?: SampleModelContextType[0];
}>;

export const SampleModelProvider: SampleModelProviderType = ({
	initialData,
	children,
}) => {
	const [state, setState] = useState(initialData || initialSampleContext[0]);

	// In order to lazy fetch, comment this and see hooks.ts
	useSampleModelInitializer(setState, initialData);

	return (
		<SampleModelContext.Provider value={[state, undefined]}>
			{children}
		</SampleModelContext.Provider>
	);
};
